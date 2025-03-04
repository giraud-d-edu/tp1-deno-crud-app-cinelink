import { objectId } from 'https://deno.land/x/mongo@v0.34.0/mod.ts';

export class ActorDbos {
    _id: objectId;
    id: string;
    name: string;
    birthday: Date;
    country: string;
    age : number;
}
