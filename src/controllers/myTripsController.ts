import type { Request, Response} from "express";
import { prisma } from "../db/db.ts";
import { parsePlainDate } from "../helper/parsePlainDate.ts";
import { Temporal } from "temporal-polyfill";

export async function allTripsGet(req: Request, res: Response) {
    const trips = await prisma.trip.findMany()
    res.json(trips)
}

export async function newTripPost(req: Request, res: Response) {
    const { name, destination , startDate, endDate } = req.body;
    
    if (typeof name !== "string" || typeof destination !== "string" ||
        typeof startDate !== "string" || typeof endDate !== "string") {
        res.status(400).json({ error: "name, destination, startDate and endDate are required strings" })
        return
    }

    //check dates
    const start = parsePlainDate(startDate)
    const end = parsePlainDate(endDate)

    if (!start || !end) {
        res.status(400).json({ error: "Invalid start or end date" })
        return
    }
    if (Temporal.PlainDate.compare(end, start) < 0) {
        res.status(400).json({ error: "End date can't be before the start date" })
        return
    }

    const newTrip = await prisma.trip.create({
        data: {
            name,
            destination,
            startDate: new Date(start.toString()),
            endDate: new Date(end.toString()),
        }
    });

    res.status(201).json(newTrip);
}

export async function tripDelete(req: Request, res: Response) {
    const tripId = Number(req.params.id)

    const result = await prisma.trip.deleteMany({
        where: {id: tripId}
    })

    res.status(204).end()
}