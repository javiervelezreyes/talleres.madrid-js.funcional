// Composition I. Compose & Sequence [15 min]


// 01. En programación funcional no existe el concepto de secuencia de
// instrucciones, que es algo típico de la programación imperativa.
// Por ello si, dentro de una función queremos ejecutar varias funciones
// en secuencia debemos componerlas. Diseña una función [compose] de componga
// dos funciones fn y gn genéricas. Nota que sendas funciones deben ser 
// uniparamétricas y el tipo de retorno de la primera debe ser compatible
// con el esperado como parámetro de entrada de la segunda.

(function (/* 01. compose (fn, gn) */) {
    
    var compose = function (fn, gn) {
        return function (x) {
            return fn(gn(x));
        }; 
    };

    var clean = function (s) { return s.trim();     };
    var words = function (s) { return s.split(' '); };
    var count = function (s) { return s.length;     };
    console.log (
        compose (count,
            compose (words, clean))('Function Programming is cool!')  // 4
    );
        
})();


// 02. Aplicando repetidamente la función anterior podemos crear potentes
// cadenas de composición. Sin embargo, la organización sintáctica del 
// código se vuelve difícil de leer. Para resolver este problema, diseña 
// una función [sequence] que reciba un array de funciones fns como parámetro
// y devuelva como resultado otra función encargada de evaluar la composición
// de todas las funciones de vector según el orden en el que aparecen dentro
// de éste.

(function (/* 02. sequence (fns) */) {
    
    var sequence = function (fns) {
        return function (x) {
            return fns.reduce (function (ac, fn) {
                return fn(ac);
            }, x); 
        };
    };
    
    var clean = function (s) { return s.trim();     };
    var words = function (s) { return s.split(' '); };
    var count = function (s) { return s.length;     };
    console.log (
        sequence ([
            clean,
            words,
            count
        ])('Function Programming is cool!') // 4
    );
        
})();


// 03. El problema de las funciones anteriores es que no tiene en cuenta 
// las posibles rupturas de la cadena de composición provocadas por un
// valor de retorno indefinido. Rediseña la función de composición con 
// [composeBreack ]de manera que sólo se invoque la función fn cuando se 
// haya comprobado que gn ha devuelvo un valor definido. Recuerda que la 
// forma más correcta de representar en JS un valor indefinido es evaluando
// la expresión 'void 0'.

(function (/* 03. composeBreak (fn, gn) */) {
    
    var composeBreak = function (fn, gn) {
        return function (x) {
            var r = gn(x);
            return (r !== void 0) ? fn(r) : void 0;
        };
    };
    
    var sqr = function (x) { return x * x; };
    var grt = function (x) { if (x > 10) return x; };
    var c   = composeBreak (grt, sqr);
    console.log (
        c(3),   // undefined
        c(4)    // 16
    );
        
})();


// 04. El mismo problema que hemos resuelto en el ejercicio anterior con
// la funcióon [composeBreak] se puede extender al caso de múltiples funciones 
// compuestas en cadena. Diseña la función [sequenceBreak] para atenderá 
// esta necesidad.

(function (/* 04. sequenceBreak (fns) */) {
    
    var sequenceBreak = function (fns) {
        return function (x) {
            return fns.reduce (function (ac, fn) {
                return (ac !== void 0) ? fn(ac) : void 0;
            }, x);
        };
    };
    
    var s = sequenceBreak ([
        function sqr (x) { return x * x ; },
        function grt (x) { if (x > 10) return x; },
        function inc (x) { return x + 1 ; },
    ]);
    console.log (
        s(3),   // undefined
        s(4)    // 17
    );
        
})();


// 05. A veces para proporcionar un poco de azúcar sintáctico podemos
// utilizar el operador punto (.) como elemento de composición funcional.
// Ello requiere transformar las funciones de composición para que 
// acepten esa forma de expresión sintáctica y adaptar adecuadamente la 
// función de composición. Fíjate en el ejemplo e intenta implementar
// la calculadora anterior para que opere de esta forma.

(function (/* 05. fluent (fns) */) {
    
    var fluent = function (fn) {
        return function () {
            fn.apply (null, arguments);
            return this;
        };
    };
    
    var Calc = function () {
        var stack = [];
        return {
            data: fluent (function (e) {
                stack.push (e);
            }),
            op: fluent (function (fn) {
                var data = stack.slice (stack.length - fn.length);
                stack = stack.slice (0, stack.length - fn.length);
                stack.push (fn.apply (null, data));
            }),
            result: function () {
                return stack.pop();
            }
        };
    };
    
    var add = function (x, y) { return x + y; };
    var sub = function (x, y) { return x - y; };
    var mul = function (x, y) { return x * y; };
    var div = function (x, y) { return x / y; };
    var inv = function (x) { return 1 / x; };
    var neg = function (x) { return -x; };
    var sqr = function (x) { return x * x; };
    
    var calc = Calc ();
    console.log (
        calc
            .data (2)
            .data (3)
            .data (5)
            .op (mul)
            .op (add)
            .result (),     // 17
        calc
            .data (2)
            .data (3)
            .op (mul)
            .data (5)
            .op (add)
            .result ()      // 11
    );
           
})();