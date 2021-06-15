import { Component, OnInit } from '@angular/core';
import {SignalService} from "../core/Signal.service";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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

}
