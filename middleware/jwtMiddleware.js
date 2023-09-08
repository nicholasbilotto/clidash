import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
	// console.log("JWT middleware invoked"); // Debugging line
	// console.log("Headers:", req.headers); // Debugging line

	const token = req.header("x-auth-token");
	// console.log("Token:", token); // Debugging line

	if (!token)
		return res.status(401).json({ msg: "No token, authorization denied" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log("Decoded:", decoded); // Debugging line

		req.user = decoded;
		next();
	} catch (e) {
		// console.log("JWT verification error:", e); // Debugging line
		res.status(400).json({ msg: "Token is not valid" });
	}
};

export default jwtMiddleware;
