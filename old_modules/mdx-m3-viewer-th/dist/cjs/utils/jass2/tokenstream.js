"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typecast_1 = require("../../common/typecast");
class TokenStream {
    constructor(buffer) {
        this.buffer = buffer;
        this.index = 0;
    }
    read() {
        const buffer = this.buffer;
        const length = buffer.length;
        let inComment = false;
        let inString = false;
        let inIdString = false;
        let token = '';
        while (this.index < length) {
            const c = buffer[this.index++];
            if (inComment) {
                if (c === '\n') {
                    inComment = false;
                    this.index--;
                }
            }
            else if (inString) {
                if (c === '\\') {
                    token += c + buffer[this.index++];
                }
                else if (c === '\n') {
                    token += '\\n';
                }
                else if (c === '\r') {
                    token += '\\r';
                }
                else {
                    token += c;
                }
                if (c === '"') {
                    return token;
                }
            }
            else if (inIdString) {
                token += c;
                if (c === "'") {
                    return token;
                }
            }
            else if (c === ' ' || c === '\t') {
                if (token.length) {
                    return token;
                }
            }
            else if (c === '(' || c === ')' || c === '[' || c === ']' || c === '=' || c === '\r' || c === '\n' || c === ',' || c === '!' || c === '-' || c === '<' || c === '>' || c === '+' || c === '*' || c === '/') {
                if (token.length) {
                    this.index--;
                    return token;
                }
                else {
                    const c2 = buffer[this.index];
                    if (c === '=' && c2 === '=') {
                        this.index++;
                        return '==';
                    }
                    else if (c === '\r') {
                        if (c2 === '\n') {
                            this.index++;
                        }
                        return '\n';
                    }
                    else if (c === '!' && c2 === '=') {
                        this.index++;
                        return '!=';
                    }
                    else if (c === '/' && c2 === '/') {
                        if (token.length) {
                            this.index--;
                            return token;
                        }
                        else {
                            inComment = true;
                        }
                    }
                    else {
                        return c;
                    }
                }
            }
            else if (c === '"') {
                if (token.length) {
                    this.index--;
                    return token;
                }
                else {
                    token += c;
                    inString = true;
                }
            }
            else if (c === "'") {
                if (token.length) {
                    this.index--;
                    return token;
                }
                else {
                    token += c;
                    inIdString = true;
                }
            }
            else {
                token += c;
            }
            if (this.index === length) {
                return token;
            }
        }
        return;
    }
    /**
     * Reads the next token without advancing the stream.
     */
    peek() {
        const index = this.index;
        const value = this.read();
        this.index = index;
        return value;
    }
    readSafe() {
        const token = this.read();
        if (token === undefined) {
            throw new Error('Premature end of stream reached');
        }
        if (token === 'null') {
            return 'nil';
        }
        else if (token === '!=') {
            return '~=';
        }
        else if (token[0] === "'") {
            return `${typecast_1.stringToBase256(token.slice(1, token.indexOf("'", 1)))}`;
        }
        else if (token === 'break' || token === 'do' || token === 'end' || token === 'for' || token === 'goto' || token === 'in' || token === 'nil' || token === 'repeat' || token === 'until' || token === 'while') { // Lua reserved keywords
            return token + '_';
        }
        else if (token === 'and' || token === 'or') {
            return ' ' + token + ' ';
        }
        else if (token[0] === '$') {
            return '0x' + token.slice(1);
        }
        return token;
    }
    readUntil(delimiter) {
        let tokens = '';
        let token;
        while ((token = this.readSafe()) !== delimiter) {
            tokens += token;
        }
        return tokens;
    }
}
exports.default = TokenStream;
//# sourceMappingURL=tokenstream.js.map