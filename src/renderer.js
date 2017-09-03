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
    dialog.showOpenDialog({
        properties: ['openFile']
    },(fileNames) => { 
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
    if(conteudo == editor.getValue())
        $('#salva').classList.add('disabled'); 
    else
       $('#salva').classList.remove('disabled');   
};
$('#salva').onclick = (event) =>{
    dialog.showSaveDialog((fileName) => {
        fs.writeFileSync(fileName, editor.getValue());
        conteudo = editor.getValue();
        $('#salva').classList.add('disabled'); 
        Materialize.toast('Arquivo salvo com sucesso!', 4000);
        $('#nomeTexto').innerHTML = 'Arquivo: ' + fileName; 
    });
};    
$('#analisa').onclick = () =>{
    console.log(JSON.parse(editor.getValue()));
    Materialize.toast('Análise realizada.', 4000);
};    
$('#limpa').onclick = () =>{
    editor.setValue("");
    editor.focus();
    if(conteudo == editor.getValue())
        $('#salva').classList.add('disabled'); 
    else
       $('#salva').classList.remove('disabled');     
}; 
