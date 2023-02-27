import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { MoviesApiService } from '../movies-api.service';
import { Movie } from '../movies.model';
import { Observable, map } from 'rxjs';
import { MovieComponent } from './movie/movie.component';
import { UserMovieListService } from '../user-movie-list.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @ViewChild(MovieComponent) movieComponent: MovieComponent | undefined;
  movieList$: Observable<Movie[]> | undefined;
  selectedMovieId: number | undefined;
  userReview: string | undefined;
  constructor(
    private movieApi: MoviesApiService,
    private userMovies: UserMovieListService
  ) {}
  ngOnInit() {
    this.movieList$ = this.movieApi.getSavedMovies();
    this.movieApi.getSavedMovies().subscribe((d) => console.log(d));
  }
  // ngAfterContentInit(): void {
  //   this.movieComponent!.userReview = this.userReview;
  // }
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
  deleteReview(movie: Movie) {
    movie.UserReview = '';
  }
}
