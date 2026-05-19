import { CommonModule } from '@angular/common';
import { OnInit, Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
})
export class Quiz implements OnInit {
  constructor(private quizService: QuizService) {}

  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer: string | null = null;
  result: string | null = null;
  showNext = false;
  finished = false;
  timeLeft = 10;
  timer: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe((data: any) => {
      this.questions = [
        { question: data.question, options: data.options, correctAnswer: data.correctAnswer },
      ];
      this.startTimer();
    });
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
