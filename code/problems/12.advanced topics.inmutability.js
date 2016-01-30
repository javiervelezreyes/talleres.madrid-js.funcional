// Advanced Topics II. Inmutability [30 min]


// 01. Una lista es una estructura de datos recursiva con 2 operaciones
// fundamentales. [first] devuelv eel primer elemento de la lista mientras
// que [tail] devuelve la sublista detras de la lista. Esta definición 
// recursiva es muy apropiada para la argorítmia funcional. Utilizando
// arrays implementa la estructura [List] que resibe como argumento un 
// array de datos para incluir en la lista.

(function (/* 01. List */) {
    
    var List = function (data) {
        var items = data || [];
        return {
            first: function () { 

            },
            tail: function () {

            },
            insert: function (e) {

            },
            empty: function () {

            },
            size: function () {

            },
            toArray: function () {

            }
        };
    };
    
    var list = List ([1,2,3]);
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray ()     // [ 1, 2, 3 ]
    );
    
    list.tail ();
    
    console.log (
        list.first (),      // 2
        list.size (),       // 2
        list.toArray ()     // [ 2, 3 ]
    );
    
    list.insert (4);
    
    console.log (
        list.first (),      // 4
        list.size (),       // 3
        list.toArray ()     // [ 4, 2, 3 ]
    );
    
})();


// 02. El problema de la definición de lista anterior es que es una
// estructura mutable. Esto significa que tiene un estado interno, los
// datos de la lista, que se van transformando según se aplican operaciones
// mutadoras: [tail] es destructora e [insert] es mutadora. ¿Sabrías 
// implementar una versión inmutable de la lista en [IList] para que las
// operaciones no transformen un estado interno sino que generen una nueva
// versión transformada de la lista como salida? Recuerda que con el método
// [concat] de Array puedes clonar estructuras de arrays.

(function (/* 02. IList #1 */) {
    
    var IList = function (data) {
        var items = data || [];
        return {
            first: function () { 

            },
            tail: function () {

            },
            insert: function (e) {

            },
            empty: function () {

            },
            size: function () {

            },
            toArray: function () {

            }
        };
    };
    
    var list = IList ([1,2,3]);
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray ()     // [ 1, 2, 3 ]
    );
    
    list.tail ();
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray ()     // [ 1, 2, 3 ]
    );
    
    list.insert (4);
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray ()     // [ 1, 2, 3 ]
    );
    
    list = list.tail ();
    
    console.log (
        list.first (),      // 1
        list.size (),       // 2
        list.toArray ()     // [ 2, 3 ]
    );
    
    list = list.insert (4);
    
    console.log (
        list.first (),      // 4
        list.size (),       // 3
        list.toArray ()     // [ 4, 2, 3 ]
    );
    
})();


// 03. Con la lista definida en el ejercicio anterior hemos obtenido una estructura
// inmutable. Esto tiene grandes ventajas para razonar en funcional. De hecho la 
// inmutabilidad de datos y parámetros es un principio de diseño de este paradigma. 
// El problema es que si cada operación mutadora exige una clonación de todos los 
// datos la implementación de la estructura no parece muy eficiente y no escalará 
// bien en memoria. ¿Se te ocurre alguna forma de crear una nueva versión de [IList]
// que no exija tal esfuerzo computacional?

var IList = (function (/* 03. IList #2 */) {
    
    var IList = function (data) {
        
        return (function List (node) {
            return {   
                first: function () {

                },
                tail: function () {
                    
                },
                insert: function (e) {

                },
                empty: function () {

                },
                size: function () {

                },
                toArray: function () {

                },
                toString: function () {

                }
            };
        })(node);
    };
    
    var list = IList ([1,2,3]);
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray (),    // [ 1, 2, 3 ]
        list.toString ()    // {"first":1,"tail":{"first":2,"tail":{"first":3,"tail":{}}}}
    );
    
    list.tail ();
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray (),    // [ 1, 2, 3 ]
        list.toString ()    // {"first":1,"tail":{"first":2,"tail":{"first":3,"tail":{}}}}
    );
    
    list.insert (4);
    
    console.log (
        list.first (),      // 1
        list.size (),       // 3
        list.toArray (),    // [ 1, 2, 3 ]
        list.toString ()    // {"first":1,"tail":{"first":2,"tail":{"first":3,"tail":{}}}}
    );
    
    list = list.tail ();
    
    console.log (
        list.first (),      // 1
        list.size (),       // 2
        list.toArray (),    // [ 2, 3 ]
        list.toString ()    // {"first":2,"tail":{"first":3,"tail":{}}}
    );
    
    list = list.insert (4);
    
    console.log (
        list.first (),      // 4
        list.size (),       // 3
        list.toArray (),    // [ 4, 2, 3 ]
        list.toString ()    // {"first":4,"tail":{"first":2,"tail":{"first":3,"tail":{}}}}
    );
    
    return IList;
    
})();


