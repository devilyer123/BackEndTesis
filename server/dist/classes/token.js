"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
class Token {
    static comprobarToken(userToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = Token;
Token.seed = 'seed-de-app-secreto';
//# sourceMappingURL=token.js.map