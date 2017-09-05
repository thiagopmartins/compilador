const { ipcRenderer } = require('electron');
const fs = require('fs');
const Log = require('./Log.js');
const Editor = require('./Editor.js');
const Analisador = require('./analisador.js');
const { dialog } = require('electron').remote;



let conteudo;
let $ = document.querySelector.bind(document);
let fileName;
let logger;
let editor

window.onload = function(){
    let data = new Date();
    logger = new Log();
    logger.escreve = 'Iniciando apligação ' + data.toLocaleString();
    editor = new Editor();
    conteudo = "";
    $('#nomeTexto').innerHTML = 'Arquivo: Novo Texto';            
};
$('#novo').onclick = () =>{
    event.preventDefault();
    dialog.showOpenDialog({
        properties: ['openFile']
    },(fileNames) => { 
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
$('#editor').onkeyup = () =>{
    if(conteudo == editor.conteudo)
        $('#salva').classList.add('disabled'); 
    else
       $('#salva').classList.remove('disabled');   
};
$('#salva').onclick = (event) =>{
    dialog.showSaveDialog((file) => {
        fs.writeFileSync(file, editor.conteudo);
        fileName = file;
        conteudo = editor.conteudo;
        $('#salva').classList.add('disabled'); 
        Materialize.toast('Arquivo salvo com sucesso!', 4000);
        $('#nomeTexto').innerHTML = 'Arquivo: ' + fileName;
    });
};    
$('#analisa').onclick = () =>{
    if(fileName === undefined)
        fileName = 'Desconhecido';
    let timeInicio = new Date().getTime();
    logger.escreve = 'Iniciando análise léxica arquivo: ' + fileName;
    let analise = new Analisador();
    analise.analiseLexica(editor.conteudo);
    let timeFinal = new Date().getTime();
    logger.escreve = 'Finalizando análise em ' + (timeFinal - timeInicio) + ' ms';
    Materialize.toast('Análise realizada.', 4000);         
};    
$('#limpa').onclick = () =>{
    editor.conteudo = "";
    if(conteudo == editor.conteudo)
        $('#salva').classList.add('disabled'); 
    else
       $('#salva').classList.remove('disabled');     
}; 
