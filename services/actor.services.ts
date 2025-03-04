import { Actor } from "../models/actors.models.ts";
import { ActorRepository } from "../repositories/actors.repository.ts";
import { ActorDTO } from "../dtos/actor.dto.ts";
import { ActorDBO} from "../dbos/actor.dbos.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

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
      birthday: actorDbo.birthday,
      country: actorDbo.country,
      age: actorDbo.age,
    };
  }
private toModelFromDTO(actorDto: ActorDTO): Actor {
  return {
    id: actorDto.id,
    name: actorDto.name,
    birthday: actorDto.birthday,
    country: actorDto.country,
    age: actorDto.age,
  };
}

private toDBOFromModel(actor: Actor): ActorDBO {
  return {
    _id: new ObjectId(actor.id),
    name: actor.name,
    birthday: actor.birthday,
    country: actor.country,
    age: actor.age,
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

  async getDTOActorById(id: string): ActorDTO | null {
    const actorModel = await this.getActorById(id);
    return actorModel ? this.toDTO(actorModel) : null;
  }
  async getActorById(id: string): ActorDTO | null {
    const actorDbo = await this.actorRepository.getActorById(id);
    return actorDbo ? this.toModel(actorDbo) : null;
  }

   async createDTOActor(actorData: Omit<ActorDTO, "id">): ActorDTO {
    const actorDTO: Omit<Actor, "id"> = {
      name: actorData.name,
      birthday: actorData.birthday,
      country: actorData.country,
      age: actorData.age,
    };

    const createdActor = await this.createActor(actorDTO);

    return this.toDTO(createdActor);
  }
  async createActor(actorData: Omit<Actor, "id">): ActorDBO {

    const actorDBO = this.toDBOFromModel(actorData);

    const createdActorDbo = await this.actorRepository.createActor(actorDBO);

    return this.toModel(createdActorDbo);
  }

  async updateActor(id: number, actorData: Omit<ActorDTO, "id">): ActorDTO | null {
    const actor: Omit<Actor, "id"> = {
      name: actorData.name,
      birthday: actorData.birthday,
      country: actorData.country,
      age: actorData.age,
    };

    const actorDBO = this.toDBOFromModel(actor);
    const updatedActorDbo = await this.actorRepository.updateActor(id, actorDBO);
    if (!updatedActorDbo) return null;

    const updatedActor = await this.toModel(updatedActorDbo);
    return this.toDTO(updatedActor);
  }

  deleteActor(id: string): boolean {
    return this.actorRepository.deleteActor(id);
  }
}
