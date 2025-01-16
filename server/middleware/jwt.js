import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).send("Unauthorized!!");
    return;
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      res.status(403).send("Forbidden!!");
      return;
    }
    req.userId = payload.id;
    next();
  });
};
