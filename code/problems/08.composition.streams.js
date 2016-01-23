// Composition III. Streams, Iterators & Generators. [30 min]


// 01. La programación funcional nos brinda la oportunidad de 
// operar con estructuras de datos infinitas. Para ello basta
// con definirlas en términos funcionales de manera que cada 
// vez que invoquemos a una función nos da el siguiente elemento
// dentro de dicha estructura. Implementa una función generadora
// [Source] y a partir de ella construye las estructuras [numbers],
// [evens], [doubles], y [pows] que representan, respectivamente, 
// los números naturales, los números pares, la serie de dobles, 
// y las potencias de 2. 

(function (/* 01. Source */) {

    var Source = function (fn, b) {
        
    };
        
    var inc    = function (x) { return x + 1; };
    var even   = function (x) { return x + 2; };
    var double = function (x) { return x + x; };
    var pow    = function (x) { return Math.pow (2, x); };

    var numbers  = Source (inc,    0);
    var evens    = Source (even,   0);
    var doubles  = Source (double, 1);
    var pows     = Source (pow,    1);
    
    var giveMe = function (fn, n) {
        return (function each (n) {
            return n === 0 ?
                [] :
                [fn ()].concat (each (n-1));
        })(n);
    };
         
    console.log (
        giveMe (numbers, 5),    // [ 0, 1, 2, 3, 4 ]
        giveMe (evens, 5),      // [ 0, 2, 4, 6, 8 ]
        giveMe (doubles, 5),    // [ 1, 2, 4, 8, 16 ]
        giveMe (pows, 5)        // [ 1, 2, 4, 16, 65536 ]
    );

})();


// 02. A partir de las estructuras infinitas anteriores se pueden
// construir rangos que recorran un subconjunto de sus elementos.
// Construye la función [Range] que recibe los parámetros de inicio
// y fin para obtener recorridos sobre las funciones anteriores. La
// función devuelve un objeto { value, done }. La clave [value]
// contiene el valor del elemento en curso mientras que [done] es un
// valor lógico que se hace cierto sólo una vez que se ha alcanzado
// el último elemento del rango.

(function (/* 02. Range */) {

    var Range = function (fn) {

    };
        
    var inc    = function (x) { return x + 1; };
    var even   = function (x) { return x + 2; };
    var double = function (x) { return x + x; };
    var pow    = function (x) { return Math.pow (2, x); };

    var Numbers  = Range (inc);
    var Evens    = Range (even);
    var Doubles  = Range (double);
    var Pows     = Range (pow);
    
    var rNumbers = Numbers (0, 10);
    var rEvens   = Evens (0, 10);
    var rDoubles = Doubles (1, 10);
    var rPows    = Pows (1, 10);
    
    var giveMe = function (fn) {
        return (function each (fn) {
            var x = fn ();
            return x.done ?
                [] :
                [x.value].concat (each (fn));
        })(fn);
    };
         
    console.log (
        giveMe (rNumbers),    // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        giveMe (rEvens),      // [ 0, 2, 4, 6, 8, 10 ]
        giveMe (rDoubles),    // [ 1, 2, 4, 8 ]
        giveMe (rPows)        // [ 1, 2, 4 ]
    );

})();


// 03. De manera muy similar al caso anterior funcionan los Iteradores den JS
// Un iterador es una función generadora que devuelve un objeto con el método
// next como único parámetro. Esta función coincide con la función devuelta por
// [Range] en el ejercicio anterior. Modifica ese código para crear un iterador
// en JS.

(function (/* 03. Iterators */) {

    var Range = function (fn) {

    };
        
    var inc    = function (x) { return x + 1; };
    var even   = function (x) { return x + 2; };
    var double = function (x) { return x + x; };
    var pow    = function (x) { return Math.pow (2, x); };

    var Numbers  = Range (inc);
    var Evens    = Range (even);
    var Doubles  = Range (double);
    var Pows     = Range (pow);
    
    var rNumbers = Numbers (0, 10);
    var rEvens   = Evens (0, 10);
    var rDoubles = Doubles (1, 10);
    var rPows    = Pows (1, 10);
    
    var giveMe = function (it) {
        return (function each (it) {
            var x = it.next ();
            return x.done ?
                [] :
                [x.value].concat (each (it));
        })(it);
    };
         
    console.log (
        giveMe (rNumbers),    // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        giveMe (rEvens),      // [ 0, 2, 4, 6, 8, 10 ]
        giveMe (rDoubles),    // [ 1, 2, 4, 8 ]
        giveMe (rPows)        // [ 1, 2, 4 ]
    );

})();


