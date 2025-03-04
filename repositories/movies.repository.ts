import { Movie } from "../models/movies.models.ts";
import { Actor } from "../models/actors.models.ts";
import { rating } from "../models/ratings.models.ts";

let movies: Movie[] = [
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
        birthday: new Date("23/07/1989"),
        country: "UK",
        age: 31,
      },
    ],
  },
];
export class MovieRepository {

      getAllMovies(): Movie[] {
          return movies;
      };
  
      getMovieById(id: number): Movie | null {
          const movie = movies.find((movie) => movie.id === id);
          if (movie === undefined) {
              return null;
          }
          return movie;
      }
  
      createMovie(newMovie: Movie): Movie | null{
        newMovie.id = movies.length ? movies[movies.length - 1].id + 1 : 1;
          const movie = movies.push(newMovie);
          if (movie === undefined) {
              return null;
          }
          return newMovie;
      }
  
      updateMovie(id: number, updateMovie: Movie): Movie | null {
          var movie = movies.find((movie) => movie.id === id);
          if (movie === undefined) {
              return null;
          }
          movie = updateMovie;
          return movie;
      }

      deleteMovie(id: number): Movie | null {
          const movie = movies.findIndex((movie) => movie.id === id);
          if (movie === undefined) {
              return null;
          }
          return movies.splice(movie, 1)[0];
      }
}
