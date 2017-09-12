
const Analisador = require('./Analisador.js');
const tokens = [
    {regex: /([(]{1})(\d*)/,value: '('},
    {regex: /([)]{1})(\d*)/,value: ')'},
    {regex: /([;]{1})(\d*)/,value: ';'},
    {regex: /([\[]{1})(\d*)/,value: '['},
    {regex: /([\]]{1})(\d*)/,value: ']'},
    {regex: /([{]{1})(\d*)/,value: '{'},
    {regex: /([}]{1})(\d*)/,value: '}'},
    {regex: /(["]{1})(\d*)/,value: '"'},
    {regex: /([']{1})(\d*)/,value: '\''},
    {regex: /([.]{1})(\d*)/,value: '.'},
    {regex: /([,]{1})(\d*)/,value: ','},
    {regex: /([/]{2})(\d*)/,value: '//'},
    {regex: /([/*]{1})(\d*)/,value: '/*'},
    {regex: /([*/]{1})(\d*)/,value: '*/'}
];
class Delimitadores{
    static get token(){
        return tokens;
    }
    static valores(str){
        let string = [];
        for(let i = 0; i < this.token.length; i++){
            let reg = this.token[i].regex;
            let tot = 0;
            for (let key in str) {
                let error = false;
                
                while(reg.test(str[key]) && error == false){
                    let stringOld = str[key];

                    str[key] = str[key].replace(this.token[i].value,' ');
                    if(str[key] == stringOld){
                        error = true;
                        str[key] = stringOld;
                    }
                    else
                        tot ++;
                }              
            }    
            if(tot > 0){
                string.push('\n' + this.token[i].value + ' ' + tot + 'x' );
            }                      
        }
        Analisador.conteudoStr = str;
        return string;        
    }
}
module.exports = Delimitadores;