// 04. En ES6 se utilizan generadores. Un generador es una función que además
// de poder finalizar con el retorno de un valor con un return puede suspender
// su interrupción con yield y devolver un valor al punto del llamante para poder
// retomar su ejecución posterior cuando el llamante lo reaunuda invocando al 
// método next que este nativamente soporta. Implementa el iterador anterior
// mediante generadores.

(function (/* 04. Generators */) {

    var Range = function (fn) {

    };
        
    var inc    = function (x) { return x + 1; };
    var even   = function (x) { return x + 2; };
    var double = function (x) { return x + x; };
    var pow    = function (x) { return Math.pow (2, x); };

    var Numbers  = Range (inc);
    var Evens    = Range (even);
    var Doubles  = Range (double);
    var Pows     = Range (pow);
    
    var gNumbers = Numbers (0, 10);
    var gEvens   = Evens (0, 10);
    var gDoubles = Doubles (1, 10);
    var gPows    = Pows (1, 10);
    
    var giveMe = function (gen) {
        return (function each (gen) {
            var x = gen.next ();
            return x.done ?
                [] :
                [x.value].concat (each (gen));
        })(gen);
    };
         
    console.log (
        giveMe (gNumbers),    // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
        giveMe (gEvens),      // [ 0, 2, 4, 6, 8, 10 ]
        giveMe (gDoubles),    // [ 1, 2, 4, 8 ]
        giveMe (gPows)        // [ 1, 2, 4 ]
    );

})();


// 05. La definición de un stream parte del uso del constructor 
// [Stream] que recibe como único parámetro una fuente o generador.
// Por medio de técnicas compositivas fluidas se define una cadena
// de composición funcional. Las operaciones de composición son [map]
// [reduce] y [filter], versión unitaria de las funciones sobre vectores
// y [skip] y [take] que permite saltar o recolectar n elementos según
// pasan por la cadena de composición. Diseña un stream [evens] para 
// generar rangos de pares desde n a m y otro [primes] para calcular
// rangos de primos consecutivos.

(function (/* 05. Stream */) {
    
    var map = function (fn) { 
        return function () {
            return fn.apply (null, arguments);
        };
    };
    var reduce = function (fn, b) {
        var ac = b;
        return function () {
            var args = [].slice.call (arguments);
            ac = fn.apply (null, [ac].concat (args));
            return ac;
        };
    };
    var filter = function (fn) {
        return function () { 
            var out = fn.apply (null, arguments);
            if (out) return arguments [0];
        };
    };
    var take = function (n) {
        var v = [];
        return function (x) {
            v.push (x);
            if (v.length > n) {
                var w = v.concat ([]);
                v = [];
                return w;
            }
        };
    };
    var skip = function (n) {
        var i = 0;
        return function (x) {
            i++;
            if (i > n) return x;
        };
    };
 
    var fluent = function (hn) {
        var cb = hn || function () {};
        return function (fn) {
            return function () {
                cb (fn.apply (null, arguments));
                return this;
            };
        };
    };
    var sequenceBreakWith = function (fns) {
        return function (data) {
            return fns.reduce (function (ac, fn) {
                return ac === void 0 ? void 0 : fn (ac);
            }, data());
        };
    };

    var Stream = function (source) {
        var fns = [];
        var define = fluent (function (fn) {
             fns.push (fn);
        });
        var next = function (fns, data) {
            var result = sequenceBreakWith (fns)(data);
            return result !== void 0 ? result : next (fns, data);  
        };
        return {
            map    : define (map),
            filter : define (filter),
            reduce : define (reduce),
            take   : define (take),
            skip   : define (skip),
            end    : function () {
                return {
                    next: function () {
                       return next (fns, source); 
                    }
                };
            }
        };
    };

    (function (/* Evens */) {
        
        var inc = function (x) { return x + 1; };
        var evn = function (x) { return x % 2 === 0; };
        
        var source = (function (fn, b) {
            var c = b;
            return function () {
                return (c = fn (c));
            };
        })(inc, 0);
        
        var evens = ...
            
        console.log (
            evens.next (),     // [ 12, 14, 16, 18, 20, 22 ]
            evens.next (),     // [ 24, 26, 28, 30, 32, 34 ]
            evens.next ()      // [ 36, 38, 40, 42, 44, 46 ]
        ); 
        
    })();

    (function (/* Primes */) {
        
        var inc   = function (x) { return x + 1; };
        var prime = function (x) { 

        };
        
        var source = (function (fn, b) {
            var c = b;
            return function () {
                return (c = fn (c));
            };
        })(inc, 0);
        
        var primes = ...
            
        console.log (
            primes.next (),     // [ 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41 ]
            primes.next (),     // [ 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89 ]
            primes.next ()      // [ 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149 ]
        );
        
    })();

})();