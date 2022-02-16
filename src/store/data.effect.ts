import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../app/http.service';
import * as _actions from './actions';

@Injectable()
export class DataEffect {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.loadQuestionsData),
      mergeMap(() =>
        this.httpService
          .getData()
          .pipe(
            map(({ questions, results }: any) =>
              _actions.loadQuestionsDataSuccess({ questions, results })
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private httpService: HttpService) {}
}
