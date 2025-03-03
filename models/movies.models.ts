import { Actor } from './actors.models.ts';
import { rating } from './ratings.models.ts';

export interface Movie {
    id: number;
    title: string;
    year: number;
    synopsis: string;
    ratings: rating[];
    actors: Actor[];
}