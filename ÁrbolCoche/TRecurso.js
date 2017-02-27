/** CLASE TGESTORRECURSOS **/
function TGestorRecursos () {
  this.misRecursos = [] // guardo los recursos en un array
}

TGestorRecursos.prototype.getRecurso = function (nombre) {
  var rec = null
  var existeRecurso = false
  // recorro los recursos que ya tengo a ver si coincide con el que me pasan por
  // parametro si coincide lo devuelvo como recurso
  for (var i = 0; i < this.misRecursos.length; i++) {
    if (this.misRecursos[i].getNombre() === nombre) {
      existeRecurso = true
      rec = this.misRecursos[i]
    }
  }

  // si no existe el recurso creo uno nuevo, lo meto en el Array
  // y lo devuelvo
  if (existeRecurso === false) {
    rec = new TRecurso()
    rec.cargarFichero(nombre)
    this.misRecursos.push(rec)
  }
  return rec
}

/** FIN CLASE TGESTORRECURSOS **/
/** ****************************************************************************/

/** CLASE TRECURSO **/
function TRecurso () {
  this.miNombre
}

TRecurso.prototype.getNombre = function () {
  return this.miNombre
}

TRecurso.prototype.setNombre = function (nombre) {
  if (nombre !== undefined && nombre !== null) {
    this.miNombre = nombre
  }
}

TRecurso.prototype.cargarFichero = function (nombre) {

}
/** FIN CLASE TRECURSO **/
/** ****************************************************************************/

/** CLASE TRECURSOMALLA **/
function TRecursoMalla () {
  TRecurso.call(this) // LLamo al padre

  this.vertTriangulos
  this.nomTriangulos
  this.textTriangulos
  this.nTriangulos
}

TRecursoMalla.prototype = new TRecurso()
TRecursoMalla.prototype.constructor = TRecursoMalla

/** – Lee el fichero con el recurso y rellena los buffers de datos
 (vértices, triángulos, texturas…)
 – Para la lectura del fichero podemos implementar un parser
 propio o utilizar librerías de terceros */
TRecursoMalla.prototype.cargarFichero = function (nombre, contexto) {
  var onSuccess = function (data) {
    console.log('Objeto cargado ')
    console.log(data)
    draw(contexto, data)
  }

  var onError = function (reason) {
    console.error('Error al cargar el fichero: ' + reason)
  }

  console.log('dentro cargar Fichero')
  // usamos métodos callback para manejar la asincroneidad
  abrirArchivo(nombre, onSuccess, onError)
  console.log('fuera cargar Fichero')
}

/** Vuelca los buffers de datos en OpenGL */
function draw (contexto, objetoData) {
  console.log('Empezando draw de TRecurso Malla')

  console.log('Termina draw de TRecurso Malla')
}

function initBuffers (gl, objetoData) {
  var objetoVertexNormalBuffer = gl.createBuffer()
  if (objetoData.vertexNormals != null) {
    gl.bindBuffer(gl.ARRAY_BUFFER, objetoVertexNormalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objetoData.vertexNormals), gl.STATIC_DRAW)
    objetoVertexNormalBuffer.itemSize = 3
    objetoVertexNormalBuffer.numItems = objetoData.vertexNormals.length / 3
  }

  var objetoVertexTextureCoordBuffer = gl.createBuffer()

  if (objetoData.vertexTextureCoords != null) {
    gl.bindBuffer(gl.ARRAY_BUFFER, objetoVertexTextureCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objetoData.vertexTextureCoords), gl.STATIC_DRAW)
    objetoVertexTextureCoordBuffer.itemSize = 2
    objetoVertexTextureCoordBuffer.numItems = objetoData.vertexTextureCoords.length / 2
  }

  var objetoVertexPositionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, objetoVertexPositionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objetoData.vertexPositions), gl.STATIC_DRAW)
  objetoVertexPositionBuffer.itemSize = 3
  objetoVertexPositionBuffer.numItems = objetoData.vertexPositions.length / 3

  var objetoVertexIndexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, objetoVertexIndexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(objetoData.indices), gl.STATIC_DRAW)
  objetoVertexIndexBuffer.itemSize = 1
  objetoVertexIndexBuffer.numItems = objetoData.indices.length

  document.getElementById('loadingtext').style.display = 'none'
}
/** FIN CLASE TRECURSOMALLA **/
/** ****************************************************************************/
