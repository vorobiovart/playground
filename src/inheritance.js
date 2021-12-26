// ---------------------------------> classical inheritance

var Constructor = function (name) {
    this.name = name;
}

Constructor.prototype.sayHi = function () {
    console.log('Hi, ' + this.name);
}

var constructorInstance = new Constructor('Artur');

var SubConstructor = function (name) {
    // Not to duplicate all the code in the Constructor
    Constructor.call(this, name);
}

// inheritance happens
SubConstructor.prototype = Object.create(Constructor.prototype);
// could be also
// SubConstructor.prototype = new Constructor();

// without it the constructor of any SubConstructor instance would be Constructor
SubConstructor.prototype.constructor = SubConstructor; // optional

var subConstructorInstance = new SubConstructor('Artur in SubConstructor');
subConstructorInstance.sayHi() // -> "Hi, Artur in SubConstructor"

// changing Constructors prototype will influance all instances (constructorInstance, subConstructorInstance)
Constructor.prototype.sayHey = function() {
    console.log('hey hey hey ' + this.name);
}

// changing SubConstructors prototype will influance only subConstructorInstance
SubConstructor.prototype.sayLalai = function() {
    console.log('Lalai ' + this.name);
}

// ---------------------------------------------------------------------------------------------------------------------------
// -------------------------------------> Prototypal inheritance
// simple way
var parent = {
    type: 'parent',
    say: function() {
        console.log('I\'m ' + this.type);
    }
};

var child = Object.create(parent);
// to avoid writing this props to new methods see another way (using create on top)
child.type = 'child';

child.say(); // -> "I'm child"

parent.amICool = function() {
    console.log('Hey, am I cool?');
}

child.amICool(); // -> "Hey, am I cool?"


// another way (using create on top)
var parent = {
    type: 'parent',
    create: function(newObject) {
        var instance = Object.create(this);
        Object.keys(newObject).forEach(function(key) {
            instance[key] = newObject[key];
        });
        return instance;
    },
    say: function() {
        console.log('I\'m ' + this.type);
    }
};

var child = parent.create({
    type: 'child'
});

child.say(); // -> "I'm child"

parent.amICool = function() {
    console.log('Hey, am I cool?');
}

child.amICool();// -> "Hey, am I cool?"


// ----------------------------------------> my own Object.create()

Object.prototype.myOwnCreate = function(object) {
    var newInstance = new Object();
    newInstance.__proto__ = object;
    return newInstance;
}


var parent = {
    type: 'parent',
    say: function() {
        console.log('I\'m ' + this.type);
    }
};

var child = Object.myOwnCreate(parent);
child.type = 'child';

child.say() // -> "I'm child"

parent.amICool = function() {
    console.log('Hey, am I cool?');
}

child.amICool();

// class inheritance

class Base {
  constructor(name = 'Base') {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

class Artur extends Base {
  constructor() {
    super();
    this.name = 'Artur';
  }
  sayLalai() {
    console.log('lalai');
  }
}

const base = new Base();
base.sayHi(); // Base.
// base.sayLalai(); // error;

const artur = new Artur();
artur.sayHi(); // Artur
artur.sayLalai(); // lalai
