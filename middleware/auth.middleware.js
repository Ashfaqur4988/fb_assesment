import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  try {
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verify(accessToken, process.env.SECRET, async (err, payload) => {
      if (err) return res.status(403).json({ error: "Token not valid" });
      req.userId = payload.id;
      // console.log(req.userId);
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
