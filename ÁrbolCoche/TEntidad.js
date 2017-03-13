/** CLASE TENTIDAD **/
function TEntidad() {
    /* Atributos */

    if(TEntidad.mvMatrix == undefined)
        TEntidad.mvMatrix = mat4.create();
    if(TEntidad.mvMatrixStack == undefined)
        TEntidad.mvMatrixStack = [];

}
    /* Métodos */
    TEntidad.prototype.beginDraw = function(){};
    TEntidad.prototype.endDraw = function(){};

/** FIN CLASE TENTIDAD **/
/** ****************************************************************************/


/** CLASE TTRANSFORM **/
function TTransform()
{
    TEntidad.call(this); //Con esto se llama al constructor del padre
    this.miMatriz =  mat4.create();

    mvPushMatrix = function () {
        var copy = mat4.create();
        mat4.copy(copy, TEntidad.mvMatrix);
        TEntidad.mvMatrixStack.push(copy);
    };

    mvPopMatrix = function()
    {
        if(TEntidad.mvMatrixStack.length == 0)
        {
            throw "PopMatrix invalido";
        }
        TEntidad.mvMatrix = TEntidad.mvMatrixStack.pop();
    }
}
TTransform.prototype = new TEntidad();
TTransform.prototype.constructor = TTransform;

TTransform.prototype.identidad = function()
{
    mat4.identity(this.miMatriz);
};

TTransform.prototype.cargar = function(nuevaMatriz)
{

    if(nuevaMatriz != null)
    {
        this.miMatriz = mat4.clone(nuevaMatriz);
    }
    console.log("Matriz cargada: " + this.miMatriz);
};

TTransform.prototype.transponer = function()
{
    mat4.transpose(this.miMatriz, this.miMatriz);
};

TTransform.prototype.matrizPorVector = function()
{

};

TTransform.prototype.matrizPorMatriz = function(matriz)
{
    mat4.multiply(this.miMatriz,this.miMatriz,matriz);
};

TTransform.prototype.invertir = function()
{
    mat4.invert(this.miMatriz, this.miMatriz);
};


TTransform.prototype.trasladar = function(vector)
{
    if(vector != null)
        mat4.translate(this.miMatriz, this.miMatriz, vector);
    else
        console.error("trasladar > vector pasado es nulo");
};

TTransform.prototype.rotar = function(rad, vector)
{
    mat4.rotate(this.miMatriz, this.miMatriz, rad, vector);
};

TTransform.prototype.escalar = function(vector)
{
    if(vector != null)
        mat4.scale(this.miMatriz, this.miMatriz, vector);
    else
        console.error("escalar > vector pasado es nulo");
};

TTransform.prototype.reflejar = function (x,y,z){
    //seleccionamos el eje sobre el que se quiere reflejar

    //relfejamos sobre el eje X
    if(x==1){
        this.miMatriz[1] = this.miMatriz[4]* -1;
        this.miMatriz[5] = this.miMatriz[5]* -1;
        this.miMatriz[9] = this.miMatriz[6]* -1;
        this.miMatriz[13] = this.miMatriz[7]* -1;
    }
    else if (y==1){
        this.miMatriz[1] = this.miMatriz[0]* -1;
        this.miMatriz[5] = this.miMatriz[1]* -1;
        this.miMatriz[9] = this.miMatriz[2]* -1;
        this.miMatriz[13] = this.miMatriz[3]* -1;

    }
    else if(z==1){
        this.miMatriz[1] = this.miMatriz[8]* -1;
        this.miMatriz[5] = this.miMatriz[9]* -1;
        this.miMatriz[9] = this.miMatriz[10]* -1;
        this.miMatriz[13] = this.miMatriz[11]* -1;
    }
};

TTransform.prototype.moverA = function(x,y,z){

};

TTransform.prototype.beginDraw = function()
{
    //console.log("Apilamos la matriz");
    mvPushMatrix();
    TEntidad.mvMatrix = mat4.multiply(TEntidad.mvMatrix, this.miMatriz , TEntidad.mvMatrix);
    //console.log("Matriz actual despues de apilar y multiplicar por la de transformacion :" + TEntidad.mvMatrix);
};


