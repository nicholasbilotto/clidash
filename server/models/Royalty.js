import mongoose from "mongoose";

const RoyaltySchema = new mongoose.Schema(
	{
		Licensor: String,
		Licensee: String,
		Active: String,
		Category: String,
		Publication: String,
		JANUARY: Number,
		FEBRUARY: Number,
		MARCH: Number,
		APRIL: Number,
		MAY: Number,
		JUNE: Number,
		JULY: Number,
		AUGUST: Number,
		SEPTEMBER: Number,
		OCTOBER: Number,
		NOVEMBER: Number,
		DECEMBER: Number,
		TOTAL: Number,
		Year: String,
		Notes: String,
	},
	{ timestamps: true }
);

const Royalty = mongoose.model("Royalty", RoyaltySchema);
export default Royalty;
