import Campsite from "../models/Campsite.js";

export const createCampsite = async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      description,
      imageUrl,
      feature,
      amenities,
      campsiteType,
      campsiteSize,
      capacity,
      isAvailable,
    } = req.body;

    if (!name || !location || !price || !description) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const campsite = new Campsite({
      name,
      location,
      price,
      description,
      imageUrl,
      feature,
      amenities,
      campsiteType,
      campsiteSize,
      capacity,
      isAvailable,
    });

    await campsite.save();
    res.status(201).json(campsite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create campsite" });
  }
};

export const getCampsites = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    let filter = {};

    if (location) filter.location = location;
    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    const campsites = await Campsite.find(filter);

    res.status(200).json(campsites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCampsiteById = async (req, res) => {
  try {
    const campsite = await Campsite.findById(req.params.id);

    if (!campsite) {
      return res.status(404).json({ message: "Campsite not found" });
    }

    res.status(200).json(campsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCampsite = async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      description,
      imageUrl,
      feature,
      amenities,
      campsiteType,
      campsiteSize,
      capacity,
      isAvailable,
    } = req.body;

    const campsite = await Campsite.findById(req.params.id);

    if (!campsite) {
      return res.status(404).json({ message: "Campsite not found" });
    }
    campsite.name = name || campsite.name;
    campsite.location = location || campsite.location;
    campsite.price = price || campsite.price;
    campsite.description = description || campsite.description;
    campsite.imageUrl = imageUrl || campsite.imageUrl;
    campsite.feature = feature || campsite.feature;
    campsite.amenities = amenities || campsite.amenities;
    campsite.campsiteType = campsiteType || campsite.campsiteType;
    campsite.campsiteSize = campsiteSize || campsite.campsiteSize;
    campsite.capacity = capacity || campsite.capacity;
    campsite.isAvailable =
      isAvailable !== undefined ? isAvailable : campsite.isAvailable;

    await campsite.save();
    res.status(200).json(campsite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update campsite" });
  }
};

export const deleteCampsite = async (req, res) => {
  try {
    const campsite = await Campsite.findById(req.params.id);

    if (!campsite) {
      return res.status(404).json({ message: "Campsite not found" });
    }

    await Campsite.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Campsite deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete campsite" });
  }
};
