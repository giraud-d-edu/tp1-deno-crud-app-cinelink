import {MovieService} from '../services/movie.services.ts';

const movieService = new MovieService();

export class MovieController {
    static getAllMovies(ctx: Context) {
        try {
            ctx.response.body = movieService.getAllMovies();
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static getMovieById(ctx: Context) {
        try {
            const movie = movieService.getMovieById(Number(ctx.params.id));
            if (!movie) {
                ctx.response.status = 404; // Retourne un code 404 si le film n'est pas trouvé
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = movie;
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static async createMovie(ctx: Context) {
        try {
            const body = await ctx.request.body.json();
            const movie = movieService.createMovie(body);
            ctx.response.body = movie;
            ctx.response.status = 201; // Retourne un code 201 si le film est créé
        } catch (error) {
            ctx.response.status = 400; // Retourne un code 400 si le film n'est pas créé
            ctx.response.body = { message: error.message };
        }
    }

    static async updateMovie(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400; // Retourne un code 400 si l'ID est invalide
                ctx.response.body = { message: "ID invalide" };
                return;
            }
            const existingMovie = movieService.getMovieById(id);
            if (!existingMovie) {
                ctx.response.status = 404; // Retourne un code 404 si le film n'est pas trouvé
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            const body = await ctx.request.body.json();
            const movie = movieService.updateMovie(id, body);
            if (!movie) {
                ctx.response.status = 404; // Retourne un code 404 si le film n'est pas trouvé
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 si le film est mis à jour
            ctx.response.body = movie;
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static deleteMovie(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400; // Retourne un code 400 si l'ID est invalide
                ctx.response.body = { message: "ID invalide" };
                return;
            }
            const deleted = movieService.deleteMovie(id);

            if (!deleted) {
                ctx.response.status = 404; // Retourne un code 404 si le film n'est pas trouvé
                ctx.response.body = { message: "Movie not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 si le film est supprimé
            ctx.response.body = { message: "Movie deleted successfully" };
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }
}
