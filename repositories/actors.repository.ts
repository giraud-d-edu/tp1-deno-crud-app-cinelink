import { MongoClient, ObjectId } from 'https://deno.land/x/mongo@v0.34.0/mod.ts';
import { ActorDbos } from '../dbos/actor.dbos.ts';
import {db} from '../db.ts';


export class ActorRepository {
  private actorsCollection;

  // Get all actors
  async getAllActors(): Promise<ActorDbos[]> {
    const collection = db.getActorsCollection();
    const actorsCursor = await collection.find({});
    const actors = await actorsCursor.toArray();
    return actors;
  }

  // Get an actor by ID
  async getActorById(id: string): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const actor = await collection.findOne({ _id: new ObjectId(id) });
    const actorDbos = new ActorDbos(actor);
    return actorDbos;
  }

  // Create a new actor
  async createActor(newActor: ActorDbos): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const result = await collection.insertOne(newActor);
    if (!result) {
      return null;
    }
    newActor._id = result;
    return newActor;
  }

  // Update an actor by ID
  async updateActor(id: string, updatedActor: ActorDbos): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();

    const { _id, ...actorData } = updatedActor;
    const result = await collection.updateOne(
      { _id: new ObjectId(id)},
      { $set: actorData }
    );
    actorData._id = new ObjectId(id);
    const actorDbos = new ActorDbos(actorData);
    return actorDbos;
  }

  // Delete an actor by ID
  async deleteActor(id: string): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
       throw new Error('Failed to delete actor');
    }
  }
}
