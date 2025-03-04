import { Actor } from "../models/actors.models.ts";
import { ActorRepository } from "../repositories/actors.repository.ts";
import { ActorDTO } from "../dtos/actor.dto.ts";
import { ActorDBO} from "../dbos/actor.dbos.ts";

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
  private toModel(actorDbo: ActorDBO): Actor {
    return {
      id: actorDbo._id.toString(),
      name: actorDbo.name,
      birthday: actorDbo.birthdate,
      country: actorDbo.country,
      age: actorDbo.age,
    };
  }

    async getAllDTOActors(): ActorDTO[] {
    const actorsModel = await this.getAllActors();
    return actorsModel.map(this.toDTO);;
  }

  async getAllActors(): Actor[] {
    const actorsDbo = await this.actorRepository.getAllActors();
    return actorsDbo.map(this.toModel);
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
