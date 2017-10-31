const Log = require('../Log.js');
const Editor = require('../Editor.js');

let logger;
let str;

class AnalisadorSintatico{

    constructor(conteudo){
        console.clear();
        logger = new Log();
        let editor = new Editor();
        str = conteudo;
        this.texto;
        console.log('passou texto');
        this.comentarios;
        console.log('passou comentarios');
        this.parenteses;
        console.log('passou parenteses');
        this.chaves;
        console.log('passou chaves');
        this.colchetes;
        console.log('passou colchetes');
        this.aspas;
        console.log('passou aspas');
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
            txt = txt.toString().split(/["']/);
            str = str.replace(txt[1],'');
            string.push(txt[1]);
        }
    }
    get aspas(){
        const tokens = [
            {regex: /(["]{1})(\d*)/,value: 0, string: '\"'},
            {regex: /([']{1})(\d*)/,value: 0, string: '\''}
        ];   
        let linhas = str.split(/\n/);
        for(let linha of linhas){
            for(let k = 0; k < linha.length; k++){
                for(let i = 0; i < tokens.length; i++){
                    let reg = tokens[i].regex; 
                    if(reg.test(linha[k])){
                        tokens[i].value ++;
                    }
                }    
            }
            console.log(tokens[1].value);            
            if(tokens[0].value % 2 != 0)
                throw new Error(`Esta faltando fechar aspas ${tokens[0].string}`);
            else if(tokens[1].value % 2 != 0)
                throw new Error(`Esta faltando fechar aspas ${tokens[1].string}`);            
        }
            
    }
    get parenteses(){    
        const tokens = [
            {regex: /([(]{1})(\d*)/,value: 0, string: '('},
            {regex: /([)]{1})(\d*)/,value: 0, string: ')'}
        ]; 
        this.resultado(tokens);       
    }
    get chaves(){    
        const tokens = [
            {regex: /([{]{1})(\d*)/,value: 0, string: '{'},
            {regex: /([}]{1})(\d*)/,value: 0, string: '}'}
        ];
        this.resultado(tokens);        
    } 
    get colchetes(){    
        const tokens = [
            {regex: /([\[]{1})(\d*)/,value: 0, string: '['},
            {regex: /([\]]{1})(\d*)/,value: 0, string: ']'}
        ];
        this.resultado(tokens); 
        
    }  
    resultado(tokens){
        let cont = 0;
        for(let k = 0; k < str.length; k++){
            for(let i = 0; i < tokens.length; i++){
                let reg = tokens[i].regex; 
                if(reg.test(str[k])){
                    tokens[i].value ++;
                }
            }
        }
        cont = tokens[0].value - tokens[1].value;
        if(tokens[0].value > tokens[1].value)
            throw new Error(`Esta faltando ${cont} caractere  ${tokens[1].string}`);
        else if(tokens[0].value < tokens[1].value)
            throw new Error(`Esta faltando ${cont*(-1)} caractere ${tokens[0].string}`);        
    }         
}

module.exports = AnalisadorSintatico; 