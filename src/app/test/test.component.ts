import { Component, OnInit } from '@angular/core';
import {SignalService} from "../core/Signal.service";
import {Message} from "../core/message.interface";
import {SearchService} from "../core/search.service";
import {SearchingField} from "../core/searchingField";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  MsgId: any = "";
  dateFrom: any = "";
  dateTo: any = "";

  messages: Message[] = [];
  count: number = 0

  controls: FormControl[] = [];
  searchFields: FormGroup;
  subscription = new Subscription();
  searchingFields: SearchingField[] = [];

  constructor(
    private signal: SignalService,
    private searchService: SearchService
  ) {
    this.searchFields = new FormGroup(
      {
        "fields":new FormArray(this.controls)
      }
    );
    this.subscription.add(this.searchService.searchingFields$.subscribe(
      (data: SearchingField) => {
        (<FormArray>this.searchFields.controls["fields"]).push(new FormControl(null, Validators.required));
        this.searchingFields.push(data);
      }
    ));
  }


  ngOnInit(): void {
  }


  async search(){
    for (let i in this.controls){
      this.searchingFields[i].value = this.controls[i].value;
    }
    this.signal.searchByArgs(this.searchingFields).subscribe(value => {});
    this.signal.search({msgId: this.MsgId, dateFrom: this.dateFrom, dateTo: this.dateTo}).subscribe(
      value => {
        this.messages = value['result'];
        this.count = value['count'];
      }
    )
  }



  setMinDate() {

  }

  setMaxDate() {

  }
  deleteField(index:number) {
    (<FormArray>this.searchFields.controls["fields"]).removeAt(index);
    this.searchingFields.splice(index,1);
  }
}
