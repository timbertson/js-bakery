
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
	var expected = func.length;
	return function() {
		var got = arguments.length;
		var args = Array.slice.call(arguments);
		if(got == expected - 1) {
			var wrapper = function(func_args, cb) {
				func_args = Array.prototype.slice.call(func_args);
				func_args = func_args.slice();
				func_args.push(cb);
				return async(func).apply(self, func_args);
			}
			return [wrapper, args];
		} else {
			return async(func).apply(self, arguments);
		}
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

