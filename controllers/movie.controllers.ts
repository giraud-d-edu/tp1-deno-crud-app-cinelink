import {MovieService} from '../services/movie.services.ts';
import {ActorService} from '../services/actor.services.ts';
import {RatingService} from '../services/rating.services.ts';
import { MovieDTO } from '../dtos/movie.dto.ts';

const ratingService = new RatingService();
const actorService = new ActorService();
const movieService = new MovieService(ratingService, actorService);
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
    
            // Vérification manuelle des données
            if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: title is required and should be a non-empty string" };
                return;
            }
            if (!body.year || typeof body.year !== 'number' || body.year < 1900 || body.year > new Date().getFullYear()) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: year must be a valid number between 1900 and the current year" };
                return;
            }
            if (!body.synopsis || typeof body.synopsis !== 'string' || body.synopsis.trim().length === 0) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: synopsis is required and should be a non-empty string" };
                return;
            }
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
            if (isNaN(id)) { // Retourne un code 400 si l'ID est invalide
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: ID must be a number" };
                return;
            }
    
            const existingMovie = movieService.getMovieById(id);
            if (!existingMovie) {
                ctx.response.status = 404; // Retourne un code 404 si le film n'est pas trouvé
                ctx.response.body = { message: "Movie not found" };
                return;
            }
    
            const body = await ctx.request.body.json();
    
            // Vérification manuelle des données
            if (body.title && (typeof body.title !== 'string' || body.title.trim().length === 0)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: title should be a non-empty string" };
                return;
            }
    
            if (body.year && (typeof body.year !== 'number' || body.year < 1900 || body.year > new Date().getFullYear())) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: year must be a valid number between 1900 and the current year" };
                return;
            }
    
            if (body.synopsis && (typeof body.synopsis !== 'string' || body.synopsis.trim().length === 0)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: synopsis should be a non-empty string" };
                return;
            }
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
