import { Actor } from '../models/actors.models.ts';
import { ActorRepository } from '../repositories/actors.repository.ts';
import { ActorDTO } from '../dtos/actor.dto.ts';

export class ActorService {
  private actorRepository = new ActorRepository();

  // Convertir un Actor en ActorDTO
  private toDTO(actor: Actor): ActorDTO {
    return {
      id: actor.id,
      name: actor.name,
      birthday: actor.birthday,
      country: actor.country,
      age: actor.age,
    };
  }

  // Convertir un ActorDTO en Actor
  private toModel(dto: ActorDTO): Actor {
    return {
      id: dto.id,
      name: dto.name,
      birthday: dto.birthday,
      country: dto.country,
      age: dto.age,
    };
  }

  getAllActors() {
    const actors = this.actorRepository.getAllActors();
    return actors.map(this.toDTO);
  }

  getActorById(id: number) {
    const actor = this.actorRepository.getActorById(id);
    return actor ? this.toDTO(actor) : null;
  }

  createActor(actorData: ActorDTO) {
    const actor = this.toModel(actorData);
    return this.actorRepository.createActor(actor);
  }

  updateActor(id: number, actorData: ActorDTO) {
    const actor = this.toModel(actorData);
    return this.actorRepository.updateActor(id, actor);
  }

  deleteActor(id: number) {
    return this.actorRepository.deleteActor(id);
  }
}
