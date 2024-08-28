import SearchHistory from "../models/searchHistory.js";
export const pushInDB = async (req, searchQuery, next) => {
  try {
    const searchHistory = await SearchHistory.findOne({ token: req.token });

    if (searchHistory) {
      searchHistory.history.push(searchQuery);
      await searchHistory.save();
    }
  } catch (err) {
    next(err);
  }
};
