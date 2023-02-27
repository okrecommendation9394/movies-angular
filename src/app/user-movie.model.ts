import { FormControl, FormArray } from '@angular/forms';
export enum TypeOfMovie {
  Movie = 'Movie',
  TvShow = 'Tv-show',
}
export interface UserMovie {
  name: FormControl<string | null>;
  countries: FormArray<FormControl>;
  premierePlace: FormControl<string | null>;
  date: FormControl<string | null>;
  genres: FormArray<FormControl>;
  type: FormControl<TypeOfMovie | null>;
  minutesOf?: FormControl<number | null>;
  numberOfSeries?: FormControl<string | null>;
  rating: FormControl<number | null>;
}
export interface UserMovieValue {
  countries: string[];
  date: string;
  genres: string[];
  minutesOf?: number;
  numberOfSeries?: number;
  name: string;
  premierePlace: string;
  rating: string;
  type: string;
}
