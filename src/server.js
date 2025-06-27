import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { json } from "drizzle-orm/gel-core";
import { and, eq } from "drizzle-orm";
import Job from "./config/corn.js";


const app = express();
const PORT = ENV.PORT || 5001;

 if(ENV.NODE_ENV === "production") Job.start();

 
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime } = req.body;
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing require field!" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
      })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.log("Error adding favorites ", error);
    res.status(500).json({ error: "Sometnig went wrong" });
  }
});

app.get("/api/favorites/:userId/", async (req, res) => {
  try {
    const { userId } = req.params;

 const userFavorites  =  await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

      res.status(200).json(userFavorites)
  } 
  
  catch (error) {
    console.log("Error faching favorite", error);
    res.status(500).json({ error: "Something was wrong" });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, parseInt(recipeId))
        )
      );
    res.status(200).json({ massage: "Favorite Remove Successfully" });
  } catch (error) {
    console.log("Error removing favorites!", error);
    res.status(200).json({ error: "Something was wrong!" });
  }
});

app.listen(5001, () => {
  console.log("server runing port:", PORT);
});
