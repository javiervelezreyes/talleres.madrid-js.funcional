// Advanced Topics I. Optimization [30 min]


// 01. Cuando hablamos de rendimiento un factor importante es saber medir con 
// precisión cuanto tarda exactamente en ejecutar una función. Diseña una función
// [time] que reciba como parámetro una función y devuelva otra función que al 
// evaluar incluya como resultado el valor de retorno de fn y el tiempo que ha
// tardado fn en ejecutar.

(function (/* 01. time */) {
    
    var time = function time (fn) {
        return function () {
            var before = Date.now();
            var result = fn.apply(null, arguments);
            var after  = Date.now();
            return {
                value : result,
                time  : (after - before)
            };
        }; 
    };
    
})();


// 02. A veces la mejor optimización es hacer un buen diseño del esquema funcional.
// ¿Sabrías dar otra implementación del método [pow] que definiste antes? ¿Qué versión
// es más costosa?

(function (/* 02. powA vs powB */) {
    
    var time = function time (fn) {
        return function () {
            var before = Date.now();
            var result = fn.apply(null, arguments);
            var after  = Date.now();
            return {
                value : result,
                time  : (after - before)
            };
        }; 
    };
    
    var powA = function (b, e) { console.log ('powA', b, e);
        return e < 2  ? 
            b :
            b * powA (b, e-1);
    };
    var powB = function (b, e) { console.log ('powB', b, e);
        if (e === 0) return 1;
        if (e === 1) return b;
        else {
            var n = powB (b, Math.floor (e/2));
            return e % 2 === 0 ?
                n * n :
                n * n * b;
        } 
    };
    
    var tpowA = time (powA);
    var tpowB = time (powB);
    console.log (
        tpowA (2, 60),   // { value: 1152921504606847000, time: 0 }
        tpowB (2, 60)    // { value: 1152921504606847000, time: 0 }
    );
    
})();


// 03. ¿Sorprendido? Probemos de nuevo ¿ y si tratamos de buscar otra estrategia de 
// descomposición recursiva a la que aplicaste en el ejercicio [hasV] que definiste
// antes? ¿Sabrías determinar si tu nueva implementación es ahora mejor?

(function (/* 03. hasVA vs hasVB */) {
    
    var time = function time (fn) {
        return function () {
            var before = Date.now();
            var result = fn.apply(null, arguments);
            var after  = Date.now();
            return {
                value : result,
                time  : (after - before)
            };
        }; 
    };
    
    var hasVA = time (function (v, e) {
        return hasVFrom (v, e, 0);  
    });
    var hasVFrom = function (v, e, p) { console.log ('hasVFrom', v, e, p);
        return p > v.length - 1 ? 
            false :
            v[p] === e || hasVFrom (v, e, p+1);
    };
    
    var hasVB = time (function (v, e) {
        return hasVIn (v, e, 0, v.length-1);  
    });
    var hasVIn = function (v, e, from, to) { console.log ('hasVIn', v, e, from, to);
        var m = Math.floor ((from + to)/2);
        return from === to ? 
            v[from] === e :
            hasVIn (v, e, from, m) || hasVIn (v, e, m+1, to);
    };
    
    console.log (
        hasVA ([1,2,3,4,5], 4), // { value: true, time: 0 }
        hasVA ([1,2,3,4,5], 6), // { value: false, time: 0 }
        hasVB ([1,2,3,4,5], 4), // { value: true, time: 0 }
        hasVB ([1,2,3,4,5], 6)  // { value: false, time: 0 }
    );
    
})();


// 04. Muchas veces la mejor forma de optimizar una función es mejorándola para incluirle
// una memoria de los cómputos que ya ha realizado con parámetros idénticos en invocaciones
// anteriores dentro de una recursión. Esta memoria funciona a forma de cache y ahorra muchos
// ciclos de cómputo sobre todo para tamaños grandes de problema. Diseña una función que 
// transforme una función recursiva genérica fn en otra con cache. Implementa para ello la
// función de orden superior [memoize].

(function (/* 04. memoize */) {
    
    var time = function time (fn) {
        return function () {
            var before = Date.now();
            var result = fn.apply(null, arguments);
            var after  = Date.now();
            return {
                value : result,
                time  : (after - before)
            };
        }; 
    };
    
    var memoize = function (fn) {
        var cache = {};
        return function () {
            var args = [].slice.call (arguments);
            return args in cache ?
            cache[args] :
            cache[args] = fn.apply(this, args);
        };
    };
    
    var fibA = function (n) {
        return n < 2  ? 
            n :
            fibA (n-1) + fibA (n-2);
    };
    var fibB = memoize (fibA);
    var tfibA = time (fibA);
    var tfibB = time (fibB);
    
    console.log (
        tfibA (30), // { value: 832040, time: 10 }
        tfibB (30)  // { value: 832040, time: 9 }
    );
    
})();


// 05. La optimización no siempre se busca sobre la dimensión tiempo sino sobre la dimensión
// memoria. Es bien sabido que las funciones recursivas consumen mucha memoria ya que para cada
// invocación recursiva reservan otro espacio de memoria completo para la función dentro de la 
// pila. Sin embargo, cuando la definición de la función utiliza recursividad final (la llamada
// recursiva sólo consiste en la propia función y no tiene operaciones de combinación que realizar
// sobre os resultados) entonces se puede aplicar la técnica del trampolín. Consiste en transformar 
// la función para parar cada invocación recursiva en una nueva fase de evaluación. Entonces puede
// diseñarse la función [trampoline] que con un iterador resuelve dicha ejecución sobre una misma
// variable.

(function (/* 05. trampoline */) {
    
    var trampoline = function (fn) {
        return function () {
            var result = fn.apply (null, arguments);
            while (result instanceof Function) { console.log (result);
                result = result();
            }
            return result;
        }; 
    };

    var f = function f (n, ac) {
        return n === 0 ?
            ac :
            function () {
                return f (n-1, n*ac);
            };
    };
    var tf = trampoline(f);
    
    console.log (
        tf(5, 1)    // 120
    );
    
})();