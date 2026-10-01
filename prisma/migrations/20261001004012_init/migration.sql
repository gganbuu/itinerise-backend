-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3),
    "cost" DECIMAL(10,2),
    "description" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_email_key" ON "Trip"("email");

-- CreateIndex
CREATE INDEX "Activity_tripId_idx" ON "Activity"("tripId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- AddCheckConstraint (hand-written: Prisma schema can't express CHECK constraints)
ALTER TABLE "Trip"
  ADD CONSTRAINT "Trip_endDate_after_startDate" CHECK ("endDate" >= "startDate");
