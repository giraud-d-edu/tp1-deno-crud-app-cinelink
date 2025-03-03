import { ActorDTO } from './actor.dto.ts';
import { RatingDTO } from './rating.dto.ts';

export class MovieDTO {
  id: number;
  title: string;
  year: number;
  synopsis: string;
  ratings: RatingDTO[];
  actors: ActorDTO[];
}
