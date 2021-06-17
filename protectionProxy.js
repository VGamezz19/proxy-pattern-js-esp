const dog = {
	name: "pirata",
	age: 12,
	_ping: "!@#$$1234123",
};

const doggy = new Proxy(dog, {
	get(target, prop) {
		return undefined;
	},
	set(target, prop, value) {
		if (prop[0] === "_") {
			throw new Error("cannot modify private propertie");
		}
		return (target[prop] = value);
	},
});

// console.log(doggy);
// doggy._ping = 'hola';
// should throw an error

class Person {
	constructor({ name, age }) {
		this.name = name;
		this.age = age;
	}

	greet() {
		return `Hello, my name is ${this.name}. I am ${this.age} years old.`;
	}
}

const person = new Person({ name: "John Doe", age: 42 });
const proxy = new Proxy(person, {
	get: function (target, property, receiver) {
		const value = target[property];
		console.log(`${property} => ${value}`);
		return value;
	},
});

proxy.greet();

function NOPE() {
	throw new Error("can't modify read-only view");
}

var handler = {
	// Override all five mutating methods.
	set: NOPE,
	defineProperty: NOPE,
	deleteProperty: NOPE,
	preventExtensions: NOPE,
	setPrototypeOf: NOPE,
};

function readOnlyView(target) {
	return new Proxy(target, handler);
}

const object = {
	_privateProp: 42,
};

const handler = {
	has: function (target, key) {
		return !(key.startsWith("_") && key in target);
	},
	get: function (target, key, receiver) {
		return key in receiver ? target[key] : undefined;
	},
};

const proxy = new Proxy(object, handler);
proxy._privateProp; // undefined
