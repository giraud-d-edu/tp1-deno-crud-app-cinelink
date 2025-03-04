
import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { ActorController } from "./controllers/actor.controllers.ts";
import { MovieController } from "./controllers/movie.controllers.ts";
import { RatingController } from "./controllers/rating.controllers.ts";
import { loggingMiddleware } from "./middleware/logging.middleware.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { actor } from "./models/actors.models.ts";
import { movie } from "./models/movies.models.ts";
import { rating } from "./models/ratings.models.ts";
import { db} from "./db.ts";


const app = new Application();
const router = new Router();
const client = new MongoClient();


router.get("/actors", ActorController.getAllActors);
router.get("/actors/:id", ActorController.getActorById);
router.post("/actors", ActorController.createActor);
router.put("/actors/:id", ActorController.updateActor);
router.delete("/actors/:id", ActorController.deleteActor);

router.get("/movies", MovieController.getAllMovies);
router.get("/movies/:id", MovieController.getMovieById);
router.post("/movies", MovieController.createMovie);
router.put("/movies/:id", MovieController.updateMovie);
router.delete("/movies/:id", MovieController.deleteMovie);

router.get("/ratings", RatingController.getAllRatings);
router.get("/ratings/:id", RatingController.getRatingById);
router.post("/ratings", RatingController.createRating);
router.put("/ratings/:id", RatingController.updateRating);
router.delete("/ratings/:id", RatingController.deleteRating);


app.use(router.routes());
app.use(router.allowedMethods());
app.use(loggingMiddleware);
await db.connect();
console.log("Serveur démarré sur http://localhost:8000");
await app.listen({ port: 8000 });