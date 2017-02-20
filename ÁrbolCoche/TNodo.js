/** CLASE TNODO **/
function TNodo () {
  /* Atributos */
  /** si los declaras con VAR haces atributos privados, si los declaras con THIS publicos **/
  this.miEntidad
  this.misHijos = new Array
  this.miPadre = this

  // atributos para imprimir el arbol por pantalla
  this.miNombre = ''
  TNodo.nivel = 0
}

/* Métodos */ /** si queremos un método privado se declara sin THIS */
/* Para crear metodos de una de una clase hemos de hacer referencia a la clase con TNodo.prototype y el nombre */
TNodo.prototype.addHijo = function (nuevoNodo) {
  this.misHijos.push(nuevoNodo) // el nuevo nodo es el pasado por parametro
  nuevoNodo.setPadre(this) // el padre sera el nuevo pasado por parametro

  return this.misHijos.length // devuelvo el tamaño de los hijos
}

TNodo.prototype.remHijo = function (nodo) {
  var aux = this.misHijos.indexOf(nodo) // me guardo el nodo a borrar
  if (aux !== -1) {
    this.misHijos.splice(aux, 1) // con splice coloco el nodo en la posicion 1
  }

  return this.misHijos.length
}

TNodo.prototype.setEntidad = function (nuevaEntidad) {
  if (nuevaEntidad != null) {
    this.miEntidad = nuevaEntidad
    return true
  } else {
    return false
  }
}

TNodo.prototype.getEntidad = function () {
  return this.miEntidad
}

TNodo.prototype.getPadre = function () {
  return this.miPadre
}

TNodo.prototype.setPadre = function (padre) {
  this.miPadre = padre
}

/* VALE YA */
TNodo.prototype.draw = function () {
  if (this.miEntidad != null) {
    this.miEntidad.beginDraw()
    TNodo.nivel++
  }

  console.log('Soy: ' + this.miNombre + '|| En el nivel: ' + TNodo.nivel + '|| Mi padre es: ' + this.getPadre().getNombre())

  for (var i = 0; i < this.misHijos.length; i++) {
    this.misHijos[i].draw()
  }

  if (this.miEntidad != null) {
    this.miEntidad.endDraw(); TNodo.nivel--
  }
}

TNodo.prototype.setNombre = function (nombre) {
  this.miNombre = nombre
}

TNodo.prototype.getNombre = function () {
  return this.miNombre
}
/** FIN CLASE TNODO **/
/** ****************************************************************************/
