import { MongoClient } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

class Database {
  private client: MongoClient;
  private db: any;

  constructor() {
    this.client = new MongoClient();
  }

  async connect() {
    try {
      await this.client.connect("mongodb://127.0.0.1:27017");
      this.db = this.client.database("cinelink");
      console.log("Connexion réussie à MongoDB !");
    } catch (error) {

      console.error("Échec de la connexion à MongoDB :", error);
      throw new Error("Connexion à la base de données échouée");
    }
  }

  getActorsCollection() {
    return this.db.collection<actor>("actors");
  }

  getMoviesCollection() {
    return this.db.collection<movie>("movies");
  }

  getRatingsCollection() {
    return this.db.collection<rating>("ratings");
  }
}

export const db = new Database();
