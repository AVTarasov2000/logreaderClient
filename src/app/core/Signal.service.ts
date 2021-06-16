import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Message} from "./message.interface";
import {Observable} from "rxjs";
import {SearchData} from "./searchData";
import {TreeNode} from "./treeNode";

@Injectable()
export class SignalService{

  constructor(
    private http: HttpClient
  )
  {
  }

  setUrl(url: string){
    return "http://127.0.0.1:5000/"+url;
  }
  testSignal(): Observable<Message>{
    return this.http.get<Message>(this.setUrl("test"))
  }

  search(searchData: SearchData): Observable<any> {
    return this.http.post(this.setUrl("search"), searchData)
  }

  get_tree(): Observable<TreeNode> {
    return this.http.get<TreeNode>(this.setUrl("getTree"))
  }
}


// curl -XPUT "localhost:9200/blog/post/1?pretty" -d'{  "title": "Веселые котята",  "content": "<p>Смешная история про котят<p>", "tags": ["котята", "смешная история"], "published_at": "2014-09-12T20:44:42+00:00"}'
// curl -XPUT "localhost:9200/blog/post/1?pretty" -H "Accept: application/json" -d'{"title":"Веселые котята","content":"<p>Смешная история про котят<p>","tags":["котята","смешная история"],"published_at":"2014-09-12T20:44:42+00:00"}'
// curl -XPUT "localhost:9200/blog/post/1?pretty" -H "Accept: application/json" -H "Content-Type: application/json" -d'{"title":"Веселые котята","content":"<p>Смешная история про котят<p>","tags":["котята","смешная история"],"published_at":"2014-09-12T20:44:42+00:00"}'

// curl -XPUT "localhost:9200/blog/post/1?pretty" -H "Accept: application/json" -H "Content-Type: application/json" -d'"title":"test","content":"test"'
