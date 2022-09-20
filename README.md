# Cliente
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<title>Rodrigo Regadío Núñez issues</title>
<link href="/dashboard/issues.atom?assignee_username=rodrigo.regadio&amp;feed_token=iyAEbfCLzCEYtBzb_xMH&amp;state=opened" rel="self" type="application/atom+xml"/>
<link href="https://raspi/dashboard/issues" rel="alternate" type="text/html"/>
<id>https://raspi/dashboard/issues</id>
<updated>2022-09-16T18:39:38Z</updated>
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/1</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/1"/>
  <title>El mundo web</title>
  <updated>2022-09-16T18:39:38Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>El mundo web</summary>
  <description>## Resumen

* Hablaremos de cómo funciona el mundo web
* Comprenderemos en _qué_ consiste una página web
* Instalaremos un sencillo servidor web
* Serviremos la carpeta `www` de nuestro repositorio y la visitaremos desde nuestro navegador
* Instalaremos `node.js` para poder usar la herramienta Cypress, que permite lanzar _tests_ automáticos
* Probaremos el _test_ automático de la tarea, antes y después de modificar `index.html`
* Haremos `git add`, `git commit` y `git push` para subir los cambios al repositorio

## Descripción

[Internet](https://es.wikipedia.org/wiki/Internet) es un conjunto de redes de comunicaciones que usan la familia de protocolos [TCP/IP](https://es.wikipedia.org/wiki/Familia_de_protocolos_de_Internet), lo cual garantiza que las diferentes redes físicas que la componen constituyen una _gran red mundial_.

Internet es **la red de redes**.

#### ¿Qué es un protocolo?

Una definición formal de _cómo_ se hace algo. Cuando hablamos de protocolos TCP/IP nos referimos a las reglas sobre _cómo_ unas computadoras hablan con otras: El formato de los mensajes, la forma de enviarlos y recibirlos, etc.

Decimos _familia de protocolos TCP/IP_ porque hay varios. En concreto, unos _se apoyan en otros_. Tienen una base teórica en el [modelo OSI](https://concepto.de/modelo-osi/) y distinguimos cinco _capas_:

| Nivel | Nombre de protocolo |
|-------|---------------------|
|Aplicación|HTTP|
|Transporte|TCP|
|Red|IP|
|Enlace|MAC|
|Físico|Ethernet|

Si en vez de un cable _Ethernet_ usas WiFi, el protocolo empleado en ese nivel es distinto.

También hay muchos protocolos diferentes en otras capas. ¿Has escuchado hablar de UDP? ¿ICMP? ¿FTP?

#### ¿Qué son estas capas?

Las reglas que sigue tu ordenador para conectarse a Internet y entenderse con el resto del mundo. Cada una tiene su misión:

* Físico: Describe cómo dos máquinas _directamente conectadas_ pueden intercambiar `0`s y `1`s. 
* Enlace: Describe cómo una máquina _envía un mensaje_ a otra, aunque haya muchas _directamente conectadas_ (misma **red** ó **dominio de colisión**)
* Red: Describe cómo enviar mensajes (paquetes) a máquinas en redes diferentes, a través de _routers_.
* Transporte: Describe cómo establecer una _conexión fiable_ entre dos máquinas. Por ejemplo, retransmitiendo paquetes IP si se "pierden", o enumerándolos por si llegan "desordenados"
* HTTP: Describe cómo, empleando una conexión TCP/IP, se envían mensajes para intercambiar _hipertexto_ en HTML u otros formatos. Es el protocolo en el que se basa la **web**

### ¿La [World Wide Web (WWW)](https://developer.mozilla.org/es/docs/Glossary/World_Wide_Web)?

Exacto.

Debemos diferenciarlo de Internet.

La **World Wide Web** _se apoya_ en Internet y es un sistema interconectado de millones de _páginas web_ accesibles públicamente.

#### ¿Qué es una página web?

Un [documento HTML](https://developer.mozilla.org/es/docs/Web/HTML) que es _servido_ desde un **servidor**.

Mediante el protocolo **HTTP**, un navegador _web_ (como Firefox o Chrome) puede acceder a dicha página desde cualquier parte del mundo.

#### ¿Servidor?

Un servidor _web_ ó servidor HTTP es un programa informático que espera conexiones de clientes y da respuesta a sus peticiones. Normalmente está alojado en una _máquina_ también llamada **servidor**, pues ese es su propósito.

Sin embargo, **podemos lanzar un servidor HTTP en nuestro propio ordenador**.

¡Hagámoslo!

### Primeros pasos

Lo primero será _bajar_ este repositorio a tu disco duro.

Para ello necesitarás haber instalado [Git](https://git-scm.com/download/win) y tener tu usuario, email y clave SSH configurados apropiadamente. Si seguiste estos pasos e hiciste `git clone`, **ya** tienes disponible el repositorio en local. Sólo necesitas abrir un terminal de Windows _(tecla de Windows &gt; cmd)_, posicionarte en tu repositorio local con `cd` y traer los cambios haciendo _pull_:

```
git pull
```

#### ¡Hay una nueva carpeta en mi repositorio!

La carpeta `javascript-introduction` debe haber aparecido en la carpeta de tu repositorio local. Tendrá este contenido:

```
- javascript-introduction/
   |
   |- cypress/
   |
   |- docs/
   |
   |- www/
   |
   |- .gitignore
   |- cypress.config.js
   |- e2e-test-runner.js
   |- package.json
   |- package-lock.json
   |- run-tests.bat
```

* **cypress/**: Contiene _tests_ automáticos. Lanzaremos el primero después
* **docs/**: Imágenes que se muestran en las tareas
* **www/**: ¡Muy importante! Contendrá _aquello_ que vamos a _servir_ a los navegadores, a través de HTTP. Aquí escribiremos nuestro código HTML y JavaScript
* **.gitignore**: Archivo típico de Git. Contiene _qué_ ficheros no se deben añadir automáticamente a los _commits_
* **cypress.config.js**, **e2e-test-runner.js** y **run-tests.bat**: Están relacionados con los _tests_ automáticos. No los modificaremos
* **package.json** y **package-lock.json**: Información de dependencias. Básicamente, sirven para poder instalar la librería de _tests_ con un comando. No los modificaremos

## Poniendo en marcha nuestro servidor HTTP

Los servidores _web_ más populares son [Apache HTTP Server](https://httpd.apache.org/ABOUT_APACHE.html), que sirve el ~23,04% de las páginas de Internet, y [Nginx](https://www.nginx.com/), el ~22,01%.

Nosotros no instalaremos ninguno ni nos centraremos en el proceso de despliegue de aplicaciones web.

Vamos a conformarnos con un _pequeño servidor_ que viene incluido en el lenguaje de programación [Python](https://www.python.org/)

### Instalando [Python](https://www.python.org/)

Desde [la página de descargas](https://www.python.org/downloads/) bajamos la versión más reciente (`3.x`). Luego **ejecutamos** el instalador `.exe`.

Podemos emplear la _instalación por defecto_.

Nos aseguramos de añadir `python` al PATH. De esta forma, cuando abramos un terminal Windows (cmd.exe) y escribamos `python`, podremos ejecutar el intérprete del lenguaje.

Permitimos también acceso a la red o permisos de administrador si se solicitan.

&lt;img src="javascript-introduction/docs/python_installer.png" width=500 /&gt;

#### Cuando termine la instalación...

¡Tenemos Python listo!

Pero **no** vamos a trabajar con Python. Sólo lo queremos para...

#### ....lanzar un servidor HTTP

1. Abre un terminal Windows (cmd.exe) **nuevo**
2. Posiciónate usando `cd` en la carpeta `javascript-introduction` de tu repositorio local
3. Cambia a `www` (`cd www`)
4. **Desde esta carpeta**, lanzaremos el comando Python que _sirve_ el contenido del directorio a través de HTTP:

```
python -m http.server
```

### ¿Y ya está?

**¡Ya está!**

Puedes visitar tu página web accediendo a http://localhost:8000 desde tu navegador _web_. Nótese que `localhost` es un _alias_ para referirse a tu propio ordenador.

## _Test_ automático

Cada tarea tiene asociado un _test_ automático que se ejecuta empleando la herramienta [Cypress](https://www.cypress.io/).

Para que Cypress funcione, es necesario tener instalado [node.js](https://nodejs.org/es/).

### Instalar [node.js](https://nodejs.org/es/)

Vamos a la [página de descargas](https://nodejs.org/es/download/) y bajamos el instalador LTS de Windows. Lo ejecutamos, damos permisos y seguimos la opción por defecto.

### Ejecutar el _test_ automático

Desde **un nuevo terminal** (cmd.exe), cambiamos (`cd`) a la carpeta `javascript-introduction` y ejecutamos **dos** comandos:

```
npm install
```

...instalará la librería **Cypress** dentro de una nueva carpeta, `node_modules/`. Aceptamos todo lo necesario para terminar la instalación.

Luego:

```
npx cypress open
```

...para **lanzar Cypress**:

* Si tras lanzar el comando, Cypress **falla** al ejecutarse, **repetimos** `npx cypress open`.
* Durante la ejecución, **agregamos** Cypress como **excepción al _firewall_ de Windows**.

### `E2E testing`

Se abrirá una ventana. Elegimos _end-to-end testing_ (e2e):

&lt;img src="javascript-introduction/docs/cypress_e2e.png" width=250 /&gt;

Luego, elegimos iniciar el _software_ de pruebas en nuestro navegador preferido.

Se abrirá el navegador y mostrará la lista de _tests_.

**Ejecutamos** `T001getting_started.cy.js`.

#### ¡Vaya! Ha fallado

Si ves `AssertionError`... ¡Es lo esperado! Aún no hemos completado la tarea.

## La tarea

**Modifica** el archivo `www/index.html` y **sustituye** el contenido de la etiqueta `h1` por `Mis primeros pasos en la web`. Puedes hacerlo con tu editor favorito ([VSCode](https://code.visualstudio.com/), [Geany](https://www.geany.org/),...)

```diff
- &lt;h1 data-cy="pageHeader"&gt;¡Enhorabuena!&lt;/h1&gt;
+ &lt;h1 data-cy="pageHeader"&gt;Mis primeros pasos en la web&lt;/h1&gt;
```

### Vuelve a lanzar el _test_

¿Funciona ahora?

Si es así, **¡enhorabuena!** Primera tarea completada.

### Por último

Desde el terminal de Windows (cmd.exe), nos posicionamos en `javascript-introduction` y escribimos:

```
git add *
```

...para añadir los cambios a un nuevo _commit_. Después:

```
git commit -m "Completada tarea 1"
```

...y por último subimos los cambios al repositorio remoto:

```
git push
```

No está de más visitar la página de GitLab y verificar que el _commit_ se ha subido.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/2</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/2"/>
  <title>Otra página web</title>
  <updated>2022-09-16T18:39:40Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Otra página web</summary>
  <description>## Resumen

* Añadiremos un nuevo archivo `issue2.html` a la carpeta `www/`
* Veremos cómo acceder a él mediante HTTP, con el navegador _web_
* Añadiremos un enlace `&lt;a href&gt;` desde `index.html`
* Navegaremos usando nuestro enlace
* _(Y como siempre, subiremos nuestros cambios al repositorio)_

## Descripción

En la tarea anterior hemos modificado el archivo `index.html` y ello se traducía en que **nuestra página _web_** cambiaba.

¡Claro! Estamos **alterando los archivos** desde el **lado del servidor**.

#### ¿Los archivos? Pero si sólo hay **uno**

Es verdad

#### ¿Y puede haber más?

¡Por supuesto!

Es habitual que un servidor web ofrezca **varias páginas**, e incluso existan **enlaces** de unas a otras con la etiqueta `&lt;a&gt;`

### La tarea

**Crea** un **nuevo** archivo llamado `issue2.html`[^1] dentro de la carpeta `www/`.

Tendrá el siguiente contenido HTML:

```html
&lt;html&gt;
  &lt;body&gt;
    &lt;h1 data-cy="issue2header"&gt;BMW&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
```

Puedes **verificar** cómo se ve, lanzando tu servidor HTTP y visitando http://localhost:8000/issue2.html desde el navegador.

#### Añadiendo un _enlace_

Uno de los elementos principales en HTML son los [hiperenlaces](https://es.wikipedia.org/wiki/Hiperenlace). Se indican con la etiqueta `&lt;a&gt;`.

* Entre la etiqueta de _apertura_ y la de _cierre_, se escribe el texto visible por el usuario: `&lt;a&gt;Enlace&lt;/a&gt;`
* Con el _atributo_ `href`, se indica la dirección a la que lleva. 
  * Puede ser _absoluta_: `&lt;a href="www.google.es"&gt;Enlace&lt;/a&gt;`
  * O _relativa_, dentro del servidor: `&lt;a href="/issue2.html"&gt;Enlace&lt;/a&gt;`

**Añade** un enlace a `issue2.html` **en `index.html`**.

* El texto visible será `Marca de vehículos`
* Tendrá el atributo `data-cy="issue2link"`. _(Eso es usado por el test automático)_
* Puede ir en cualquier sitio de la página, dentro de `&lt;body&gt;`. Donde tú quieras.

```
&lt;a href="/issue2.html" data-cy="issue2link"&gt;Marca de vehículos&lt;/a&gt;
```

### Una vez termines...

...lanza el _test_ automático `T002new_webpage.cy.js` desde Cypress. Cuando verifiques que funciona correctamente... ¡Tarea completada!

### Por último

Haz `git add *` y `git commit -m "Tarea 2, enlace a issue2.html"` para crear un _commit_. Sube tus cambios al repositorio con `git push`.

------------------------------------------------

[^1]: Es importante que la **extensión** (`.html`) del archivo sea la correcta. Si lo creas con el Bloc de Notas, puede que se mantenga la extensión `.txt` y esté oculta por la configuración de Windows. ¡Verifica que esto no pasa!</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/3</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/3"/>
  <title>Servidor vs. cliente</title>
  <updated>2022-09-16T18:39:41Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Servidor vs. cliente</summary>
  <description>## Resumen

* Veremos la diferencia entre programar páginas web con código que se ejecuta en el servidor o código que se ejecuta en el cliente
* Introduciremos JavaScript
* Añadiremos un sencillo código JavaScript en `index.html`
* _(Y como siempre, subiremos nuestros cambios al repositorio)_

## Descripción

Hasta ahora disponemos de una carpeta `www/` donde residen nuestras páginas _web_ y son entregadas al cliente en el momento que las solicita.

Esta es la aproximación más **tradicional** del mundo _web_: Mi servidor _sirve_ ficheros. Esos ficheros contienen todo lo necesario para que el cliente _web_ los muestre adecuadamente de la forma más simple posible.

### ¡Qué poco dinámico!

¡Es verdad! En esta aproximación, el HTML es **estático**.

Para mejorar un poco la situación, surgieron **lenguajes de programación servidor**, como [PHP](https://www.php.net/). El código escrito en estos lenguajes **se ejecuta en el servidor** y **genera** un resultado en HTML, que **luego** se envía al cliente.

Por ejemplo, en [PHP](https://www.php.net/) puedes embeber código ejecutable entre las etiquetas `&lt;?php` y `?&gt;`. El servidor lo procesará y generará un HTML:

&lt;img src="javascript-introduction/docs/php_example.png" width=550 /&gt;

#### Pues ya está todo

¡Un momento!

A pesar de que hay muchísimas páginas escritas en PHP (u otros lenguajes de lado servidor), tiene sus **desventajas**.

Por ejemplo, si se conectan **muchos** clientes, el servidor tendrá que **procesar** todas las peticiones... ¡Muchas líneas de código a ejecutar!

#### ¿Por qué darle todo el trabajo duro al servidor?

Eso, ¿por qué?

#### ¿No sería mejor repartir un poco?

¡Buena idea!

En la **programación _web_ lado cliente**, se entrega **código ejecutable al cliente (navegador)**.

El **navegador _web_** es el encargado de **ejecutar el código**. ¡Así, el procesamiento _se distribuye a los clientes_ y nuestros servidores no sufren tanta carga!

### ¿Cómo se programa **lado cliente**?

Deberemos entregar al cliente algo más que HTML...

## [JavaScript](https://www.javascript.com/)

Es un lenguaje que lleva con nosotros más de 25 años y todos los navegadores _web_ son capaces de entender y ejecutar. A pesar del nombre, no se parece a Java.

¡Adelante! **Prueba** el breve tutorial introductorio a JavaScript que no te llevará ni un minuto:

* [Try JavaScript!](https://www.javascript.com/try)

### Y código como ese... ¿Lo ejecuta el navegador _web_?

Exacto.

#### ¿Cómo?

### `&lt;script&gt;&lt;/script&gt;`

Pongámoslo **en práctica**.

**Modifica** tu archivo `index.html` y añade `&lt;script&gt; &lt;/script&gt;`[^1] _al final_ de la etiqueta `&lt;body&gt;`:

```diff
     ...
+    &lt;script&gt; 
+    &lt;/script&gt;
   &lt;/body&gt;
 &lt;/html&gt;
```

**Dentro** de estas etiquetas puedes escribir código JavaScript... ¡Y el navegador lo ejecutará!

### La tarea

**Añade** la siguiente línea de código JavaScript **dentro** de `&lt;script&gt;&lt;/script&gt;`:

```html
    &lt;script&gt;
      document.getElementById("p1").innerHTML = "Este texto ha sido puesto aquí con JavaScript";
    &lt;/script&gt;
```

¿Qué ves al visitar http://localhost:8000?

¿Tiene sentido?

### Por último

Verifica que el _test_ automático de la tarea, `T003difference_serverside_and_clientside.cy.js` es ejecutado con éxito por Cypress y no da errores.

Haz `git add *` y `git commit -m "Tarea 3, cambiar p1 de index.html con JavaScript"` para crear un _commit_. Sube tus cambios al repositorio con `git push`.

-----------------------------------------------------------------------

[^1]: En la versión 4 de HTML era obligatorio especificar el atributo `type`, como `&lt;script type="text/javascript&gt;"`. Sin embargo, desde la versión definitiva de HTML 5 publicada en octubre de 2014, no es obligatorio.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/4</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/4"/>
  <title>Scripts externos, async, defer</title>
  <updated>2022-09-16T18:39:43Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Scripts externos, async, defer</summary>
  <description>## Resumen

* Veremos cómo añadir código JavaScript a una página web usando un archivo separado
* Veremos el comportamiento del código JavaScript si se especifica `async` o `defer`
* Añadiremos un _script_ externo y lo usaremos desde `index.html`

## Descripción

JavaScript es una herramienta muy poderosa. Es habitual que existan centenares de líneas de JavaScript en una página _web_. 

¿Van todas _embebidas_ dentro de un `&lt;script&gt;&lt;/script&gt;` del HTML?

#### ¡No!

Correcto.

En el mundo _web_ hay **3** formatos esenciales:

* `HTML`: El alma de la página. Contiene hipertexto.
* `CSS`: _Hojas de estilo_ que sirven para modificar la apariencia de elementos del HTML.
* `JavaScript`: Código ejecutable por el navegador _web_.

Cada uno de ellos **suele viajar** en archivos separados, con formato `.html`, `.css` y `.js` respectivamente. Desde el HTML, se _enlaza_ al `CSS` y al `JavaScript`.

### ¿Cómo?

En JavaScript, especificamos el atributo `src` dentro de `&lt;script&gt;`. ¡Hagámoslo!

### Un archivo `.js`

Adelante, **añade** un **nuevo archivo** dentro de **`www/`**. Vamos a llamarlo `small.js`.

**Dentro** de dicho archivo, añadiremos una línea de JavaScript como la que ya hemos visto. Esta vez, modificará el elemento `"p2"` así:

```javascript
document.getElementById("p2").innerHTML = "Modificado mediante un script externo";
```

### `&lt;head&gt;`

En HTML, además de `&lt;body&gt;`, suele especificarse la etiqueta [`&lt;head&gt;`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML). Contiene metadatos que no se muestran dentro de la página directamente, como el _título_, _codificación de caracteres_, _enlaces a hojas de estilo_... ¡Y _JavaScript_!

**Añade** dicha etiqueta a `index.html`, y **dentro**, _enlaza_ al fichero recién creado:

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script src="small.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
  ...
```

¡Prueba la página!

#### Hmm... No veo nada nuevo

¿No aparece el texto `Modificado mediante un script externo` en el segundo párrafo?

#### No

Vaya...

Debe ser porque los `&lt;script&gt;` se ejecutan a medida que el navegador _lee_ el HTML. Es decir, de forma **síncrona**.

#### ¿Qué falla?

1. El navegador _comienza a leer_ el HTML, para saber _qué_ debe mostrar
2. Se encuentra con una etiqueta `&lt;head&gt;` que contiene un `&lt;script&gt;`. Descarga `small.js` y lo ejecuta
3. Como _no hay_ ningún elemento `p2`... ¡No tiene efecto!
4. Sigue _leyendo_ el HTML. Pinta todos los elementos
5. Se encuentra un `&lt;script&gt;` al final (del ejercicio anterior). Modifica el `p1`... ¡Eso **sí** funciona!

### Entonces... ¿De qué sirve poner `&lt;script&gt;` al principio?

En realidad, ponerlo al final (antes de `&lt;/body&gt;`) es una solución _pasada de moda_. Para páginas muy grandes, primero se cargará todo el HTML y luego todo el JavaScript. ¿Por qué descargarlos _secuencialmente_ si se puede hacer de forma **paralela**?

Especificando `defer` obtenemos exactamente ese comportamiento:

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script defer src="small.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
  ...
```

* El _script_ encontrado en `&lt;head&gt;` se descarga _mientras_ el resto del HTML se _renderiza_. **Después** de pintar **todo** el HTML, **se ejecuta**.

### `defer` vs. `async`

Si especificamos varios _scripts_ con `defer`, tenemos garantizado que se ejecutarán **por orden** y **después de cargar el HTML**:

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script defer src="script1.js"&gt;&lt;/script&gt;
    &lt;script defer src="script2.js"&gt;&lt;/script&gt;
    &lt;script defer src="script3.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
  ...
  &lt;/body&gt;
&lt;/html&gt;
```

Una alternativa es `async`. Si lo usamos:

* Los _script_ se descargan de forma asíncrona, pero **no tenemos garantizado su orden de ejecución**. Es decir, a medida que se descarguen, el navegador los ejecutará... ¡Puede que el HTML **no** haya terminado de _renderizarse_!

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script async src="script1.js"&gt;&lt;/script&gt;
    &lt;script async src="script2.js"&gt;&lt;/script&gt;
    &lt;script async src="script3.js"&gt;&lt;/script&gt;
    &lt;!-- Con async no sabemos qué script se ejecutará primero y cuáles después --&gt;
    &lt;!-- Ni siquiera sabemos si el HTML se habrá cargado por completo cuando --&gt;
    &lt;!-- se ejecuten --&gt;
  &lt;/head&gt;
  &lt;body&gt;
  ...
  &lt;/body&gt;
&lt;/html&gt;
```

## La tarea

**Se pide** que añadas `defer` al `&lt;script&gt;` añadido anteriormente, que enlaza a `"small.js"`. Verifica que el segundo párrafo de la página se actualiza cuando visitas http://localhost:8000

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/5</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/5"/>
  <title>DOMContentLoaded</title>
  <updated>2022-09-16T18:39:44Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>DOMContentLoaded</summary>
  <description>## Resumen

* Expondremos una limitación de `async` y `defer`
* Veremos una alternativa, _escuchar_ el evento `DOMContentLoaded`
* Hablaremos sobre _listeners_
* Añadiremos un `&lt;script&gt;` nuevo a `index.html`

## Descripción

Hemos expuesto `async` y `defer`, dos atributos de `&lt;script&gt;` que sirven para indicar al navegador _web_ que **no** bloquee la carga de la página por culpa de los _scripts_.

Sin embargo, **sólo** funcionan para _scripts_ externos.

Es decir:

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script defer&gt;
      // El siguiente script no funcionará correctamente
      //
      // defer y async NO sirven para código JavaScript interno en la página
      //
      document.getElementById("p1").innerHTML = "Texto modificado";
    &lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;p id="p1"&gt;Texto original&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
```

### ¡Pues usemos **siempre** _scripts_ externos!

Esa es una solución.

Pero a veces, el código que tenemos es pequeño y queremos _ahorrarnos_ la descarga de un archivo `.js` externo.

Para ese _y otros_ escenarios, podemos emplear la siguiente herramienta:

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script&gt;
      // Esto SÍ funciona como se espera
      // En la página verás "Texto modificado"
      document.addEventListener("DOMContentLoaded", function() {
      
        document.getElementById("p1").innerHTML = "Texto modificado";
      });
    &lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;p id="p1"&gt;Texto original&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
```

#### Un momento, ¿qué es ese ejemplo?

Expliquémoslo.

### _Listeners_

Estamos acostumbrados a que el código se ejecute de forma _secuencial_.

Pero esto _se rompe_ si empleamos _listeners_.

Básicamente, al hacer `document.addEventListener` estamos indicando:

1. El nombre de un evento.
2. Código (una `function`) que se ejecutará _cuando tenga lugar el evento_.

¿Qué evento?

### `DOMContentLoaded`

Significa _Contenido DOM cargado_, es decir, _Cuando el DOM se ha cargado_.

`DOM` significa [Document Object Model](https://developer.mozilla.org/es/docs/Glossary/DOM). Es una _representación_ del documento HTML.

O sea, `DOMContentLoaded` es un evento que tiene lugar _cuando se ha cargado el HTML_.

#### Entiendo.

Excelente.

Veremos otros ejemplos más adelante.

### La tarea

**Se pide** que añadas otro `&lt;script&gt;` en `&lt;head&gt;` de `index.html`.

Tendrá una función que se ejecutará en `DOMContentLoaded`, como se vio más arriba. El código de la `function` será:

```javascript
        document.getElementById("p3").innerHTML = "Esto se ha alterado en DOMContentLoaded";
```

¿Ves el tercer párrafo de la página con el texto actualizado?

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/6</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/6"/>
  <title>Un vistazo a los fundamentos</title>
  <updated>2022-09-16T18:39:46Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Un vistazo a los fundamentos</summary>
  <description>## Resumen

* Hablaremos de las características de JavaScript
* Profundizaremos en la teoría de cómo se relaciona JavaScript con el navegador
* Crearemos dos archivos: `deathrace.html` y `generator.js`

## Descripción

JavaScript es un [lenguaje de programación interpretado](https://es.wikipedia.org/wiki/Int%C3%A9rprete_(inform%C3%A1tica)), que soporta [orientación a objetos](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos) y [dinámicamente tipado](https://developer.mozilla.org/es/docs/Glossary/Dynamic_typing). Fue creado _sobre_ el estándar [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript).

#### Poco a poco...

### ¿Lenguaje **interpretado**?

Un lenguaje **interpretado**, en contraposición a uno **compilado**, se ejecuta _mientras el intérprete lo va leyendo_.

Si la primera sentencia de tu código no contiene nada _ilegal_, el _intérprete_ (navegador _web_) la va a ejecutar. Luego, la siguiente. Luego, la siguiente... Y en caso de que haya algún error en alguna línea (como referenciar una variable que todavía **no** se ha inicializado), ¡se producirá un error _en tiempo de ejecución_!

Por otro lado, en un lenguaje _compilado_ como Java ó C, un _compilador_ _lee_ todo el código y verifica si hay algún error. ¿Has referenciado una variable en la línea 14 que todavía **no** se ha inicializado? ¡Error de compilación! _Nada_ de código llega a ejecutarse.

En ambos casos _pueden_ producirse errores de _ejecución_, como dividir entre `0`. Pero en un lenguaje _interpretado_, los errores de compilación simplemente no existen. Por eso, requiere más _destreza_ por parte del programador.

### ¿Orientación a objetos?

Un paradigma de programación (estilo, forma, filosofía) según el cual el código de los programas se encapsula en _clases_. 

La orientación a objetos tiene más peso en otros mundos, como [Java](https://www.java.com/es/), pero aún así la veremos más adelante para JavaScript.

### ¿Dinámicamente tipado?

Uno de los conceptos fundamentales en programación es el de **variable**. Una variable es un hueco en la memoria RAM de nuestros ordenadores que puede albergar cualquier valor. Dependiendo del tipo de dato que queremos albergar, hará falta más o menos espacio.

&lt;img src="javascript-introduction/docs/dynamically_typed.png" width="400"&gt;

Si este programa fue escrito en un lenguaje de programación fuertemente tipado, como [Java](https://www.java.com/es/), entonces el programador habrá tenido que teclear a mano el tipo de las variables en el momento de declararlas en el código:

```java
short edad;
float temperatura_corporal;
```

En contraposición, si este programa fue escrito en un lenguaje **dinámicamente tipado** como JavaScript, el programador no se preocupó necesariamente de _qué_ tipo serían las variables. Trabajó con ellas directamente y el intérprete les asignó el espacio necesario en memoria RAM.

Las variables, por lo tanto, no son _declaradas_. Se **asignan** directamente.

```javascript
const edad = 42
const temperatura_corporal = 37.555
```

Además, una variable puede _cambiar de tipo_ durante la ejecución:

```javascript
var edad = 42
edad = "42 años"
```

### ¿ECMAScript?

Un _estándar_.

Indica las _reglas_ de _cómo_ debe ser un lenguaje de programación, pero no es en sí _un lenguaje_.

Esto es un poco raro. Estamos acostumbrados a que un lenguaje de programación _es como es_ y punto. Java es Java. Python es Python.

Pues bien, en nuestro caso: JavaScript es JavaScript... **Y** acata las _reglas_ de ECMAScript. Este esfuerzo de _estandarización_ es necesario para homogeneizar el ecosistema de la _web_. Muchas veces pasa que unos navegadores _web_ soportan cosas distintas.

En https://canisue.com puedes ver un ejemplo de [qué navegadores soportan `BigInt` de JavaScript](https://caniuse.com/?search=bigint)

ECMAScript es una manera de _garantizar_ que un navegador _soporta_ ciertas características, como mínimo. Existen varias versiones que van modernizándose. Puedes [consultar aquí](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) cuál es la versión más reciente de **ECMA-262**.

### ¡Bien!

Ya tenemos un poco más claro algunos fundamentos del lenguaje JavaScript.

Ahora hablemos de...

## ...APIs

Una _Application Programming Interface_ es una especificación de _algo contra lo que puedes programar_.

¿Te has fijado en que en los ejemplos anteriores hemos usado `getElementById`? Esa _función_ es parte de una _API_.

También escribíamos `document`, pero no parecía que hubiéramos definido dicha variable en ningún sitio.

Son ejemplos de uso de la [API del DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model). Esta es una **API del navegador** que permite manipular el HTML y CSS, aplicar estilos, mostrar ventanas emergentes... 

Otros ejemplos de **APIs del navegador** son:

* La [API de geolocalización](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), con la que puedes acceder a información geográfica desde tu código JavaScript
* Las APIs de [Canvas](https://developer.mozilla.org/es/docs/Web/API/Canvas_API) y [WebGL](https://developer.mozilla.org/es/docs/Web/API/WebGL_API), que permiten crear gráficos animados en 2D y 3D
* Las [APIs de audio y vídeo](https://developer.mozilla.org/es/Apps/Fundamentals/Audio_and_video_delivery)

El potencial de JavaScript se desbloquea a través del uso de estas APIs. Son las herramientas para _llegar al usuario_.

### ¡Basta de definiciones!

## _Death race_

Es el año 2093.

La economía mundial ha caído en picado y empresas privadas se han hecho con el control de centros penitenciarios.

Con fines de lucro, se organizan carreras de vehículos blindados y modificados en las que participan los internos. Pero su seguridad... No está garantizada.

Vamos a crear una página `deathrace.html` que mostrará información sobre cada carrera, en particular, la _parrilla de salida_. Así el público podrá realizar sus apuestas de dudosa honorabilidad.

### La tarea

**Se pide** que añadas un nuevo fichero `deathrace.html` a la carpeta `www/` con el siguiente contenido:

```html
&lt;html&gt;
  &lt;head&gt;
    &lt;script defer src="generator.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h3 data-cy="pageHeader"&gt;Parrilla de salida&lt;/h3&gt;
    &lt;div id="mainDiv" data-cy="main"&gt;&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
```

Añade **también** un archivo `generator.js` que de momento no tendrá código ejecutable. Puedes poner un comentario:

```javascript
  // Generador de parrillas de salida
```

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/7</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/7"/>
  <title>Participantes de la carrera</title>
  <updated>2022-09-16T18:39:47Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Participantes de la carrera</summary>
  <description>## Resumen

* Comenzaremos a trabajar con _arrays_ en `generator.js`
* Veremos qué es `const`, `let` y `var`
* Usaremos `console.log`

## Descripción

En nuestro `generator.js` tendremos código JavaScript que produce una _parrilla de salida_.

Vamos a comenzar definiendo un _array_.

```javascript
// Generador de parrillas de salida
const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
```

### ¿`const`?

En JavaScript, como es _dinámicamente tipado_, **no** especificamos el _tipo de dato_ (e.g.: `int`, `char`,...) de una variable. Pero sí prefijamos una palabra reservada del lenguaje que indica _aquí va una variable nueva_: `const`.

En realidad, hay tres.

### `var`, `let`, `const`

#### `var`

Era la única palabra reservada para declarar variables antes de 2015, en versiones de ECMAScript anteriores a la `6`.

Es la más _flexible_ y la _menos deseable_, pues su excesiva flexibilidad puede dar lugar a errores difíciles de _debugear_.

* Una variable declarada con `var` puede cambiar de valor e incluso redeclararse:

```javascript
var nombre = "Alberto";
nombre = "Pepe"; // OK
var nombre = "Pepe Depura" // OK
```

* Su **alcance** puede alterarse.

Es decir, si se declara dentro de una función, su **alcance** está limitado a dicha función. Pero se puede usar _fuera_ de la función, y se convierte automáticamente en una variable de **alcance global**.

```javascript
console.log("Aquí empieza el código del programa");

function unaFuncionCualquiera() {
  console.log("La función ha sido invocada");
  var variableInterna = 13;
  console.log("El valor de la variable es: " + variableInterna);
}

console.log("Esta es la segunda línea que se ejecuta en el programa");
console.log("Ahora invocaremos una función cualquiera");
unaFuncionCualquiera();
console.log("Ahora demostraremos la alta volatilidad de variables definidas con var");
variableInterna = 50;
console.log("El valor de la variable lo hemos cambiado desde FUERA de la función: " + variableInterna);
```

La salida de este programa es:

```
Aquí empieza el código del programa
Esta es la segunda línea que se ejecuta en el programa
Ahora invocaremos una función cualquiera
La función ha sido invocada
El valor de la variable es: 13
Ahora demostraremos la alta volatilidad de variables definidas con var
El valor de la variable lo hemos cambiado desde FUERA de la función: 50
```

Eso de que **el alcance cambie**, **no** nos suele gustar a los desarrolladores.

#### ¿Alcance? ¿Por qué?

El _alcance_ de una variable es el fragmento del programa al que está limitado su uso.

Una variable tiene un alcance **global** si se declara al principio, o un alcance **limitado** si se declara en función o bloque de código (`while`, `if`, etc.).

Por ejemplo, en Java:

```java
System.out.println("Aquí empieza el programa");
int i = 0;
while (i &lt; 2) {
  String saludo = "¡Hola!";
  System.out.println(saludo);
  i++;
}
System.out.println(saludo); // Error de compilación
                            // La variable 'saludo' tiene alcance
                            // limitado a dentro del while
```

**No** es deseable que una variable se comporte como `variableInterna` arriba. La palabra `var` de JavaScript da lugar fácilmente a errores inesperados cuando reutilizamos nombres de variables fuera de funciones.

#### `let`

Existe desde ECMAScript 6 y se prefiere como alternativa a `var`:

* Una variable declarada con `let` tiene alcance _limitado_ al bloque de código donde se declaró.

```javascript
console.log("Aquí empieza el código del programa");
let deboSaludar = true;
if (deboSaludar) {
  let saludo = "¡Hola!";
  console.log(saludo);
}
console.log("El valor booleano de deboSaludar es: " + deboSaludar); // OK
console.log(saludo) // Error: El alcance de 'saludo' está limitado a
                    //        dentro del if
```

* Las variables `let` pueden cambiar de valor, pero **no** redeclararse.

```javascript
let nombre = "Alberto";
nombre = "Pepe"; // OK
let nombre = "Pepe Depura" // Error
```

#### `const`

Una versión más restrictiva que `let`:

* Una variable declarada con `const` tiene alcance _limitado_ al bloque de código donde se declaró.
* Una variable declarada con `const` es _constante_: Su valor no puede variar.

```javascript
const pi = 3.1416;
pi = 3; // Error
const otraConstante; // Error: Las constantes deben tener
                     //        siempre un valor inicial
```

## `generator.js`

¡Bien! Podemos seguir trabajando en nuestro código.

Por ejemplo, ya que hemos aprendido a usar `console.log`, escribe el siguiente código:

```javascript
// Generador de parrillas de salida
const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
console.log(participants[2]);
```

Como ves, accedemos a un valor de un array igual que en cualquier otro lenguaje: Con _corchetes_ (`[ ]`) e indicando un _índice_ (posición).

El valor de `participants[2]` será un _string_: El nombre del participante número `2` empezando a contar desde cero.

### Inspeccionar &gt; Consola

Podemos ver los _console.log_ producidos por la ejecución de JavaScript de una página desde cualquier navegador.

Puede variar ligeramente si usas Firefox, Opera, Chrome,... Pero, generalmente, debes:

1. Hacer _click_ derecho en cualquier parte de la página 
2. Seleccionar _Inspeccionar_. Se abrirá un panel especial
3. Seleccionar _Consola_. Normalmente es una pestaña del panel

**¡Adelante!** Visita http://localhost:8000/deathrace.html después de cambiar el código de arriba y sigue estos pasos.

¿Ves la salida pronosticada?

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/8</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/8"/>
  <title>Bucles for</title>
  <updated>2022-09-16T18:39:49Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Bucles for</summary>
  <description>## Resumen

* Usaremos `.length` para imprimir la longitud de un _array_
* Usaremos un `for` convencional para _recorrer_ la lista de participantes
* Usaremos un `for...of` como alternativa

## Descripción

Vamos a continuar trabajando en nuestro `generator.js`.

Una herramienta importante que debemos conocer sobre los _arrays_ es `.length`. Equivale a `.size()` en Java, y devuelve el número de elementos de un _array_.

Adelante, añade:

```javascript
// Generador de parrillas de salida
const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
console.log(participants[2]);
const numberOfParticipants = participants.length;
console.log(numberOfParticipants);
```

Visita http://localhost:8000/deathrace.html e inspecciona la _Consola_.

¿Qué ves? ¿Te encaja?

### Bucles [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement)

Su sintaxis es igual que en Java o C.

```javascript
for (let i = &lt;valor inicial&gt;; &lt;condición&gt;; &lt;incremento&gt;) {

}
```

Por ejemplo, para recorrer nuestro _array_ de participantes, te resultará lógico el siguiente `for`:

```javascript
for (let i = 0; i &lt; participants.length; i++) {
  // Contenido del bucle
}
```

Cualquier código que pongamos _dentro_ del bucle se ejecutará _tantas veces como se repita el bucle_.

¡Prueba el siguiente `console.log`!

```javascript
for (let i = 0; i &lt; participants.length; i++) {
  // Contenido del bucle
  console.log("Iteración número: " + i);
}
```

### Acceder a elementos del _array_

Ya lo hicimos en la tarea anterior, usando _corchetes_ (`[ ]`).

En esta ocasión, emplearemos el _índice_ del bucle.

**Añade** el siguiente código.

```javascript
for (let i = 0; i &lt; participants.length; i++) {
  // Contenido del bucle
  console.log("Iteración número: " + i);
  console.log("En el hueco " + i + " del array está " + participants[i]);
}
```

### [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for...of_statement)

Es una alternativa al bucle `for` convencional. Seguramente conozcas su versión en Java: _for-each_.

Se trata de un tipo de `for` específicamente pensado para _recorrer_ elementos de una colección.

Su sintaxis es:

```javascript
for (const &lt;elemento&gt; of &lt;colección&gt;) {

}
```

Así **nos ahorramos manejar índices** y nos centramos en trabajar con los _elementos_.

**Añade** el siguiente bucle a tu `generator.js`:

```javascript
for (const p of participants) {
  console.log("Participante " + p);
}
```

Al usar `p` estás refiriéndote a _los valores dentro del array_, igual que con `participants[i]` en el bucle anterior... ¡Pero ya no nos preocupamos por `i`!

¿Qué se ve en la _Consola_ tras visitar la página?

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/9</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/9"/>
  <title>Vehículos</title>
  <updated>2022-09-16T18:39:50Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Vehículos</summary>
  <description>## Resumen

* Declararemos un nuevo _array_ con los vehículos de cada piloto
* Usaremos `console.assert` y veremos el operador de igualdad estricta `===`
* Recorreremos el _array_ con un bucle `for` convencional

## Descripción

Ya tenemos nuestro _array_ de `participants`.

Cada participante usará su vehículo. Vamos a definir estos vehículos en un _array_ separado:

```js
const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
```

Así, suponemos que estos dos _arrays_ contienen la información de cada conductor y cada vehículo:

|              | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|--------------|---|---|---|---|---|---|---|
| participants | Manson | Fury | Storm | Kelloggs | Scarecrow | Number | Bull |
| vehicles | Peugeot 208 | Volkswagen Golf | Dacia Sandero | Renault Clio | Tesla Model 3 | Hyundai Tucson | Fiat Panda |

### Recorriendo dos _arrays_ con un solo `for`

Vamos a intentar imprimir este mensaje para cada participante:

```
"El corredor &lt;participante&gt; usa el coche &lt;vehículo&gt;"
```

Con un bucle `for` convencional será suficiente.

Pero, ¿usamos `participants.length` ó `vehicles.length`?

En principio, deben ser iguales.

### `console.assert`

_"En principio"_ a veces falla. Puede que en el futuro nuestros _arrays_ sean obtenidos de otra forma.

Para _asegurarnos_ de que algo es _como esperamos_, se suele emplear `assert`.

En otros lenguajes, como Python, rompe la ejecución si falla.

En nuestro caso usaremos `console.assert`, que tan sólo muestra un mensaje de advertencia en la _Consola_... ¡Pero suele ser suficiente para ver que algo está mal mientras lo desarrollamos!

Su sintaxis es:

```js
console.assert(&lt;condición&gt;, &lt;mensaje&gt;);
```

Si en tiempo de ejecución la `&lt;condición&gt;` es `false`, se imprimirá una advertencia con el `&lt;mensaje&gt;`

**¡Adelante!** Añade esto al final de `generator.js`:

```js
const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
console.assert(participants.length === vehicles.length, "¡Cuidado! Longitud de arrays diferente");
```

Como puedes ver, el _comparador de igualdad_ usado es `===`. Se prefiere este (3 _iguales_) al _comparador de igualdad relajado_ con 2 _iguales_ (`==`). El comparador `==` intenta convertir tipos de datos distintos y efectuar la comparación, lo cual puede dar lugar a resultados inesperados.

### Bucle

Ahora ya sabemos que es indistinto usar `participants.length` ó `vehicles.length`, pues _asumimos_ que son iguales.

Nuestro bucle puede ser, por lo tanto, idéntico al primer `for` de la tarea anterior:

```js
for (let i = 0; i &lt; participants.length; i++) {
}
```

Pero esta vez, dentro del cuerpo del bucle _accederemos a dos arrays distintos_ para efectuar un `console.log` como el que nos habíamos propuesto:

```js
for (let i = 0; i &lt; participants.length; i++) {
    console.log("El corredor " + participants[i] + " usa el coche " + vehicles[i]);
}
```

**¡Excelente!** Ya somos capaces de asociar cada piloto a su vehículo. Estamos más cerca de imprimir la parrilla de salida.

Deja este código añadido al final de tu `generator.js` y verifica la _Consola_ de tu página.

### Una alternativa

¿Qué te parece si usamos `for...of` para este mismo propósito?

#### Mala idea

¿Por qué?

#### Son dos _arrays_ distintos... No se puede usar `for...of` directamente

¡Es verdad!

¿Existirá alguna herramienta que nos lo facilite? :thinking:

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/10</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/10"/>
  <title>JavaScript Object Notation (JSON)</title>
  <updated>2022-09-16T18:39:51Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>JavaScript Object Notation (JSON)</summary>
  <description>## Resumen

* Entenderemos qué es JavaScript Object Notation
* Comprenderemos cómo se crea un objeto directamente
* Crearemos un _array_ de objetos con dos propiedades cada uno: `name` y `car`
* Lo recorreremos con un `for...of`

## Descripción

De la [documentación oficial de Mozilla sobre objetos en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects):

&gt;&gt;&gt;
JavaScript está diseñado en un paradigma simple basado en objetos. Un objeto es una colección de propiedades, y una propiedad es una asociación entre un nombre (o _clave_) y un valor. [...] Además de los objetos que están predefinidos en el navegador, puedes definir tus propios objetos.
&gt;&gt;&gt;

Seguramente hayas escuchado el concepto de _clase_ (`class` en Java). También existe en JavaScript, pero, de momento, trabajaremos **directamente** con objetos.

### ¿Cómo?

Se puede crear un objeto con `new Object()`, de forma parecida a Java:

```js
let myCar = new Object();
```

Y podemos _asignar_ el valor de propiedades a la vez que las declaramos:

```js
let myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;
```

_(¡Esto no se puede hacer en Java! Sería necesario declarar primero una clase con dichos atributos)_

Alternativamente, se puede usar sintaxis de _corchetes_ (`[ ]`) en lugar de _punto_ (`.`) para asignar (y leer) una propiedad:

```js
myCar['make'] = 'Ford';
console.log(myCar.model);    // Imprime 'Mustang'
console.log(myCar['model']); // Imprime 'Mustang'
``` 

### [JavaScript Object Notation (JSON)](http://www.json.org/json-en.html)

Es una forma de definir objetos directamente. Se usan _llaves_ (`{ }`):

```js
let myCar = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
};
```

Tiene **una gran relevancia**, pues no se limita a JavaScript. La realidad es que **se emplea en muchos lenguajes más** (como Python) y en **otros ámbitos**, como formato de intercambio de datos en APIs REST, por ejemplo.

### ¿Y se puede hacer un _array_ de objetos?

¡Claro!

**Añade** el siguiente _array_ a tu `generator.js`:

```js
const runners = [
    {
        "name": "Manson",
        "car": "Peugeot 208"
    },
    {
        "name": "Fury",
        "car": "Volkswagen Golf"
    },
    ...
```

Está incompleto. **Complétalo**.

Como ves, usa la misma información que en `participants` y `vehicles`.

### ¿Se puede usar `for...of`?

¡Claro!

Con `for...of` podemos recorrer cualquier _iterable_, sin importar si es un _array_ de datos primitivos, o de datos más complejos como _objetos_.

Adelante, **añade**:

```js
for (const runner of runners) {
    console.log(runner);
}
```

¿Qué imprime la _Consola_?

¿Se entiende fácilmente?

### Acceder a propiedades

Como hemos visto arriba, se puede usar la sintaxis de _corchetes_ (`[ ]`) o la de _punto_ (`.`) para acceder a _propiedades_ de un objeto.

¡Añadamos un nuevo **bucle**!

Será idéntico al anterior, pero imprimiremos las _propiedades_ `name` y `car` por separado:

```js
for (const runner of runners) {
    console.log(runner);
}
console.log("Información de los pilotos y sus coches en el array de objetos");
// Nuevo bucle
for (const runner of runners) {
    console.log("Conductor: " + runner.name + ". Coche: " + runner.car);
}
```

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/11</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/11"/>
  <title>Posición de salida</title>
  <updated>2022-09-16T18:39:53Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Posición de salida</summary>
  <description>## Resumen

* Declararemos un _array_ separado con el tiempo de clasificación de cada piloto
* Las ordenaremos de menor a mayor, para decidir la posición de salida de cada piloto

## Descripción

En las competiciones de motor, existen distintas reglas para determinar la _parrilla de salida_.

En nuestra _carrera de la muerte_, se hacen _sesiones de clasificación_:

* Cada piloto corre una vuelta al circuito, por separado
* No se pueden usar armas ni atentar contra la integridad de los pilotos mientras corren (en la vuelta de clasificación)

Cada piloto obtendrá un **tiempo**.

Este tiempo, medido en _décimas de segundo_, determina su posición en la parrilla de salida: El más rápido va primero, el segundo menor tiempo; segundo, etc.

### Tiempos de clasificación

Declaremos e inicialicemos un nuevo _array_ con los tiempos de cada piloto.

Será como `vehicles`, pero el tipo de dato será `int` y representa _décimas de segundo_.

**Añádelo** al final de `generator.js`:

```js
const times = [825, 834, 825, 907, 629, 759, 1151];
```

### [Ordenación por selección](https://www.geeksforgeeks.org/selection-sort/)

_Ordenar_ un _array_ es un problema recurrente en programación.

Nosotros vamos a implementar una versión sencilla del _algoritmo de ordenación por **Selección**_

&lt;img src="javascript-introduction/docs/selection_sort.gif" /&gt;

Como puedes ver, en un _array_ se recorren todas sus posiciones:

```js
const times = [825, 834, 825, 907, 629, 759, 1151];

for (let i = 0; i &lt; times.length; i++) {
  
}
```

Cada posición se considera _inicialmente_ la "menor":

```js
const times = [825, 834, 825, 907, 629, 759, 1151];

for (let i = 0; i &lt; times.length; i++) {
  let smallerTimeIndex = i;
  let smallerTime = times[i];
  
}
```

Y se recorren el resto de las que están _por delante_ (desordenadas):

```js
const times = [825, 834, 825, 907, 629, 759, 1151];

for (let i = 0; i &lt; times.length; i++) {
  let smallerTimeIndex = i;
  let smallerTime = times[i];
  for (let j = i + 1; j &lt; times.length; j++) {

  }
  
}
```

Para cada una, se comprueba si es menor que la "menor". En ese caso, pasa a ser "la nueva menor".

Con esto conseguimos _encontrar_ la "menor" de todas:

```js
const times = [825, 834, 825, 907, 629, 759, 1151];

for (let i = 0; i &lt; times.length; i++) {
  let smallerTimeIndex = i;
  let smallerTime = times[i];
  for (let j = i + 1; j &lt; times.length; j++) {
    if (times[j] &lt; smallerTime) {
      // Marcamos el más pequeño como 'menor'
      smallerTime = times[j];
      smallerTimeIndex = j;
    }
  }
  
}
```

Una vez se ha _encontrado_ la "menor" para esa vuelta del bucle exterior, se **intercambia** con la posición inicial, como en la animación superior. Finalmente, el _array_ estará ordenado:

```js
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

const times = [825, 834, 825, 907, 629, 759, 1151];

for (let i = 0; i &lt; times.length; i++) {
  let smallerTimeIndex = i;
  let smallerTime = times[i];
  for (let j = i + 1; j &lt; times.length; j++) {
    if (times[j] &lt; smallerTime) {
      smallerTime = times[j];
      smallerTimeIndex = j;
    }
  }
  swap(times, i, smallerTimeIndex);
}
```

**¡Enhorabuena!** El _array_ `times` está ahora ordenado.

**Añade** un `console.log` al final para verificarlo:

```js
console.log("Tiempos ordenados");
console.log(times);
```

¿Ves los tiempos ordenados de menor a mayor en la _Consola_ de http://localhost:8000/deathrace.html?

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/12</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/12"/>
  <title>Importar otro archivo JavaScript</title>
  <updated>2022-09-16T18:39:54Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Importar otro archivo JavaScript</summary>
  <description>## Resumen

* Moveremos el código que ordena un _array_ a un nuevo fichero `sort.js`
* Lo _importaremos_ desde `generator.js`

## Descripción

Hasta ahora hemos escrito varias sentencias de código JavaScript mientras íbamos aprendiendo. Parecen un poco caóticas, pero sirven su propósito.

Aún así, el código que _ordena_ un _array_ parece bastante útil...

¿No sería preferible moverlo a un fichero aparte?

Así lo podríamos **reutilizar** convenientemente.

### `generator.js`

En este archivo, vamos a _cortar_ (CTRL+X) el código de ordenación:

```diff
-
-function swap(array, i, j) {
-    const temp = array[i];
-    array[i] = array[j];
-    array[j] = temp;
-}

const times = [825, 834, 825, 907, 629, 759, 1151];
-
-for (let i = 0; i &lt; times.length; i++) {
-  let smallerTimeIndex = i;
-  let smallerTime = times[i];
-  for (let j = i + 1; j &lt; times.length; j++) {
-
-    if (times[j] &lt; smallerTime) {
-      // Marcamos el más pequeño como 'menor'
-      smallerTime = times[j];
-      smallerTimeIndex = j;
-    }
-  }
-  // Aquí intercambiamos la posición 'i' con el menor
-  swap(times, i, smallerTimeIndex);
-}

console.log("Tiempos ordenados");
console.log(times);
```

Y lo añadiremos a un nuevo fichero.

## `sort.js`

Estará en `www/`. _Pega_ (CTRL+V):

```javascript
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

for (let i = 0; i &lt; times.length; i++) {
  let smallerTimeIndex = i;
  let smallerTime = times[i];
  for (let j = i + 1; j &lt; times.length; j++) {

    if (times[j] &lt; smallerTime) {
      // Marcamos el más pequeño como 'menor'
      smallerTime = times[j];
      smallerTimeIndex = j;
    }
  }
  // Aquí intercambiamos la posición 'i' con el menor
  swap(times, i, smallerTimeIndex);
}
```

Ahora, el bucle que ordena lo pondremos _dentro_ de una función llamada `sort`.

Ya no usaremos `times`, sino un _parámetro_ de nombre arbitrario `arrayToSort`.

```javascript
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function sortArray(arrayToSort) {
    for (let i = 0; i &lt; arrayToSort.length; i++) {
      let smallerTimeIndex = i;
      let smallerTime = arrayToSort[i];
      for (let j = i + 1; j &lt; arrayToSort.length; j++) {
    
        if (arrayToSort[j] &lt; smallerTime) {
          // Marcamos el más pequeño como 'menor'
          smallerTime = array[j];
          smallerTimeIndex = j;
        }
      }
      // Aquí intercambiamos la posición 'i' con el menor
      swap(arrayToSort, i, smallerTimeIndex);
    }
}
```

Para terminar, añade al final del fichero un [`export`](https://javascript.info/import-export):

```javascript
export default sortArray;
```

### `generator.js` de nuevo

Desde aquí _importamos_ aquello que fue _exportado_ en `sort.js`, así:

```javascript
import sortArray from "./sort.js";

// Generador de parrillas de salida
```

**Debe ir al principio del fichero**.

¡Ya tenemos disponible la función `sortArray` que nosotros mismos hemos creado!

La usaremos más abajo, añadiendo un `console.log` extra:

```diff
  const times = [825, 834, 825, 907, 629, 759, 1151];
+ sortArray(times);
  console.log("Tiempos ordenados");
  console.log(times);
+ console.log("Ordenados con una función importada");
```

¡Listo!

#### Vamos a probarlo

¿Qué ves desde http://localhost:8000/deathrace.html?

#### Algo malo...

Uhm... ¿Quizá la _Consola_ indica...?

```
Uncaught SyntaxError: import declarations may only appear at top level of a module
```

#### Sí

Debemos añadir `type="module"` en la declaración del `&lt;script&gt;` **en `deathrace.html`**:

```html
    &lt;script defer type="module" src="generator.js"&gt;&lt;/script&gt;
```

### ¡Ahora funciona!

¡Excelente!

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/13</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/13"/>
  <title>built-in sort</title>
  <updated>2022-09-16T18:39:56Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>built-in sort</summary>
  <description>## Resumen

* Declararemos un nuevo _array_ con tiempos de clasificación: `times2`
* Usaremos el `sort` que viene con JavaScript
* Veremos sus limitaciones y lo adaptaremos para una comparación numérica

## Descripción

Hemos mencionado anteriormente que la _ordenación_ es un problema recurrente en la informática.

¡Así es!

De hecho, JavaScript tiene su propia función [`sort`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) para ordenar _arrays_.

### Nuevos tiempos

Vamos a continuar en `generator.js` escribiendo código de pruebas.

Esta vez, asumamos que los corredores han hecho una _segunda vuelta de clasificación_.

**Añade**, al final de `generator.js`, los resultados de dicha vuelta:

```js
const times2 = [834, 832, 830, 912, 624, 758, 1155];
```

### [`sort`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

Se invoca _sobre_ un array, así:

```js
times2.sort();
```

No hace falta _importar_ nada, pues es una utilidad propia de JavaScript.

¡Listo!

Hagamos un `console.log` de `times2`...

¿Qué ves?

#### Está mal ordenado

¿Mal ordenado?

#### Sí

Vaya...

Es porque el _criterio de ordenación_ que `.sort()` usa por defecto no es numérico. Está comparando los números como si fueran _strings_...

### Especificando un criterio de ordenación

Podemos darle a `.sort()` un _criterio de ordenación_. Basta con **pasar una función**[^1] que compara _dos_ valores:

* Si el primer valor es **menor** que el otro, se devuelve un número **negativo**
* Si el primer valor es **mayor** que el otro, se devuelve un número **positivo**
* Si ambos valores son iguales, se devuelve un **cero**

Por ejemplo:

```js
function compareAB(a, b) {
    if (a &lt; b) {
        return -1
    }
    if (a &gt; b) {
        return 1
    }
    if (a === b) {
        return 0
    }
}
const times2 = [834, 832, 830, 912, 624, 758, 1155];
times2.sort(compareAB);
console.log(times2);
```

### ¡Ahora se ve bien ordenado!

¡Excelente!

Es porque hemos especificado nuestro propio criterio.

Se podría hacer de forma más reducida:

```js
function compareAB(a, b) {
    return a - b;
}
```

E incluso _reducirlo_ todavía más empleando la sintaxis de [_arrow function_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

```js
times2.sort((a, b) =&gt; a - b);
```

...donde, si empleamos _una_ línea en la expresión que entrega el resultado; **no** necesitamos especificar `return`.

Nótese que sería algo equivalente a:

```js
const compareAB = (a, b) =&gt; a - b;
// ....
times2.sort(compareAB);
```

```js
const compareAB = (a, b) =&gt; {
  console.log("Aquí hay más de una línea");
  return a - b; // Se usa return
}
// ....
times2.sort(compareAB);
```

**Elige** tu versión preferida y mantén el `console.log` final que imprime los tiempos ordenados de `times2`.

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.

---------------------------------------------------------------------

[^1]: JavaScript permite usar _funciones_ como otra variable cualquiera, y enviarlas como parámetro a una función distinta. Esto no está permitido en otros lenguajes como Java.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/14</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/14"/>
  <title>Datos completos de los corredores</title>
  <updated>2022-09-16T18:39:57Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Datos completos de los corredores</summary>
  <description>## Resumen

* Crearemos un nuevo _array_ `completeRunnersData` que contiene nombre de piloto, vehículo, y _media aritmética_ de los tiempos de clasificación

## Descripción

Vamos a _fusionar_ la información de estos tres _arrays_ en uno sólo:

|   | runners                                       | times | times2 |
|---|-----------------------------------------------|------|-------|
| 0 | `{ name: Manson, car: Peugeot 208 }`          | 825 | 834 |
| 1 | `{ name: Fury, car: Volkswagen Golf }`        | 834 | 832 |
| 2 | `{ name: Storm, car: Dacia Sandero }`         | 825 | 830 |
| 3 | `{ name: Kelloggs, car: Renault Clio }`       | 907 | 912 |
| 4 | `{ name: Scarecrow, car: Tesla Model 3 }`     | 629 | 624 |
| 5 | `{ name: Number, car: Hyundai Tucson }`       | 759 | 758 |
| 6 | `{ name: Bull, car: Fiat Panda }`             | 1151 | 1155 |

Para empezar, recordemos que `times` y `times2` **ya fueron ordenados**. Por lo tanto, no se respeta el orden original.

Como no tendría sentido _desordenarlos_... Vamos a declararlos de nuevo con otros nombres:

```javascript
const unsortedTimes = [825, 834, 825, 907, 629, 759, 1151];
const unsortedTimes2 = [834, 832, 830, 912, 624, 758, 1155];
```

Luego **añadimos** un `console.assert` verificando que las longitudes son correctas:

```javascript
console.assert((runners.length === unsortedTimes.length) &amp;&amp; (runners.length === unsortedTimes2.length), "¡Cuidado! Longitud de arrays diferente");
```

### Bucle `for`

A continuación, crearemos una variable _array_ que servirá como acumulador del resultado final y escribiremos un bucle `for` apropiado:

```javascript
const completeRunnersData = [];
for (let i = 0; i &lt; runners.length; i++) {
  
}
```

### Media aritmética

La [media aritmética](https://enciclopediaeconomica.com/media-aritmetica/) es un valor representativo de una serie de valores. Consiste en sumar varios datos y dividirlos por _el número_ de datos. 

Si tienes un `6`, un `7` y un `9` en tres exámenes, tu media es `(6 + 7 + 9)/3 = 7.33`.

Como Manson tiene `825` décimas de segundo en la primera clasificación, y `834` en la segunda, su media es `(825 + 834) / 2`.

Dicha media, para cada corredor, la podemos calcular dentro del bucle `for` así:

```javascript
for (let i = 0; i &lt; runners.length; i++) {
  const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
  
}
```

Vamos a desear **truncar** el dato. Es decir, si hay decimales (_centésimas_ de segundo) los vamos a ignorar. Así, por ejemplo, `827.5` pasará a ser `827`:

```javascript
for (let i = 0; i &lt; runners.length; i++) {
  const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
  const truncatedMeanTime = Math.trunc(meanTime); // La librería Math no se importa. Podemos usarla directamente
  
}
```

Truncar no es lo mismo que redondear. Si quisiéramos redondear, usaríamos `Math.round`

### [_Spread syntax_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

La _Spread syntax_ es una novedad en JavaScript que nos permite escribir de forma resumida todas las claves-valor de un objeto o todos los argumentos de una función.

Lo usaremos para **crear** un nuevo objeto _como_ este (es un corredor inventado; no participa en la carrera):

```json
{
  "name": "Riddle",
  "car": "Furgón Prosegur",
  "time": 860
}
```

#### ¿Cómo lo haríamos **sin** _Spread syntax_?

Tendríamos que acceder a cada propiedad de cada elemento del _array_ `runners` así:

```javascript
for (let i = 0; i &lt; runners.length; i++) {
  const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
  const truncatedMeanTime = Math.trunc(meanTime); // La librería Math no se importa. Podemos usarla directamente
  const runnerData = {
    "name": runners[i].name,
    "car": runners[i].car,
    "meanTime": truncatedMeanTime
  }
  
}
```

#### ¿Y **con** _Spread syntax_?

Así:

```javascript
for (let i = 0; i &lt; runners.length; i++) {
  const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
  const truncatedMeanTime = Math.trunc(meanTime); // La librería Math no se importa. Podemos usarla directamente
  const runnerData = { ...runners[i] , "meanTime": truncatedMeanTime };
  
}
```

Y ahora, añadiremos `runnerData` uno a uno a nuestro _array_ `completeRunnersData`:

```javascript
const completeRunnersData = [];
for (let i = 0; i &lt; runners.length; i++) {
  const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
  const truncatedMeanTime = Math.trunc(meanTime);
  const runnerData = { ...runners[i] , "meanTime": truncatedMeanTime };
  completeRunnersData.push(complete);    
}
```

¿_`.push`_?

### [`.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

Es el _método_ que nos da JavaScript para añadir un elemento o elementos _al final_ de un _array_.

```js
const simpleArray = [];
simpleArray.push("Oxígeno");

console.log(simpleArray);
// Array [ "Oxígeno" ]
```

Si quieres añadir _al principio_ de un _array_, puedes usar [`.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift).

#### ¡Un momento! ¿Cómo puedo alterar un _array_ definido con `const`?

¡Ups!

#### En serio, ¿cómo es posible?

En realidad, un _array_ es, por naturaleza, mutable. Es así en todos los lenguajes de programación.

El _array_ es sólo un _puntero_. Digamos, una _referencia_ de 'dónde' está el primer elemento.

Con `.push` no alteramos esa _referencia_. Tan sólo añadimos elementos al final.

```js
const simpleArray = [];
simpleArray.push("Carbono"); // Está permitido
```

Lo que **no** podemos hacer es alterar la _referencia_. O sea, la _variable_ en sí:

```js
const simpleArray = [];
simpleArray = ["Carbono"]; // Error. Esto no se puede hacer
                           // Si fuera una variable 'let', sí
```

## `completeRunnersData` listo

¡**Añade** este par de _logs_ y verifica el resultado!

```javascript
const completeRunnersData = [];
for (let i = 0; i &lt; runners.length; i++) {
  const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
  const truncatedMeanTime = Math.trunc(meanTime);
  const runnerData = { ...runners[i] , "meanTime": truncatedMeanTime };
  completeRunnersData.push(complete);
  console.log("He añadido el elemento:");
  console.log(runnerData);
}
```

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/15</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/15"/>
  <title>Ordenar y mostrar en HTML</title>
  <updated>2022-09-16T18:39:59Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Ordenar y mostrar en HTML</summary>
  <description>## Resumen

* Ordenaremos `completeRunnersData` por el `"meanTime"` de cada corredor
* Mostraremos su contenido en nuevos elementos HTML `&lt;li&gt;` generados dinámicamente

## Descripción

Ahora que nuestro `completeRunnersData` está listo... ¡Ordenémoslo!

Adelante, **ordena** por `"meanTime"` de menor a mayor los contenidos del _array_. Puedes hacerlo como quieras. Por ejemplo, usando el `sort` _built-in_:

```javascript
completeRunnersData.sort( /* ??? */ );
```

## Crear y mostrar HTML

A continuación, mostremos la parrilla de salida empleando una lista ordenada (_ordered list_ `&lt;ol&gt;`) HTML.

Se pretende que el resultado mostrado en la _web_ sea _como_ este:

&lt;img src="javascript-introduction/docs/list_example.png" /&gt;

En HTML, esto se consigue con algo como:

```html
&lt;ol&gt;
  &lt;li&gt;Contenido del primer elemento&lt;/li&gt;
  &lt;li&gt;Contenido del segundo elemento&lt;/li&gt;
  &lt;li&gt;El tercero tiene &lt;b&gt;texto en negrita&lt;/b&gt;&lt;/li&gt;
  &lt;li&gt;Y el cuarto, en &lt;i&gt;cursiva&lt;/i&gt;&lt;/li&gt;
&lt;/ol&gt;
```

**¡Por fin!** Nuestro código dejará de consistir en abstractos `console.log` y **presentaremos** algo visual al usuario.

Esta es una de las fortalezas de JavaScript: La posibilidad de interactuar y _manipular_ el HTML. Es decir, mostrar un HTML _distinto_ al que venía originalmente del servidor.

Usaremos 3 funciones de la [API del DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model) que aún no hemos visto:

* `createElement`: _Crea_ una variable que representa un elemento HTML, como `&lt;div&gt;` ó `&lt;p&gt;`
* `setAttribute`: _Establece_ un _atributo_ (como `src` ó `href`) en un elemento
* `append`: _Añade_ un elemento a otro. Esta función se usa para vincular variables JavaScript al HTML real que se mostrará. Mientras no se usa `append`, los elementos creados con `createElement` no se _muestran_

### Crear un `&lt;ol&gt;`

Lo hacemos en una sola línea autoexplicativa:

```javascript
let theList = document.createElement("ol");
```

#### Recorrer el _array_ `completeRunnersData`

Comenzaremos con un bucle `for` convencional:

```js
for (let i = 0; i &lt; completeRunnersData.length; i++) {
    const runner = completeRunnersData[i]; // Cada uno de los corredores
    
}
```

### Crear un `&lt;li&gt;`...

...por cada _corredor_:

```js
for (let i = 0; i &lt; completeRunnersData.length; i++) {
    const runner = completeRunnersData[i];
    let aListItem = document.createElement("li");
}
```

### Establecer un atributo

Estableceremos `data-cy`, que se usa para identificar _cada_ elemento de la lista en los _tests_.

Conseguiremos un resultado _como_ este:

```html
&lt;ol&gt;
  &lt;li data-cy="element0"&gt; ... &lt;/li&gt;
  &lt;li data-cy="element1"&gt; ... &lt;/li&gt;
  ...
&lt;/ol&gt;
```

...así:

```js
for (let i = 0; i &lt; completeRunnersData.length; i++) {
    const runner = completeRunnersData[i];
    let aListItem = document.createElement("li");
    aListItem.setAttribute("data-cy", "element" + i)

}
```

### Contenido de cada `&lt;li&gt;`

Lo _formatearemos_ de la siguiente forma:

```js
    aListItem.innerHTML = "&lt;b&gt;" + runner.name + "&lt;/b&gt;, &lt;i&gt;" + runner.car + "&lt;/i&gt;. Tiempo de clasificación: " + runner.time + " décimas de segundo";
```

### ¿_Dónde_ van los `&lt;li&gt;`?

**Dentro** de la etiqueta `&lt;ol&gt;`.

Por ello, la última línea de código dentro del bucle será:

```js
    theList.append(aListItem);
```

### `&lt;ol&gt;` completo

Cuando el bucle finaliza, la variable `theList` (que representa un `&lt;ol&gt;`) tiene elementos hijos `&lt;li&gt;` _formateados_ como queremos.

¡Pero aún está _en el aire_!

No ha sido añadida a ningún lugar específico del HTML real.

Vamos a **añadirla** al `&lt;div&gt;` que existe en tu `deathrace.html`:

```html
  &lt;body&gt;
    &lt;h3 data-cy="pageHeader"&gt;Parrilla de salida&lt;/h3&gt;
    &lt;div id="mainDiv" data-cy="main"&gt;&lt;/div&gt; &lt;!-- Aquí --&gt;
  &lt;/body&gt;
```

...y lo haremos con esta última línea en el fichero `generator.js`:

```js
document.getElementById("mainDiv").append(theList);
```

Visita http://localhost:8000/deathrace.html

Si ves la _parrilla de salida_ correctamente, **¡enhorabuena!** Has manipulado tu primer HTML tras aprender unos cuantos fundamentos y sintaxis de JavaScript.

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/16</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/16"/>
  <title>El fin de la distopía</title>
  <updated>2022-09-16T18:40:00Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>El fin de la distopía</summary>
  <description>## Resumen

* Veremos qué son los `&lt;form&gt;` en HTML
* Añadiremos `taxis.html`, que tendrá un formulario para insertar datos de un taxista
* Añadiremos `taxiAdmin.js`, donde una función JavaScript responderá al evento `onsubmit` del formulario

## Descripción

¡Felicidades!

Tu trabajo creando una _web_ que muestra la parrilla de salida de las _carreras de la muerte_ ha sido de gran utilidad.

Las apuestas se han popularizado y consecuentemente han generado una gran preocupación por el estado de la sociedad. Grandes movimientos de recuperación han tomado fuerza y la economía y los valores cívicos han resurgido.

¡El mundo está mejor!

Ahora la gente vuelve a trabajar y a sonreír, a dar un paseo, coger un taxi...

### Un taxista se acerca a ti

Te saluda y te pide un autógrafo, pues tu trabajo en las _carreras de la muerte_ es popular.

Luego, te da una idea:

&gt; Pues aquí en la cola de la parada de taxis a veces no nos organizamos muy bien. Se posiciona primero por la mañana el que antes llega, y muchas veces es injusto. ¿Tú podrías hacer algo? Yo creo que sería más equitativo si **el primer taxista** en la cola de taxis por la mañana fuera **el que ganó menos dinero el día anterior**

Preparas tu sociedad limitada y te reúnes con el gremio de taxistas que aceptan unánimente acatar tus órdenes como administrador de la flota de taxis.

### Manos a la obra

Vamos a crear una nueva página para gestionar los taxis.

* **Añade** `taxiAdmin.js` a `www/`. De momento, vacío

* **Añade** `taxis.html` a `www/`
  * Tendrá un `&lt;script&gt;` en `&lt;head&gt;` que _linkará_ a `"taxiAdmin.js"`. Usará `defer`.
  * Dentro de `&lt;body&gt;`:
    * Un `&lt;h1&gt;` con `data-cy="pageHeader"` y contenido `"Admin. Taxis"`
    * Un `&lt;div&gt;` con `id="mainDiv"` y `data-cy="main"`
    * Debajo, justo antes de `&lt;/body&gt;`, tendrá el siguiente [formulario HTML](https://developer.mozilla.org/es/docs/Learn/Forms/Your_first_form):
    
```html
    &lt;form data-cy="taxiForm" id="taxiForm"&gt;
        &lt;input data-cy="input1" name="inputName" type="text" placeholder="Taxista" /&gt;
        &lt;input data-cy="input2" name="inputKms" type="number" placeholder="Kms" /&gt;
        &lt;input data-cy="input3" name="inputTravelCount" type="number" placeholder="Cantidad de viajes" /&gt;
        &lt;input data-cy="input4" type="submit" value="Insertar" /&gt;
    &lt;/form&gt;
```

### ¿Qué es un formulario HTML?

Un recurso que permite a los usuarios de navegadores _web_ **enviar** información al servidor.

#### ¿Eso no sucede en el momento de visitar la página?

Sí, cuando visitas una página ya mandas información como la propia URL. Pero un _formulario_ tiene un propósito especial. Sirve para **subir datos**. Su semántica indica que el usuario puede llevar a cabo **acciones** como cambiar contraseña, hacer _login_, añadir un comentario,...

Los formularios **funcionan sin JavaScript**.

El estándar especifica que los navegadores web deben mandar una petición HTTP especial cuando un usuario lleva a cabo una acción mediante un formulario.

#### ¿Qué acción?

¡Pruébalo!

Visita http://localhost:8000/taxis.html.

Introduce valores y pulsa **Insertar**. ¿Qué sucede?

### JavaScript y formularios

Nosotros vamos a **_sobreescribir_** este comportamiento por defecto.

Adelante, en `taxiAdmin.js` añade:

```js
const taxiDrivers = []; // Declaramos una variable. Aquí acumularemos la información que permitiremos añadir una y otra vez, pulsando Insertar

function customOnSubmit(event) {
    event.preventDefault(); // Esta línea indica al navegador que el
                            // comportamiento por defecto del formulario
                            // NO debe tener lugar
                            // ¿Verdad que ahora no se refresca la
                            // página al pulsar Insertar?
    
}

// Asignamos nuestra función al evento "submit"
document.getElementById("taxiForm").addEventListener("submit", customOnSubmit);                
```

De momento, sólo haremos una cosa sencilla (además de _prevenir_ el comportamiento `onsubmit` por defecto): Vamos a añadir los datos de cada nuevo taxista al _array_ `taxiDrivers`.

Para acceder _a los datos introducidos por el usuario_, usaremos la variable `event` que existe en nuestra función `onsubmit` personalizada:

```js
function customOnSubmit(event) {
```

Esta variable es entregada por JavaScript y contiene información sobre el _evento_.

Entre otras cosas, los valores introducidos por el usuario en `event.target.elements.&lt;inputName&gt;.value`.

Dicho de otra forma:

```js
function customOnSubmit(event) {
    event.preventDefault();
    const userInsertedName = event.target.elements.inputName.value;
    const userInsertedKms = event.target.elements.inputKms.value;
    const userInsertedTravels = event.target.elements.inputTravelCount.value;
    const newDriver = {
        "name": userInsertedName,
        "distance": userInsertedKms,
        "travels": userInsertedTravels
    }

}
```

### Cada vez que pulsas _Insertar_, añades un 'taxista' al _array_

Así:

```diff
function customOnSubmit(event) {
    event.preventDefault();
    const userInsertedName = event.target.elements.inputName.value;
    const userInsertedKms = event.target.elements.inputKms.value;
    const userInsertedTravels = event.target.elements.inputTravelCount.value;
    const newDriver = {
        "name": userInsertedName,
        "distance": userInsertedKms,
        "travels": userInsertedTravels
    }
+   taxiDrivers.push(newDriver);
+   console.log("Añadidos datos de taxista");
+   console.log(newDriver.name);
+   console.log(newDriver.distance);
+   console.log(newDriver.travels);
}
```

Asegúrate de añadir también los `console.log` para verificar el funcionamiento.

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/17</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/17"/>
  <title>Lista de taxis</title>
  <updated>2022-09-16T18:40:02Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Lista de taxis</summary>
  <description>## Resumen

* Vamos a añadir un `&lt;li&gt;` a un nuevo `&lt;ol&gt;` cada vez que se _Inserta_ un nuevo taxista

## Descripción

Esta tarea es similar a aquella que llevamos a cabo para completar la _carrera de la muerte_.

### La tarea

**Se pide**:

* Que añadas `&lt;ol data-cy="orderedList" id="taxisList"&gt;&lt;/ol&gt;` **dentro** del `&lt;div&gt;` principal en `taxis.html`. Hazlo directamente en el HTML
* Que en `customOnSubmit` de `taxiAdmin.js`, _después_ de los `console.log` de la tarea anterior:
  * **Crees** una variable `&lt;li&gt;` con `createElement`
  * Establezcas en ella como `innerHTML` el _nombre_ de taxista introducido
  * _(No nos preocuparemos por `data-cy`)_
  * **Añadas** ese `&lt;li&gt;` al `&lt;ol&gt;`
  
Verifica el comportamiento de http://localhost:8000/taxis.html.

Deberías ver un nuevo elemento en la lista cada vez que añades un taxista con _Insertar_.

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/18</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/18"/>
  <title>Clases y método constructor</title>
  <updated>2022-09-16T18:40:03Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Clases y método constructor</summary>
  <description>## Resumen

* Veremos qué es una _clase_ en programación orientada a objetos
* Declararemos una nueva clase `Taxi` en un archivo nuevo `taxi.js`
* Sustituiremos el valor de `newDriver` en `taxiAdmin.js`. Pasará de ser un JSON `{ }` a ser un `new Taxi`

## Descripción

La [programación orientada a objetos](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos) es un paradigma de programación en el cual se emplean _clases_ como recurso principal en el código.

Las _clases_ definen los atributos y el comportamiento de _objetos_. Dicho de otra forma, un _objeto_ es de una _clase_.

Puede entenderse que una _clase_ representa una entidad del mundo real, o, simplemente, cualquier cosa _representable_. Un objeto, por tanto, es una variable de un tipo especial: ¡La clase!

Por ejemplo: `Humano` es una clase que tiene sentido, mientras que `const pepeDepura = new Humano();` sería un _objeto_ de esa clase.

### ¿Un JSON no era un _objeto_?

¡También!

Un objeto que ponemos en nuestro código y usamos directamente. Por ejemplo, `newDriver` en `taxiAdmin.js`:

```js
    const newDriver = {
        "name": userInsertedName,
        "distance": userInsertedKms,
        "travels": userInsertedTravels
    }
```

Ahora vamos a sustituir ese JSON por una _instancia_ de una _clase_.

De momento, se tratará de un _refactor_. **No** cambiará la funcionalidad de la página.

En la siguiente tarea veremos cómo podemos exprimir el potencial de una `class` personalizada como la que vamos a añadir.

### JavaScript `class`

**Añade** un nuevo fichero `taxi.js`. Este será su contenido inicial:

```js
class Taxi {

}

export default Taxi;
```

Como ves, se usa la palabra `class` igual que en Java.

### Método _constructor_

Recordemos que es el método _inicializador_ de la instancia. Es decir, cuando escribimos `new` (tanto en Java como JavaScript) estamos _inicializando_ una nueva _instancia_. Y, por tanto, **se ejecuta** el método _constructor_:

```js
class Taxi {
  constructor() {
  
  }

}
```

Como ves, en JavaScript un _constructor_ se declara con la palabra `constructor`.

**Inicializamos** los atributos de la clase desde este método.

_Por ejemplo_:

```js
class Animal {
  constructor() {
    this.legs = 4;
    this.canBark = true;
  }
}
```

En **`Taxi`** vamos a inicializar 3 atributos con valores _recibidos_ por parámetros en el constructor, como es típico:

```js
class Taxi {
  constructor(name, distance, travels) {
    this.name = name;
    this.distance = distance;
    this.travels = travels;
  }
}
```

**¡Listo!**

Nuestro **`Taxi`** ahora sirve para _acumular_ estas tres variables. Sirve el mismo propósito que el JSON que veníamos usando.

### Sustituir el JSON...

...y de paso, poner en práctica cómo _inicializar_ una _instancia_ nueva.

¡Adelante! **Sustituye** estas líneas en `taxiAdmin.js`:

```diff
-    const newDriver = {
-        "name": userInsertedName,
-        "distance": userInsertedKms,
-        "travels": userInsertedTravels
-    }
+    const newDriver = new Taxi(userInsertedName, userInsertedKms, userInsertedTravels);
```

Se puede acceder a los _atributos_ de `newDriver` con:

* `newDriver.name`
* `newDriver.distance`
* `newDriver.travels`

...ya que les dimos esos nombres en el `constructor`.

¡Son como los del JSON anterior! Por ello, no necesitamos cambiar _nada más_.

**Prueba** la página.

Debería funcionar exactamente como hasta ahora.

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/19</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/19"/>
  <title>Dinero, ganancias, métodos de clases</title>
  <updated>2022-09-16T18:40:04Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Dinero, ganancias, métodos de clases</summary>
  <description>## Resumen

* Añadiremos un método `moneyMade()` a la clase `Taxi`. Veremos que _cada instancia_ tiene _su método_
* Calculará la ganancia del taxista en función de la distancia recorrida y el número de viajes
* Añadiremos un botón **De menor ganancia a mayor**
* Cuando se pulse, _ordenará_ la lista de taxista, poniendo primero al que menos ganancia tuvo

## Descripción

Nuestra clase `Taxi` en `taxi.js`:

```js
class Taxi {
  constructor(name, distance, travels) {
    this.name = name;
    this.distance = distance;
    this.travels = travels;
  }
}
```

...acumula _tres_ variables distintas.

En [programación orientada a objetos](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos), hay dos cualidades principales en los _objetos_:

* Atributos: Almacenan valores, como cada una de esas _tres_ variables
* Métodos

### ¿Qué es un método?

Es una **función** como aquellas que declaramos con `function`; pero _pertenece a la instancia_.

Podemos **invocar** una función **sobre una instancia**. ¡Llevamos un buen rato haciéndolo! Por ejemplo, con `.addEventListener`, `.getElementById`, `.log`,...

La idea es que _esa instancia_ acumula unos **atributos**. Cuando invocamos **su método**, ella puede acceder a los atributos y hacer cálculos.

#### ¿Y por qué complicarse tanto? ¿Por qué no hacer _funciones_ y ya está?

Porque así **encapsulamos** los atributos y la lógica en una clase. Es decir, los programadores que _usan_ una clase en su código no necesitan _preocuparse_ de _cómo_ funciona por dentro, con tal de que funcione como esperan.

¿Te has preocupado de cómo funciona `console.log` ó `document.getElementById`?

No necesariamente. Pero **funcionan**.

Esa es la idea.

### `taxi.js`

Vamos a añadir un método que calcula el dinero ganado. Será así:

```js
class Taxi {
  constructor(name, distance, travels) {
    this.name = name;
    this.distance = distance;
    this.travels = travels;
  }
  
  moneyMade() {
    return this.distance * 0.11 + this.travels * 3.80;
  }
}
```

Como ves, se paga a 11 céntimos el kilómetro, y la bajada de bandera por cada viaje son 3.80 euros.

### Botón **Ordenar**

**Añade** el siguiente `button` a tu HTML en `taxis.html`. Como ves, está _después_ del `&lt;/form&gt;` y _antes_ de que se cierre el `&lt;/body&gt;`:

```html
    &lt;/form&gt;
    &lt;button id="sortButton" data-cy="sortTaxis"&gt;De menor ganancia a mayor&lt;/button&gt;
  &lt;/body&gt;
```

### `taxiAdmin.js`

Vamos a usar el conocido [`.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Esta vez engancharemos una función `customOnClick` al _evento_ `"click"` (no `"submit"`):

```js
function customOnClick(event) {
    // Los button no tienen una acción "por defecto" cuando se clican
    // Por ello, no necesitamos hacer event.preventDefault();
    console.log("Clicaste en ordenar");

}
document.getElementById("sortButton").addEventListener("click", customOnClick);
```

Debería verse el _log_ `"Clicaste en ordenar"` cuando pulses el botón. ¿Es así?

#### Hhhmmmm... No

Pues el **código** es **correcto**.

Quizás tu navegador no está _refrescando_ el JavaScript. Prueba a pulsar SHIFT+F5 ó SHIFT+_(click en recargar)_ para forzar que se recarguen los ficheros de la página, ignorando la caché local del navegador.

## Ordenar los taxis

Vamos a llevarlo a cabo en tres fases:

### 1) Vaciar la `&lt;ol&gt;`

```js
    console.log("Clicaste en ordenar");
    const theList = document.getElementById("taxisList");
    theList.innerHTML = ""; 
```

### 2) Ordenar el _array_ `taxiDrivers`

```js
    taxiDrivers.sort((taxi1, taxi2) =&gt; taxi1.moneyMade() - taxi2.moneyMade());
```

### 3) Añadir cada taxi como un `&lt;li&gt;` a la lista

```js
    for (const taxi of taxiDrivers) {
        let aListItem = document.createElement("li");
        aListItem.innerHTML = taxi.name;
        theList.append(aListItem);
    }
```

**¡Listo!**

Los taxis deberían aparecer ordenados cada vez que pulsas _De menor ganancia a mayor_.

¿Es así?

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
<entry>
  <id>https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/20</id>
  <link href="https://raspi/rodrigo.regadio/desarrollo-web-en-entorno-cliente/issues/20"/>
  <title>Lista de tareas</title>
  <updated>2022-09-16T18:40:06Z</updated>
  <media:thumbnail width="40" height="40" url="https://secure.gravatar.com/avatar/ed259549ac58ecfac6b433ed39a452bd?s=80&amp;d=identicon"/>
  <author>
    <name>Rubén Montero</name>
    <email></email>
  </author>
  <summary>Lista de tareas</summary>
  <description>## Resumen

* Crearemos una nueva página `tasks.html` con su `tasksAdmin.js` asociado
* Servirá para añadir tareas que tienen _nombre_ y _relevancia_ (numérica)
* Permitirá ordenar las tareas por _relevancia_
* Añadiremos un enlace `&lt;a href&gt;` desde `index.html` a `tasks.html`

## Descripción

¡Nuestro negocio con el mundo del taxi ha sido próspero! Están encantados con nuestro _software_ y nuestra gestión.

Con tanto éxito, estamos desbordados por las ofertas de trabajo y las ideas que no terminan de aparecer.

### Lista de tareas

Vamos a crear una página que nos permita añadir _Tareas_ y ordenarlas por _Relevancia_. Será parecida a `taxis.html`.

### La tarea

**Se pide** que:

* **Añadas** un fichero `tasks.html` a `www/`. Tendrá:
  * Una etiqueta `&lt;head&gt;` que contenga `&lt;script&gt;`. Dicho `&lt;script&gt;` será `defer` y enlazará a un _script_ externo: `src="tasksAdmin.js"`
  * Una etiqueta `&lt;body&gt;` con:
    * `&lt;h1 data-cy="pageHeader"&gt;Gestor de tareas&lt;/h1&gt;`
    * `&lt;div&gt;` con `data-cy="mainTasksDiv"` que contendrá un `&lt;ol&gt;`.
    * `&lt;form&gt;` con `data-cy="formTask"`. Contendrá:
      * `&lt;input&gt;` con `data-cy="input1"`; será `type="text"` y tendrá `placeholder="Desc. Tarea"`
      * `&lt;input&gt;` con `data-cy="input2"`; será `type="number"` y tendrá `placeholder="Relevancia"`
      * `&lt;input&gt;` con `data-cy="inputSubmit"`; será `type="submit"`.

* **Añadas** un fichero `tasksAdmin.js` a `www/`:
  * Inicializará un _array_ al principio: `const tasks = [];`
  * Añadirá un _listener_ al evento `"submit"` del formulario:
    * Prevendrá el comportamiento por defecto (`e.preventDefault();`)
    * Inicializará un objeto con el _nombre_ y la _relevancia_ introducidos por el usuario
    * Lo añadirá (`.push`) a `tasks`
    * Lo insertará como `&lt;li&gt;` dentro del `&lt;ol&gt;` del HTML
      * Dicho `&lt;li&gt;` tendrá, simplemente, el _nombre_ de la tarea como `innerHTML`

* **Añadas** un `&lt;a href&gt;` a `index.html`. Ubicado _donde tú quieras_ en el HTML, redirigirá a la página `/tasks.html`, tendrá `data-cy="tasksLink"` y mostrará al usuario el texto `"Tareas"`

### Por último

Comprueba que tu código pasa el _test_ automático de la tarea.

Después, sube tus cambios al repositorio en un nuevo _commit_.</description>
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
