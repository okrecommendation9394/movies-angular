import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ExtractNamesPipe } from './extract-names.pipe';
import { SumUpComponent } from './sum-up/sum-up.component';
import { GetCurrencyPipe } from './get-currency.pipe';
import { MovieListComponent } from './movie-list/movie-list.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ToastrModule } from 'ngx-toastr';
import { MovieComponent } from './movie-list/movie/movie.component';
@NgModule({
  declarations: [
    AppComponent,
    ExtractNamesPipe,
    SumUpComponent,
    GetCurrencyPipe,
    MovieListComponent,
    SearchComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    //RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
