import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MoviesApiService } from './movies-api.service';
import { Movie, Country, CountryInfo } from './movies.model';
import {
  Observable,
  fromEvent,
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  from,
  forkJoin,
} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('searchButton') searchButton: any;
  search: FormControl = new FormControl();
  movieName: string = '';
  movie$: Observable<Movie> | undefined;
  countries$: any | undefined;
  date = new Date();
  constructor(private moviesApi: MoviesApiService) {}
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.movie$ = fromEvent(this.searchButton.nativeElement, 'click').pipe(
      switchMap(() => this.moviesApi.getMovie(this.movieName)),
      distinctUntilChanged(),
      debounceTime(1000)
    );
    this.countries$ = this.movie$
      .pipe(
        map((movie) => movie.Country.split(', ')),
        switchMap((countries) => this.moviesApi.getCountry(countries))
      )
      .subscribe((d) => console.log(d));
  }
}
