import { Router } from "express";
// import * as myTripsController from "../controllers/myTripsController.ts";
import * as tripController from "../controllers/tripController.ts"

export const tripRouter = Router();

tripRouter.get("/:id", tripController.tripGet)

tripRouter.post('/:id/newactivity', tripController.newActivityPost)

tripRouter.get('/:id/allactivities', tripController.activitiesGet)  