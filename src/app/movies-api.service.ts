import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, from } from 'rxjs';
import { Movie, Country, CountryInfo } from './movies.model';

const BASE_URL_COUNTRIES = 'https://restcountries.com/v3.1/name/';
@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private http: HttpClient) {}
  getMovie(name: string): Observable<Movie> {
    return this.http.get<Movie>(
      `https://www.omdbapi.com/?t=${name}&apikey=31bb3c78`
    );
  }
  getCountry(names: string[]) {
    const productionCountries: CountryInfo[] = [];
    const urls = names.map((name) => BASE_URL_COUNTRIES + name);
    return forkJoin(
      urls.map((url) =>
        this.http.get(url).pipe(
          map((value: any) => {
            return {
              flagUrl: value[0].flags.png,
              currency: value[0].currencies,
              population: value[0].population,
            };
          })
        )
      )
    );
    // return this.http
    //   .get<Country[]>(
    //     `https://restcountries.com/v3.1/name/${name}?fullText=true`
    //   )
    //   .pipe(
    //     map((value) => {
    //       return {
    //         flagUrl: value[0].flags.png,
    //         currency: value[0].currencies,
    //       };
    //     })
    //   );
  }
}