import { Actor } from "../models/actors.models.ts";

let actors: Actor[] = [
  {
    id: 1,
    name: "Daniel Radcliffe",
    birthday: new Date("23/07/1989"),
    country: "UK",
    age: 31,
  },
];
export class ActorRepository {

  getAllActors(): Actor[] {
    return actors;
  }

  getActorById(id: number): Actor | null {
    const actor = actors.find((actor) => actor.id === id);
    if (actor === undefined) {
      return null;
    }
    return actor;
  }

  createActor(newActor: Actor): Actor | null {
    newActor.id = actors.length
      ? actors[actors.length - 1].id + 1
      : 1;
    const movie = actors.push(newActor);
    if (movie === undefined) {
      return null;
    }
    return newActor;
  }

  updateActor(id: number, updateActor: Actor): Actor | null {
    var actor = actors.find((actor) => actor.id === id);
    if (actor === undefined) {
      return null;
    }
    actor = updateActor ;
    return actor;
  }

  deleteActor(id: number): Actor | null {
    const actor = actors.findIndex((actor) => actor.id === id);
    if (actor === undefined) {
      return null;
    }
    return actors.splice(actor, 1)[0];
  }
}
