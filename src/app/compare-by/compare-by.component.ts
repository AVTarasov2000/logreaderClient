import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SignalService} from "../core/Signal.service";
import {SearchService} from "../core/search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-compare-by',
  templateUrl: './compare-by.component.html',
  styleUrls: ['./compare-by.component.css']
})
export class CompareByComponent implements OnInit {
  subscription = new Subscription();

  constructor(private signal: SignalService,
              private searchService: SearchService) {
    this.subscription.add(searchService.field$.subscribe(field=>{
      this.field.setValue(field)
    }))
  }

  file1 = new FormControl(null, Validators.required);
  file2 = new FormControl(null, Validators.required);
  field = new FormControl(null, Validators.required);

  compare(): void{
    this.signal.compareByField(this.file1.value, this.file2.value, this.field.value).subscribe(
      value => {
        console.log("aaaaaaaaa")
        this.searchService.setMessages({messages: value['result'],  count: value['count']})
      }
    )
  }

  ngOnInit(): void {
  }

}
