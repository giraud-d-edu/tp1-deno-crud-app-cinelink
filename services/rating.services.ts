import { Rating } from "../models/ratings.models.ts";
import { RatingRepository } from "../repositories/ratings.repository.ts";
import { RatingDTO } from "../dtos/rating.dto.ts";

export class RatingService {
  private ratingRepository = new RatingRepository();

  toDTO(rate: rating): RatingDTO {
      return {
          id: rate.id,
          rating: rate.rating,
          comment: rate.comment,
          movieId: rate.movieId,
      };
  }

  toModel(dto: RatingDTO): rating {
      return {
          id: dto.id,
          rating: dto.rating,
          comment: dto.comment,
          movieId: dto.movieId,
      };
  }

  getAllRatings() {
      const ratings = this.ratingRepository.getAllRatings();
      return ratings.map(this.toDTO);
  }

  getRatingById(id: number) {
      const rate = this.ratingRepository.getRatingById(id);
      return rate ? this.toDTO(rate) : null;
  }

  createRating(ratingData: RatingDTO) {
      const rate = this.toModel(ratingData);
      return this.ratingRepository.createRating(rate);
  }

  updateRating(id: number, ratingData: RatingDTO) {
      const rate = this.toModel(ratingData);
      return this.ratingRepository.updateRating(id, rate);
  }

  deleteRating(id: number) {
      return this.ratingRepository.deleteRating(id);
  }
}
