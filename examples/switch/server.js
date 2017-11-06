const NAME_RESOURCE = "BinarySwitchResURI"
const NAME_PROPERTY_VALUE = "value"
const NAME_ACTION_TOGGLE = "toggle"

WoT.expose({name: NAME_RESOURCE, url: "", description : undefined})
    .then(function(thing) {
        console.log("log: created " + thing.name);
	fnOnWrite = function(newValue, oldValue) {
            console.log( "log: property: " + NAME_PROPERTY_VALUE + ": " + oldValue + " -> " + newValue);
        };
	
        thing.addProperty({
	    name : NAME_PROPERTY_VALUE,
	    value : false,
	    description: JSON.stringify({ type: "boolean" }),
	    onWrite : fnOnWrite,
	});

        thing.addAction({
	    name : NAME_ACTION_TOGGLE,
	    action : () => {
                console.log("log: action: " + NAME_ACTION_TOGGLE);
                return thing.getProperty(NAME_PROPERTY_VALUE).then(function(value){
                    console.log("log: action: " + NAME_ACTION_TOGGLE + ": " + value);
                    value = !value;
                    thing.setProperty(NAME_PROPERTY_VALUE, value);
                    console.log("log: action: " + NAME_ACTION_TOGGLE + ": " + value);
                    return value;
                })
	    }
	});

	thing.start();
    });
