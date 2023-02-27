import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie-list/movie/movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { UsermovieListComponent } from './usermovie-list/usermovie-list.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'list',
    component: MovieListComponent,
  },
  {
    path: 'list/:name',
    component: MovieComponent,
  },
  {
    path: 'create-movie',
    component: CreateMovieComponent,
  },
  {
    path: 'usermovies',
    component: UsermovieListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
