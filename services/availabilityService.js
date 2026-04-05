import Journey from "../models/Journey.js";

export const checkAvailability = async (campsiteId, checkIn, checkOut) => {
  const journeys = await Journey.find({
    campsite: campsiteId,
    $or: [
      {
        checkIn: { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn) },
      },
    ],
  });

  return journeys.length === 0;
};