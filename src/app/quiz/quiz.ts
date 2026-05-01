import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
})
export class Quiz implements OnInit {
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
  timeLeft = 10;
  timer: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.startTimer();
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft = 10;

    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft === 0) {
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout() {
    clearInterval(this.timer);
    this.nextQuestion();
  }

  selectAnswer(option: string) {
    if (this.selectedAnswer) return;

    clearInterval(this.timer);

    this.selectedAnswer = option;

    if (option === this.currentQuestion.correctAnswer) {
      this.score++;
      this.result = '✅ Correto!!';
    } else {
      this.result = '❌ Errado!';
    }

    this.showNext = true;
  }

  nextQuestion() {
    clearInterval(this.timer);
    this.selectedAnswer = null;
    this.showNext = false;
    this.result = null; // Garante que "Tempo esgotado" suma

    if (this.currentQuestionIndex + 1 < this.questions.length) {
      this.currentQuestionIndex++;
      this.startTimer();
    } else {
      this.finished = true;
      this.timeLeft = 0;
    }
  }

  restart() {
    clearInterval(this.timer);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.result = null;
    this.showNext = false;
    this.finished = false;
    this.startTimer();
  }
}
