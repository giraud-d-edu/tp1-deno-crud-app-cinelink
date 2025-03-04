import { Actor } from "../models/actors.models.ts";
import { ActorRepository } from "../repositories/actors.repository.ts";
import { ActorDTO } from "../dtos/actor.dto.ts";

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

  private calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  getAllActors(): ActorDTO[] {
    const actors = this.actorRepository.getAllActors();
    return actors.map(this.toDTO);
  }

  getActorById(id: number): ActorDTO | null {
    const actor = this.actorRepository.getActorById(id);
    return actor ? this.toDTO(actor) : null;
  }

  createActor(actorData: Omit<ActorDTO, "id">): ActorDTO {
    const actor: Omit<Actor, "id"> = {
      name: actorData.name,
      birthday: actorData.birthday,
      country: actorData.country,
    };

    const createdActor = this.actorRepository.createActor(actor);

    return this.toDTO(createdActor);
  }

  updateActor(id: number, actorData: Omit<ActorDTO, "id">): ActorDTO | null {
    const actor: Omit<Actor, "id"> = {
      name: actorData.name,
      birthday: actorData.birthday,
      country: actorData.country,
    };

    const updatedActor = this.actorRepository.updateActor(id, actor);
    return updatedActor ? this.toDTO(updatedActor) : null;
  }

  deleteActor(id: number): boolean {
    return this.actorRepository.deleteActor(id);
  }
}
