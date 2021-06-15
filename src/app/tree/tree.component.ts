import { Component } from '@angular/core';
import {NodeClickEvent} from "@progress/kendo-angular-treeview";


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent{

  public data: any[] = [
    {
      text: "Furniture",
      items: [
        { text: "Tables & Chairs" },
        { text: "Sofas" },
        { text: "Occasional Furniture", items: [
            { text: "Tables & Chairs" },
            { text: "Sofas" },
            { text: "Occasional Furniture" },
          ], },
      ],
    },
    {
      text: "Decor",
      items: [
        { text: "Bed Linen" },
        { text: "Curtains & Blinds" },
        { text: "Carpets" },
      ],
    },
  ];

  log($event: NodeClickEvent) {
    console.log($event)
  }
}
