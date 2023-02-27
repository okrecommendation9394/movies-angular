import { UserMovie } from './user-movie.model';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';
import { Directive } from '@angular/core';
import { UserMovieListService } from './user-movie-list.service';
import { Observable, map, switchMap, debounceTime } from 'rxjs';
import { MoviesApiService } from './movies-api.service';
import { Movie } from './movies.model';
export function checkMovieName(moviesApi: MoviesApiService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return moviesApi.getSavedMovies().pipe(
      debounceTime(2000),
      switchMap((movies) => moviesApi.checkSavedMovies(movies, control.value)),
      map((result: boolean) => (result ? { nameExists: true } : null))
    );
  };
}
export function checkDate(): ValidatorFn {
  return (control: AbstractControl) => {
    const userInputtedDate = new Date(control.value);
    const currentDate = new Date();
    return userInputtedDate.getTime() < currentDate.getTime()
      ? { pastDate: true }
      : null;
  };
}
export function checkPopulation(moviesApi: MoviesApiService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return moviesApi.getCountry([control.value]).pipe(
      debounceTime(2000),
      map((countries) => countries.pop()?.population),
      map((population) =>
        population! < 50000000 ? { premierePlaceError: true } : null
      )
    );
  };
}
export function checkMinLength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checked = control.value.length;
    return checked > 1 ? null : { atLeastOneCheckboxChecked: true };
  };
}
