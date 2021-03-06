const { ipcRenderer } = require('electron');
const fs = require('fs');
const Log = require('./Log.js');
const Editor = require('./Editor.js');
const AnalisadorLexico = require('./analisador-lexico/AnalisadorLexico.js');
const AnalisadorSintatico = require('./analisador-sintatico/AnalisadorSintatico.js');
const AnalisadorSemantico = require('./analisador-semantico/AnalisadorSemantico.js')
const { dialog } = require('electron').remote;
const request = require('request');



let conteudo;
let $ = document.querySelector.bind(document);
let fileName;
let logger;
let editor

window.onload = function () {
    let data = new Date();
    logger = new Log();
    logger.escreve = 'Iniciando aplicação ' + data.toLocaleString();
    editor = new Editor();
    conteudo = "";
    $('#nomeTexto').innerHTML = 'Arquivo: Novo Texto';
};
$('#novo').onclick = () => {
    event.preventDefault();
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (fileNames) => {
        if (fileNames === undefined) return;
        fileName = fileNames[0];
        $('#nomeTexto').innerHTML = 'Arquivo: ' + fileName;
        fs.readFile(fileName, 'utf-8', function (err, data) {
            editor.conteudo = data;
            conteudo = data;
            $('#salva').classList.add('disabled');
        });
    });
};
$('#editor').onkeyup = () => {
    if (conteudo == editor.conteudo)
        $('#salva').classList.add('disabled');
    else
        $('#salva').classList.remove('disabled');
};
$('#salva').onclick = (event) => {
    dialog.showSaveDialog((file) => {
        fs.writeFileSync(file, editor.conteudo);
        fileName = file;
        conteudo = editor.conteudo;
        $('#salva').classList.add('disabled');
        Materialize.toast('<span class="toast-sucess">Arquivo salvo com sucesso!', 4000);
        $('#nomeTexto').innerHTML = 'Arquivo: ' + fileName;
    });
};
$('#analise-lexica').onclick = () => {
    if (fileName === undefined)
        fileName = 'Desconhecido';
    try {
        let timeInicio = new Date().getTime();
        logger.escreve = 'Iniciando análise léxica arquivo: ' + fileName;
        let analise = new AnalisadorLexico();
        analise.analiseLexica(editor.conteudo);
        let timeFinal = new Date().getTime();
        logger.escreve = 'Finalizando análise em ' + (timeFinal - timeInicio) + ' ms';
        Materialize.toast('<span class="toast-sucess">Análise Léxica finalizada em ' + (timeFinal - timeInicio) + ' ms.', 4000);
    }
    catch (error) {
        Materialize.toast('<span class="toast-error">Análise Léxica finalizada com erro.</span>', 4000);
        throw new Error(error);
    }
};
$('#analise-sintatica').onclick = () => {
    if (fileName === undefined)
        fileName = 'Desconhecido';
    try {
        let timeInicio = new Date().getTime();
        logger.escreve = 'Iniciando análise sintática arquivo: ' + fileName;
        let analise = new AnalisadorSintatico(editor.conteudo);
        let timeFinal = new Date().getTime();
        logger.escreve = 'Não foram encontrados erros sintáticos.';
        logger.escreve = 'Finalizando análise sintática em ' + (timeFinal - timeInicio) + ' ms';
        Materialize.toast('<span class="toast-sucess">Análise Sintática finalizada em ' + (timeFinal - timeInicio) + ' ms.', 4000);
    }
    catch (error) {
        Materialize.toast('<span class="toast-error">Análise Sintática finalizada com erro.</span>', 4000);
        logger.escreveError = error;
        throw new Error(error);
    }
};
$('#analise-semantica').onclick = () => {

    if (fileName === undefined)
        fileName = 'Desconhecido';
    try {
        let timeInicio = new Date().getTime();
        logger.escreve = 'Iniciando análise semântica arquivo: ' + fileName;
        let analise = new AnalisadorSemantico();
        let timeFinal = new Date().getTime();
        logger.escreve = 'Não foram encontrados erros semânticos.';
        logger.escreve = 'Finalizando análise semântica em ' + (timeFinal - timeInicio) + ' ms';
        Materialize.toast('<span class="toast-sucess">Análise Semântica finalizada em ' + (timeFinal - timeInicio) + ' ms.', 4000);
    }
    catch (error) {
        Materialize.toast('<span class="toast-error">Análise Semântica finalizada com erro.</span>', 4000);
        logger.escreveError = error;
        throw new Error(error);
    }
    
}
$('#limpa').onclick = () => {
    editor.conteudo = "";
    if (conteudo == editor.conteudo)
        $('#salva').classList.add('disabled');
    else
        $('#salva').classList.remove('disabled');
}; 
