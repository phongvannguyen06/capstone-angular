import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Category, Song } from 'src/app/model/Song';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css'],
})
export class EditSongComponent implements OnInit {
  @Input()
  song: Song;

  @Output()
  dataChangedEvent = new EventEmitter();

  genres: Array<Category>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.dataService.getSong(+id).subscribe((next) => (this.song = next));
    }
    this.dataService.getCategories().subscribe((next) => (this.genres = next));
  }

  onSubmit() {
    if (this.song.id == null) {
      this.dataService.addSong(this.song).subscribe((next) => {
        this.dataChangedEvent.emit();
        this.router.navigate(['']);
      });
    } else {
      this.dataService.updateSong(this.song).subscribe((next) => {
        this.router.navigate(['']);
        this.dataChangedEvent.emit();
      });
    }
  }
}
