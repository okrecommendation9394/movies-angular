import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from './movies.model';

@Injectable({
  providedIn: 'root',
})
export class UserMovieListService {
  private apiUrl = 'http://localhost:3000/movies';
  //'path/to/db.json';
  constructor(private http: HttpClient) {}
  getMoviesFromList(): Observable<Movie[]> {
    return this.http.get<any>(this.apiUrl);
    //.pipe(map((movie) => movie.Title));
  }
}
