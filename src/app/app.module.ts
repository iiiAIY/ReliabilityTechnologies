import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalcFoodForDogComponent } from './components/calc-food-for-dog/calc-food-for-dog.component';
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NumberRoundPipe } from './pipes/number-round.pipe';
import { FeedWeightPipe } from './pipes/feed-weight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalcFoodForDogComponent,
    DialogFormComponent,
    NumberRoundPipe,
    FeedWeightPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
