var popInvalido = 'PopMatrix invalido';

/** CLASE TENTIDAD **/
function TEntidad () {
  /* Atributos */
  if (TEntidad.mvMatrix === undefined)
    TEntidad.mvMatrix = mat4.create();
  if (TEntidad.mvMatrixStack === undefined)
    TEntidad.mvMatrixStack = []
}

/* Métodos virtuales. ES COMO UNA CLASE ABSTRACTA DE JAVA! NO SE IMPLEMENTAN */
TEntidad.prototype.beginDraw = function () { };
TEntidad.prototype.endDraw = function () { };
/** FIN CLASE TENTIDAD **/
/** ****************************************************************************/

/** CLASE TTRANSFORM **/
function TTransform () {
  TEntidad.call(this); // Con esto se llama al constructor del padre y se hace la herencia
  this.miMatriz = mat4.create();

  /* con mvPushMatrix apilamos la matriz */
  mvPushMatrix = function () {
    var copy = mat4.create();
    mat4.copy(copy, TEntidad.mvMatrix);
    TEntidad.mvMatrixStack.push(copy)
  };

  /* con mvPopMatrix desapilamos la matriz */
  mvPopMatrix = function () {
    if (TEntidad.mvMatrixStack.length === 0) {
      throw popInvalido
    }
    TEntidad.mvMatrix = TEntidad.mvMatrixStack.pop()
  }
}

TTransform.prototype = new TEntidad();
TTransform.prototype.constructor = TTransform;

TTransform.prototype.identidad = function () {
  mat4.identity(this.miMatriz)
};

TTransform.prototype.cargar = function (nuevaMatriz) {
  if (nuevaMatriz != null) {
    this.miMatriz = mat4.clone(nuevaMatriz)
  }
  console.log('Matriz cargada: ' + this.miMatriz)
};

TTransform.prototype.transponer = function () {
  console.log('antes de transponer:' + this.miMatriz);

  mat4.transpose(this.miMatriz, this.miMatriz);

  console.log('despues de transponer: ' + this.miMatriz)
};

TTransform.prototype.matrizPorVector = function () {

};

TTransform.prototype.matrizPorMatriz = function (matriz) {
  mat4.multiply(this.miMatriz, this.miMatriz, matriz)
};

TTransform.prototype.invertir = function () {
  console.log('Matriz antes de invertir');
  console.log(this.miMatriz);
  mat4.invert(this.miMatriz, this.miMatriz);

  console.log('Matriz inversa');
  console.log(this.miMatriz)
};

TTransform.prototype.trasladar = function (vector) {
  if (vector != null) {
    mat4.translate(this.miMatriz, this.miMatriz, vector)
  } else {
    console.error('trasladar > vector pasado es nulo')
  }
};

TTransform.prototype.rotar = function (rad, vector) {
  mat4.rotate(this.miMatriz, this.miMatriz, rad, vector)
};

TTransform.prototype.escalar = function (vector) {
  if (vector != null) {
    mat4.scale(this.miMatriz, this.miMatriz, vector)
  } else {
    console.error('escalar > vector pasado es nulo')
  }
};

TTransform.prototype.reflejar = function (x, y, z) {
  // seleccionamos el eje sobre el que se quiere reflejar

  // relfejamos sobre el eje X
  if (x === 1) {
    this.miMatriz[1] = this.miMatriz[4] * -1;
    this.miMatriz[5] = this.miMatriz[5] * -1;
    this.miMatriz[9] = this.miMatriz[6] * -1;
    this.miMatriz[13] = this.miMatriz[7] * -1
  } else if (y === 1) {
    this.miMatriz[1] = this.miMatriz[0] * -1;
    this.miMatriz[5] = this.miMatriz[1] * -1;
    this.miMatriz[9] = this.miMatriz[2] * -1;
    this.miMatriz[13] = this.miMatriz[3] * -1
  } else if (z === 1) {
    this.miMatriz[1] = this.miMatriz[8] * -1;
    this.miMatriz[5] = this.miMatriz[9] * -1;
    this.miMatriz[9] = this.miMatriz[10] * -1;
    this.miMatriz[13] = this.miMatriz[11] * -1
  }
};

