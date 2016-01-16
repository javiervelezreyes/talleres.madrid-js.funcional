// Composition III. Streams [15 min]


// 01. Un tipo de arquitecturas funcionales en franco auge son las
// arquitecturas reactivas basadas en procesamiento de streams de 
// datos. La definición de un stream parte del uso del constructor 
// [Stream] que recibe como único parámetro una fuente de datos, 
// una función que  devuelve datos procedentes de una fuente bajo 
// demanda en cada invocación (uno cada vez). Con las técnicas de 
// composición fluida que hemos estudiado anteriormente, se 
// particularizan las operaciones funcionales típicas de colecciones
// map, filter & reduce para que operen ahora con datos únicos (los
// que proceden de la fuente). Estas funciones sirven para inyectar
// operadores de transformación, compresión y filtro sobre la cadena
// de composición funcional que opera sobre el stream de datos.
// Para cerrar la definición de la cadena se invoca el método [end]
// que devuelve un objeto con un único método [pull]. Este método
// es el encargado de solicitar a la cadena que extraiga un nuevo dato 
// de la fuente, lo procese funcionalmente y devuelva el resultado
// de dicho procesamiento. A continuación mostramos un mini framework 
// de esta idea y dos ejemplos de uso práctico.

(function (/* 01. Pull Stream */) {
    
    var emap = function (fn) { 
        return function () {
            return fn.apply (null, arguments);
        };
    };
    var ereduce = function (fn, b) {
        var ac = b;
        return function () {
            var args = [].slice.call (arguments);
            ac = fn.apply (null, [ac].concat (args));
            return ac;
        };
    };
    var efilter = function (fn) {
        return function () { 
            var out = fn.apply (null, arguments);
            if (out) return arguments [0];
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
            map    : define (emap),
            filter : define (efilter),
            reduce : define (ereduce),
            end    : function () {
                return {
                    pull: function () {
                       return next (fns, source); 
                    }
                };
            }
        };
    };

    (function (/* Test #1 */) {
        
        var inc = function (x) { return x + 1; };
        var sqr = function (x) { return x * x; };
        var odd = function (x) { return x % 2 === 1; };
        var evn = function (x) { return x % 2 === 0; };
        var add = function (x, y) { return x + y; };
        
        var source = (function (fn, b) {
            var c = b;
            return function () {
                return (c = fn (c));
            };
        })(inc, 0);
        
        var stream = Stream (source)
            .map    (inc)
            .filter (evn)
            .reduce (add, 0)
            .end ();
            
        console.log (
            stream.pull (),
            stream.pull (),
            stream.pull ()
        ); 
        
    })();

    (function (/* Test #2 */) {
        
        var trim   = function (s) { return s.trim ();     };
        var split  = function (s) { return s.split (' '); };
        var length = function (s) { return s.length;      };
        
        var source = function s() { return 'Function Programming on JS is cool! ' };
        var stream = Stream (source)
            .map (trim)
            .map (split)
            .map (length)
            .end ();

        console.log (
            stream.pull (),
            stream.pull (),
            stream.pull ()
        );
        
    })();

})();