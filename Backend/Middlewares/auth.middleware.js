import jwt from "jsonwebtoken";
import StudentUser from "../Models/user.model.js";

const authenticateToken = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header is missing" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing. Login required!" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the matching token
    const user = await StudentUser.findOne({ _id: decoded.userId, token });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token. Access denied!" });
    }

    // Attach user data to the request for further processing
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please login again!" });
    }
    console.error("Error in authenticateToken middleware:", error);
    return res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
  }
};

export default authenticateToken;
