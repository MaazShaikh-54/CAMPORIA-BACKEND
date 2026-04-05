import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { user, campsite, rating, comment, createdAt, journey } = req.body;

    const review = new Review({
      user,
      campsite,
      rating,
      comment,
      createdAt,
      journey,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).json({ message: "Could not create review" });
  }
};

export const getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).json({ message: "Could not fetch reviews" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.remove();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error({ message: error.message });
    res.status(500).json({ message: "Could not delete review" });
  }
};
