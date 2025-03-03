import {MovieService} from '../services/movie.service';

const movieService = new MovieService();

export class MovieController {
    
    static getAllMovies(ctx: Context) {
        try {
            const movies =  movieService.getAllMovies();
            ctx.response.status = 200;
            ctx.body = movies;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static getMovieById(ctx: Context) {
        try {
            const movie = movieService.getMovieById(Number(ctx.params.id));
            ctx.response.status = 200;
            ctx.body = movie;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static createMovie(ctx: Context) {
        try {
            const movie = movieService.createMovie(ctx.request.body);
            ctx.response.status = 201;
            ctx.body = movie;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static updateMovie(ctx: Context) {
        try {
            const movie = movieService.updateMovie(Number(ctx.params.id), ctx.request.body);
            ctx.response.status = 200;
            ctx.body = movie;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static deleteMovie(ctx : Context) {
        try {
            movieService.deleteMovie(Number(ctx.params.id));
            ctx.response.status = 204;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
}