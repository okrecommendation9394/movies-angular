import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from '../../movies-api.service';
import { Movie } from '../../movies.model';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie: Movie | undefined;
  //@Input() userReview: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private movieAPi: MoviesApiService
  ) {}
  ngOnInit(): void {
    const title = this.route.snapshot.params['name'];
    this.movieAPi.getMovie(title).subscribe((movie) => (this.movie = movie));
  }
  // ngAfterContentInit() {
  //   console.log(this.userReview);
  // }
}
