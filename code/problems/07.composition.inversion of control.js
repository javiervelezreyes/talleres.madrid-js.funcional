// Composition II. Inversion of Control [15 min]


// 01. Tradicionalmente en programación funcional diseñamos funciones
// que reciben datos de entrada en forma de parámetros para operar
// con ellos. ¿Y si lo hiciéramos al revés? Diseña una función [tap] que
// reciba unos datos como parámetro y genere otra función con esos
// datos retenidos léxicamente. La nueva función generada recibirá
// una función como parámetro para operarla sobre los datos retenidos.

(function (/* 01. tap */){

    var tap = function () {

    };
    
    var add = function (x, y) { return x + y; };
    var sub = function (x, y) { return x - y; };
    var mul = function (x, y) { return x * y; };
    var div = function (x, y) { return x / y; };
    
    var data = tap (8,4);

    console.log (
        data (add), // 12
        data (sub), // 4
        data (mul), // 33
        data (div)  // 2
    );

})();


// 02. ¿Y si invertimos el control de las funciones map & reduce, etc. definidas
// dentro del prototipo de Array? Diseña una función [flip] que transforme dichas 
// funciones para que operen con un manejador pasado como parámetro y posterguen la 
// aplicación sobre unos datos concretos en una segunda fase de evaluación.
// Fíjate en el ejemplo y entenderás la inversión que hemos hecho con respecto
// a las funciones canónicas definidas en el prototipo de Array.

(function (/* 02. flip */){
    
    var flip = function (fn) {

    };

    var mapWith    = flip ([].map);
    var reduceWith = flip ([].reduce);
    var filterWith = flip ([].filter);
    var everyWith  = flip ([].every);
    var someWith   = flip ([].some);
    
    var sqr = function (x) { return x * x; };
    var inc = function (x) { return x + 1; };
    var add = function (x, y) { return x + y; };
    var mul = function (x, y) { return x * y; };
    
    var mapWithSqr = mapWith (sqr);
    var mapWithInc = mapWith (inc);
    var reduceWithAdd = reduceWith (add, 0);
    var reduceWithMul = reduceWith (mul, 1);
    
    console.log (
        mapWithSqr ([1,2,3]),       // [ 1, 4, 9 ]
        mapWithInc ([1,2,3]),       // [ 2, 3, 4 ] 
        reduceWithAdd ([1,2,3]),    // 6
        reduceWithMul ([1,2,3])     // 6
    );


})();


// 03. Hagamos ahora lo mismo sobre las funciones [get] y [pluck] que definimos
// previamente. Construye las funciones [getWith] y [pluckWith] para invertir el 
// orden en que se reciben los datos. [getwith] primero recibe la clave y posterga
// el objeto para una segunda fase de evaluación. Con [puckWith] ocurre lo mismo.

(function (/* 03. getWith & pluckWith */){
        
    var getWith = function (k) {

    };
    var pluckWith = function (k) {

    };
    
    var basket = [
        { type: 'F', units: 3, price: 500 },
        { type: 'F', units: 2, price: 750 },
        { type: 'H', units: 1, price: 250 },
        { type: 'F', units: 1, price: 320 },
        { type: 'H', units: 1, price: 100 },
    ];
    var pluckWithType = pluckWith ('type');
    var pluckWithUnits = pluckWith ('units');
    var pluckWithPrice = pluckWith ('price');
    
    console.log (
        pluckWithType (basket),     // [ 'F', 'F', 'H', 'F', 'H' ]
        pluckWithUnits (basket),    // [ 3, 2, 1, 1, 1 ]
        pluckWithPrice (basket)     // [ 500, 750, 250, 320, 100 ]
    );


})();


// 04. Las funciones de composición también son susceptibles de esta inversión.
// Recupera el código de [compose] y [sequence] para crear las funciones [composeWith]
// y [sequenceWith]. En este caso la diferencia estriba en que los datos se proporcionan
// como una función en segunda fase de evaluación que opera a modo de fuente de datos.

(function (/* 04. composeWith & sequenceWith */){

    var composeWith = function (fn, gn) {

    };
    var sequenceWith = function (fns) {

    };
    
    var sqr    = function (x) { return x * x; };
    var inc    = function (x) { return x + 1; };
    var double = function (x) { return x + x; };
    var sqrInc = composeWith (sqr, inc);
    var doubleSqrInc = sequenceWith ([double, sqr, inc]);
    
    var data = (function (fn, b) {
        var c = b;
        return function () {
            return (c = fn (c));
        };
    })(inc, 0);
    
    console.log (
        sqrInc (data),          // 4
        sqrInc (data),          // 9
        doubleSqrInc (data),    // 37
        doubleSqrInc (data)     // 65
    );
    
})();


// 05. Y ya puestos, recupera el código de las funciones [composeBreak] y 
// [sequenceBreak] y realiza la misma inversión que en el ejercicio anterior
// para definir [composeBreakWith] y [sequenceBreakWith].

(function (/* 05. composeBreakWith & sequenceBreakWith */){

    var composeBreakWith = function (fn, gn) {

    };
    var sequenceBreakWith = function (fns) {

    };
    
    var sqr    = function (x) { return x * x; };
    var inc    = function (x) { return x + 1; };
    var double = function (x) { return x + x; };
    var sqrInc = composeBreakWith (sqr, inc);
    var doubleSqrInc = sequenceBreakWith ([double, sqr, inc]);
    
    var data = (function (fn, b) {
        var c = b;
        return function () {
            return (c = fn (c));
        };
    })(inc, 0);
    
    console.log (
        sqrInc (data),          // 4
        sqrInc (data),          // 9
        doubleSqrInc (data),    // 37
        doubleSqrInc (data)     // 65
    );
    
})();

