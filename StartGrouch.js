
var repl = require("repl");
var grouch = require('./lib/grouchdb.js');


var start = grouch.Connection;

console.log("Welcome");

//node repl with custom prompt
var grouchRepl = repl.start("Grouch> ");




grouchRepl.context.start = start;

