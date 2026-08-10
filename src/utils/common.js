import jsonwebtoken from "jsonwebtoken";

export const getUserFromToken = (req) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) throw new Error("User not authorized");

    const token = authHeader.split(' ')[1];
    const verifiedUser = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return verifiedUser;

}