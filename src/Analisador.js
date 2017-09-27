const Log = require('./Log.js');
const Editor = require('./Editor.js');
const Operadores = require('./Operadores.js');
const Delimitadores = require('./Delimitadores.js');
const PalavrasReservadas = require('./PalavrasReservadas.js');
const ErroLexico = require('./ErroLexico.js');
const Outros = require('./Outros.js');

let logger;
let str;

class Analisador{
    analiseLexica(conteudo){
        logger = new Log();
        let editor = new Editor();
        str = conteudo;
        this.comentarios;
        this.texto;
        str = str.split(/\s+/g);
        this.erroLexico;
        this.numeros;
        this.delimitadores;
        this.operadores;
        this.palavrasReservadas;
        
        this.outros;
    }
    static set conteudoStr(valor){
        this.str = valor;
    }
    get erroLexico(){
        let string = ErroLexico.valores(str);
        if(string !== undefined){
            logger.escreve = 'Erro: ' + string ;
            throw new Error(string);
        }
    }  
    get delimitadores(){
        let array = Delimitadores.valores(str);
        let string = array.join(' ');
        logger.escreve = 'Delimitadores: ' + string;
        console.log('Delimitadores: ' + string + '');        
    }   
    get palavrasReservadas(){  
        let string = PalavrasReservadas.valores(str);
        logger.escreve = 'Palavras Reservadas: ' + string + '';
        console.log('Palavras Reservadas: ' + string + '');        
    }    
    get operadores(){
        let array = Operadores.valores(str);
        let string = array.join(' ');
        logger.escreve = 'Operadores: ' + string + '';
        console.log('Operadores: ' + string + '');        
    }
    get outros(){
        let string = [];
        str = str.toString().split(/\s+/g);
        str = str.toString().split(/,/g);
        for (var key in str) {
            if(/\w/.test(str[key])){
                string.push(str[key]);
            }     
        }
        logger.escreve = 'Variaveis: ' + string + '';
        console.log('Variaveis: ' + string + '');   
    }    
    get texto(){
        let reg = /["'][\w\-+*/.!@#$%¨&*();\.,\[\]}{}'"=<>]+["']/;
        let string = [];
        while(reg.test(str)){ 
            let txt = reg.exec(str);
            txt = txt.toString().split(/["']/);
            str = str.replace(txt[1],'');
            string.push(txt[1]);
        }
        logger.escreve = 'Textos: ' + string;
        console.log('Textos: ' + string);
    }
    get numeros(){
        let reg = /\d+/;
        let dec = /\d+\.\d+/;
        let palavra = /[a-zA-Z]+/
        let inteiros = [];
        let decimais = [];
        for (let key in str) {
            if(!palavra.test(str[key]))
                while(reg.test(str[key])){
                    if(dec.test(str[key])){
                        let txt = dec.exec(str[key]);
                        decimais.push(txt); 
                        str[key] = str[key].replace(dec,' ');
                    }
                    else{
                        let txt = reg.exec(str[key]);
                        str[key] = str[key].replace(reg,' ');
                        inteiros.push(txt);                    
                    }

                }
        }
        logger.escreve = 'Numeros: ' + inteiros;
        console.log('Numeros: ' + inteiros);
        logger.escreve = 'Decimais: ' + decimais;
        console.log('Decimais: ' + decimais);     
    }    
    get comentarios(){
    let reg = /\/{2}.|\/\*[\s\w\-+*/.!@#$%¨&*();\.,\[\]}{}'"=<>]+\*\//;
        let string = [];
        while(reg.test(str)){   
            let txt = reg.exec(str);
            string.push(txt);
            if(/\/{2}/.test(str))
                str = str.replace(txt,'//');
            else
                str = str.replace(txt,'/**/');
        }
        
        //logger.escreve = 'Comentarios: ' + string;
        //console.log('Comentarios: ' + string);
    }  
}
module.exports = Analisador;