import { createAction, props } from '@ngrx/store';
import { IQuestion, IResult } from '../app/http.service';

export const loadQuestionsData = createAction(
  '[Questions Form] Load Questions Data'
);
export const loadQuestionsDataSuccess = createAction(
  '[Questions Data API] Questions Data Loaded Success',
  props<{ questions: IQuestion[]; results: IResult[] }>()
);

export const setQuestionnaireResultId = createAction(
  '[Questions Form] Set Questionnaire Result Id',
  props<{ questionnaireResultId: number }>()
);

export const removeQuestionnaireResultId = createAction(
  '[Questions Form] Remove Questionnaire Result Id'
);
