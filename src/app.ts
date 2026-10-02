import express, { type NextFunction, type Request, type Response } from "express";
import session from "express-session";
import { myTripsRouter } from "./routes/myTripsRouter.ts";
import { tripRouter } from "./routes/tripRouter.ts";

export const app = express()
const cookieSecret = process.env.COOKIE_SECRET;
if (!cookieSecret) throw new Error("COOKIE_SECRET is not set");


app.use(express.json());

app.use(
    session({
        secret: cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, maxAge: 100 * 60 * 60 * 24}
    })
)

app.use("/api/mytrips", myTripsRouter);

app.use("/api/trip", tripRouter)


// error handling
app.use((req: Request, res: Response) => {
    res.status(404).json({error: "Not found"});
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

