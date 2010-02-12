
function __bake_instance(instance) {
	for(var key in instance) {
		var prop = instance[key];
		if(!(prop instanceof Function)) continue;
		if(prop in ['toString', 'init']) continue;
		instance[key] = __bake_function(prop, instance);
	}
	return instance;
}

function __bake_function(func, self) {
	return function() {
		return func.apply(self, arguments);
	}
}

Function.prototype.BakeConstructor = function() {
	var constructor = this;
	return function() {
		if(this === window) {
			throw "Error: constructor called without using the `new` keyword";
		}
		var instance = constructor.apply(this, arguments) || this;
		return __bake_instance(instance);
	}
}

Function.prototype.bake = function(self) {
	var func = this;
	return __bake_function(func, self);
}

