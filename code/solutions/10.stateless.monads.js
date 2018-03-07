// Stateless II. Monads [15 min]


// 00. La monada identidad persigue articular procesos de composición
// de una manera fluida de una manera similar a como lo hemos logrado
// en ejercicios anteriores. Implementa esta mónada con estructura de
// objetos. Debes implementar un constructor [Id] y un método [bind]
// para la aplicación de funciones definido sobre el prototipo.

(function (/* 00. Monad Id */) {

    function Id (value) {
        this.value = value;
    }

    Id.prototype.bind = function (fn) {
        return fn (this.value);
    };

    var sqr    = function (x) { return new Id (x * x); };
    var inc    = function (x) { return new Id (x + 1); };
    var dec    = function (x) { return new Id (x - 1); };
    var double = function (x) { return new Id (2 * x); };

    console.log ( // { value: 20 }
        new Id (3)
            .bind (sqr)
            .bind (inc)
            .bind (double),
    );

    console.log ( // { value: 34 }
        new Id (4)
            .bind (sqr)
            .bind (inc)
            .bind (double)
    );

})();

// 01. Como hemos discutido antes, un problema de composición se da
// cuando en algún punto de la cadena de composición funcional, alguna
// función devuelve un valor indefinido. La mónada maybe resuelve este
// problema acarreando un estado de validad que se propaga hasta el final
// y en última instancia determina si el valor devuelto por la mónada es
// correcto. Implementa esta mónada con estructura de objetos. Debes
// implementar un constructor [Just] y un método [bind] para la
// aplicación de funciones definido sobre el prototipo.

(function (/* 01. Monad Just */) {

    function Just (value) {
        this.value = value;
    }

    Just.prototype.bind = function (fn) {
      if (this.value)
        return fn (this.value);
    };

    var sqr    = function (x) { return new Just (x * x); };
    var inc    = function (x) { return new Just (x > 10 ? x + 1 : void 0); };
    var dec    = function (x) { return new Just (x > 10 ? x - 1 : void 0); };
    var double = function (x) { return new Just (2 * x); };

    console.log ( // undefined
        new Just (3)
            .bind (sqr)
            .bind (inc)
            .bind (double)
    );

    console.log ( // { value: 34 }
        new Just (4)
            .bind (sqr)
            .bind (inc)
            .bind (double)
    );

})();


// 02. No es poco frecuente que queramos vincular a cada función cierta lógica
// de trazabilidad por ejemplo imprimiendo mensajes por pantalla. En programación
// funcional este tipo de comportamientos es inaceptable y se considera un efecto
// colateral. Para resolver este problema, la mónada escritor convierte esta traza
// en un log que se adjunta a los resultados y se acarrea como estado a lo largo de
// la cadena de composición. Implementa esta mónada con estructura de objetos. Debes
// implementar un constructor [Writer] y un método [bind] para la aplicación de
// funciones definido sobre el prototipo.

(function (/* 02. Monad Writer */) {

    function Writer (value, log) {
        this.value = value;
        this.log   = log || [];
    }

    Writer.prototype.bind = function (fn) {
        var r = fn (this.value);
        return new Writer (r.value, [...this.log, r.log]);
    };

    var sqr    = function (x) { return new Writer (x * x, ['sqr']); };
    var inc    = function (x) { return new Writer (x + 1, ['inc']); };
    var dec    = function (x) { return new Writer (x + 1, ['dec']); };
    var double = function (x) { return new Writer (2 * x, ['dbl']); };

    console.log ( // { value: 20, log: [ 'sqr', 'inc', 'dbl' ] }
        new Writer (3)
            .bind (sqr)
            .bind (inc)
            .bind (double)
    );

    console.log ( // { value: 34, log: [ 'sqr', 'inc', 'dbl' ] }
        new Writer (4)
            .bind (sqr)
            .bind (inc)
            .bind (double)
    );

})();


// 03. En ocasiones se requiere que el comportamiento de una función dependa de
// condiciones ambientales resueltas en tiempo de ejecución. Por ejemplo, un valor
// SO, un dato de una BD o fichero o una entrada por teclado. En programación
// funcional este tipo de comportamientos es inaceptable y se considera un efecto
// colateral. Para resolver este problema, la mónada lector monta la cadena de
// composición completa sobre unos datos ambientales delegados en forma de parámetros
// e incluye un método run sobre la estructura monádica para inyectar dichos datos
// al final de la cadena. Implementa esta mónada con estructura de objetos. Debes
// implementar un constructor [Reader] y un método [bind] para la aplicación de
// funciones definido sobre el prototipo.

