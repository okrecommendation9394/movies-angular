export interface Movie {
  Actors: string;
  Title: string;
  Year: string;
  Country: string;
  Runtime: string;
  Poster: string;
  Plot: string;
  id: number;
  UserReview?: string;
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
  currency: object;
  population: number;
}
