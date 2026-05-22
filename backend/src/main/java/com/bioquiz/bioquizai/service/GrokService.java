package com.bioquiz.bioquizai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.*;

import com.bioquiz.bioquizai.model.Question;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GrokService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final WebClient webClient;
    private String apiUrl = "https://api.groq.com/openai/v1";

    public GrokService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
    }

    private String extractJson(String content) {
        Pattern pattern = Pattern.compile("```json\\s*(\\[.*?\\])\\s*```", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return null;
        }
    }

    private String mapDifficulty(String difficulty) {
        if (difficulty == null)
            return "";
        return switch (difficulty.toLowerCase()) {
            case "fácil", "facil" -> "easy";
            case "médio", "medio" -> "medium";
            case "difícil", "dificil" -> "hard";
            default -> difficulty;
        };
    }

    public List<Question> generateQuestion(String category, String difficulty, int numberOfQuestions) {
        String mappedDifficulty = mapDifficulty(difficulty);

        // Monta o JSON manualmente para evitar problemas de escape
        String body = "{"
                + "\"model\": \"groq/compound\","
                + "\"messages\": ["
                + "{"
                + "\"role\": \"user\","
                + "\"content\": \"Gere " + numberOfQuestions
                + " perguntas de biologia em português, no formato JSON array, com os campos: question, options (4 alternativas), correctAnswer, category, difficulty. Apenas o array JSON, sem explicações.\""
                + "}"
                + "]"
                + "}";

        try {
            String response = webClient.post().uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            JsonNode contentNode = root.path("choices").get(0).path("message").path("content");
            if (contentNode.isMissingNode() || contentNode.isNull()) {
                return fallbackQuestions(category, mappedDifficulty);
            }
            String content = contentNode.asText();

            // Tenta extrair o array JSON de dentro do markdown
            String jsonArray = extractJson(content);
            if (jsonArray == null) {
                // fallback: tenta encontrar um array JSON mesmo sem markdown
                Pattern arrPattern = Pattern.compile("\\[.*?\\]", Pattern.DOTALL);
                Matcher arrMatcher = arrPattern.matcher(content);
                if (arrMatcher.find()) {
                    jsonArray = arrMatcher.group();
                }
            }

            if (jsonArray != null) {
                try {
                    Question[] questions = mapper.readValue(jsonArray, Question[].class);
                    List<Question> questionList = new ArrayList<>();
                    Collections.addAll(questionList, questions);
                    return questionList;
                } catch (Exception parseEx) {
                    return fallbackQuestions(category, mappedDifficulty);
                }
            } else {
                return fallbackQuestions(category, mappedDifficulty);
            }
        } catch (Exception e) {
            return fallbackQuestions(category, mappedDifficulty);
        }
    }

    // Pergunta de fallback para evitar erro no frontend
    private List<Question> fallbackQuestions(String category, String difficulty) {
        List<Question> fallback = new ArrayList<>();
        fallback.add(new Question(
                "Pergunta de exemplo: Qual é a organela responsável pela respiração celular?",
                List.of("Ribossomo", "Mitocôndria", "Lisossomo", "Núcleo"),
                "Mitocôndria",
                category != null ? category : "Citologia",
                difficulty != null ? difficulty : "Fácil"));
        return fallback;
    }

}
