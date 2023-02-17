export interface Movie {
  Actors: string;
  Title: string;
  Year: string;
  Country: string;
  Runtime: string;
  Poster: string;
  Plot: string;
  id: number;
  imdbRating: string;
  UserReview?: string;
  countryInfo?: CountryInfo[];
}
export interface Country {
  flags: {
    png: string;
    svg: string;
  };
  currencies: object;
  population: number;
}
export interface CountryInfo {
  name: string;
  flagUrl: string;
  currency: any;
  population: number;
}
