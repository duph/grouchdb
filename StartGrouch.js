
var repl = require("repl");
var grouch = require('./lib/grouchdb.js');
//var basic = require('./lib/grouchdb/basic.js');
var basic = require('./lib/grouchdb/basic').Basic;

//declare custom commands to call Grouch functions
//it calls functions in included files

//var start = grouch.Connection;
var start = function(){
    grouch.Connection();
    return 'starting...';
};

var get = function(key, callback){
    //basic.get(key, callback);
    //basic.get(key, function(err, doc) { console.log(doc) });
    basic.get(key, function(err, doc) { console.log(doc) });
    return 'called get';
};

var get_edges = function(key, callback){
    basic.get_edges(key, function(err, doc) { console.log(doc) });
    return 'called get_edges';
};

var merge = function(key, doc, callback){
    basic.merge(key, doc, callback);
    return 'called merge';
};

var merge_attr = function(key, doc, callback){
    basic.merge_attr(key, doc, callback);
    return 'called merge_attr';
};

var create = function(key, doc, callback){
    basic.create(key, doc, callback);
    return 'called create';
};

var create_node = function(from_key, to_key, value, callback){
    basic.create_node(from_key, to_key, value, callback);
    return 'called create_node';
};

var add_edge = function(from_key, to_key, value, callback){
    basic.add_edge(from_key, to_key, value, callback);
    return 'called add_edge';
};

var delete_edge = function(from_key, to_key, callback){
    basic.delete_edge(from_key, to_key, callback);
    return 'called delete_edge';
};

console.log("Welcome.");

grouch.Connection(function(){});

//node repl with custom prompt
var grouchRepl = repl.start("Grouch> ");

grouchRepl.context.start = start;
grouchRepl.context.get = get;
grouchRepl.context.get_edges = get_edges;
grouchRepl.context.merge = merge;
grouchRepl.context.merge_attr = merge_attr;
grouchRepl.context.create = create;
grouchRepl.context.create_node = create_node;
grouchRepl.context.add_edge = add_edge;
grouchRepl.context.delete_edge;
