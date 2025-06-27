import { timestamp } from 'drizzle-orm/gel-core';
import {pgTable, serial, text , integer} from 'drizzle-orm/pg-core';

 export const favoritesTable = pgTable("favorites", {
    id: serial("id").primaryKey(), 
   userId: text("user_id").notNull(),
   recipeId: integer("recipe_id").notNull(),      
   title: text("title").notNull(),
   Image: text("image"),
   cookTime: text("cook_time"),
   createdAt: timestamp("created_at").default(),

})
