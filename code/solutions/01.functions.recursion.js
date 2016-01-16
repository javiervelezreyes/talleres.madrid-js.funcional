// Function Design I. Recursion [30 min]


// 01. Diseña una función recursiva para calcular n!
// n! se computa como el producto de todos los números
// naturales desde 1 hasta n.

(function (/* 01. factorial (n) */) {
    
    var factA = function (n) {
        return n === 0 ? 
            1 :
            n * factA (n-1);
    };
    var factB = function (n) {
        var r = 1;
        for (var i = 1; i <= n; i++)
            r = r * i;
        return r;
    };
    
    console.log (
        factA (5), // 120
        factB (5)  // 120
    );
    
})();


// 02. Diseña una función recursiva para calcular el 
// n-esimo término de la sucesión de Fibonacci. Dicho
// término se obtiene como la suma de los dos términos
// anteriores en la sucesión.

(function (/* 02. fibonacci (n) */) {
    
    var fibA = function (n) {
        return n < 2  ? 
            n :
            fibA (n-1) + fibA (n-2);
    };
    var fibB = function (n) {
        var a = 1;
        var b = 1;
        for (var i = 2; i < n; i++) {
            b = a + b;
            a = b - a;
        }
        return b;
    };
    
    console.log (
        fibA (10), // 55
        fibB (10)  // 55
    );
    
})();


// 03. Diseña una función recursiva para calcular el 
// la potencia de un numero b elevado al exponente e.
// El computo de b elevado a e se obtiene como el 
// producto de b con sigo mismo e veces.

(function (/* 03. pow (b, e) */) {
    
    var pow = function (b, e) {
        return e < 2  ? 
            b :
            b * pow (b, e-1);
    };
    
    console.log (
        pow (2, 6), // 64
        pow (3, 6)  // 729
    );
    
})();


// 04. Diseña dos predicados lógicos [even] y [odd] que
// indiquen si un número n pasado como argumente es o no
// par o impar respectivamente. En el diseño de estas 
// funciones no puede utilizarse la operación de módulo %.

(function (/* 04. even (n) & odd (n) */) {
    
    var even = function (n) {
        return n === 0 ? true  :
               n === 1 ? false : odd (n-1);
    };
    var odd = function (n) {
        return n === 0 ? false :
               n === 1 ? true  : even (n-1);
    };
    
    console.log (
        even (5), even (6), // false true
        odd  (5), odd  (6)  // true false
    );
    
})();


// 05. Diseña una función recursiva [addUp] que devuelva 
// la suma de los n primeros números naturales. Por ejemplo
// addUp (3) = 1 + 2 + 3 = 6.

(function (/* 05. addUp (n) */) {
    
    var addUp = function (n) {
        return n === 1 ?
            1 :
            n + addUp (n-1);  
    };
    
    console.log (
        addUp (5) // 15
    );
    
})();


// 06. Diseña una función recursiva [digits] que sume los dígitos
// que tiene un número entero n pasado como parámetro. Por ejemplo,
// digits (125) = 1 + 2 + 5 = 8.

(function (/* 06. digits (n) */) {
    
    var digits = function (n) {
        return n < 10 ?
            n :
            n%10 + digits (Math.floor(n/10));
    };
    
    console.log (
        digits (5),  // 5
        digits (25), // 7
        digits (125) // 8
    );
    
})();