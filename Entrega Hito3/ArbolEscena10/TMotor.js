/* FACHADA */

//CLASE TMotor
function TMotor() {
    //Un objeto MOTOR tendra una escena, un GR...
    this.miEscena = null;
    this.miGestor = new TGestorRecursos();
    this.registroCamaras = [];
    this.registroLuces = [];
    this.registroViewPort = [];
    this.camaraActiva = null;
    this.luzActiva = []; // que luces activas tengo
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

        return n-1; //pongo la primera
    }
    else {
        return -1; //pongo la ultima
    }
};