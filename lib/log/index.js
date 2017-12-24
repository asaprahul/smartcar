
/*To log activities with time and styling*/

const dateTime = require('node-datetime');
module.exports = function(text){
    console.log(" ");
    console.log("[ "+dateTime.create().format('m/d H:M') + " ]    " + text);
    console.log(" ");
}
