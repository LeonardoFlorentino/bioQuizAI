package com.bioquiz.bioquizai.controller;

import com.bioquiz.bioquizai.model.Question;
import com.bioquiz.bioquizai.service.GrokService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin

public class QuestionController {
        private final GrokService grokService;

        public QuestionController(GrokService grokService) {
                this.grokService = grokService;

        }

        @GetMapping
        public List<Question> getQuestion(@RequestParam(required = false) String category,
                        @RequestParam(required = false) String difficulty) {
                List<Question> questions = List.of(
                                new Question("Qual é a organela responsável pela respiração celular?",
                                                List.of("Ribossomo", "Mitocôndria", "Lisossomo", "Núcleo"),
                                                "Mitocôndria", "Citologia", "Fácil"),
                                new Question("Qual molécula carrega a informação genética?",
                                                List.of("RNA", "Proteína", "DNA", "Lipídio"), "DNA", "Genética",
                                                "Médio"),
                                new Question("Qual processo as plantas usam para produzir energia?",
                                                List.of("Respiração", "Fermentação", "Fotossíntese", "Digestão"),
                                                "Fotossíntese", "Bioquímica",
                                                "Fácil"));
                return questions.stream().filter(q -> (category == null || q.getCategory().equalsIgnoreCase(category))
                                && (difficulty == null || q.getDifficulty().equalsIgnoreCase(difficulty))).toList();
        }

        @GetMapping("/generate")
        public ResponseEntity<List<Question>> generateQuestion(
                        @RequestParam String category,
                        @RequestParam String difficulty,
                        @RequestParam int numberOfQuestions) {

                List<Question> questions = grokService.generateQuestion(category, difficulty, numberOfQuestions);
                return ResponseEntity.ok(questions);
        }
}
