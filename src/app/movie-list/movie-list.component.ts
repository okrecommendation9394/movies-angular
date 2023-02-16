import { Component } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';
import { Movie } from '../movies.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movieList$: Observable<Movie[]> | undefined;
  selectedMovieId: number | undefined;
  userReview: string | undefined;
  constructor(private movieApi: MoviesApiService) {}
  ngOnInit() {
    this.movieList$ = this.movieApi.getSavedMovies();
    this.movieApi.getSavedMovies().subscribe((d) => console.log(d));
  }
  deleteMovie(movieId: number) {
    this.movieApi
      .deleteMovieFromList(movieId)
      .subscribe(() => (this.movieList$ = this.movieApi.getSavedMovies()));
  }
  enableReview(id: number) {
    this.selectedMovieId = this.selectedMovieId == id ? undefined : id;
  }
  addReview(id: number, movie: Movie) {
    movie.UserReview = this.userReview;
    this.movieApi.addReview(id, movie).subscribe((d) => console.log(d));
    this.selectedMovieId = undefined;
  }
}