// 04. La definición recursiva del nuevo tipo de datos lista invita a reformular todos
// los algoritmos recursivos estudiados al principio de este taller y que trataban con 
// arrays. Implementa las funciones [lReduce], [lMap] y [lFilter] homologas a las [reduce],
// [map] y [filter] definidas con anterioridad pero que operan con el tipo [IList].

(function (/* 04. lReduce, lMap & lFilter  */ ) {
    
    var lReduce = function (list, fn, b) {

    }; 
    var lMap = function (list, fn) {

    };
    var lFilter = function (list, pn) {

    };

    var list = IList ([1,2,3]);
    
    var add = function (x, y) { return x + y; };
    var evn = function (x) { return x % 2 === 0; };
    var sqr = function (x) { return x * x; };
    
    console.log (
        list.toArray (),                    // [ 1, 2, 3 ]
        lReduce (list, add, 0),             // 6
        lFilter (list, evn).toArray (),     // [ 2 ]
        lMap (list, sqr).toArray (),        // [ 1, 4, 9 ]
        list.toArray ()                     // [ 1, 2, 3 ]
    );
    
})();


// 05. La estructura de lista da pie a definir otras estructuras inmutables a partir de
// ella. Implementa la estructura inmutable [IStack] aprovechando las definiciones del
// ejercicio 03.

(function (/* 05. IStack */) {
    
    var IStack = function (data) {

        return (function Stack (list) {
            return {
                top: function () {
                    
                },
                push: function (e) { 

                },
                pop: function () {

                },
                empty: function () {

                },
                size: function () {

                },
                toArray: function () {

                }
            };
        })(list);
    };
    
    var stack = IStack ([1,2,3]);
    
    console.log ( 
        stack.top (),       // 1
        stack.size (),      // 3
        stack.toArray ()    // [ 1, 2, 3 ]
    );
    
    stack.pop ();
    
    console.log (
        stack.top (),       // 1
        stack.size (),      // 3
        stack.toArray ()    // [ 1, 2, 3 ]
    );
    
    stack.push (4);
    
    console.log (
        stack.top (),       // 1
        stack.size (),      // 3
        stack.toArray ()    // [ 1, 2, 3 ]
    );
    
    stack = stack.pop ();
    
    console.log (
        stack.top (),       // 2
        stack.size (),      // 2
        stack.toArray ()    // [ 2, 3 ]
    );
    
    stack = stack.push (4);
    
    console.log (
        stack.top (),       // 4
        stack.size (),      // 3
        stack.toArray ()    // [ 4, 2, 3 ]
    );
    
})();


// 05. La estructura de lista da pie a definir otras estructuras inmutables a partir de
// ella. Implementa la estructura inmutable [IMap] aprovechando las definiciones del
// ejercicio 03.

