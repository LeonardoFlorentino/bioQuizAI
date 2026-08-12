import { CommonModule } from '@angular/common';
import { OnInit, Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { QuizService } from '../services/quiz.service';
import { Question } from '../models/question.model';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
})
export class Quiz implements OnInit {
  constructor(private quizService: QuizService) {}

  defaultTime = 60;
  numQuestions = 5;
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedCategory: string = 'Todas';
  customCategory: string = '';
  selectedDifficulty: string = 'any difficulty';
  score = 0;
  selectedAnswer: string | null = null;
  result: string | null = null;
  showNext = false;
  finished = false;
  noQuestionsFound = false;
  loading = false;
  timeLeft = this.defaultTime;
  timer: ReturnType<typeof setInterval> | undefined;
  errorMessage: string | null = null;
  errorTitle: string | null = null;

  ngOnInit(): void {}

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft = this.defaultTime;

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

    if (this.currentQuestionIndex + 2 > this.questions.length) {
      this.finished = true;
      this.timeLeft = 0;
      // Define resultado final
      const acertos = this.score;
      const total = this.questions.length;
      const percentual = total > 0 ? acertos / total : 0;
      if (percentual >= 0.7) {
        this.result = `🎉 Parabéns! Você acertou ${acertos} de ${total} perguntas!`;
      } else {
        this.result = `😢 Você acertou ${acertos} de ${total} perguntas. Tente novamente!`;
      }
    }
  }

  nextQuestion() {
    clearInterval(this.timer);
    this.selectedAnswer = null;
    this.showNext = false;
    this.result = null; // Garante que "Tempo esgotado" suma

    if (this.currentQuestionIndex + 1 < this.questions.length) {
      this.currentQuestionIndex++;
      this.startTimer();
    }
  }

  loadQuestions() {
    this.loading = true;
    this.errorMessage = null;
    this.errorTitle = null;
    const categoryToSend =
      this.selectedCategory === 'Outra' ? this.customCategory : this.selectedCategory;
    this.quizService
      .getQuestionsAI(categoryToSend, this.selectedDifficulty, this.numQuestions)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (data: any) => {
          clearInterval(this.timer);
          this.questions = data;

          this.currentQuestionIndex = 0;
          this.score = 0;
          this.selectedAnswer = null;
          this.result = null;
          this.showNext = false;

          this.finished = false;

          if (this.questions.length === 0) {
            this.noQuestionsFound = true;
          } else {
            this.noQuestionsFound = false;
            this.startTimer();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao carregar perguntas:', err);
          this.questions = [];
          this.noQuestionsFound = false;
          const aiUnavailable = err.status === 503;
          this.errorTitle = aiUnavailable
            ? 'Não foi possível carregar os dados com a IA'
            : 'Erro ao carregar perguntas';
          this.errorMessage = aiUnavailable
            ? 'A IA está indisponível no momento. Tente novamente em alguns instantes.'
            : 'Não foi possível carregar as perguntas. Verifique sua conexão ou tente novamente em alguns instantes.';
        },
      });
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
