import { Component, OnInit } from '@angular/core';
import {SignalService} from "../core/Signal.service";
import {Message} from "../core/message.interface";


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

  constructor(
    private signal: SignalService
  ) { }


  ngOnInit(): void {
  }

  async click_test(){
    this.signal.testSignal().subscribe(value => {
      console.log(value)
    }, error => {})
    console.log("test")
  }

  async search(){
    this.signal.search({msgId: this.MsgId, dateFrom: this.dateFrom, dateTo: this.dateTo}).subscribe(
      value => {
        this.messages = value['result'];
        this.count = value['count'];
      }
    )
  }

  async getTree(){
    this.signal.get_tree().subscribe(value => {
      console.log(value)})
  }



  setMinDate() {

  }

  setMaxDate() {

  }
}
