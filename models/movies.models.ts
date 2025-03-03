import { Actor } from './actors.models';
import { rating } from './ratings.models';

export interface Movie {
    id: number;
    title: string;
    year: number;
    synopsis: string;
    ratings: rating[];
    actors: Actor[];
}