import {Injectable} from "@angular/core";
import {SearchingField} from "./searchingField";
import {Subject} from "rxjs";

@Injectable({providedIn:"root"})
export class SearchService{

  private searchingFields = new Subject<SearchingField>();
  public searchingFields$ = this.searchingFields.asObservable();

  addSearchingField(sf: SearchingField): void{
    this.searchingFields.next(sf)
  }

}
