import {ActorService} from '../services/actor.services.ts';
import {ActorDTO} from '../dtos/actor.dto.ts';
const actorService = new ActorService();


export class ActorController {

    static getAllActors(ctx: Context) {
        ctx.response.body = actorService.getAllActors();
    }

    static getActorById(ctx: Context) {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400; // Retourne un code 400 si l'ID est invalide
                ctx.response.body = { message: "ID invalide" };
                return;
              }
            const actor = actorService.getActorById(id);
            if (!actor) {
                ctx.response.status = 404; // Retourne un code 404 si l'acteur n'est pas trouvé
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = actor;
    }

    static async createActor(ctx: Context) {
        try {
            const body = await ctx.request.body.json();
    
            // Vérification des champs requis
            if (!body.name || typeof body.name !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: 'name' is required and should be a string" };
                return;
            }
    
            if (!body.birthday || typeof body.birthday !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: 'birthday' is required and should be a string" };
                return;
            }
    
            if (!body.country || typeof body.country !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: 'country' is required and should be a string" };
                return;
            }
    
            // Création de l'acteur
            const actor = actorService.createActor(body);
            ctx.response.status = 201; // Retourne un code 201 si l'acteur est créé
            ctx.response.body = actor;
        } catch (error) {
            ctx.response.status = 400; // Retourne un code 400 si l'acteur n'est pas créé
            ctx.response.body = { message: error.message };
        }
    }
    
    static async updateActor(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
    
            if (isNaN(id)) {
                ctx.status = 400; // Retourne un code 400 si l'ID est invalide
                ctx.body = { message: "ID invalide" };
                return;
            }
    
            const existingActor = actorService.getActorById(id);
            if (!existingActor) {
                ctx.response.status = 404; // Retourne un code 404 si l'acteur n'est pas trouvé
                ctx.response.body = { message: "Actor not found" };
                return;
            }
    
            const body = await ctx.request.body.json();
    
            // Vérification des champs requis pour la mise à jour
            if (!body.name || typeof body.name !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: 'name' is required and should be a string" };
                return;
            }
    
            if (!body.birthday || typeof body.birthday !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: 'birthday' is required and should be a string" };
                return;
            }
    
            if (!body.country || typeof body.country !== 'string') {
                ctx.response.status = 400;
                ctx.response.body = { message: "Invalid data: 'country' is required and should be a string" };
                return;
            }
            const actor = actorService.updateActor(id, body);
            if (!actor) {
                ctx.response.status = 404; // Retourne un code 404 si l'acteur n'est pas trouvé
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = actor;
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }

    static deleteActor(ctx: Context) {
        try {
            const id = Number(ctx.params.id);
            if (isNaN(id)) {
                ctx.response.status = 400; // Retourne un code 400 si l'ID est invalide
                ctx.response.body = { message: "ID invalide" };
                return;
            }
            const deleted = actorService.deleteActor(id);
            if (!deleted) {
                ctx.response.status = 404; // Retourne un code 404 si l'acteur n'est pas trouvé
                ctx.response.body = { message: "Actor not found" };
                return;
            }
            ctx.response.status = 200; // Retourne un code 200 en cas de succès
            ctx.response.body = { message: "Actor deleted successfully" };
        } catch (error) {
            ctx.response.status = 500; // Retourne un code 500 en cas d'erreur
            ctx.response.body = { message: error.message };
        }
    }
}