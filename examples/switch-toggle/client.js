const NAME_PROPERTY_VALUE = "value"
const NAME_ACTION_UPDATE = "toggle"
const NAME_RESOURCE = "BinarySwitchResURI"

var targetUri = "http://localhost:8080/" + NAME_RESOURCE;
//var targetUriProperties = "http://localhost:8080/" + NAME_RESOURCE  + "/properties";

WoT.consume(targetUri).then(function(thing) {
    thing.getProperty( NAME_PROPERTY_VALUE ).then(function(value){
	console.log("NAME_PROPERTY_VALUE=", value);
    });
    thing.invokeAction("toggle");
});
