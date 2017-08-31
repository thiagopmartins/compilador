const { ipcRenderer } = require('electron');
const fs = require('fs');

window.onload = function(){
    console.log("Carregando aplicação!!!");
    let $ = document.querySelector.bind(document);
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");    
    editor.focus();

    $('#novo').onclick = () =>{
        console.log('teste');
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
    };                   
};

