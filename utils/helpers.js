export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const calculateNights = (checkIn, checkOut) => {
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const generateJourneyId = () => {
  return "CMP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, limit) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

export const getSeason = (date) => {
  const month = new Date(date).getMonth() + 1;

  if ([12, 1, 2].includes(month)) return "winter";
  if ([3, 4, 5].includes(month)) return "summer";
  if ([6, 7, 8].includes(month)) return "monsoon";
  return "autumn";
};

export const calculateAverageRating = (reviews) => {
  if (!reviews.length) return 0;

  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (total / reviews.length).toFixed(1);
};