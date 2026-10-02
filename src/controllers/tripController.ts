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
    const id = Number(req.params.id)
    const trip = await prisma.trip.findUnique({
        where: {id: id}
    })
    res.status(200).json(trip)
}