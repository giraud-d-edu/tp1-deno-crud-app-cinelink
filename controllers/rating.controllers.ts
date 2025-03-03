import {RatingService} from '../services/rating.service';

const ratingService = new RatingService();

export class RatingController {

    static getAllRatings(ctx: Context) {
        try {
            const ratings =  ratingService.getAllRatings();
            ctx.response.status = 200;
            ctx.body = ratings;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
    static getRatingById(ctx: Context) {
        try {
            const rating = ratingService.getRatingById(Number(ctx.params.id));
            ctx.response.status = 200;
            ctx.body = rating;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
    static createRating(ctx: Context) {
        try {
            const rating = ratingService.createRating(ctx.request.body);
            ctx.response.status = 201;
            ctx.body = rating;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
    static updateRating(ctx: Context) {
        try {
            const rating = ratingService.updateRating(Number(ctx.params.id), ctx.request.body);
            ctx.response.status = 200;
            ctx.body = rating;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
    static deleteRating(ctx : Context) {
        try {
            ratingService.deleteRating(Number(ctx.params.id));
            ctx.response.status = 204;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
}