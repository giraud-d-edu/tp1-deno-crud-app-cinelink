import { objectId } from 'https://deno.land/x/mongo@v0.34.0/mod.ts';


export class ActorDbos {
  _id: ObjectId;
  id: string;
  name: string;
  birthday: string;
  country: string;
  age: number;

  constructor(actor: {
    _id: ObjectId;
    name: string;
    birthday: string;
    country: string;
    age: number;
  }) {
    this._id = actor._id;
    this.id = actor._id.toString();
    this.name = actor.name;
    this.birthday = actor.birthday;
    this.country = actor.country;
    this.age = actor.age;
  }
}
