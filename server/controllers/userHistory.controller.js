import SearchHistory from "../models/searchHistory.js";
export const getSearchHistory = async (req, res, next) => {
  const searchHistory = await SearchHistory.findOne({ token: req.token });

  try {
    if (searchHistory) {
      res.send({ history: searchHistory.history });
    } else {
      res.send({ history: [] });
    }
  } catch (err) {
    next(err);
  }
};
