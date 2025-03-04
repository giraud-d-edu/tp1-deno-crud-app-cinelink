import { ActorDBO } from './actor.dbo.ts';
import { RatingDBO } from './rating.dbo.ts';

export class MovieDBO {
  _id: string;
  id: number;
  title: string;
  year: number;
  synopsis: string;
  ratings: RatingDTO[];
  actors: ActorDTO[];
}