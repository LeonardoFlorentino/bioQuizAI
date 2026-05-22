import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {}

  getQuestions(category?: string, difficulty?: string) {
    let url = this.apiUrl;

    const params = [];

    if (category) {
      params.push(`category=${category}`);
    }

    if (difficulty) {
      params.push(`difficulty=${difficulty}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    return this.http.get(url);
  }

  getQuestionsAI(category: string, difficulty: string, numQuestions: number): Observable<any> {
    return this.http.get<any>(
      `/questions/generate?category=${category}&difficulty=${difficulty}&numberOfQuestions=${numQuestions}`,
    );
  }
}
