const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category field is required"],
      unique: [true, "category already exist in the collection"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
