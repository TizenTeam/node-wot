const src = './examples/switch/client.js'

const fs = require('fs')
const node_wot = require('node-wot')
const Http = require('node-wot-protocol-http')
const servient =  new node_wot.Servient()
servient.addClientFactory(new Http.HttpClientFactory());

const WoT = servient.start()

function parse(funct)
{
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var value = 0;
    process.stdin.on('data', function (input) {
        value = parseInt(input.trim(), 10);
        console.log( value );
        funct(value);
        return value;
    });
}

const NAME_RESOURCE = "BinarySwitchResURI"
const NAME_PROPERTY_VALUE = "value"
const NAME_ACTION_TOGGLE = "toggle"
var targetUri = "http://localhost:8080/" + NAME_RESOURCE;

WoT.consume(targetUri).then(function(thing) {

    console.log("log: thing=" +  JSON.stringify(thing));
  
    thing.getProperty( NAME_PROPERTY_VALUE ).then(function(value){
	console.log("log: NAME_PROPERTY_VALUE=", value);
        thing.setProperty( NAME_PROPERTY_VALUE, !value);
    });

    thing.invokeAction(NAME_ACTION_TOGGLE).then(function(response){
        console.log("log: response: " + response);
    });

    thing.setProperty( NAME_PROPERTY_VALUE, true);

    thing.invokeAction("reset").then(function(response){
        console.log("log: response: " + response);
    });

    parse(value => {thing.setProperty( NAME_PROPERTY_VALUE, value);});
    
});
