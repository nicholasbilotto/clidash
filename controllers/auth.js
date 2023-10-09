import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not found" });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.status(200).json({ result: user, token });
	} catch (error) {
		res.status(500).json({ message: "AHHHH IDK " });
	}
};
