import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  question = 'Qual é a organela responsável pela respiração celular?';

  options = ['Mitocôndria', 'Núcleo', 'Ribossomo', 'Lisossomo'];

  correctAnswer = 'Mitocôndria';

  selectedAnswer: string | null = null;
  result: string | null = null;

  selectAnswer(option: string) {
    this.selectedAnswer = option;

    if (option === this.correctAnswer) {
      this.result = '✅ Resposta correta!';
    } else {
      this.result = '❌Resposta incorreta';
    }
  }
}
