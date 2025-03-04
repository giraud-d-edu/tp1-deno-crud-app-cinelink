import {RatingService} from '../services/rating.services.ts';
import { RatingDTO } from '../dtos/rating.dto.ts';

const ratingService = new RatingService();

export class RatingController {
    static getAllRatings(ctx: Context) {
        try {
            ctx.response.body = ratingService.getAllRatings();
            ctx.response.status = 200;
        } catch (error) {
           ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    static getRatingById(ctx: Context) {
        try {
            const rating = ratingService.getRatingById(Number(ctx.params.id));
            if (!rating) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Rating not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = rating;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    static async createRating(ctx: Context) {
        try {
            const body = await ctx.request.body.json();
    
            // Vérification manuelle des données
            if (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid rating: must be a number between 1 and 5" };
                return;
            }
    
            if (body.comment && typeof body.comment !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid comment: must be a string" };
                return;
            }
    
            if (typeof body.movieId !== 'number' || body.movieId <= 0) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid movieId: must be a positive number" };
                return;
            }
            const rating = ratingService.createRating(body);
            ctx.response.body = rating;
            ctx.response.status = 201;
        } catch (error) {
            ctx.response.status = 400;
            ctx.response.body = { message: error.message };
        }
    }
    
    static async updateRating(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid ID: ID must be a number" };
                return;
            }
    
            const existingRating = ratingService.getRatingById(id);
            if (!existingRating) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Rating not found" };
                return;
            }
    
            const body = await ctx.request.body.json();
    
            // Vérification manuelle des données
            if (body.rating && (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid rating: must be a number between 1 and 5" };
                return;
            }
    
            if (body.comment && typeof body.comment !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid comment: must be a string" };
                return;
            }
    
            if (body.movieId && (typeof body.movieId !== 'number' || body.movieId <= 0)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid movieId: must be a positive number" };
                return;
            }
            const rating = ratingService.updateRating(id, body);
            if (!rating) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Rating not found" };
                return;
            }
    
            ctx.response.status = 200;
            ctx.response.body = rating;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
    

    static deleteRating(ctx: Context) {
        try {
            const deleted = ratingService.deleteRating(Number(ctx.params.id));
            if (!deleted) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Rating not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = { message: "Rating deleted successfully" };
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
}
