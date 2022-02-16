import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IQuestion } from '../http.service';
import * as _actions from '../../store/actions';
import { IState } from 'src/store/reducer';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
})
export class FormBoxComponent implements OnInit {
  private currentStepBs: BehaviorSubject<string> = new BehaviorSubject<string>(
    'question0'
  );
  public currentStep$: Observable<string> = this.currentStepBs.asObservable();
  public questionnaireForm!: FormGroup;
  public questionsData: IQuestion[] = [];

  constructor(private _formBuilder: FormBuilder, private store: Store<any>) {}

  ngOnInit(): void {
    const controls = {} as any;
    this.questionsData.forEach((_, i) => {
      controls[`question${i}`] = null;
    });
    this.questionnaireForm = this._formBuilder.group(controls);

    this.store.select('state').subscribe((state) => {
      this.questionsData = state.questions;
    });
  }

  getSubFormName(i: number) {
    return `question${i}`;
  }

  questionSubFormInitialized(questionNumber: number, group: FormGroup) {
    this.questionnaireForm.setControl(`question${questionNumber}`, group);
  }

  changeStep(indexQuestion: number, direction: 'forward' | 'back') {
    direction === 'forward'
      ? this.currentStepBs.next(`question${indexQuestion + 1}`)
      : this.currentStepBs.next(`question${indexQuestion - 1}`);
  }

  submitForm() {
    const results = Object.values(this.questionnaireForm.value).map(
      (val: any) => val.selectedVariant
    );
    const dispatchResultId = (resultId: number) => {
      this.store.dispatch(
        _actions.setQuestionnaireResultId({ questionnaireResultId: resultId })
      );
    };

    results.filter((i: number) => i === 1).length > 1
      ? dispatchResultId(1)
      : results.filter((i) => i === 2).length > 1
      ? dispatchResultId(2)
      : results.filter((i) => i === 3).length > 1
      ? dispatchResultId(3)
      : dispatchResultId(4);

    this.questionnaireForm.reset();
    this.currentStepBs.next('question0');
  }
}
