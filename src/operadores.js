
const Analisador = require('./Analisador.js');
const tokens = [
    {regex: /([!=]{1})(\d*)/,value: '!='},
    {regex: /([<=]{1})(\d*)/,value: '<='},
    {regex: /([>=]{1})(\d*)/,value: '>='},
    {regex: /([*=]{1})(\d*)/,value: '*='},
    {regex: /([/=]{1})(\d*)/,value: '/='},
    {regex: /([&]{2})(\d*)/,value: '&&'},
    {regex: /([|]{2})(\d*)/,value: '||'},
    {regex: /([+]{2})(\d*)/,value: '++'},
    {regex: /([-]{2})(\d*)/,value: '--'},
    {regex: /([=]{2})(\d*)/,value: '=='},
    {regex: /([&]{1})(\d*)/,value: '&'},
    {regex: /([|]{1})(\d*)/,value: '|'},
    {regex: /([:]{1})(\d*)/,value: ':'},
    {regex: /([?]{1})(\d*)/,value: '?'},
    {regex: /([+]{1})(\d*)/,value: '+'},
    {regex: /([-]{1})(\d*)/,value: '-'},
    {regex: /([*]{1})(\d*)/,value: '*'},
    {regex: /([/]{1})(\d*)/,value: '/'},
    {regex: /([%]{1})(\d*)/,value: '%'},
    {regex: /([=]{1})(\d*)/,value: '='},
    {regex: /([>]{1})(\d*)/,value: '>'},
    {regex: /([<]{1})(\d*)/,value: '<'},
    {regex: /(["]{1})(\d*)/,value: '"'}
];
class Operadores{
    static get token(){
        return tokens;
    }
    static valores(str){
        let string = [];
        for(let i = 0; i < Operadores.token.length; i++){
            let reg = Operadores.token[i].regex;
            for (let key in str) {
                let error = false;
                while(reg.test(str[key]) && error == false){
                    let stringOld = str[key];

                    str[key] = str[key].replace(Operadores.token[i].value,' ');
                    if(str[key] == stringOld){
                        error = true;
                        str[key] = stringOld;
                    }
                    else
                        string.push(Operadores.token[i].value);
                }
            }            
        }
        Analisador.conteudoStr = str;
        return string;        
    }
}
module.exports = Operadores;