TTransform.prototype.endDraw = function()
{
    //console.log("Desapilamos la matriz");
    mvPopMatrix();
    //console.log('Matriz actual despues de desapilar :' + TEntidad.mvMatrix);
};
/** FIN CLASE TTransform **/
/** ****************************************************************************/


/** CLASE TLUZ **/
function TLuz(tipo)
{
    TEntidad.call(this); //Con esto se llama al constructor del padre
    this.miTipo = tipo;
    this.miDireccion = new Array(3);
    this.miIntensidad = null;
    this.miColor = null;
    this.miPosicion = null;
    this.miAtenuacion = null;
    this.miForma = null;
    this.luzActiva = true;
}

TLuz.prototype = new TEntidad();
TLuz.prototype.constructor = TLuz;

TLuz.prototype.setIntensidad = function(nuevoColor)
{
    if(nuevoColor != null)
        this.miIntensidad = nuevoColor;
};

TLuz.prototype.getIntensidad = function()
{
    return this.miIntensidad;
};

TLuz.prototype.activarLuz = function()
{
    this.luzActiva = true;
};

TLuz.prototype.apagarLuz = function()
{
    this.luzActiva = false;
};

TLuz.prototype.beginDraw = function()
{
};

TLuz.prototype.endDraw = function()
{
};
/** FIN CLASE TLUZ **/
/** ****************************************************************************/



/** CLASE TCAMARA **/
function TCamara()
{
    TEntidad.call(this); //Con esto se llama al constructor del padre
    this.miProyeccion = mat4.create;
    this.esPerspectiva ;

    this.cercano;
    this.lejano;
    this.izquierda;
    this.derecha;
    this.abajo;
    this.arriba;
    this.fovy;
    this.aspect;
    this.camaraActiva = true;

    if(this.esPerspectiva)
        this.setPerspectiva();
    else
        this.setParalela();
}

TCamara.prototype = new TEntidad();
TCamara.prototype.constructor = TCamara;

TCamara.prototype.setPerspectiva = function(fovy, aspect, cerca, lejos)
{
    this.esPerspectiva = true;
    this.fovy = fovy;
    this.aspect = aspect;
    this.cercano = cerca;
    this.lejano = lejos;

    mat4.perspective(this.miProyeccion, this.fovy, this.aspect, this.cercano, this.lejano);
};

TCamara.prototype.setParalela = function(izquierda, derecha, abajo, arriba, cerca, lejos)
{
    this.esPerspectiva = false;

    this.cercano = cerca;
    this.lejano = lejos;
    this.izquierda = izquierda;
    this.derecha = derecha;
    this.abajo = abajo;
    this.arriba = arriba;

    mat4.ortho(this.miProyeccion, this.izquierda, this.derecha, this.abajo, this.arriba, this.cercano, this.lejano );
};

TCamara.prototype.activarCamara = function()
{
    this.camaraActiva = true;
};

TCamara.prototype.apagarCamara = function()
{
    this.camaraActiva = false;
};

TCamara.prototype.beginDraw = function()
{
};

TCamara.prototype.endDraw = function()
{
};
/** FIN CLASE TCAMARA **/
/** ****************************************************************************/


/** CLASE TMALLA **/
function TMalla(fichero, contexto) //Igual se puede cambiar el contexto por variable estatica de TEntidad
{
    TEntidad.call(this);
    this.miRecurso = null;

    if(fichero != undefined && contexto != undefined)
        this.cargarMalla(fichero, contexto);
}
TMalla.prototype = new TEntidad();
TMalla.prototype.constructor = TMalla;

TMalla.prototype.cargarMalla = function(fichero, contexto)
{
    if(this.miRecurso == null)
        this.miRecurso = new TRecursoMalla();

    this.miRecurso.cargarFichero(fichero, contexto);


    return this.miRecurso;
};

TMalla.prototype.beginDraw = function()
{
    this.miRecurso.draw();
};

TMalla.prototype.endDraw = function()
{

};

/** FIN CLASE TMALLA **/
/** ****************************************************************************/