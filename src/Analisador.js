const Log = require('./Log.js');
const Editor = require('./Editor.js');

let logger;
let str;

class Analisador{
    analiseLexica(conteudo){
        logger = new Log();
        let editor = new Editor();
        str = conteudo.split(/[\s\t\n]/i);
        this.texto;
        this.numeros;
    }
    get texto(){
        let reg = /(')(.*)(')|(")(.*)(")/;
        let string = [];
        for (let key in str) {
            if(reg.test(str[key])){
                let txt = reg.exec(str[key]);
                str[key] = str[key].replace(reg,'');
                string.push(txt[0]);
            }
        }
        logger.escreve = 'Textos: [' + string + ']';
        console.log('Textos: [' + string + ']');
    }
    get numeros(){
        let reg = /\d+/;
        let dec = /[.]+/;
        let inteiros = [];
        let decimais = [];
        for (let key in str) {
            if(reg.test(str[key])){
                if(dec.test(str[key])){
                    decimais.push(str[key]); 
                    str[key] = str[key].replace(str[key],'');
                }
                else{
                    let txt = reg.exec(str[key]);
                    str[key] = str[key].replace(reg,'');
                    inteiros.push(txt);                    
                }

            }
        }
        logger.escreve = 'Numeros: [' + inteiros + ']';
        console.log('Numeros: [' + inteiros + ']');
        logger.escreve = 'Decimais: [' + decimais + ']';
        console.log('Decimais: [' + decimais + ']');        
    }    
    get comentarios(){
        let reg = 1;
        let string = [];
        for (let key in str) {
            if(reg.test(str[key])){
                let txt = reg.exec(str[key]);
                str[key] = str[key].replace(reg,'');
                string.push(txt[0]);
            }
        }
        logger.escreve = 'Comentarios: [' + string + ']';
        console.log('Comentarios: [' + string + ']');
    }    
}
module.exports = Analisador;