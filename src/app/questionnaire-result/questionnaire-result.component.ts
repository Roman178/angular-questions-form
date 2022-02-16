import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _actions from '../../store/actions';
import { IResult } from '../http.service';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.css'],
})
export class QuestionnaireResultComponent implements OnInit {
  public result!: IResult;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store
      .select('state')
      .subscribe(
        (state) =>
          (this.result = state.results[state.questionnaireResultId - 1])
      );
  }

  passAgain() {
    this.store.dispatch(_actions.removeQuestionnaireResultId());
  }
}
