import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _actions from '../store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public isQuestionnairePassed!: boolean | null;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(_actions.loadQuestionsData());
    this.store
      .select('state')
      .subscribe(
        (state) => (this.isQuestionnairePassed = state.isQuestionnairePassed)
      );
  }
}
