import Journey from "../models/Journey.js";
import Campsite from "../models/Campsite.js";
import { getDemandMultiplier } from "../utils/pricing.js";
import { calculatePrice } from "../services/pricingService.js";
import { checkAvailability } from "../services/availabilityService.js";
import { generateJourneyId } from "../utils/helpers.js";

export const createJourney = async (req, res) => {
  try {
    const { campsite, checkIn, checkOut, personCount, coupon } = req.body;

    const userId = req.user.id;

    const available = await checkAvailability(campsite, checkIn, checkOut);

    if (!available) {
      return res.status(400).json({ message: "Campsite not available on the selected dates" });
    }

    const camp = await Campsite.findById(campsite);

    if (!camp) {
      return res.status(404).json({ message: "Campsite not found" });
    }
    
    const campsiteData = await Campsite.findById(campsite);

    const demandMultiplier = await getDemandMultiplier(campsite, checkIn);

    const totalPrice = calculatePrice({
      price: campsiteData.price * demandMultiplier,
      checkIn,
      checkOut,
      personCount,
      coupon,
    });

    const journey = new Journey({
      user: userId,
      campsite,
      journeyId: generateJourneyId(),
      checkIn,
      checkOut,
      personCount,
      totalPrice,
    });

    await journey.save();

    res.status(201).json(journey);
  } catch (error) {
    console.error("Error creating journey:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().populate("user").populate("campsite");

    res.status(200).json(journeys);
  } catch (error) {
    console.error("Error fetching journeys:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id)
      .populate("user")
      .populate("campsite");

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    res.status(200).json(journey);
  } catch (error) {
    console.error("Error fetching journey:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    const { campsite, checkIn, checkOut, personCount, paymentStatus, status } =
      req.body;

    journey.campsite = campsite || journey.campsite;
    journey.checkIn = checkIn || journey.checkIn;
    journey.checkOut = checkOut || journey.checkOut;
    journey.personCount = personCount || journey.personCount;
    journey.paymentStatus = paymentStatus || journey.paymentStatus;
    journey.status = status || journey.status;

    await journey.save();

    res.status(200).json(journey);
  } catch (error) {
    console.error("Journey update error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    await Journey.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Journey deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};
