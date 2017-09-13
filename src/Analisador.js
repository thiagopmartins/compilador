const Log = require('./Log.js');
const Editor = require('./Editor.js');
const Operadores = require('./Operadores.js');
const Delimitadores = require('./Delimitadores.js');
const PalavrasReservadas = require('./PalavrasReservadas.js');
const ErroLexico = require('./ErroLexico.js');

let logger;
let str;

class Analisador{
    analiseLexica(conteudo){
        logger = new Log();
        let editor = new Editor();
        str = conteudo;
        //this.comentarios;
        //this.texto;
        str = str.split(/\s+/g);
        this.numeros;
        this.delimitadores;
        this.operadores;
        this.palavrasReservadas;
        this.erroLexico;
        
    }
    static set conteudoStr(valor){
        this.str = valor;
    }
    get erroLexico(){
        let string = ErroLexico.valores(str);  
    }  
    get delimitadores(){
        let string = Delimitadores.valores(str);
        logger.escreve = 'Delimitadores: ' + string ;
        console.log('Delimitadores: ' + string + '');        
    }   
    get palavrasReservadas(){  
        let string = PalavrasReservadas.valores(str);
        logger.escreve = 'Palavras Reservadas: ' + string + '';
        console.log('Palavras Reservadas: ' + string + '');        
    }    
    get operadores(){
        let string = Operadores.valores(str);
        logger.escreve = 'Operadores: ' + string + '';
        console.log('Operadores: ' + string + '');        
    }
    get texto(){
        let reg = /^"([\w])+?"$/;
        let string = [];
        while(reg.test(str)){ 
            let txt = reg.exec(str);
           
            str = str.replace(txt,'');
            string.push(txt);
        }
        logger.escreve = 'Textos: ' + string;
        console.log('Textos: ' + string);
    }
    get numeros(){
        let reg = /\d+/;
        let dec = /\d+\.\d+/;
        let inteiros = [];
        let decimais = [];
        for (let key in str) {
            if(reg.test(str[key])){
                if(dec.test(str[key])){
                    let txt = dec.exec(str[key]);
                    decimais.push(txt); 
                    str[key] = str[key].replace(dec,'');
                }
                else{
                    let txt = reg.exec(str[key]);
                    str[key] = str[key].replace(reg,'');
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
        let reg = /\/{2}.*|\/\*[\s\w]+?\*\//;
        let string = [];
        
        while(reg.test(str)){       
            let txt = reg.exec(str);
            string.push(txt);
            str = str.replace(txt,'');
        }
        logger.escreve = 'Comentarios: ' + string;
        console.log('Comentarios: ' + string);
    }    
}
module.exports = Analisador;