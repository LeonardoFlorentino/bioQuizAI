package com.bioquiz.bioquizai.service;

import com.google.genai.Client;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.client = Client.builder().apiKey(apiKey).build();
    }

    public String generateQuestion(String category, String difficulty) {
        String prompt = """
                Gere uma pergunta de biologia em JSON

                Categoria: %s
                Dificuldade: %s

                O formato deve ser:

                {
                    "question": "...",
                    "options": ["...", "...", "...", "..."],
                    "correctAnswer": "..."
                }

                """.formatted(category, difficulty);

        return client.models.generateContent("gemini-2.0-flash-lite", prompt, null).text();
    }

}
