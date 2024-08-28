import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  token: String,
  history: [String],
});

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;
