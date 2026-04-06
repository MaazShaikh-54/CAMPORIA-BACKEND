import Journey from "../models/Journey.js";

export const getDemandMultiplier = async (campsiteId, checkIn) => {
  const journeys = await Journey.countDocuments({
    campsite: campsiteId,
    checkIn: { $gte: new Date(checkIn) },
  });

  if (journeys > 10) return 1.5;
  if (journeys > 5) return 1.2;

  return 1;
};