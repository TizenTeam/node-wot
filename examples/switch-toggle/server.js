//just an example script - to be moved into other repo
const NAME_PROPERTY_VALUE = "value"
const NAME_ACTION_TOGGLE = "toggle"
const NAME_RESOURCE = "BinarySwitchResURI"

WoT.expose({name: NAME_RESOURCE, url: "", description : undefined})
    .then(function(thing) {
        console.log("log: created " + thing.name);
	fnOnWrite = function(newValue, oldValue) {
            console.log( "log: " + NAME_PROPERTY_VALUE + ": " + oldValue + " -> " + newValue);
        };
	
        thing.addProperty({
	    name : NAME_PROPERTY_VALUE,
	    value : false,
	    description: JSON.stringify({ type: "boolean" }),
	    onWrite : fnOnWrite,
	})
        // .onUpdateProperty({"request" : {name : NAME_PROPERTY_VALUE},
        //     "callback" : fnOnWrite
        // })
	;

        thing.addAction({
	    name : NAME_ACTION_TOGGLE,
	    action : (newValue, oldValue) => {
                return thing.getProperty(NAME_PROPERTY_VALUE).then(function(value){
                    let change = !value;
                    thing.setProperty(NAME_PROPERTY_VALUE, change);
                    return change;
                })
	    }
	    })
	;

	thing.start();
});
