import { rating } from "../models/ratings.models.ts";
let ratings: rating[] = [
    {
    id: 1,
    rating: 5,
    comment: "super film",
    movieId: 1,
    },
];
export class RatingRepository {

    getAllRatings(): rating[] {
        return ratings;
    };

    getRatingById(id: number): rating | null {
        const rate = ratings.find((rating) => rating.id === id);
        if (rate === undefined) {
            return null;
        }
        return rate;
    }

    createRating(newRating: rating): rating | null{
        newRating.id = ratings.length ? ratings[ratings.length - 1].id + 1 : 1;
        const rate = ratings.push(newRating);
        if (rate === undefined) {
            return null;
        }
        return newRating;
    }

    updateRating(id: number, updateRating: rating): rating | null {
        const rate = ratings.find((rating) => rating.id === id);
        if (rate === undefined) {
            return null;
        }
        rate.rating = updateRating.rating;
        return rate;
    }
    deleteRating(id: number): rating | null {
        const rate = ratings.findIndex((rating) => rating.id === id);
        if (rate === undefined) {
            return null;
        }
        return ratings.splice(rate, 1)[0];
    }
}