var IMap = (function (/* 06. IMap */) {
    
    var lInvert = function (list) {
        return list.empty () ?
            IList () :
            lInsertEnd (lInvert (list.tail()), list.first());
    };
    var lInsertEnd = function (list, e) {
        return list.empty () ?
            IList ().insert (e) :
            lInsertEnd (list.tail (), e).insert (list.first ());
    };
    var lReduce = function (list, fn, b) {
        return list.empty () ?
            b :
            lReduce (list.tail (), fn, fn (b, list.first(), list));
    }; 
    
    var IMap = function (obj) {
        var list = IList ([obj]);
        var find = function (list, k) {
            return list.empty () ?
                list :
                k in list.first () ?
                    list :
                    find (list.tail (), k);
        };
        
        return (function Map (list) {
            return {
                get: function (k) {
                    var hold = find (list, k).first ();
                    return hold ? hold[k]: void 0;    
                },
                put: function (k, v) {
                    var data = {};
                    data[k]  = v;
                    return Map (list.insert (data));
                },
                remove: function (k) {
                    return this.put (k, void 0);
                },
                empty: function () {
                    return list.empty () || list.first ().length === 0;
                },
                size: function () {
                    return Object.keys (this.toObject ()).length;
                },
                toObject: function () {
                    return lReduce (lInvert (list), function (o, e) {
                        return Object.keys (e)
                            .reduce (function (a, k) {
                                return e[k] === void 0 ? 
                                    (delete a[k], a) : 
                                    (a[k] = e[k], a);
                            }, o);
                    }, {});
                },
                toArray () {
                    return Object.keys (this.toObject ());
                }
            };
        })(list);
    };
    
    var map = IMap ({
        a : 1,
        b : 2,
        c : 3
    });
    
    console.log (
        map.get ('x'),      // 1
        map.size (),        // 3
        map.toObject ()     // { a: 1, b: 2, c: 3 }
    );
    
    map.put ('a', 2);
    
    console.log ( 
        map.get ('a'),      // 1
        map.size (),        // 3
        map.toObject ()     // { a: 1, b: 2, c: 3 }
    );
    
    map.remove ('a');
    
    console.log ( 
        map.get ('a'),      // 1
        map.size (),        // 3
        map.toObject ()     // { a: 1, b: 2, c: 3 }
    );
    
    map = map.put ('a', 2);
    
    console.log ( 
        map.get ('a'),      // 1
        map.size (),        // 3
        map.toObject ()     // { a: 2, b: 2, c: 3 }
    );
    
    map = map.remove ('a');
    
    console.log ( 
        map.get ('a'),      // undefined
        map.size (),        // 2
        map.toObject ()     // { b: 2, c: 3 }
    );
    
    return IMap;
    
})();


// 05. La estructura de lista da pie a definir otras estructuras inmutables a partir de
// ella. Implementa la estructura inmutable [ISet] aprovechando las definiciones del
// ejercicio 05.

(function (/* 07. ISet */) {
    
    var ISet = function (data) {
        var map = IMap (data.reduce (function (a, e) {
            return (a[e] = true, a);
        }, {}));

        return (function Set (map) {
            return {
                has: function (v) {
                    return !!map.get (v);  
                },
                put: function (v) {
                    return Set (map.put (v, true));
                },
                remove: function (v) {
                    return Set (map.remove (v));
                },
                empty: function () {
                    return map.size () === 0;
                },
                size: function () {
                    return map.size ();
                },
                toArray: function () {
                    return map
                        .toArray ()
                        .filter (function (e) {
                            return map.get (e);
                        })
                        .map (function (e) {
                            return parseInt (e);
                        });
                }
            };
        })(map);
    };
    
    var set = ISet ([1, 2, 3]);
    
    console.log (
        set.has (1),        // true
        set.has (4),        // false
        set.size (),        // 3
        set.toArray ()      // [ 1, 2, 3 ]
    );
    
    set.put (4);
    
    console.log (
        set.has (1),        // true
        set.has (4),        // false
        set.size (),        // 3
        set.toArray ()      // [ 1, 2, 3 ]
    );
    
    set.remove (1);
    
    console.log (
        set.has (1),        // true
        set.has (4),        // false
        set.size (),        // 3
        set.toArray ()      // [ 1, 2, 3 ]
    );
    
    set = set.put (4);
    
    console.log (
        set.has (1),        // true
        set.has (4),        // true
        set.size (),        // 3
        set.toArray ()      // [ 1, 2, 3, 4 ]
    );
    
    set = set.remove (4);
    
    console.log (
        set.has (1),        // true
        set.has (4),        // false
        set.size (),        // 3
        set.toArray ()      // [ 1, 2, 3 ]
    );
    
})();