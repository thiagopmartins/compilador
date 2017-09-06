const Log = require('./Log.js');
const Editor = require('./Editor.js');

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
        
        this.numeros;
    }
    get texto(){
        let reg = /^(')(.+)(')$|(")(.*\s*)(")/;
        let string = [];
        do{
            
            let txt = reg.exec(str);
            console.log(str);
            str = str.replace(txt[2],'');
            console.log(str);
            string.push(txt[2]);
        }
        while(reg.test(str));
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
        let reg = /\/+\w+\s?/;
        let string = [];
        
        if(reg.test(str)){
            let txt = reg.exec(str);
            string.push(txt);
            str = str.replace(txt,'');
            
        }
        logger.escreve = 'Comentarios: [' + string + ']';
        console.log('Comentarios: [' + string + ']');
    }    
}
module.exports = Analisador;