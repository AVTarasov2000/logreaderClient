import {Message} from "./message.interface";

export interface SearchResult{
  messages: Message[]
  count: number;
}
