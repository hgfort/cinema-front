export interface CountryDto {
    countryId: number;
    name: string;
}

export interface DirectorDto {
    directorId: number;
    name: string;
    surname: string;
    birthDate: string; // или Date если будешь парсить
    country: CountryDto;
}

export interface FilmInfoListDto {
    directors: DirectorDto[];
    countries: CountryDto[];
}