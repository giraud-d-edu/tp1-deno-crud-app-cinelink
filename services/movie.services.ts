import { Movie } from '../models/movies.models.ts';
import { MovieRepository } from '../repositories/movies.repository.ts';
import { MovieDTO } from '../dtos/movie.dto.ts';
import { ActorService } from './actor.services.ts';
import { RatingService } from './rating.services.ts';

export class MovieService {
  private movieRepository = new MovieRepository();
  private actorService = new ActorService();
  private ratingService = new RatingService();

  // Convertir un Movie en MovieDTO
  private toDTO(movie: Movie): MovieDTO {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      synopsis: movie.synopsis,
      ratings: movie.ratings.map((rating) => new RatingService().toDTO(rating)),
      actors: movie.actors.map((actor) => new ActorService().toDTO(actor)),
    };
  }

  // Convertir un MovieDTO en Movie
  private toModel(dto: MovieDTO): Movie {
    return {
      id: dto.id,
      title: dto.title,
      year: dto.year,
      synopsis: dto.synopsis,
      ratings: dto.ratings.map((ratingDto) => new RatingService().toModel(ratingDto)),
      actors: dto.actors.map((actorDto) => new ActorService().toModel(actorDto)),
    };
  }

  getAllMovies() {
    const movies = this.movieRepository.getAllMovies();
    return movies.map(this.toDTO);
  }

  getMovieById(id: number) {
    const movie = this.movieRepository.getMovieById(id);
    return movie ? this.toDTO(movie) : null;
  }

  createMovie(movieData: MovieDTO) {
    const movie = this.toModel(movieData);
    return this.movieRepository.createMovie(movie);
  }

  updateMovie(id: number, movieData: MovieDTO) {
    const movie = this.toModel(movieData);
    return this.movieRepository.updateMovie(id, movie);
  }

  deleteMovie(id: number) {
    return this.movieRepository.deleteMovie(id);
  }
}
