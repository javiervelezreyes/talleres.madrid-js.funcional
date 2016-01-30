// Stateless II. Monads [15 min]


// 00. La monada identidad persigue articular procesos de composición 
// de una manera fluida de una manera similar a como lo hemos logrado 
// en ejercicios anteriores. Implementa esta mónada con estructura de 
// objetos. Debes implementar un constructor [Id] y un método [bind]
// para la aplicación de funciones definido sobre el prototipo.

(function (/* 00. Monad Id */) {
    
    function Id (value) {
        this.value = value;
    }
    Id.prototype.bind = function (fn) {
        return fn (this.value);
    };
    
    var sqr    = function (x) { return new Id (x * x); };
    var inc    = function (x) { return new Id (x + 1); };
    var dec    = function (x) { return new Id (x - 1); };
    var double = function (x) { return new Id (2 * x); };
    
    console.log (
        new Id (3)
            .bind (sqr)
            .bind (inc)
            .bind (double), // { value: 20 }
        new Id (4)
            .bind (sqr)
            .bind (inc)
            .bind (double)  // { value: 34 }
    );
    
})();

// 01. Como hemos discutido antes, un problema de composición se da
// cuando en algún punto de la cadena de composición funcional, alguna 
// función devuelve un valor indefinido. La mónada maybe resuelve este
// problema acarreando un estado de validad que se propaga hasta el final
// y en última instancia determina si el valor devuelto por la mónada es
// correcto. Implementa esta mónada con estructura de objetos. Debes 
// implementar un constructor [MayBe] y un método [bind] para la 
// aplicación de funciones definido sobre el prototipo.

(function (/* 01. Monad Maybe */) {
    
    function Maybe (value) {
        this.value = value;
        this.valid = value !== void 0;
    }
    Maybe.prototype.bind = function (fn) {
        return this.valid ?
            fn (this.value) :
            new Maybe ();
    };
    
    var sqr    = function (x) { return new Maybe (x * x); };
    var inc    = function (x) { return new Maybe (x > 10 ? x + 1 : void 0); };
    var dec    = function (x) { return new Maybe (x > 10 ? x - 1 : void 0); };
    var double = function (x) { return new Maybe (2 * x); };
    
    console.log (
        new Maybe (3)
            .bind (sqr)
            .bind (inc)
            .bind (double), // { value: undefined, valid: false } 
        new Maybe (4)
            .bind (sqr)
            .bind (inc)
            .bind (double)  // { value: 34, valid: true }
    );
    
})();


// 02. No es poco frecuente que queramos vincular a cada función cierta lógica
// de trazabilidad por ejemplo imprimiendo mensajes por pantalla. En programación
// funcional este tipo de comportamientos es inaceptable y se considera un efecto
// colateral. Para resolver este problema, la mónada escritor convierte esta traza
// en un log que se adjunta a los resultados y se acarrea como estado a lo largo de
// la cadena de composición. Implementa esta mónada con estructura de objetos. Debes 
// implementar un constructor [Writer] y un método [bind] para la aplicación de 
// funciones definido sobre el prototipo.

(function (/* 02. Monad Writer */) {
    
    function Writer (value, log) {
        this.value = value;
        this.log   = log || [];
    }
    Writer.prototype.bind = function (fn) {
        var r = fn (this.value);
        return new Writer (r.value, this.log.concat (r.log));
    };
    
    var sqr    = function (x) { return new Writer (x * x, ['square']);    };
    var inc    = function (x) { return new Writer (x + 1, ['increment']); };
    var dec    = function (x) { return new Writer (x + 1, ['decrement']); };
    var double = function (x) { return new Writer (2 * x, ['double']);    };
    
    console.log (
        new Writer (3)
            .bind (sqr)
            .bind (inc)
            .bind (double), // { value: 20, log: [ 'square', 'increment', 'double' ] }
        new Writer (4)
            .bind (sqr)
            .bind (inc)
            .bind (double)  // { value: 34, log: [ 'square', 'increment', 'double' ] }
    );
    
})();


// 03. En ocasiones se requiere que el comportamiento de una función dependa de
// condiciones ambientales resueltas en tiempo de ejecución. Por ejemplo, un valor
// SO, un dato de una BD o fichero o una entrada por teclado. En programación
// funcional este tipo de comportamientos es inaceptable y se considera un efecto
// colateral. Para resolver este problema, la mónada lector monta la cadena de 
// composición completa sobre unos datos ambientales delegados en forma de parámetros
// e incluye un método run sobre la estructura monádica para inyectar dichos datos
// al final de la cadena. Implementa esta mónada con estructura de objetos. Debes 
// implementar un constructor [Reader] y un método [bind] para la aplicación de 
// funciones definido sobre el prototipo.

