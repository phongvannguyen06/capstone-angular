export class Song {
  id: number;
  title: string;
  artist: string;
  price: number;
  quantity: number;
  genre: Category;

  static fromHttp(song: Song) {
    const newSong = new Song();
    newSong.id = song.id;
    newSong.title = song.title;
    newSong.artist = song.artist;
    newSong.price = song.price;
    newSong.quantity = song.quantity;
    newSong.genre = song.genre;

    return newSong;
  }
}

export class Category {
  id: number;
  genre: string;

  static fromHttp(category: Category) {
    const newCategory = new Category();
    newCategory.id = category.id;
    newCategory.genre = category.genre;

    return newCategory;
  }
}
