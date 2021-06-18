import { Component, OnInit } from '@angular/core';
import {NodeClickEvent} from "@progress/kendo-angular-treeview";
import {SignalService} from "../core/Signal.service";
import {TreeNode} from "../core/treeNode";
import {SearchService} from "../core/search.service";


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit{


  constructor(
    public signal: SignalService,
    public search: SearchService ) {
  }

  public data: TreeNode[] = [];

  ngOnInit(): void {
    this.signal.get_tree().subscribe(value => {
      this.data = [value]})
  }

  choseField($event: NodeClickEvent) {
    this.search.addSearchingField({
      name: $event.item?.dataItem.text,
      type: $event.item?.dataItem.type,
      path: $event.item?.dataItem.text,
      value: ""
    });
  }
}
