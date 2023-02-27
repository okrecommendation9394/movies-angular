import { Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MoviesApiService } from '../movies-api.service';
import {
  checkDate,
  checkMinLength,
  checkMovieName,
  checkPopulation,
} from '../movies.validator';
import { UserMovie, TypeOfMovie, UserMovieValue } from '../user-movie.model';
import { Country, Movie } from '../movies.model';
import { Observable, map } from 'rxjs';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent {
  form: FormGroup<UserMovie> = this.buildForm();
  movienames: string[] = [];
  countries: string[] | undefined;
  genres = [
    'action',
    'sci-fi',
    'rom-com',
    'comedy',
    'drama',
    'fantasy',
    'Horror',
    'Thriller',
  ];
  typeOfMovie = TypeOfMovie;
  private buildForm() {
    return this.fb.group<UserMovie>({
      name: this.fb.control(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        [checkMovieName(this.movieApi)]
      ),
      countries: this.fb.array([this.fb.control(null)], [checkMinLength()]),
      premierePlace: this.fb.control(
        '',
        [Validators.required],
        [checkPopulation(this.movieApi)]
      ),
      date: this.fb.control('', [Validators.required, checkDate()]),
      genres: this.fb.array([this.fb.control(null)], [checkMinLength()]),
      type: this.fb.control(null, [Validators.min(1), Validators.required]),
      rating: this.fb.control(0, [Validators.min(1)]),
    });
  }
  constructor(
    private fb: FormBuilder,
    private movieApi: MoviesApiService,
    private notifyService: NotificationService
  ) {}
  ngOnInit() {
    this.movieApi
      .getCountryNames()
      .subscribe((data) => (this.countries = data));
    this.buildForm();
    this.movieApi
      .getSavedMovies()
      .pipe(
        map((movies: Movie[]) => {
          const titles: string[] = [];
          movies.forEach((movie) => titles.push(movie.Title));
          return titles;
        })
      )
      .subscribe((names) => (this.movienames = names));
    this.form.controls.type?.valueChanges.subscribe((type) =>
      this.handleTypes(type)
    );
  }
  get plusBtnDisabled() {
    return this.form.controls.countries?.length === 3;
  }
  addCountry() {
    if (this.form.controls.countries?.length === 3) {
      return;
    }
    const countries = this.form.controls.countries;
    console.log(countries);
    countries.push(new FormControl(''));
  }
  onCheckboxChange(event: any) {
    const genres = this.form.controls.genres as FormArray;
    if (event.target?.checked) {
      genres.push(new FormControl(event.target.value));
    } else {
      const index = genres.controls.findIndex(
        (x) => x.value === event.target.value
      );
      genres.removeAt(index);
    }
  }
  handleTypes(movieType: TypeOfMovie | null) {
    switch (movieType) {
      case TypeOfMovie.Movie: {
        this.form.addControl(
          'minutesOf',
          this.fb.control(null, [
            Validators.required,
            Validators.min(60),
            Validators.max(90),
          ])
        );
        this.form.removeControl('numberOfSeries');
        break;
      }
      case TypeOfMovie.TvShow: {
        this.form.addControl(
          'numberOfSeries',
          this.fb.control('', [Validators.required])
        );
        this.form.removeControl('minutesOf');
        break;
      }
    }
  }
  onSubmit() {
    console.log(this.form);
    this.movieApi
      .addUserMovie(this.form.value)
      .subscribe(() =>
        this.notifyService.showSuccess(
          'The Movie was added to the list successfully',
          'Success'
        )
      );
  }
}
