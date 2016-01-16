// Stateless I. Basics [5 min]


// 01. Uno de los principio de la programación funcional consiste en
// trabajar siempre con funciones puras. Esto es funciones que no
// tienen en cuenta estado ni provocan efectos colaterales. ¿sabrias
// indicar donde esta el error funcional en la implementación [StackA]
// de una típica abstracción de datos pila? ¿sabrías como orientar mejor
// a funcional esta lógica?

(function (/* 01. Stack */) {
    
    var StackA = function (data) {
        var items = data || [];
        return {
            push: function (e) {
                items.push(e);   
            },
            pop: function () {
                return items.pop();
            },
            toString: function () {
                return items.toString ();
            }
        };
    };
    
    var StackB = function (data) {

    };

    var sA = StackA ([1, 2, 3]);
    sA.push (4);
    sA.push (5);
    sA.push (6);
    sA.pop ();
    console.log (sA.toString ());   // 1,2,3,4,5
    
    var sB = StackB ([1, 2, 3]);
    sB = push (sB, 4);
    sB = push (sB, 5);
    sB = push (sB, 6);
    sB = pop (sB);
    console.log (sB);   // { stack: [ 1, 2, 3, 4, 5 ], top: 6 }
    
})();