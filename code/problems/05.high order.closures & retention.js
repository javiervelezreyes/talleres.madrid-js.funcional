// High Order III. Closures & Lexical Retention [30 min]


// 01. Una pila es un tipo abstracto de datos que dispone de dos operaciones.
// [push] permite insertar un elemento e en la pila y [pop] saca el último 
// elemento de la pila. En este sentido, una pila se caracteriza por insertar 
// elementos en el mismo punto y orden en que éstos son extraídos. Nosotros
// queremos implementar una pila con un método más [undo] para poder deshacer
// las operaciones previamente realizadas.

(function (/* 01. stack */){
    
    var Stack = function (data) {
        var items   = data || [];
        var history = [];
        return {
            push: function push (e) {

            },
            pop: function pop () {
                if (items.length > 0) {

                }
            },
            undo: function undo() {
                if (history.length > 0) {

                } 
            },
            toString: function () {
                return items.toString();
            }
        };
    };
    
    var s = Stack ([1, 2, 3]);
    s.push (4);    console.log (s.toString ()); // 1,2,3,4
    s.pop ();      console.log (s.toString ()); // 1,2,3
    s.pop ();      console.log (s.toString ()); // 1,2
    s.push (5);    console.log (s.toString ()); // 1,2,5
    
})();



// 02. Los primeros tipos de calculadora utilizaban una técnica de cómputo 
// conocida como notación polaca inversa. Estos artefactos disponían de una
// pila interna con la que se puede operar. En cualquier momento podemos 
// introducir un nuevo dato en la pila y también podemos aplicar una operación
// que extrae tantos datos como sea necesario de la cima de la pila (en virtud de
// si la operación es unaria o binaria) y vuelve a insertar el resultado de la 
// operación nuevamente en la cima. Implementa esta calculadora con los métodos
// [data] para introducir un nuevo dato en la pila y [op] para invocar una operación
// pasada como parámetro.

(function (/* 02. calc */){
    
    var Calc = function () {
        var stack = [];
        return {
            data: function (e) {

            },
            op: function (fn) {

            },
            result: function () {

            },
            debug: function (){ console.log (stack); } 
        };
    };
    
    var add = function (x, y) { return x + y; };
    var sub = function (x, y) { return x - y; };
    var mul = function (x, y) { return x * y; };
    var div = function (x, y) { return x / y; };
    var inv = function (x) { return 1 / x; };
    var neg = function (x) { return -x; };
    var sqr = function (x) { return x * x; };
    
    var c = Calc ();
    c.data (2);     c.debug();  // [ 2 ]
    c.data (3);     c.debug();  // [ 2, 3 ]
    c.data (5);     c.debug();  // [ 2, 3, 5 ]
    c.op (mul);     c.debug();  // [ 2, 15 ]
    c.op (add);     c.debug();  // [ 17 ]
    console.log (c.result());   // 17
    
})();



// 03. Un bus es un middleware de comunicación que pone en contacto un conjunto de
// productores de datos con otro conjunto de consumidores de manera desacoplada a 
// través de una arquitectura de eventos. El bus dispone de un método [send] que
// permite emitir un evento a un conjunto de clientes adjuntando un contexto de datos.
// Asimismo, dispone de un método [receive] que permite a los clientes registrarse
// como interesados en determinado tipo de evento. Para ello esta función solicita 
// como parámetros el nombre del evento y la función manejadora que el bus invocará 
// cuando se reciba un evento de ese tipo. Además esta función devuelve una función
// encargada de realizar el desregistro de ese cliente. Implementa este bus.

(function (/* 03. bus */){
    
    var Bus = function () {

        return {
            receive: function (e, fn) {

            },
            send: function (e, ctx) {

            }
        }; 
    };
    
    var add = function (x, y, e) { console.log ('add - { on: %s, [x:%d, y:%d], result: [%d] }', e, x, y, x + y); };
    var mul = function (x, y, e) { console.log ('mul - { on: %s, [x:%d, y:%d], result: [%d] }', e, x, y, x * y); };
    var bus = Bus ();
    var f0 = bus.receive ('X', add);
    var f1 = bus.receive ('Y', add);
    var f2 = bus.receive ('Y', mul);
    bus.send ('X', [2,3]);      // add - { on: X, [x:2, y:3], result: [5] }
    bus.send ('Y', [3,5]);      // add - { on: Y, [x:3, y:5], result: [8] }
                                // mul - { on: Y, [x:3, y:5], result: [15] }
    
    f1();
    
    bus.send ('Y', [6,3]);      // mul - { on: Y, [x:6, y:3], result: [18] }
    bus.send ('Y', [6,5]);      // mul - { on: Y, [x:6, y:5], result: [30] }
})();


// 04. Una de las características que los desarrolladores de lenguajes orientados
// a objetos echan de menos en JS es la posibilidad de sobrecargar funciones. Esto es,
// funciones con el mismo nombre pero distinto número de parámetros y cuerpo de
// sentencias. Los compiladores de estos lenguajes saben discriminar en tiempo de
// ejecución que versión de una función llamar en virtud del número de argumentos
// actuales que recibe en cada momento. ¿Sabrías simular este comportamiento en JS?

(function (/* 04. overload */){
    
    var overload = function () {

    };
    
    var add = overload (
        function (x)       { return x; },
        function (x, y)    { return x + y; },
        function (x, y, z) { return x + y + z; }
    );
    console.log (
        add (2),    // 2
        add (2,3),  // 5
        add (2,3,5) // 10
    );

})();


// 05. Los frameworks de pruebas tipo Jasmine permiten definir test
// unitarios que se ejecutan en batería y sirven para comprobar la 
// corrección del código. Este tipo de librerías incluye una función
// [it] que representa un test y recibe como parámetros una descripción
// para la prueba y una función fn con el cuerpo de dicha prueba.
// Todos los test definidos mediante [it] se incluyen dentro de una
// función [describe] como argumentos actuales. ¿Implementamos un
// mini jasmine?

(function (/* 05. describe */){
    
    var describe = function (suite) {

    };
    var it = function (test, fn) {

    };
    
    console.log (
        describe ('Test Suite')(
            it('test 1', function () {
                return 2 + 3 === 5;
            }),
            it('test 2', function () {
                return 2 - 3 === 5;
            })
        ) 
    );
    
    // { suite  : 'Test Suite',
    //   result : [
    //     { test: 'test 1', result: true  },
    //     { test: 'test 2', result: false } 
    //   ]
    // }
   
})();
