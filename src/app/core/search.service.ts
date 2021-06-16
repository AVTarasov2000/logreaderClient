import {Injectable} from "@angular/core";
import {SearchingField} from "./searchingField";
import {Subject} from "rxjs";

@Injectable({providedIn:"root"})
export class SearchService{

  private _searchingFields: SearchingField[] = [
    {
      name: "MsgId",
      path: "MsgId",
      type: "test",
      value: ""
    }
  ];

  private searchingFields = new Subject<SearchingField>();
  public searchingFields$ = this.searchingFields.asObservable();

  addSearchingField(sf: SearchingField): void{
    this.searchingFields.next(sf)
  }

}
