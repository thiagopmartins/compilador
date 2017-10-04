const Analisador = require('./AnalisadorLexico.js');
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
            for (let key in str) {
                while(reg.test(str[key])){
                    let stringOld = str[key];
                    console.log('Valor: ', stringOld.length());
                    string.push('\n' + stringOld );
                }              
            }    
                              
        }
        Analisador.conteudoStr = str;
        return string;        
    }
}
module.exports = Outros;