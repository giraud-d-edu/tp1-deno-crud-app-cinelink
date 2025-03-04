import { Movie } from "../models/movies.models.ts";
import { MovieRepository } from "../repositories/movies.repository.ts";
import { MovieDTO } from "../dtos/movie.dto.ts";
import { ActorService } from "./actor.services.ts";
import { RatingService } from "./rating.services.ts";

export class MovieService {
    private ratingService: RatingService;
    private actorService: ActorService;
    private movieRepository = new MovieRepository();

    constructor() {
      this.ratingService = new RatingService();
      this.actorService = new ActorService();
    }
    // Convertir un Movie en MovieDTO
    private toDTO(movie: Movie): MovieDTO {
        return {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            synopsis: movie.synopsis,
            ratings: movie.ratings,
            actors: movie.actors,
        };
    }

    // Convertir un MovieDTO en Movie (sans l'ID, car généré)
    private toModel(dto: Omit<MovieDTO, "id">): Omit<Movie, "id"> {
        return {
            title: dto.title,
            year: dto.year,
            synopsis: dto.synopsis,
            ratings: dto.ratings.map((ratingDto) => this.ratingService.toModel(ratingDto)),
            actors: dto.actors.map((actorDto) => this.actorService.toModel(actorDto)),
        };
    }

    getAllMovies(): MovieDTO[] {
        const movies = this.movieRepository.getAllMovies();
        return movies.map(this.toDTO);
    }

    getMovieById(id: number): MovieDTO | null {
        const movie = this.movieRepository.getMovieById(id);
        return movie ? this.toDTO(movie) : null;
    }

    createMovie(movieData: Omit<MovieDTO, "id">): MovieDTO {
        const movie = this.toModel(movieData);
        const createdMovie = this.movieRepository.createMovie(movie);
        return this.toDTO(createdMovie);
    }

    updateMovie(id: number, movieData: Omit<MovieDTO, "id">): MovieDTO | null {
        const movie = this.toModel(movieData);
        const updatedMovie = this.movieRepository.updateMovie(id, movie);
        return updatedMovie ? this.toDTO(updatedMovie) : null;
    }

    deleteMovie(id: number): boolean {
        return this.movieRepository.deleteMovie(id);
    }
}
