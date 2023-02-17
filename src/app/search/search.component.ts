import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MoviesApiService } from '../movies-api.service';
import { Movie, Country, CountryInfo } from '../movies.model';
import {
  Observable,
  fromEvent,
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  from,
  forkJoin,
  tap,
} from 'rxjs';
import { NotificationService } from '../notification.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('searchButton') searchButton: any;
  search: FormControl = new FormControl();
  movieName: string = '';
  movie$: Observable<Movie> | undefined;
  countries$: any | undefined;
  date = new Date();
  constructor(
    private moviesApi: MoviesApiService,
    private notifyService: NotificationService
  ) {}
  addToList(movie: Movie) {
    this.moviesApi
      .addNewMovie(movie)
      .subscribe(() =>
        this.notifyService.showSuccess(
          'The Movie was added to the list successfully',
          'Success'
        )
      );
  }
  ngOnInit() {}
  searchMovies() {
    this.movie$ = this.moviesApi.getMovie(this.movieName).pipe(
      switchMap((movieData) => {
        return this.moviesApi
          .getCountry(movieData.Country.split(', '))
          .pipe(
            map((countryData) => ({ countryInfo: countryData, ...movieData }))
          );
      })
    );
  }
}
