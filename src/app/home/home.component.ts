import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category, Song } from '../model/Song';
import { DataService } from '../data.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: Song[] = [];
  songTitle: any;
  selectedSong: Song;
  action: string;
  isAdminUser = false;

  @Output()
  dataChangedEvent = new EventEmitter();

  categories: Category[] = [];

  itemsPP = 10;
  p: number = 1;
  faSort = faSort;
  faCart = faCartPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(public dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.dataService.getSongs().subscribe(next => {
      this.songs = next;
    });

    this.route.queryParams.subscribe(
      (params) => {
        this.action = null;
        const id = params['id'];
        if (id) {
          this.selectedSong = this.songs.find( song => song.id === +id);
          this.action = params['action'];
        }
        if (params['action'] === 'add') {
          this.selectedSong = new Song();
          this.action = 'edit';
        }
      }
    )

    if (this.authService.getRole() == 'ADMIN') {
      this.isAdminUser = true;
    }

  }

  editSong(id: number){
    this.router.navigate([''], {queryParams : { action: 'edit', id: id}});
  }

  addNewSong(){
    this.router.navigate([''], {queryParams: {action: 'add'}});
  }

  deleteSong(id: number) {
    this.dataService.deleteSong(id, this.authService.jwtToken).subscribe(
      next => {
        this.ngOnInit();
        this.router.navigate(['']);
      }
    )
  }

  addSongToCart(song: Song) {
    this.dataService.addToCart(song);
  }

  Search() {
    this.p = 1;
    if (this.songTitle === "" || this.songs.length === 0) {
      this.ngOnInit();
    } else {
      this.songs = this.songs.filter(s => {
        return s.title.toLocaleLowerCase().match(this.songTitle.toLocaleLowerCase());
      })
    }
    console.log(this.songs);
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
