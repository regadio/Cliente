<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<title>Rodrigo Regadío Núñez issues</title>
<link href="/dashboard/issues.atom?assignee_username=rodrigo.regadio&amp;feed_token=iyAEbfCLzCEYtBzb_xMH&amp;state=opened" rel="self" type="application/atom+xml"/>
<link href="https://raspi/dashboard/issues" rel="alternate" type="text/html"/>
<id>https://raspi/dashboard/issues</id>
<updated>2022-10-13T11:43:16Z</updated>
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/44</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/44"/>
  <title>¡Esquívalo!</title>
  <updated>2022-10-13T11:43:16Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>¡Esquívalo!</summary>
  <description>## Resumen

* Añadiremos un _flag_ al estado del juego, `isGameOver`
* Cada vez que actualicemos la posición de un asteroide, verificaremos si está _en colisión_ con la nave espacial
* En caso afirmativo, estableceremos `isGameOver=true`
* Cuando esto suceda, se detendrá el bucle del juego y mostraremos la imagen `game_end.png`

## Descripción

Sólo nos falta que la partida termine cuando hay una colisión.

### Vamos a ello

Comencemos añadiendo un _booleano_ al `GAME_STATE`, llamado `isGameOver`[^1]:

```js
const GAME_STATE = {
    shipPosX: 302,
    shipPosY: 229,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    asteroids: [],
    isGameOver: false // Nuevo booleano
}
```

### ¿Cuándo `isGameOver`?

Cuando un asteroide colisione contigo, claro.

En `update` ya tenemos un bucle `for...of` que recorre cada asteroide. Lo aprovecharemos para verificar que _cada asteroide_ está (o no) colisionando con la nave espacial:

```diff
 function update(progressInMilliseconds) {
     console.log("Han transcurrido " + progressInMilliseconds + " milisegundos desde el último frame");
     const progressInSeconds = progressInMilliseconds / 1000;
     updateSpaceship(progressInSeconds);

     for (const asteroid of GAME_STATE.asteroids) {
         updateAsteroid(asteroid, progressInSeconds);
+        if (isCollisioning(asteroid)) {
+           console.log("Ha habido una colisión");
+           GAME_STATE.isGameOver = true;
+        }
     }
 }
```

## `isCollisioning`

Esta función va a recibir por parámetro:

* Un JSON representando la información de un asteroide en concreto

...y devolverá un _booleano_ indicando si hay colisión con la nave espacial o no.

```js
// Asteroides y colisiones
// --------------------------------------------------------------------------------------------------

function isCollisioning(asteroid) {

}
```

#### ¿Y cómo detectar la colisión?

