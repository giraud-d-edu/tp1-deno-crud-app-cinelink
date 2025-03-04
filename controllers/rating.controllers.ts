import {RatingService} from '../services/rating.services.ts';

const ratingService = new RatingService();

export class RatingController {
    static getAllRatings(ctx: Context) {
        try {
            ctx.response.body = ratingService.getAllRatings();
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
        } catch (error) {
           ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static getRatingById(ctx: Context) {
        try {
            const rating = ratingService.getRatingById(Number(ctx.params.id));
            if (!rating) {
                ctx.response.status = 404; // Retourne un code 404 si la note n'est pas trouvée
                ctx.response.body = { message: "Rating not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = rating;
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static async createRating(ctx: Context) {
        try {
            const body = await ctx.request.body.json();
            const rating = ratingService.createRating(body);
            ctx.response.body = rating;
            ctx.response.status = 201; // Retourne un code 201 si la note est créée
        } catch (error) {
            ctx.response.status = 400; // Retourne un code 400 si la note n'est pas créée
            ctx.response.body = { message: error.message };
        }
    }

    static async updateRating(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400;  // Retourne un code 400 si l'ID est invalide
                ctx.response.body = { message: "Invalid ID" };
                return;
            }
            const body = await ctx.request.body.json();
            const rating = ratingService.updateRating(id, body);
            if (!rating) {
                ctx.response.status = 404; // Retourne un code 404 si la note n'est pas trouvée
                ctx.response.body = { message: "Rating not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = rating;
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static deleteRating(ctx: Context) {
        try {
            const deleted = ratingService.deleteRating(Number(ctx.params.id));
            if (!deleted) {
                ctx.response.status = 404; // Retourne un code 404 si la note n'est pas trouvée
                ctx.response.body = { message: "Rating not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = { message: "Rating deleted successfully" };
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }
}
