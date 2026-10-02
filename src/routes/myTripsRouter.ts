import { Router } from "express";
import * as myTripsController from "../controllers/myTripsController.ts";

export const myTripsRouter = Router();

myTripsRouter.get("/all", myTripsController.allTripsGet)

myTripsRouter.post("/newtrip", myTripsController.newTripPost)

