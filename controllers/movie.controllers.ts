import {MovieService} from '../services/movie.services.ts';

const movieService = new MovieService();

export class MovieController {
    static getAllMovies(ctx: Context) {
        try {
            ctx.response.body = movieService.getAllMovies();
            ctx.response.status = 200;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    static getMovieById(ctx: Context) {
        try {
            const movie = movieService.getMovieById(Number(ctx.params.id));
            if (!movie) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = movie;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    static async createMovie(ctx: Context) {
        try {
            const body = await ctx.request.body.json();
            const movie = movieService.createMovie(body);
            ctx.response.body = movie;
            ctx.response.status = 201;
        } catch (error) {
            ctx.response.status = 400;
            ctx.response.body = { message: error.message };
        }
    }

    static async updateMovie(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "ID invalide" };
                return;
            }
            const existingMovie = movieService.getMovieById(id);
            if (!existingMovie) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            const body = await ctx.request.body.json();
            const movie = movieService.updateMovie(id, body);
            if (!movie) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = movie;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    static deleteMovie(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "ID invalide" };
                return;
            }
            const deleted = movieService.deleteMovie(id);

            if (!deleted) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = { message: "Movie deleted successfully" };
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
}
