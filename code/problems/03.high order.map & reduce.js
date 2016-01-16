// High Order I. Map & Reduce [30 min]


// 01. Diseña una función recursiva [reduce] que calcule un
// único valor resultando de operar todos los elementos
// de un vector v dato. La función recibe el vector, 
// una operación binaria que opera los elementos de v
// tomados de uno en uno y una base como origen de la operación.
// Por ejemplo reduce ([1,2,3], function (x+y){ return x+y; }, 0)
// devuelve 0 + 1 + 2 + 3 = 6. 

(function (/* 01. reduce (v, fn, b) */) {
    
    var reduce = function (v, fn, b) {
        
    };
    
    var add = function (x, y) { return x + y; };
    var mul = function (x, y) { return x * y; };
    var odd = function (x, y) { return !y;  };
    var cnt = function (x, y) { return y+1; };
    console.log (
        reduce ([1,2,3,4,5], add, 0),       // 15
        reduce ([1,2,3,4,5], mul, 1),       // 120
        reduce ([1,2,3,4,5], odd, true),    // false
        reduce ([1,2,3,4,5], cnt, 0)        // 6
    );
    
})();


// 02. Diseña una función recursiva [map] que aplique una operación
// unaria a todos los elementos de un vector de entrada v y 
// lo devuelva como resultado. No pueden utilizarse funciones 
// auxiliares disponibles dentro del prototipo Array.

(function (/* 02. map (v, fn) */){
     
    var map = function (v, fn) {

    };
    
    console.log (
        map ([1,2,3,4,5], function (x){ return -x; }),  // [ -1, -2, -3, -4, -5 ]
        map ([1,2,3,4,5], function (x){ return x*x; })  // [ 1, 4, 9, 16, 25 ]
    );
    
})();


// 03. Diseña una función recursiva [filter] que aplique un predicado 
// lógico unario a todos los elementos de un vector de entrada v y 
// devuelva otro sólo con aquellos elementos de han superado dicho
// predicado (se evaluó a cierto). No pueden utilizarse funciones 
// auxiliares disponibles dentro del prototipo Array.

(function (/* 03. filter (v, fn) */){
      
    var filter = function (v, pn) {

    };
    
    console.log (
        filter ([1,2,3,4,5], function (x){ return x % 2 === 0; }), // [ 2, 4 ]
        filter ([1,2,3,4,5], function (x){ return x % 2 !== 0; })  // [ 1, 3, 5 ]
    );
    
})();


// 04. Diseña una función recursiva [every] que aplique un predicado
// lógico unario a todos los elementos de un vector de entrada v y 
// determine si todos ellos lo satisfacen. No pueden utilizarse 
// funciones auxiliares disponibles dentro del prototipo Array.

(function (/* 04. every (v, fn) */){
       
    var every = function (v, pn) {

    };
    
    console.log (
        every ([1,2,3,4,5], function (x){ return x % 2 === 0; }),   // false
        every ([1,2,3,4,5], function (x){ return x < 6; })          // true
    );
    
})();


// 05. Diseña una función recursiva [some] que aplique un predicado
// lógico unario a todos los elementos de un vector de entrada v y 
// determine si alguno de ellos lo satisface. No pueden utilizarse 
// funciones auxiliares disponibles dentro del prototipo Array.

(function (/* 05. some (v, fn) */){
       
    var some = function (v, pn) {

    };
    
    console.log (
        some ([1,2,3,4,5], function (x){ return x % 2 === 0; }),    // true
        some ([1,2,3,4,5], function (x){ return x > 6; })           // false
    );
    
})();


// 06. Diseña una función recursiva [forEach] que aplique una 
// función unaria a todos los elementos de un vector de entrada v. 
// No pueden utilizarse funciones auxiliares disponibles dentro
// del prototipo Array.

(function (/* 06. forEach (v, fn) */){
 
    var forEach = function (v, fn) {

    };
    

    forEach ([1,2,3,4,5], console.log);
    forEach ([1,2,3,4,5], function (e, i) { console.log ('v[%d] = %d', i, e); });
    
})();