import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IQuestion {
  question: string;
  variants: string[];
}

export interface IResult {
  id: number;
  text: string;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('../assets/db.json');
  }
}
