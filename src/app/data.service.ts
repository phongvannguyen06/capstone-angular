import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category, Song } from './model/Song';
import { CartItem } from './model/CartItem';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable(
  {providedIn: 'root'}
)
export class DataService {

  cart = new Array<CartItem>();
  observableCart = new BehaviorSubject<CartItem[]>(null);

  itemIsAddedToCart = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getSongs() : Observable<Array<Song>> {
    return this.http.get<Array<Song>>(environment.restUrl + '/api/songs')
      .pipe(
        map(data => {
          const songs = new Array<Song>();
          for (const song of data) {
            songs.push(Song.fromHttp(song));
          }
          return songs;
        })
      );
  }

  getCategories() : Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.restUrl + '/api/categories')
    .pipe(
      map(data => {
        const categories = new Array<Category>();
        for (const category of data) {
          categories.push(Category.fromHttp(category));
        }
        return categories;
      })
    );
  }

  addSong(song: Song) : Observable<Song> {
    return this.http.post<Song>(environment.restUrl + '/api/songs', song);
  }

  getSong(id: number) : Observable<Song> {
    return this.http.get<Song>(environment.restUrl + '/api/songs/' + id)
      .pipe(
        map(data => Song.fromHttp(data))
      )
  }

  updateSong(song: Song) : Observable<Song> {
    return this.http.put<Song>(environment.restUrl + '/api/songs/', song);
  }

  deleteSong(id: number) : Observable<any> {
    return this.http.delete(environment.restUrl + '/api/songs/' + id);
  }

  verifyStockInDatabase(cart: CartItem[]) {
    console.log(cart, 'SERVICE');
    return this.http.post<boolean>(environment.restUrl + '/api/songs/verify/', cart);
  }

  addToCart(song: Song) {
    const newCartItem = new CartItem();

    if (this.cart.length === 0 || (this.cart.filter(data => data.songId === song.id).length === 0)) {
      newCartItem.songId = song.id;
      newCartItem.songTitle = song.title;
      newCartItem.songArtist = song.artist;
      newCartItem.songPrice = song.price;
      newCartItem.quantity = 1;
      newCartItem.totalCost = newCartItem.quantity * newCartItem.songPrice;
      this.cart.push(newCartItem);
    } else {
      let index = this.cart.findIndex(i => i.songId === song.id);
      this.cart[index].quantity += 1;
      this.cart[index].totalCost = this.cart[index].quantity * this.cart[index].songPrice;
    }
    this.observableCart.next(this.cart);
    this.itemIsAddedToCart.emit();
  }

  getCart() : Observable<CartItem[]>{
    return this.observableCart.asObservable();
  }

}
