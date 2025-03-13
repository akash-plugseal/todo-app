const JWT = require('jsonwebtoken');

const Authenticated = (req, res, next) => {
    // const authHeader = req.header('Authorization') || req.header('authorization') || req.headers('Authorization');
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = { Authenticated }