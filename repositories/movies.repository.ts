import { Movie } from "../models/movies.models";
import { Actor } from "../models/actors.models";
import { rating } from "../models/ratings.models";

export class MoviesRepository {
  private movies: Movie[] = [
    {
      id: 1,
      title: "harry potter",
      year: 2001,
      synopsis:
        "un enfant qui vit dans un placard découvre qu'il est un sorcier",
      ratings: [
        {
          id: 1,
          rating: 5,
          comment: "super film",
          movieId: 1,
        },
      ],
      actors: [
        {
          id: 1,
          name: "Daniel Radcliffe",
          birthday: "23/07/1989",
          country: "UK",
          age: 31,
        },
      ],
    },
  ];
}
