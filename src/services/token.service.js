const tokens = {};

let tokenTime = null;

function gerarToken() {
    const token = Math.floor(100000 + Math.random() * 900000); 
    tokenTime = Date.now(); 
    tokens[0] = token;
    return token.toString();
}

function verificarToken(token) {
    const storedToken = tokens[0]; 
    
    if (storedToken !== parseInt(token)) {
        return { valid: false, message: "Invalid token!" };
    }

    const currentTime = Date.now();
    const elapsedTime = (currentTime - tokenTime) / 1000 / 60;

    if (elapsedTime > 1) {
        delete tokens[0]; 
        return { valid: false, message: "Expired token!" };
    } else {
        return { valid: true, message: "Valid token!" };
    }
}


export default {
    gerarToken,
    verificarToken
};
