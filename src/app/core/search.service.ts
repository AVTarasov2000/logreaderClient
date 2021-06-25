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

  private field = new Subject<string>();
  public field$ = this.field.asObservable();

  addSearchingField(sf: SearchingField): void{
    this.searchingFields.next(sf)
  }

  setMessages(sf: SearchResult): void{
    this.messages.next(sf)
  }

  setField(field: string){
    this.field.next(field)
  }

}
