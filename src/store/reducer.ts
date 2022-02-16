import { createReducer, on } from '@ngrx/store';
import { IQuestion, IResult } from 'src/app/http.service';
import * as _actions from './actions';

export interface IState {
  questions: IQuestion[];
  results: IResult[];
  questionnaireResultId: number | null;
  isQuestionnairePassed: boolean;
}

export const initialState: IState = {
  questions: [],
  results: [],
  questionnaireResultId: null,
  isQuestionnairePassed: false,
};

const _questionsReducer = createReducer(
  initialState,
  on(_actions.loadQuestionsData, (state) => state),
  on(_actions.loadQuestionsDataSuccess, (state, { questions, results }) => ({
    ...state,
    results,
    questions,
  })),
  on(_actions.setQuestionnaireResultId, (state, { questionnaireResultId }) => ({
    ...state,
    questionnaireResultId,
    isQuestionnairePassed: true,
  })),
  on(_actions.removeQuestionnaireResultId, (state) => ({
    ...state,
    questionnaireResultId: null,
    isQuestionnairePassed: false,
  }))
);

export const questionsReducer = (state: any, action: any) => {
  return _questionsReducer(state, action);
};
