import { Rating } from '../models/ratings.models.ts';
import { RatingRepository } from '../repositories/ratings.repository.ts';
export class RatingService {
        private ratingRepository = new RatingRepository();

    getAllRatings() {
        return this.ratingRepository.getAllRatings();
    }

    getRatingById(id: number) {
        return this.ratingRepository.getRatingById(id);
    }

    createRating(ratingData: any) {
        return this.ratingRepository.createRating(ratingData);
    }

    updateRating(id: number, ratingData: any) {
        return this.ratingRepository.updateRating(id, ratingData);
    }

    deleteRating(id: number) {
        return this.ratingRepository.deleteRating(id);
    }
}