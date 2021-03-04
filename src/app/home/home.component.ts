import { Component, OnInit } from '@angular/core';
import { Song } from '../model/Song';
import { DataService } from '../data.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Song[] = [];
  songTitle: any;

  itemsPP = 5;
  p: number = 1;
  faSort = faSort;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSongs().subscribe((response) => {
      this.songs = response;
    });
  }

  Search() {
    this.p = 1;
    if (this.songTitle == "") {
      this.ngOnInit();
    } else {
      this.songs = this.songs.filter(s => {
        return s.title.toLocaleLowerCase().match(this.songTitle.toLocaleLowerCase());
      })
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  setItemsPerPage(entries: number) {
    this.itemsPP = entries;
  }

}
