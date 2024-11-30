import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};
