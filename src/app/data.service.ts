import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from './model/Song';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  url: string = "http://localhost:3000/Songs";

  getSongs() {
    return this.http.get<Song[]>(this.url);
  }
}
