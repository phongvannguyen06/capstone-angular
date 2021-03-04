import { Component, OnInit } from '@angular/core';
import { Song } from '../model/Song';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Song[] = [];
  songTitle: any;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSongs().subscribe((response) => {
      this.songs = response;
    });
  }

  Search() {
    if (this.songTitle == "") {
      this.ngOnInit();
    } else {
      this.songs = this.songs.filter(s => {
        return s.title.toLocaleLowerCase().match(this.songTitle.toLocaleLowerCase());
      })
    }
  }

}
