import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
	{
		Licensor: String,
		Licensee: String,
		Status: String,
		FileLink: String,
		Contract: String,
		WorkNotes: String,
		EffectiveDate: String,
		Term: String,
		Termination: String,
		TerminationDate: String,
		AlertDate: String,
		Advance: String,
		Royalty: String,
		PaymentTerms: String,
		Titles: Array,
		LastActive: String,
		Billed: String,
		BillingDate: String,
		AmendmentInfo: String,
		Amendment: String,
		OriginalContractDate: String,
		Contract: String,
		Email: String,
		Phone: String,
		AdditionalNotes: String,
	},
	{ timestamps: true }
);

const Contract = mongoose.model("Contract", ContractSchema);
export default Contract;