TTransform.prototype.moverA = function (x, y, z) {

};

TTransform.prototype.beginDraw = function () {
  console.log('begindDraw -> Apilamos matriz');
  mvPushMatrix()
};

TTransform.prototype.endDraw = function () {
  console.log('EndDraw -> Subimos por el árbol / Desapilamos matriz');
  mvPopMatrix()
};
/** FIN CLASE TMATRIZ **/
/** ****************************************************************************/

/** CLASE TLUZ **/
function TLuz (tipo) {
  TEntidad.call(this); // Con esto se llama al constructor del padre
  this.miTipo = tipo;
  this.miDireccion = new Array(3);
  this.miIntensidad = null;
  this.miColor = null;
  this.miPosicion = null;
  this.miAtenuacion = null;
  this.miForma = null
}

TLuz.prototype = new TEntidad();
TLuz.prototype.constructor = TLuz;

TLuz.prototype.setIntensidad = function (nuevoColor) {
  if (nuevoColor != null) {
    this.miIntensidad = nuevoColor
  }
};

TLuz.prototype.getIntensidad = function () {
  return this.miIntensidad
};

TLuz.prototype.beginDraw = function () {

};

TLuz.prototype.endDraw = function () {

};
/** FIN CLASE TLUZ **/
/** ****************************************************************************/

/** CLASE TCAMARA **/
function TCamara () {
  TEntidad.call(this); // Con esto se llama al constructor del padre
  this.miProyeccion = mat4.create;
  this.esPerspectiva;

  this.cercano;
  this.lejano;
  this.izquierda;
  this.derecha;
  this.abajo;
  this.arriba;
  this.fovy;
  this.aspect;

  if (this.esPerspectiva) {
    this.setPerspectiva()
  } else {
    this.setParalela()
  }
}

TCamara.prototype = new TEntidad();
TCamara.prototype.constructor = TCamara;

TCamara.prototype.setPerspectiva = function (fovy, aspect, cerca, lejos) {
  this.esPerspectiva = true;
  this.fovy = fovy;
  this.aspect = aspect;
  this.cercano = cerca;
  this.lejano = lejos;

  mat4.perspective(this.miProyeccion, this.fovy, this.aspect, this.cercano, this.lejano)
};

TCamara.prototype.setParalela = function (izquierda, derecha, abajo, arriba, cerca, lejos) {
  this.esPerspectiva = false;

  this.cercano = cerca;
  this.lejano = lejos;
  this.izquierda = izquierda;
  this.derecha = derecha;
  this.abajo = abajo;
  this.arriba = arriba;

  // LOCURA
  mat4.ortho(this.miProyeccion, this.izquierda, this.derecha, this.abajo, this.arriba, this.cercano, this.lejano)
};

TCamara.prototype.beginDraw = function () {

};

TCamara.prototype.endDraw = function () {

};

/** FIN CLASE TCAMARA **/
/** ****************************************************************************/

/** CLASE TMALLA **/
/** OJO! -> Se puede cambiar el contexto por la var TEntidad **/
function TMalla (fichero, contexto) {
  TEntidad.call(this);
  this.miRecurso = null;

  if (fichero !== undefined && contexto !== undefined) {
    this.cargarMalla(fichero, contexto)
  }
}

TMalla.prototype = new TEntidad();
TMalla.prototype.constructor = TMalla;

TCamara.prototype.cargarMalla = function (fichero, contexto) {
  if (this.miRecurso == null) {
    this.miRecurso = new TRecursoMalla()
  }

  this.miRecurso.cargarFichero(fichero, contexto);

  return this.miRecurso
};

TCamara.prototype.beginDraw = function () {

};

TCamara.prototype.endDraw = function () {

};

/** FIN CLASE TMALLA **/
/** ****************************************************************************/
