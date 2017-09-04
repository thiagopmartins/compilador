const Log = require('./Log.js');

let logger;

const tokenTypes = [
    { regex: /^\s+/, tokenType: 'WHITESPACE' },
    { regex: /^[{}]/, tokenType: 'BRACE' },
    { regex: /^[\[\]]/, tokenType: 'BRACKET' },
    { regex: /^:/, tokenType: 'COLON' },
    { regex: /^,/, tokenType: 'COMMA' },
    { regex: /^-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i, tokenType: 'NUMBER_LITERAL' },
    { regex: /^"(?:\\.|[^"])*"(?=:)/, tokenType: 'STRING_KEY'},
    { regex: /^"(?:\\.|[^"])*"/, tokenType: 'STRING_LITERAL'},
    { regex: /^true|false/, tokenType: 'BOOLEAN_LITERAL' },
    { regex: /^null/, tokenType: 'NULL' }
  ];

class Analisador{
    analiseLexica(conteudo){
        logger = new Log();
        logger.escreve = 'Analisando...';
        var input = JSON.stringify(conteudo);
        
        var tokens = [];
        var foundToken = false;
    
        var match;
        var i;
        var numTokenTypes = tokenTypes.length;
    
        do {
            for (i = 0; i < numTokenTypes; i++) {
                
                match = tokenTypes[i].regex.exec(input);
                console.log(tokenTypes[i]);
                if (match) {
                    
                    tokens.push({ type: tokenTypes[i].tokenType, value: match[0] });
                    input = input.substring(match[0].length);
                    foundToken = true;
                    break;
                } 
            }
        } while (input.length > 0 && foundToken);
    
        console.log(tokens);          
    }
}
module.exports = Analisador;