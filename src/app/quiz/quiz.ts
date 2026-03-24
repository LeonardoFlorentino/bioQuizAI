import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  questions = [
    {
      question: 'Qual é a organela responsável pela respiração celular?',
      options: ['Mitocôndria', 'Núcleo', 'Ribossomo', 'Lisossomo'],
      correctAnswer: 'Mitocôndria',
    },
    {
      question: 'Qual molécula carrega a informação genética?',
      options: ['RNA', 'Proteína', 'DNA', 'Lípidio'],
      correctAnswer: 'DNA',
    },
    {
      question: 'Qual processo as plantas usam para produzir energia?',
      options: ['Respiração', 'Fermentação', 'Fotossíntese', 'Digestão'],
      correctAnswer: 'Fotossíntese',
    },
  ];

  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer: string | null = null;
  result: string | null = null;
  showNext = false;
  finished = false;

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(option: string) {
    if (this.selectedAnswer) return;

    this.selectedAnswer = option;

    if (option === this.currentQuestion.correctAnswer) {
      this.score++;
      this.result = '✅ Correto!!';
    } else {
      this.result = `❌ Errado!"`;
    }

    this.showNext = true;
  }

  nextQuestion() {
    this.selectedAnswer = null;
    this.result = null;
    this.showNext = false;

    if (this.currentQuestionIndex + 1 < this.questions.length) {
      this.currentQuestionIndex++;
    } else {
      this.finished = true;
    }
  }

  restart() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.result = null;
    this.showNext = false;
    this.finished = false;
  }
}
