import { Actor } from '../models/actors.models.ts';
import { ActorRepository } from '../repositories/actors.repository.ts';
export class ActorService {
    private actorRepository = new ActorRepository();
    getAllActors() {
        return this.actorRepository.getAllActors();
    }

    getActorById(id: number) {
        return this.actorRepository.getActorById(id);
    }

    createActor(actorData: any) {
        return this.actorRepository.createActor(actorData);
    }

    updateActor(id: number, actorData: any) {
        return this.actorRepository.updateActor(id, actorData);
    }

    deleteActor(id: number) {
        return this.actorRepository.deleteActor(id);
    }
}
