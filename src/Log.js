const log4js = require('log4js');

let logger = null;
class Log{
    constructor(){
        log4js.configure({
          appenders: { compilador: { type: 'file', filename: 'logs/compilador.log' } },
          categories: { default: { appenders: ['compilador'], level: 'info' } }
        });
        logger = log4js.getLogger('compilador');
    }
    set escreve(texto){  
        logger.info(texto);
    }
}
module.exports = Log;



