import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import {SignalService} from "./core/Signal.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TreeComponent } from './tree/tree.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { CompareByComponent } from './compare-by/compare-by.component';




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TreeComponent,
    SearchComponent,
    CompareByComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    TreeViewModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [SignalService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
