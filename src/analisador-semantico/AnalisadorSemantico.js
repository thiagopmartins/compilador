const Log = require('../Log.js');
const Editor = require('../Editor.js');

let logger;
let str;
let erros = [];


class AnalisadorSemantico{
    constructor(){
        console.log('Testando');
        this.texto;
        this.comentarios;        
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
    }
    get texto(){
        let reg = /["'][\s\w\-+*/.!@#$%¨&*();\.,\[\]}{}'"=<>]+["']/;
        let string = [];
        while(reg.test(str)){ 
            let txt = reg.exec(str);
            str = str.replace(txt,'');
            string.push(str);
        }
    }    
}

module.exports = AnalisadorSemantico;