Podríamos optar por devolver `true` si [ambos rectángulos intersecan](https://www.geeksforgeeks.org/find-two-rectangles-overlap/). Vamos a implementar por algo más sencillo:

* Si el punto medio de la nave espacial está _dentro_ de un asteroide, devolvemos `true`

&lt;img src="javascript-capabilities/docs/asteroid_collision_explanation.png" width=400 /&gt;

Empecemos creando una función que sirva para identificar si un _punto_ se halla dentro de un _rectángulo_:

```js
function isPointInsideRectangle(pointX, pointY, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {

}
```

Los nombres de los parámetros son autoexplicativos.

Ahora, vamos a escribir unas variables que nos servirán a continuación y que se entienden con facilidad:

```js
function isPointInsideRectangle(pointX, pointY, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    const rectangleLeftSide = rectangleX;
    const rectangleRightSide = rectangleX + rectangleWidth;
    const rectangleTopSide = rectangleY;
    const rectangleBottomSide = rectangleY + rectangleHeight;

}
```


&lt;img src="javascript-capabilities/docs/point_inside_rectangle.png" width=300 /&gt;

La línea restante es intuitiva:

```js
function isPointInsideRectangle(pointX, pointY, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    const rectangleLeftSide = rectangleX;
    const rectangleRightSide = rectangleX + rectangleWidth;
    const rectangleTopSide = rectangleY;
    const rectangleBottomSide = rectangleY + rectangleHeight;
    return (pointX &gt; rectangleLeftSide) &amp;&amp; (pointX &lt; rectangleRightSide) &amp;&amp; (pointY &gt; rectangleTopSide) &amp;&amp; (pointY &lt; rectangleBottomSide);
}
```

### Completando la colisión

Ya sólo falta usar esta función, enviando los parámetros adecuados:

```js
function isCollisioning(asteroid) {
    const spaceshipMidX = GAME_STATE.shipPosX + (SHIP_SIZE / 2);
    const spaceshipMidY = GAME_STATE.shipPosY + (SHIP_SIZE / 2);
    return isPointInsideRectangle(spaceshipMidX, spaceshipMidY, asteroid.posX, asteroid.posY, ASTEROID_SIZE, ASTEROID_SIZE);
}
```

¡Listo!

Nuestro _flag_ `isGameOver` se actualizará a `true` en cuanto un meteorito choque contra la nave espacial.

Cuando eso suceda, **no** nos interesa que el _game loop_ siga funcionando:

#### Terminar el bucle del juego

Sólo invocamos `requestAnimationFrame` en caso de que `isGameOver` sea `false`.

En cuanto se produzca una colisión, no ejecutaremos `loop`.

```js
function loop(timestamp) {
    if (GAME_STATE.isGameOver === true) { // Condición de guarda
        return;
    }
    
    // ...
}
```

#### Y dejemos de generar meteoritos

También nos interesa detener el `setTimeout`:

```js
function generateAsteroid() {
    if (GAME_STATE.isGameOver) { // Condición de guarda
        return;
    }
    
    // ...
}
```

## ¡No nos olvidemos!

### ...de **pintar** la pantalla de _game over_

En primer lugar, añadamos la nueva `Image`:

```js
// Constantes y variables 
// --------------------------------------------------------------------------------------------------

// ...

const imageGameover = new Image();
imageGameover.src = IMAGES_BASE_PATH + 'game_end.png';
```

...y usémosla en `draw`:

```js
function draw() {
    if (GAME_STATE.isGameOver === true) {
        CANVAS_CTX.drawImage(imageGameover, 0, 0, CANVAS.width, CANVAS.height);
        return;
    }
    
    // ...
}
```

**¡Listo!**

Puedes probar tu juego: http://localhost:8000/projects/asteroids.html

¿Cuánto tiempo eres capaz de sobrevivir?

Sea el tiempo que sea... **¡Enhorabuena!** Has completado un juego de notable dificultad y has dado pasos muy importantes en tu manejo de JavaScript.

### Añadamos un truquito...

**Incluye** este código en tu `asteroids.js`:

```js
function isInmortalTrickActive() {
    return window.location.search === '?inmortal=true';
} 
```

Y modifica esta línea:

```diff
-        if (isCollisioning(asteroid)) {
+        if (isCollisioning(asteroid) &amp;&amp; !isInmortalTrickActive()) {
```

Juega desde http://localhost:8000/projects/asteroids.html?inmortal=true. Nótese el sufijo `?inmortal=true` en la URL, llamado _query param_.

¿Cuánto tiempo eres capaz de sobrevivir ahora? :smile:

* Nota: Este cambio favorecerá reducir _flakiness_ en algún _test_ anterior.

### Por último

Verifica que el _test_ automático de la tarea es ejecutado con éxito por Cypress y no da errores.

Crea un nuevo _commit_ y sube tus cambios al repositorio con `git push`.

------------------------------------------------------------------------

[^1]: Por lo general, es buena práctica usar un prefijo `is` para nombres de variables y parámetros de tipo _booleano_. `gameOver` podría ser una variable tipo JSON con datos del final de la partida, mientras que `isGameOver` resulta menos confuso.</description>
  <milestone>Sprint #2</milestone>
  <assignees>
    <assignee>
      <name>Rodrigo Regadío Núñez</name>
      <email></email>
    </assignee>
  </assignees>
  <assignee>
    <name>Rodrigo Regadío Núñez</name>
    <email></email>
  </assignee>
</entry>
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/23</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/23"/>
  <title>Adivina el número</title>
  <updated>2022-09-30T11:10:33Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Adivina el número</summary>
  <description>## Resumen

* Añadiremos un `guessTheNumber.html`
* Implementaremos el juego _adivina el número_

## Descripción

Usemos lo aprendido sobre HTML y JavaScript para implementar el típico juego de _Adivina el número_:

### La tarea

**Se pide** que:

* Añadas un `guessTheNumber.html`:
  * Tendrá una etiqueta `&lt;p&gt;` que muestre el texto `Pienso en un número entre 0 y 100, ¿cuál es?`
  * A continuación, un `&lt;form&gt;` con `data-cy="userForm"`. Contendrá:
    * Un `&lt;input&gt;` con `data-cy="inputNumber"`. Será `type="number"`
    * Un `&lt;input&gt;` con `data-cy="inputSubmit"` y `type="submit"`
  * Al final, un `&lt;div&gt;` con `data-cy="message"`

Usará un _script_ que servirá para implementar el siguiente comportamiento:

* Inicialmente [generará un número **entero** aleatorio entre 0 y 100](https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/). Lo asignará a una `const`
* Imprimirá _por consola_ el número, usando el mensaje: `"El número es: {N}"`, donde `{N}` será _el número aleatorio_.
* Llevará la cuenta del _número de intentos_, inicialmente `0`
* Asignará al evento `"submit"` del formulario una _función_ que:
  * Prevendrá el comportamiento por defecto
  * Leerá el número[^1]
  * Si el número _aleatorio_ es **menor** (`&lt;`) que el número del usuario, **reemplazará** el contenido del `&lt;div&gt;` por un nuevo `&lt;p&gt;` con el mensaje `"Crees que estoy pensando en el número {N}... Pero estoy pensando en un número que es menor"`[^2] 
  * Si el número _aleatorio_ es **mayor** (`&gt;`) que el número del usuario, **reemplazará** el contenido del `&lt;div&gt;` por un nuevo `&lt;p&gt;` con el mensaje `"Crees que estoy pensando en el número {N}... Pero estoy pensando en un número mayor"`[^2] 
  * Si el número _aleatorio_ es **igual** (`===`) que el número del usuario, **reemplazará** el contenido del `&lt;div&gt;` por un nuevo `&lt;p&gt;` con el mensaje `"¡Enhorabuena! Has acertado en {X} intento(s)"` donde `{X}` es el _número de intentos_ que se incrementa en `1` cada vez que el usuario hace `submit`

En el _test_ automático, **no** hace falta que _al acertar_ exista un comportamiento especial.

Sin embargo... ¿Crees que estaría bien? ¿Serías capaz de _deshabilitar_ la interacción con el botón del formulario para que el usuario no pueda seguir jugando?

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.

-----------------------------------------------------

[^1]: Para interpretar como **número entero** la entrada (que será tipo `string`), debemos usar `parseInt()`. Por ejemplo: `const userNumber = parseInt(e.target.elements.inputNumber.value);`

[^2]: `{N}` será el _número introducido por el usuario_</description>
  <milestone>Sprint #1</milestone>
  <assignees>
    <assignee>
      <name>Rodrigo Regadío Núñez</name>
      <email></email>
    </assignee>
  </assignees>
  <assignee>
    <name>Rodrigo Regadío Núñez</name>
    <email></email>
  </assignee>
</entry>
</feed>
 
