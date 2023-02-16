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
export class AppComponent {
  constructor(private moviesApi: MoviesApiService) {}
}
