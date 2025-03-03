import { rating } from "../models/ratings.models";

export class RatingRepository {
    private ratings: rating[] = [
        {
        id: 1,
        rating: 5,
        comment: "super film",
        movieId: 1,
        },
    ];

    getAllRatings(): rating[] {
        return this.ratings;
    };

    getMovieById(id: number): rating | null {
        const rate = this.ratings.find((rating) => rating.id === id);
        if (rate === undefined) {
            return null;
        }
        return rate;
    }

    createRating(newRating: rating): rating | null{
        newRating.id = this.ratings.length ? this.ratings[this.ratings.length - 1].id + 1 : 1;
        const rate = this.ratings.push(newRating);
        if (rate === undefined) {
            return null;
        }
        return newRating;
    }

    updateRating(id: number, updateRating: rating): rating | null {
        const rate = this.ratings.find((rating) => rating.id === id);
        if (rate === undefined) {
            return null;
        }
        rate.rating = updateRating.rating;
        return rate;
    }
    deleteRating(id: number): rating | null {
        const rate = this.ratings.findIndex((rating) => rating.id === id);
        if (rate === undefined) {
            return null;
        }
        return this.ratings.splice(rate, 1)[0];
    }
}

