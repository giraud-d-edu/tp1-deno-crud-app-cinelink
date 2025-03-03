import { Actor } from "../models/actors.models";

export class actorsRepository {
  private actors: Actor[] = [
    {
      id: 1,
      name: "Daniel Radcliffe",
      birthday: "23/07/1989",
      country: "UK",
      age: 31,
    },
  ];
  getAllActor(): Actor[] {
    return this.actors;
  }

  getActorById(id: number): Actor | null {
    const actor = this.actors.find((actor) => actor.id === id);
    if (actor === undefined) {
      return null;
    }
    return actor;
  }

  createActor(newActor: Actor): Actor | null {
    newActor.id = this.actors.length
      ? this.actors[this.actors.length - 1].id + 1
      : 1;
    const movie = this.actors.push(newActor);
    if (movie === undefined) {
      return null;
    }
    return newActor;
  }

  updateActor(id: number, updateActor: Actor): Actor | null {
    var actor = this.actors.find((actor) => actor.id === id);
    if (actor === undefined) {
      return null;
    }
    actor = updateActor ;
    return actor;
  }

  deleteActor(id: number): Actor | null {
    const actor = this.actors.findIndex((actor) => actor.id === id);
    if (actor === undefined) {
      return null;
    }
    return this.actors.splice(actor, 1)[0];
  }
}
