import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { FormBoxComponent } from './form-box/form-box.component';
import { QuestionSubFormComponent } from './question-sub-form/question-sub-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../environments/environment';
import { DataEffect } from 'src/store/data.effect';
import { questionsReducer } from 'src/store/reducer';
import { HttpService } from './http.service';
import { QuestionnaireResultComponent } from './questionnaire-result/questionnaire-result.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBoxComponent,
    QuestionSubFormComponent,
    QuestionnaireResultComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    StoreModule.forRoot({ state: questionsReducer }),
    EffectsModule.forRoot([DataEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [FormBuilder, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
