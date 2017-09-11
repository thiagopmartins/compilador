
const tokens = [
    {regex: /\+/},
    {regex: /-/},
    {regex: /\*/},
    {regex: /\//},
    {regex: /%/},
    {regex: /\=/}
];
//'+, -, *, /, %, =, ==, !=, >, <, >=, <=, &&, ||, ", *=, /=, +=, -=, &, |, ++, --, ?, :'
class Operadores{
    static get token(){
        return tokens;
    }
}
module.exports = Operadores;