(function (/* 03. Monad Reader */) {
    
    function Reader (fn) {
        this.run = fn || function (x) { return x; };
    }
    Reader.prototype.bind = function (fn) {
        return new Reader (function (x) {
            return fn (this.run (x)).run (x);
        }.bind (this));
    };
    
    var sqr    = function (x) { return new Reader (function (x) { return x * x; }); };
    var inc    = function (x) { return new Reader (function (x) { return x + 1; }); };
    var dec    = function (x) { return new Reader (function (x) { return x - 1; }); };
    var double = function (x) { return new Reader (function (x) { return 2 * x; }); };
    
    console.log (
        new Reader ()
            .bind (sqr)
            .bind (inc)
            .bind (double)
            .run (3),       // 6
        new Reader ()
            .bind (sqr)
            .bind (inc)
            .bind (double)
            .run (4)        // 8
    );
    
})();


// 04. De una manera muy similar al caso anterior, a veces necesitamos operar sobre
// cadenas de composición que implican a estructuras con estado. Este es el caso de
// la composición de operaciones [push] y [pop] sobre el estado de una pila. En 
// programación funcional este tipo de comportamientos es inaceptable y se considera 
// un efecto colateral. Para resolver este problema, la mónada estado monta la cadena de 
// composición completa y convierte el estado de la pila en parámetros de entrada que se 
// van acarreando sobre la cadena de composición. Además incluye un método run sobre la
// estructura monádica para inyectar es estado inicial sobre el que debe evaluarse la cadena
// de composición. Implementa esta mónada con estructura de objetos. Debes implementar un 
// constructor [State] y un método [bind] para la aplicación de funciones definido sobre el
// prototipo.

(function (/* 04. Monad state */) {
    
    function State (state) {
        this.run = state || function (state) {
            return { state : state };
        };
    }
    State.prototype.bind = function (fn) {
        return new State (function (state) {
            return fn.run (this.run (state).state);
        }.bind (this));
    };
    
    var push = function (value) {
        return new State (function (state) {
            return { state : state.concat (value) };
        });
    };
    var pop = function () {
        return new State (function (state) {
            return { 
                value : state.slice (state.length-1)[0],
                state : state.slice (0, state.length-1) 
            };
        });
    };

    console.log (
         new State ()
            .run ([]),      // { state: [] }
        new State ()
            .bind (push(1))
            .bind (push(2))
            .bind (push(3))
            .bind (pop())
            .run ([])       //  { value: 3, state: [ 1, 2 ] }
    );
    
})();


// 05. La mónada de colección se utiliza para salvar la diferencia entre colecciones y 
// elementos de colección en el marco de una composición funcional. La monada eleva el
// elemento atómico a una colección con ese dato  como único elemento de la misma y así
// homogeniza la estructura de datos lo que permite articular composiciones más fácilmente.
// Implementa esta mónada con estructura de objetos. Debes implementar un constructor
// [Collection] y un método [bind] para la aplicación de funciones definido sobre el prototipo.

(function (/* 05. Monad collection */) {
    
    function Collection (value) {
        this.value = Array.isArray(value) ? value : [value];
    }
    Collection.prototype.bind = function (fn) {
        return new Collection (
            this.value.reduce (function (ac, e) {
                return ac.concat (fn (e).value);
            }, [])
        );
    };

    var twitter = {
        javi  : ['juan', 'pedro', 'luisa'],
        pedro : ['juan', 'luisa'],
        luisa : ['pedro'],
        juan  : ['pedro', 'luisa'],
    };
    function followers (u) { 
       return new Collection (twitter[u]); 
    }
    console.log (
        new Collection ('javi')
            .bind (followers)
            .bind (followers) 
    );  // { value: [ 'pedro', 'luisa', 'juan', 'luisa', 'pedro' ] }

})();


// 06. La mónada de continuación se utiliza para resolver los problemas en la composición
// funcional encontrados al aplicar estilo de paso de continuaciones. Esta mónada se conoce
// en el entorno de programación asíncrona como Promesa. Implementa esta mónada con estructura
// de objetos. Debes implementar un constructor [Continuation] y un método [bind] para la 
// aplicación de funciones definido sobre el prototipo.

(function (/* 06. Monad continuation */) {
    
    function Continuation (value, hn) {
        this.then = hn || function (hn) {
            return hn (value);  
        };
    }
    Continuation.prototype.bind = function (fn) {
        return new Continuation (null, function (hn) {
            return this.then (function (value) {
                return fn (value).then (hn);
            });
        }.bind (this));
    };
    
    var sqr    = function (x) { return new Continuation (x * x); };
    var inc    = function (x) { return new Continuation (x + 1); };
    var dec    = function (x) { return new Continuation (x - 1); };
    var double = function (x) { return new Continuation (2 * x); };
    
     new Continuation (3)
        .bind (sqr)
        .bind (inc)
        .bind (double)
        .then (console.log);    // 20
    new Continuation (4)
        .bind (sqr)
        .bind (inc)
        .bind (double)
        .then (console.log);    // 34

})();
