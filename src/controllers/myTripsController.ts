import type { Request, Response} from "express";
import { prisma } from "../db/db.ts";

export async function allTripsGet(req: Request, res: Response) {
    const trips = await prisma.trip.findMany()
    res.json(trips)
}

export async function newTripPost(req: Request, res: Response) {
    const { name, destination , startDate, endDate } = req.body;
    
    const newTrip = await prisma.trip.create({
        data: {
            name,
            destination,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        }
    });

    res.status(201).json(newTrip);
}