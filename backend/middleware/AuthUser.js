import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ Error: "No token provided" });
    }
    
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ Error: "Failed to authenticate token" });
        }
        req.userId = decoded.id;
        req.nama_user = decoded.nama_user;
        req.role = decoded.role;
        next();
    });
}
