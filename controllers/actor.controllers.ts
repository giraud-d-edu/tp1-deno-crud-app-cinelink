import {ActorService} from '../services/actor.services.ts';
const actorService = new ActorService();


export class ActorController {

    static getAllActors(ctx: Context) {
        ctx.response.body = actorService.getAllActors();
    }

    static getActorById(ctx: Context) {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "ID invalide" };
                return;
              }
            const actor = actorService.getActorById(id);
            if (!actor) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = actor;
    }

    static async createActor(ctx: Context) {
        try {
            const body = await ctx.request.body.json();
            const actor = actorService.createActor(body);
            ctx.response.status = 201;
            ctx.response.body = actor;
        } catch (error) {
            ctx.response.status = 400;
            ctx.response.body = { message: error.message };
        }
    }

    static async updateActor(ctx: Context) {
        try {
            const id = Number(ctx.params.id);

            if (isNaN(id)) {
                ctx.status = 400;
                ctx.body = { message: "ID invalide" };
                return;
            }
            const existingActor = actorService.getActorById(id);
            if (!existingActor) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            const body = await ctx.request.body.json();
            const actor = actorService.updateActor(id, body);

            if (!actor) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = actor;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }

    static deleteActor(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400;
                ctx.response.body = { message: "ID invalide" };
                return;
            }
            const deleted = actorService.deleteActor(id);
            if (!deleted) {
                ctx.response.status = 404;
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            ctx.response.status = 200;
            ctx.response.body = { message: "Actor deleted successfully" };
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = { message: error.message };
        }
    }
}