
const Analisador = require('./AnalisadorLexico.js');
const tokens = [
    {regex: /\bpublic\b/,value: 'public'},
    {regex: /\bstatic\b/,value: 'static'},
    {regex: /\bvoid\b/,value: 'void'},
    {regex: /\bboolean\b/,value: 'boolean'},
    {regex: /\bprivate\b/,value: 'private'},
    {regex: /\bprotected\b/,value: 'protected'},
    {regex: /\btrue\b/,value: 'true'},
    {regex: /\bfalse\b/,value: 'false'},
    {regex: /\bnew\b/,value: 'new'},
    {regex: /\bfor\b/,value: 'for'},
    {regex: /\bwhile\b/,value: 'while'},
    {regex: /\bdo\b/,value: 'do'},
    {regex: /\bif\b/,value: 'if'},
    {regex: /\belse\b/,value: 'else'},
    {regex: /\bbreak\b/,value: 'break'},
    {regex: /\bcontinue\b/,value: 'continue'},
    {regex: /\bfinal\b/,value: 'final'},
    {regex: /\breturn\b/,value: 'return'},
    {regex: /\bint\b/,value: 'int'},
    {regex: /\bfloat\b/,value: 'float'},
    {regex: /\bchar\b/,value: 'char'},
    {regex: /\bclass\b/,value: 'class'},
    {regex: /\bextends\b/,value: 'extends'},
    {regex: /\bimplements\b/,value: 'implements'},
    {regex: /\bpackage\b/,value: 'package'},
    {regex: /\bimport\b/,value: 'import'},
    {regex: /\babstract\b/,value: 'abstract'},
    {regex: /\bswitch\b/,value: 'switch'},
    {regex: /\bcase\b/,value: 'case'},
    {regex: /\bdouble\b/,value: 'double'},
    {regex: /\blong\b/,value: 'long'},
    {regex: /\bdefault\b/,value: 'default'},
    {regex: /\binterface\b/,value: 'interface'},
    {regex: /\btry\b/,value: 'try'},
    {regex: /\bcatch\b/,value: 'catch'},
    {regex: /\bthis\b/,value: 'this'},
    {regex: /\bnull\b/,value: 'null'},
    {regex: /\brip\b/,value: 'rip'},
    {regex: /\bthrow\b/,value: 'throw'},
    {regex: /\bsuper\b/,value: 'super'}
];

/*public static void boolean private protected true false new for while do if else
break continue final return int float char class extends implements package import abstract switch case double long
default interface try catch this null rip throw super*/

class PalavrasReservadas{
    static get token(){
        return tokens;
    }
    static valores(str){
        let string = [];
        for (let key in str) {
            for(let i = 0; i < this.token.length; i++){
                let reg = this.token[i].regex;
                let error = false;
                
                while(reg.test(str[key]) && error == false){
                    let stringOld = str[key];
                    console.log('Posicao: ' + key);
                    str[key] = str[key].replace(this.token[i].value,' ');
                    if(str[key] == stringOld){
                        error = true;
                        str[key] = stringOld;
                    }
                    else
                        string.push(this.token[i].value);
                }              
            }                       
        }
        Analisador.conteudoStr = str;
        return string;        
    }
}
module.exports = PalavrasReservadas;