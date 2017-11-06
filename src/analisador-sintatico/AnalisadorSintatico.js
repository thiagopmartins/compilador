const Log = require('../Log.js');
const Editor = require('../Editor.js');

let logger;
let str;
let erros = [];

class AnalisadorSintatico{

    constructor(conteudo){
        console.clear();
        erros = [];
        logger = new Log();
        let editor = new Editor();
        str = conteudo;
        this.aspas;
        console.log('passou aspas');
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
        this.resultado();
        this.testeOperador();
        
        
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
            if(tokens[0].value % 2 != 0)
                erros.push(`Esta faltando fechar aspas ${tokens[0].string}`);
            else if(tokens[1].value % 2 != 0)
                erros.push(`Esta faltando fechar aspas ${tokens[1].string}`);            
        }
            
    }
    get parenteses(){    
        const tokens = [
            {regex: /([(]{1})(\d*)/,value: 0, string: '('},
            {regex: /([)]{1})(\d*)/,value: 0, string: ')'}
        ]; 
        this.analisar(tokens);       
    }
    get chaves(){    
        const tokens = [
            {regex: /([{]{1})(\d*)/,value: 0, string: '{'},
            {regex: /([}]{1})(\d*)/,value: 0, string: '}'}
        ];
        this.analisar(tokens);        
    } 
    get colchetes(){    
        const tokens = [
            {regex: /([\[]{1})(\d*)/,value: 0, string: '['},
            {regex: /([\]]{1})(\d*)/,value: 0, string: ']'}
        ];
        this.analisar(tokens); 
        
    }  
    analisar(tokens){
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
            erros.push(`Está faltando ${cont} caractere  ${tokens[1].string}`);
        else if(tokens[0].value < tokens[1].value)
            erros.push(`Está faltando ${cont * (-1)} caractere  ${tokens[0].string}`);   
    } 
    resultado(){
        console.log(erros);
        if(erros.length > 0){
            for(let erro of erros)
                logger.escreveError = erro;
            throw new Error('Ocorreu um erro na análise sintática, verifique o log para mais detalhes.');
        }
    }
    testeOperador(){
        let caracteres = str.split(/\n+/g);
        let error = false;
        console.log(caracteres);
        const tokens = [
            {regex: /[+]/, direita:/[0-9a-zA-Z+=()\[\]]+/, max: 2},
            {regex: /[-]/, direita:/[0-9a-zA-Z-=()\[\]]+/, max: 2},
            {regex: /[*]/, direita:/[0-9a-zA-Z=()\[\]]+/, max: 999},
            {regex: /[/]/, direita:/[0-9a-zA-Z=()\[\]]+/, max: 999},
            {regex: /[%]/, direita:/[0-9a-zA-Z=()\[\]]+/, max: 999},
            {regex: /[=]/, direita:/[0-9a-zA-Z()\[\]]+/, max: 999},
            {regex: /[(]/, direita:/[0-9a-zA-Z()\[\]]+/, max: 999},
            {regex: /[0-9]/, direita:/[0-9+-=/*%()\[\]]*/, max: 999},
            {regex: /[a-zA-Z]/, direita:/[a-zA-Z+-=/*%()\[\]]*/, max: 999}
        ]
        let c = 0;
        console.log('saas' + caracteres.length);
        while(c < caracteres.length){
            let i = 0;
            let k = 0;
            console.log(caracteres[c]);
            caracteres[c] = caracteres[c].replace(/\s+/g, '');
            console.log(caracteres[c]);            
            while(k < tokens.length){
                let reg = tokens[k].regex; 
                let direita = tokens[k].direita; 
                let valor = 0; 
                while(i < caracteres[c].length){

                    if(/[+-/=*%]/.test(caracteres[c])){
                        if(reg.test(caracteres[c].charAt(i))){
                            if(!direita.test(caracteres[c].charAt(i+1)) && valor != tokens[k].max - 1){
                                error = true;
                            }
                            if(valor >= tokens[k].max){
                                error = true;
                            }
                            valor ++;
                        }
                        else
                            valor = 0;
                        console.log(error);
                       
                    }
                    i++; 
                }
                k ++; 
            }
            c ++;
        }
    }   
}

module.exports = AnalisadorSintatico; 