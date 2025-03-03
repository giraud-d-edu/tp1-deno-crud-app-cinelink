import { Movie } from '../models/movies.models.ts';
import { MovieRepository } from '../repositories/movies.repository.ts';
export class MovieService {
    private movieRepository = new MovieRepository();
    getAllMovies() {
        return this.movieRepository.getAllMovies();
    }

    getMovieById(id: number) {
        return this.movieRepository.getMovieById(id);
    }

    createMovie(movieData: any) {
        return this.movieRepository.createMovie(movieData);
    }

    updateMovie(id: number, movieData: any) {
        return this.movieRepository.updateMovie(id, movieData);
    }

    deleteMovie(id: number) {
        return this.movieRepository.deleteMovie(id);
    }
}
