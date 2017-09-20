const Analisador = require('./Analisador.js');
const tokens = [
    {regex: /\w/,value: ''}
];
class Outros{
    static get token(){
        return tokens;
    }
    static valores(str){
        let string = [];
        for(let i = 0; i < this.token.length; i++){
            let reg = this.token[i].regex;
            let tot = 0;
            for (let key in str) {
                
                while(reg.test(str[key])){
                    let stringOld = str[key];

                    string.push('\n' + stringOld );
                    tot ++;
                }              
            }    
                              
        }
        Analisador.conteudoStr = str;
        return string;        
    }
}
module.exports = Outros;