(function (/* 03. Monad Reader */) {

      var _;

      function Reader (x, fn) {
          this.run = (
            fn ? fn :
            x  ? function ()  { return x; } :
                 function (x) { return x; }
          );
      }

      Reader.prototype.bind = function (fn) {
          return new Reader (_, function (x) {
              let y = this.run (x);
              return fn (y).run ();
          }.bind (this));
      };

      var sqr    = function (x) { return new Reader (x * x) };
      var inc    = function (x) { return new Reader (x + 1) };
      var dec    = function (x) { return new Reader (x - 1) };
      var double = function (x) { return new Reader (2 * x) };

      console.log ( // 20
          new Reader ()
              .bind (sqr)
              .bind (inc)
              .bind (double)
              .run (3)
      );

      console.log ( // 34
          new Reader ()
              .bind (sqr)
              .bind (inc)
              .bind (double)
              .run (4)
      );

})();


// 04. De una manera muy similar al caso anterior, a veces necesitamos operar sobre
// cadenas de composición que implican a estructuras con estado. Este es el caso de
// la composición de operaciones [push] y [pop] sobre el estado de una pila. En
// programación funcional este tipo de comportamientos es inaceptable y se considera
// un efecto colateral. Para resolver este problema, la mónada estado monta la cadena de
// composición completa y convierte el estado de la pila en parámetros de entrada que se
// van acarreando sobre la cadena de composición. Además incluye un método run sobre la
// estructura monádica para inyectar es estado inicial sobre el que debe evaluarse la cadena
// de composición. Implementa esta mónada con estructura de objetos. Debes implementar un
// constructor [State] y un método [bind] para la aplicación de funciones definido sobre el
// prototipo.

(function (/* 04. Monad state */) {
    
      var _;

      function State (fn, fns) {
          this.fns = [];
          fns && (this.fns = [...fns]);
          fn  && (this.fns = [fn, ...this.fns]);
      }

      State.prototype.bind = function (fn) {
          return new State (_, [...this.fns, ...fn ().fns]);
      };

      State.prototype.get = function (s) {
        return this.fns
            .reduce (function (r, fn) {
                return fn (r);
            }, s);
      };

      var stack = function (s) {
        return {state: s};
      };

      var push = function (x) {
          return function () {
              return new State (function push (state) {
                  let { state: xs } = state;
                  return { state : [x, ...xs] };
              });
          };
      };
      var pop = function () {
          return new State (function pop (state) {
              let [x, ...xs] = state.state;
              return  {
                state : xs,
                value : x
              };
          });
      };

      console.log ( // { value: 3, state: [ 1, 2 ] }
          new State ()
                .bind (push (1))
                .bind (push (2))
                .bind (push (3))
                .bind (pop)
                .bind (pop)
                .get (stack ([]))
      );

})();


// 05. La mónada de colección se utiliza para salvar la diferencia entre colecciones y
// elementos de colección en el marco de una composición funcional. La monada eleva el
// elemento atómico a una colección con ese dato  como único elemento de la misma y así
// homogeniza la estructura de datos lo que permite articular composiciones más fácilmente.
// Implementa esta mónada con estructura de objetos. Debes implementar un constructor
// [List] y un método [bind] para la aplicación de funciones definido sobre el prototipo.

(function (/* 05. Monad List */) {

    function List (value) {
        this.value = Array.isArray(value) ? value : [value];
    }

    List.prototype.bind = function (fn) {
        return new List (
            this.value.reduce (function (r, e) {
                return [...r, ...fn (e).value];
            }, [])
        );
    };

    var twitter = {
        javi  : ['juan', 'pedro', 'luisa'],
        pedro : ['juan', 'luisa'],
        luisa : ['pedro'],
        juan  : ['pedro', 'luisa'],
    };
    function followers (u) {
       return new List (twitter[u]);
    }
    console.log ( // { value: [ 'pedro', 'luisa', 'juan', 'luisa', 'pedro' ] }
        new List ('javi')
            .bind (followers)
            .bind (followers)
    );

})();


// 06. La mónada de continuación se utiliza para resolver los problemas en la composición
// funcional encontrados al aplicar estilo de paso de continuaciones. Esta mónada se conoce
// en el entorno de programación asíncrona como Promesa. Implementa esta mónada con estructura
// de objetos. Debes implementar un constructor [Continuation] y un método [bind] para la
// aplicación de funciones definido sobre el prototipo.

(function (/* 06. Monad continuation */) {

    function Continuation (value, hn) {
        this.then = hn || function (hn) {
            return hn (value);
        };
    }

    Continuation.prototype.bind = function (fn) {
        return this.then (function (value) {
          return fn (value)
        })
    };

    var sqr    = function (x) { return new Continuation (x * x); };
    var inc    = function (x) { return new Continuation (x + 1); };
    var dec    = function (x) { return new Continuation (x - 1); };
    var double = function (x) { return new Continuation (2 * x); };

     new Continuation (3)
        .bind (sqr)
        .bind (inc)
        .bind (double)
        .then (console.log);    // 20

    new Continuation (4)
        .bind (sqr)
        .bind (inc)
        .bind (double)
        .then (console.log);    // 34

})();
