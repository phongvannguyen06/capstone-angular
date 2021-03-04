export class Song {
  id: number;
  title: string;
  artist: string;
  price: number;
  category: string;

  constructor(id, title, artist, price, category) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.price = price;
    this.category = category;
  }
}
