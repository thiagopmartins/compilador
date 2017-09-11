
const Analisador = require('./Analisador.js');
const tokens = [
    {regex: /([+]{2})(\d*)/,value: '++'},
    {regex: /([=]{2})(\d*)/,value: '=='},
    {regex: /([!=]{1})(\d*)/,value: '!='},
    {regex: /([+]{1})(\d*)/,value: '+'},
    {regex: /([-]{1})(\d*)/,value: '-'},
    {regex: /([*]{1})(\d*)/,value: '*'},
    {regex: /([/]{1})(\d*)/,value: '/'},
    {regex: /([%]{1})(\d*)/,value: '%'},
    {regex: /([=]{1})(\d*)/,value: '='},
    {regex: />/},
    {regex: /</},
    {regex: />=/},
    {regex: /<=/},
    {regex: /&&/},
    {regex: /^([||]{2})$/},
    {regex: /\b"\b/}
];
//'+, -, *, /, %, =, ==, !=, >, <, >=, <=, &&, ||, ", *=, /=, +=, -=, &, |, ++, --, ?, :'
class Operadores{
    static get token(){
        return tokens;
    }
    static valores(str){
        let string = [];
        for(let i = 0; i < Operadores.token.length; i++){
            let reg = Operadores.token[i].regex;
            for (let key in str) {
                if(reg.test(str[key])){
                    string.push(Operadores.token[i].value);
                    str[key] = str[key].replace(Operadores.token[i].value,' ');
                }
            }            
        }
        Analisador.conteudoStr = str;
        return string;        
    }
}
module.exports = Operadores;