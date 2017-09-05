
let editor;

class Editor{

    constructor(){
        if(editor === undefined){
            editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/javascript");    
            editor.focus(); 
        }    
            
    }
    get conteudo(){
        return editor.getValue();
    }
    set conteudo(valor){
        editor.setValue(valor);
    }

}
module.exports = Editor;