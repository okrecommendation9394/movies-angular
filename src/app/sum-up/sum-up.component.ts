import { Component, ViewChild } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';
import { Movie, Country, CountryInfo } from '../movies.model';
import {
  Observable,
  fromEvent,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  forkJoin,
  from,
  reduce,
} from 'rxjs';
@Component({
  selector: 'app-sum-up',
  templateUrl: './sum-up.component.html',
  styleUrls: ['./sum-up.component.scss'],
})
export class SumUpComponent {
  @ViewChild('sumButton') sumButton: any;
  input1: string | undefined;
  input2: string | undefined;
  input3: string | undefined;
  movie$: Observable<Movie[]> | undefined;
  countries$: any;
  totalRuntime: number | undefined;
  sumOfPopulation: number | undefined;
  constructor(private moviesApi: MoviesApiService) {}
  ngAfterViewInit() {
    this.movie$ = fromEvent(this.sumButton.nativeElement, 'click').pipe(
      switchMap(() => {
        const movieObservables: Observable<Movie>[] = [
          this.moviesApi.getMovie(this.input1 as string),
          this.moviesApi.getMovie(this.input2 as string),
          this.moviesApi.getMovie(this.input3 as string),
        ];
        return forkJoin(movieObservables);
      }),
      debounceTime(1000),
      distinctUntilChanged()
    );
    this.movie$.subscribe(
      (movies) =>
        (this.totalRuntime = movies.reduce(
          (total, movie) => total + Number(movie.Runtime.split(' ')[0]),
          0
        ))
    );
    this.countries$ = this.movie$
      .pipe(
        map((movies: any) => {
          const countries = [];
          for (let movie of movies) {
            countries.push(movie.Country.split(', '));
          }
          return [...new Set(countries.flat())];
        }),
        switchMap((countries: any) => this.moviesApi.getCountry(countries))
      )
      .subscribe(
        (countries) =>
          (this.sumOfPopulation = countries.reduce(
            (total, country) => total + Number(country.population),
            0
          ))
      );
  }
}
