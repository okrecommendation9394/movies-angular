import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MoviesApiService } from '../movies-api.service';
import { UserMovieValue } from '../user-movie.model';
@Component({
  selector: 'app-usermovie-list',
  templateUrl: './usermovie-list.component.html',
  styleUrls: ['./usermovie-list.component.scss'],
})
export class UsermovieListComponent {
  userMovies: UserMovieValue[] | undefined;
  constructor(
    private location: Location,
    private moviesApi: MoviesApiService
  ) {}

  ngOnInit() {
    this.moviesApi.getUserMovie().subscribe((data) => (this.userMovies = data));
  }
  goBack() {
    this.location.back();
  }
}
