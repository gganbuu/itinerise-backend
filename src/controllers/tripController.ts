import type { Request, Response } from "express";
import { prisma } from "../db/db.ts" 

export async function newActivityPost(req: Request, res: Response) {
    const { name, category, location, duration, startTime, cost, description } = req.body;
    const durationMinutes = Number(duration) * 60 
    const tripId = Number(req.params.id);

    const newActivity = await prisma.activity.create({
        data: {
            tripId,
            name,
            category,
            location,
            durationMinutes,
            startTime,
            cost,
            description
        }
    });

    res.status(201).json(newActivity)
}

export async function activitiesGet(req: Request, res: Response) {
    const tripId = Number(req.params.id)
    
    const allActivities = await prisma.activity.findMany({
        where: {tripId: tripId}
    })

    res.status(200).json(allActivities)
}

export async function tripGet(req: Request, res: Response) {
    // get id from params
    const id = Number(req.params.id)
    
    // check if number is integer
    if (!Number.isInteger(id)) {
        res.status(400).json({ error: "Invalid trip id"})
        return
    }

    const trip = await prisma.trip.findUnique({
        where: { id },
        include: {
            activities: {
                orderBy: {startTime: { sort: "asc", nulls: "last"} },
            },
        },
    });

    if (!trip) {
        res.status(404).json({ error: "Trip not found"});
        return
    }
    
    res.status(200).json(trip)
}