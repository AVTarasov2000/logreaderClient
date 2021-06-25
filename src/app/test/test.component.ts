import { Component, OnInit } from '@angular/core';
import {SignalService} from "../core/Signal.service";
import {Message} from "../core/message.interface";
import {SearchService} from "../core/search.service";
import {Subscription} from "rxjs";
import {SearchResult} from "../core/searchResult";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  messages: Message[] = [];
  count: number = 0

  subscription = new Subscription();

  constructor(
    private signal: SignalService,
    private searchService: SearchService
  ) {
    this.subscription.add(this.searchService.messages$.subscribe(
      (data: SearchResult) => {
        this.messages = data.messages;
        this.count = data.count;
      }
    ))
  }


  ngOnInit(): void {
  }

}
