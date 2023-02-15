export interface Movie {
  Actors: string;
  Title: string;
  Year: string;
  Country: string;
  Runtime: string;
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
  flagUrl: string;
  currency: object;
  population: number;
}
