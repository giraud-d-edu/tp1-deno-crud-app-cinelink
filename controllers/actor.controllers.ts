import {ActorService} from '../services/actor.service';

const actorService = new ActorService();


export class ActorController {

    static getAllActors(ctx: Context) {
        try {
            const actors = actorService.getAllActors();
            ctx.response.status = 200;
            ctx.body = actors;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static getActorById(ctx: Context) {
        try {
            const actor = actorService.getActorById(Number(ctx.params.id));
            ctx.response.status = 200;
            ctx.body = actor;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static createActor(ctx: Context) {
        try {
            const actor = actorService.createActor(ctx.request.body);
            ctx.response.status = 201;
            ctx.body = actor;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static updateActor(ctx: Context) {
        try {
            const actor = actorService.updateActor(Number(ctx.params.id), ctx.request.body);
            ctx.response.status = 200;
            ctx.body = actor;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }

    static deleteActor(ctx : Context) {
        try {
            actorService.deleteActor(Number(ctx.params.id));
            ctx.response.status = 204;
        } catch (error) {
            ctx.response.status = 500;
            ctx.body = error.message;
        }
    }
}