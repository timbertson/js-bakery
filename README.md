# The javascript bakery

... produces "baked" objects or functions. Initially, the purpose of this was because I believe Javascript's treatment of the `this` variable is atrocious, and I wanted to make it behave more like pretty much every OO language out there.

Additionally, I've created a version of the bakery for use with [async.js](http://github.com/eligrey/async.js/tree/). The modifications made are detailed [in this blog post](http://gfxmonk.net/2010/02/12/making-sense-of-async-js.html).


# How it works

The bakery adds a couple of methods to every `Function` object you define:

1. BakeConstructor()
2. bake()

The first is the most useful method, and is meant to be used on constructor functions. It returns an alternate constructor that mimics the original constructor, but binds `this` inside every attached instance method (including prototype-inherited methods) with the just-created instance.

The effect of this is that nothing can change what `this` means for that particular object's methods. Additionally, storing the value of a method in a variable and calling it later will not have the (typically unintended) consequence of binding the global `window` object to `this`.

The `bake` method is pretty much identical to the `bind` method of other javascript frameworks, and returns a wrapper around the function with `this`bound to whatever argument you pass in. This is nothing new (many other javascript frameworks provide it), but is provided for completeness.

Have a look in example.html for a concrete example.
