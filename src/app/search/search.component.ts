import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {SearchingField} from "../core/searchingField";
import {SearchingDate, SearchingObject, SearchingText} from "../core/searchObject";
import {SearchService} from "../core/search.service";
import {SignalService} from "../core/Signal.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  subscription = new Subscription();

  constructor(private searchService: SearchService,
              private signal: SignalService) {
    this.searchFields = new FormGroup(
      {
        // "fields":new FormArray(this.controls)
        "fields":new FormArray([])
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
            value: data.value
          });

          (<FormArray>this.searchFields.controls["fields"]).push(fkTo);
          this.searchingFields.push({
            name: data.name+" to",
            type: data.type,
            path: data.path,
            value: data.value
          });
        }
        else {
          let fk = new FormControl(null, Validators.required);
          this.searchData.push(new SearchingText(data, fk));
          (<FormArray>this.searchFields.controls["fields"]).push(fk);
          this.searchingFields.push(data);
        }
      }
    ));

  }

  searchFields: FormGroup;
  searchingFields: SearchingField[] = [];
  searchData: SearchingObject[] = [];

  ngOnInit(): void {
  }

  async search(){
    const res: string[] = [];
    for (const searchDataKey of this.searchData) {
      res.push(searchDataKey.getSearchingData())
    }
    this.signal.searchByQueries(res).subscribe(value => {
      this.searchService.addMessages({messages: value['result'],  count: value['count']})
    });
  }

  deleteField(index:number) {
    (<FormArray>this.searchFields.controls["fields"]).removeAt(index);
    // this.searchData.splice(this.searchingFields[index].controlIndex, 1);
    this.searchData.splice(index, 1);
    this.searchingFields.splice(index,1);
  }

}
