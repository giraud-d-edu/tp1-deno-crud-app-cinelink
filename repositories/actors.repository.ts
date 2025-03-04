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
    console.log(actors);
    return actors;
  }

  // Get an actor by ID
  async getActorById(id: string): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const actor = await collection.actorsCollection.findOne({ _id: new ObjectId(id) });
    return actor ? new ActorDbos(actor) : null;
  }

  // Create a new actor
  async createActor(newActor: ActorDbos): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const result = await collection.actorsCollection.insertOne(newActor);
    if (!result.insertedId) {
      return null;
    }
    const actor = await collection.actorsCollection.findOne({ _id: result.insertedId });
    return actor ? new ActorDbos(actor) : null;
  }

  // Update an actor by ID
  async updateActor(id: string, updatedActor: ActorDbos): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const result = await collection.actorsCollection.updateOne(
      { _id: new ObjectId(id)},
      { $set: updatedActor }
    );
    if (result.modifiedCount === 0) {
      return null;
    }
    const actor = await collection.actorsCollection.findOne({ _id: new ObjectId(id) });
    return actor ? new ActorDbos(actor) : null;
  }

  // Delete an actor by ID
  async deleteActor(id: string): Promise<ActorDbos | null> {
    const collection = db.getActorsCollection();
    const result = await collection.actorsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return null;
    }
  }
}
