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
        Pattern pattern = Pattern.compile("```json\\s*(\\{[\\s\\S]*?\\})\\s*```");
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return null;
        }
    }

    public List<Question> generateQuestion(String category, String difficulty) {

        String body = """
                {
                  "model": "groq/compound",
                  "messages": [
                    {
                      "role": "user",
                      "content": "Gere uma pergunta de biologia em JSON. Categoria %s. Dificuldade %s."
                    }
                  ]
                }
                """.formatted(category, difficulty);

        String response = webClient.post().uri("/chat/completions")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(response);
            String content = root.path("choices").get(0).path("message").path("content").asText();

            String questionJson = extractJson(content);
            Question question = mapper.readValue(questionJson, Question.class);

            List<Question> questions = new ArrayList<>();
            questions.add(question);
            return questions;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

}
