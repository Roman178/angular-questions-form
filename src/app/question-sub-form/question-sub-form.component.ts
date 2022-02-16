import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IQuestion } from '../http.service';

@Component({
  selector: 'app-question-sub-form',
  templateUrl: './question-sub-form.component.html',
  styleUrls: ['./question-sub-form.component.css'],
})
export class QuestionSubFormComponent implements OnInit {
  @Input() question!: IQuestion;
  @Input() prevSelectedVariant!: { selectedVariant: number };
  @Input() index!: number;
  @Input() questionsLength!: number;

  @Output() questionSubFormInitialized = new EventEmitter();
  @Output() changeStep = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  public questionSubForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.questionSubForm = this._formBuilder.group({
      selectedVariant: this.prevSelectedVariant?.selectedVariant
        ? this.prevSelectedVariant.selectedVariant
        : '',
    });
    setTimeout(
      () => this.questionSubFormInitialized.emit(this.questionSubForm),
      0
    );
  }

  goBack(): void {
    this.changeStep.emit('back');
  }

  goForward(): void {
    this.changeStep.emit('forward');
  }

  handleSubmit() {
    this.submitForm.emit();
  }
}
