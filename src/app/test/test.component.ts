import { Component, OnInit } from '@angular/core';
import {SignalService} from "../core/Signal.service";
import {Message} from "../core/message.interface";
import {SearchService} from "../core/search.service";
import {SearchingField} from "../core/searchingField";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";


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

  searchFields: FormGroup;
  subscription = new Subscription();
  searchingFields: SearchingField[] = [];

  constructor(
    private signal: SignalService,
    private searchService: SearchService
  ) {
    this.searchFields = new FormGroup(
      {
        "fields":new FormArray([])
      }
    );
    this.subscription.add(this.searchService.searchingFields$.subscribe(
      (data: SearchingField) => {
        let fk = new FormControl(data.name,Validators.compose([
          Validators.required,
          Validators.pattern('.*')
        ]));
        (<FormArray>this.searchFields.controls["fields"]).push(fk);

        this.searchingFields.push(data);
      }
    ));
  }


  ngOnInit(): void {
  }


  async search(){
    this.signal.search({msgId: this.MsgId, dateFrom: this.dateFrom, dateTo: this.dateTo}).subscribe(
      value => {
        this.messages = value['result'];
        this.count = value['count'];
      }
    )
  }

  async test(){
    for(let i of (<FormArray>this.searchFields.controls["fields"]).value){
      console.log(i)
    }
    console.log(this.searchFields);
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
