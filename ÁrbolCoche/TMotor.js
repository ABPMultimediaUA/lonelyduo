//CLASE TMotor
function TMotor() {
    this.miEscena = null;
    this.miGestor = new TGestorRecursos();
    this.registroCamaras = [];
    this.registroLuces = [];
    this.registroViewPort = [];
    this.camaraActiva = null;
    this.luzActiva = [];
    this.viewPortActivo = null;

}
/**
 * Crea el nodo raiz de la escena y se lo asigna a la variable correspondiente.
 */
TMotor.prototype.nodoRaiz = function () {
    this.miEscena = new TNodo();
    this.miEscena.setNombre('Escena');

    return this.miEscena;
};

/**
 * CREAR RECURSO.
 * Crea un recurso malla el cual se incluye dentro del los recursos del gestor y se carga el fichero correspondiente.
 * @param fichero
 * @param contexto
 */
TMotor.prototype.crearRecurso = function (fichero , contexto) {

    if(fichero != null && contexto != null){
        var rec  = new TRecursoMalla();
        rec.setNombre(fichero);
        this.miGestor.setRecurso(rec);

        rec.cargarFichero(fichero,contexto);
    }
};

/** crearNodo :
 *  crear nodo y asociarle la entidad
 *  añadir el nuevo nodo como hijo del nodo
 *  padre
 *  devolver la referencia al nodo creado
 * @param padre
 * @param entidad
 */
TMotor.prototype.crearNodo = function(padre,entidad) {

    var nodo = new TNodo();
    nodo.setEntidad(entidad);

    padre.addHijo(nodo);
    nodo.setPadre(padre);

    return nodo;

};


/**
 * Crear transformación y devolverla
 * @returns {TTransform}
 */
TMotor.prototype.crearTTransform = function() {
    var transform = new TTransform();

    return transform;
};


/**
 *  Crear cámara y devolverla
 * @returns {TCamara}
 */
TMotor.prototype.crearCamara = function () {
    var cam  = new TCamara();

    return cam;
};


/**
 *Crear luz y devolverla
 * @param tipo
 * @returns {TLuz}
 */
TMotor.prototype.crearLuz = function (tipo) {
    var luz = new TLuz(tipo);

    return luz;
};


/**
 *  Pedir el recurso malla al gestor de recursos a partir del fichero
 *  Crear la malla a partir del recurso malla y devolverla
 * @param fichero
 * @param contexto
 * @returns {TMalla}
 */
TMotor.prototype.crearMalla = function(fichero){

    var rec  = this.miGestor.getRecurso(fichero);
    var malla = new TMalla();
    malla.miRecurso = rec;

    return malla;
};


/**
 * REGISTRAR LUZ
 * @param luz
 * @returns {number}
 */
TMotor.prototype.registrarLuz = function ( luz ){
    if(luz != null ){
        var n = this.registroLuces.push(luz);

        return n-1;
    }
    else {
        return -1;
    }
};


/**
 * REGISTRAR CAMARA
 * @param cam
 * @returns {number}
 */
TMotor.prototype.registrarCamara = function ( cam ) {

    if(cam != null) {
        var n = this.registroCamaras.push(cam);

        return n-1;
    }
    else {
        return -1;
    }
};


/**
 * REGISTRAR VIEW PORT
 * Se crea el view port con los parametros pasados y se anhade al array de viewports.
 * @param x
 * @param y
 * @param alto
 * @param ancho
 * @returns {number}
 */
TMotor.prototype.registrarViewPort = function (x, y, alto, ancho ) {

    var vp =  new viewPort(x, y, alto, ancho);
    var n = this.registroViewPort.push(vp);

    return n-1;
};


/**
 * SET LUZ ACTIVA
 * @param nLuz
 */
TMotor.prototype.setLuzActiva = function ( nLuz ) {
    if(nLuz > 0){
        this.luzActiva.push(this.registroLuces[nLuz]);
    }
};


/**
 * SET CAMARA ACTIVA
 * @param nCam
 */
TMotor.prototype.setCamaraActiva = function ( nCam ){

    if(nCam > 0) {
        this.camaraActiva = this.registroCamaras[nCam];
    }
};


/**
 * SET VIEW PORT ACTIVO
 * @param nVP
 */
TMotor.prototype.setViewPortActivo = function ( nVP ) {
    if( nVP > 0 ) {
        this.viewPortActivo = this.registroViewPort[nVP];
    }
};


/**
 * DRAW
 * Inicializar la librería gráfica como sea necesario
 * Inicializar las luces como se ha explicado
 * Inicializar el viewport activo con la librería gráfica
 * Inicializar la cámara como se ha explicado
 */
TMotor.prototype.draw = function() {


    for(var i=0; i<this.luzActiva; i++){
        var auxTrans = [];
        var n = null;
    }
    this.miEscena.draw();
};


/*** CLASE VIEWPORT */
/* SOLO SE UTILIZA COMO UN OBJETO PARA AGRUPAR LOS DATOS DE CADA UNO DE LOS VIEWPORTS, NO TIENE ACCIONES, SOLO ATRIBUTOS */

function viewPort (x, y, alto, ancho){
    this.x = x;
    this.y = y;
    this.alto = alto;
    this.ancho = ancho;
}