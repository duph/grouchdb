
var repl = require("repl");
var grouch = require('./lib/grouchdb.js');
var basic = require('./lib/grouchdb/basic.js');

//declare custom commands to call Grouch functions
//it calls functions in included files

//var start = grouch.Connection;
var start = function(){
    grouch.Connection();
    return 'starting...';
};



console.log("Welcome.");

grouch.Connection(function(){});

//node repl with custom prompt
var grouchRepl = repl.start("Grouch> ");

grouchRepl.context.start = start;
//grouchRepl.context.get = grGet;

grouchRepl.context.grGet = function(key, callback){
    //console.log(key);
    //console.log(callback);
    basic.get(key, callback);
    return 'called get';
};

//grouchRepl.context.get = basic.get(key, callback);