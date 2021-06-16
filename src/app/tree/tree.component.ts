import { Component, OnInit } from '@angular/core';
import {NodeClickEvent} from "@progress/kendo-angular-treeview";
import {SignalService} from "../core/Signal.service";
import {TreeNode} from "../core/treeNode";


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit{


  constructor(public signal: SignalService) {
  }

  public data: TreeNode[] = [];

  log($event: NodeClickEvent) {
    console.log($event)
  }

  ngOnInit(): void {
    this.signal.get_tree().subscribe(value => {
      this.data = [value]})
  }
}
