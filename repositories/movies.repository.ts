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

      getAllMovies(): Movie[] {
          return this.movies;
      };
  
      getMovieById(id: number): Movie | null {
          const movie = this.movies.find((movie) => movie.id === id);
          if (movie === undefined) {
              return null;
          }
          return movie;
      }
  
      createMovie(newMovie: Movie): Movie | null{
        newMovie.id = this.movies.length ? this.movies[this.movies.length - 1].id + 1 : 1;
          const movie = this.movies.push(newMovie);
          if (movie === undefined) {
              return null;
          }
          return newMovie;
      }
  
      updateMovie(id: number, updateMovie: Movie): Movie | null {
          var movie = this.movies.find((movie) => movie.id === id);
          if (movie === undefined) {
              return null;
          }
          movie = updateMovie;
          return movie;
      }

      deleteMovie(id: number): Movie | null {
          const movie = this.movies.findIndex((movie) => movie.id === id);
          if (movie === undefined) {
              return null;
          }
          return this.movies.splice(movie, 1)[0];
      }
}
