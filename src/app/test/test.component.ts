import { Component, OnInit } from '@angular/core';
import {SignalService} from "../core/Signal.service";
import {Message} from "../core/message.interface";
import {SearchService} from "../core/search.service";
import {SearchingField} from "../core/searchingField";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {SearchingObject, SearchingText, SearchingDate} from "../core/searchObject";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  messages: Message[] = [];
  count: number = 0

  controls: FormControl[] = [];
  searchFields: FormGroup;
  subscription = new Subscription();
  searchingFields: SearchingField[] = [];
  searchData: SearchingObject[] = [];

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
        if(data.type == "date") {
          let fkFrom = new FormControl(null, Validators.required);
          let fkTo = new FormControl(null, Validators.required);
          this.searchData.push(new SearchingDate(data, fkFrom, fkTo));
          (<FormArray>this.searchFields.controls["fields"]).push(fkFrom);
          this.searchingFields.push({
            name: data.name+" from",
            type: data.type,
            path: data.path,
            value: data.value,
            controlIndex: (<FormArray>this.searchFields.controls["fields"]).length
          });

          (<FormArray>this.searchFields.controls["fields"]).push(fkTo);
          this.searchingFields.push({
            name: data.name+" to",
            type: data.type,
            path: data.path,
            value: data.value,
            controlIndex: (<FormArray>this.searchFields.controls["fields"]).length
          });
        }
        else {
          let fk = new FormControl(null, Validators.required);
          this.searchData.push(new SearchingText(data, fk));
          data.controlIndex = (<FormArray>this.searchFields.controls["fields"]).length;
          (<FormArray>this.searchFields.controls["fields"]).push(fk);
          this.searchingFields.push(data);
        }
      }
    ));
  }


  ngOnInit(): void {
  }


  async search(){
    for (let i in this.controls){
      this.searchingFields[i].value = this.controls[i].value;
      console.log(this.searchingFields[i].value)
    }
    const res: string[] = [];
    for (const searchDataKey of this.searchData) {
      res.push(searchDataKey.getSearchingData())
    }
    this.signal.searchByQueries(res).subscribe(value => {
      this.messages = value['result'];
      this.count = value['count'];
    });
    // this.signal.search({msgId: '', dateFrom: '', dateTo: ''}).subscribe(
    //   value => {
    //     this.messages = value['result'];
    //     this.count = value['count'];
    //   }
    // )
  }



  setMinDate() {

  }

  setMaxDate() {

  }
  deleteField(index:number) {
    //todo при удалении даты удаляется два раза;
    (<FormArray>this.searchFields.controls["fields"]).removeAt(index);
    this.searchData.splice(this.searchingFields[index].controlIndex, 1);
    this.searchingFields.splice(index,1);
  }
}
