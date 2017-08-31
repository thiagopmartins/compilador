const { ipcRenderer } = require('electron');
const fs = require('fs');
const { dialog } = require('electron').remote;

let fileOpen = false;
let conteudo;
let $ = document.querySelector.bind(document);
let editor;

window.onload = function(){
    console.log("Carregando aplicação!!!");
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");    
    editor.focus();
    conteudo = editor.getValue();
    $('#nomeTexto').innerHTML = 'Arquivo: Novo Texto';              
};
$('#novo').onclick = () =>{
    event.preventDefault();
    dialog.showOpenDialog( (fileNames) => { 
        properties: [ 'openFile', 'openDirectory', 'multiSelections' ];
        if (fileNames === undefined) return;         
        let fileName = fileNames[0]; 
        $('#nomeTexto').innerHTML = 'Arquivo: ' + fileNames[0];   
        fs.readFile(fileName, 'utf-8', function (err, data) {
            editor.setValue(data); 
            conteudo = data; 
            $('#salva').classList.add('disabled');           
        });            
        
    });
}; 
$('#editor').onkeyup = () =>{
    console.log(conteudo);
    console.log(editor.getValue());
    if(conteudo == editor.getValue())
        $('#salva').classList.add('disabled'); 
    else
       $('#salva').classList.remove('disabled');   
};
$('#salva').onclick = (event) =>{
    console.log('teste');
};    
$('#analisa').onclick = () =>{
    console.log(editor.getValue());
};    
$('#limpa').onclick = () =>{
    editor.setValue("");
    editor.focus();
    conteudo = "";
};  
