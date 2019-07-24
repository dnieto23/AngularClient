import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule  } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents(null),
    FormsModule,
    NgMultiSelectDropDownModule .forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
