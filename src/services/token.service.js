const tokens = {};
const tokenTimes = {};

function generateToken(userId) {
    const token = Math.floor(100000 + Math.random() * 900000);
    tokenTimes[userId] = Date.now(); 
    tokens[userId] = token;
    return token.toString();
}

function verifyToken(userId, token) {
    const storedToken = tokens[userId];

    if (storedToken === undefined) {
        return { valid: false, message: "No token found for this user!" };
    }

    if (storedToken !== parseInt(token)) {
        return { valid: false, message: "Invalid token!" };
    }

    const currentTime = Date.now();
    const elapsedTime = (currentTime - tokenTimes[userId]) / 1000 / 60;

    if (elapsedTime > 10) {
        delete tokens[userId];
        delete tokenTimes[userId];
        return { valid: false, message: "Expired token!" };
    } else {
        return { valid: true, message: "Valid token!" };
    }
}

export default {
    generateToken,
    verifyToken
};
