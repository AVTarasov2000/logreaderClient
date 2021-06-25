import {Injectable} from "@angular/core";
import {SearchingField} from "./searchingField";
import {Subject} from "rxjs";
import {SearchResult} from "./searchResult";

@Injectable({providedIn:"root"})
export class SearchService{

  private searchingFields = new Subject<SearchingField>();
  public searchingFields$ = this.searchingFields.asObservable();

  private messages = new Subject<SearchResult>();
  public messages$ = this.messages.asObservable();

  addSearchingField(sf: SearchingField): void{
    this.searchingFields.next(sf)
  }

  addMessages(sf: SearchResult): void{
    this.messages.next(sf)
  }

}
