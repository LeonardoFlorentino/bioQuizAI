package com.bioquiz.bioquizai.controller;

import com.bioquiz.bioquizai.model.Question;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin

public class QuestionController {

    @GetMapping
    public Question getQuestion(){
        return new Question("Qual é a organela responsável pela respiração celular?", List.of("Ribossomo", "Mitocôndria", "Lisossomo", "Núcleo"), "Mitocôndria");
    }
    
}
