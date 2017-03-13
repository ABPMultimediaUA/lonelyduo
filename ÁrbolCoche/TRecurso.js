/**CLASE TGESTORRECURSOS **/
function TGestorRecursos()
{
    this.misRecursos = [];

}

TGestorRecursos.prototype.getRecurso = function(nombre)
{
    var rec = null;
    var existeRecurso = false;
    for(var i=0; i<this.misRecursos.length; i++)
    {
        if(this.misRecursos[i].getNombre() == nombre)
        {
            existeRecurso = true;
            rec = this.misRecursos[i];
        }
    }

    if(existeRecurso == false)
    {
        rec = new TRecurso();
        rec.cargarFichero(nombre);
        this.misRecursos.push(rec);
    }

    return rec
};

/**
 * SET RECURSO
 * @param rec
 */
TGestorRecursos.prototype.setRecurso = function( rec ) {
    if(rec != null)
        this.misRecursos.push(rec);
};



/** FIN CLASE TGESTORRECURSOS **/
/** ****************************************************************************/


/**CLASE TRECURSO **/
function TRecurso()
{
    this.miNombre
}

TRecurso.prototype.getNombre = function()
{
    return this.miNombre;
};

TRecurso.prototype.setNombre = function(nombre)
{
    if(nombre != undefined && nombre != null)
        this.miNombre = nombre;
};

TRecurso.prototype.cargarFichero = function(nombre)
{

};
/** FIN CLASE TRECURSO **/
/** ****************************************************************************/



/**CLASE TRECURSOMALLA **/
function TRecursoMalla()
{
    TRecurso.call(this);

    this.objetoVertexNormalBuffer;
    this.objetoVertexTextureCoordBuffer;
    this.objetoVertexPositionBuffer;
    this.objetoVertexIndexBuffer;


    this.vertTriangulos;
    this.nomTriangulos;
    this.textTriangulos;

    this.nTriangulos;

}
TRecursoMalla.prototype = new TRecurso();
TRecursoMalla.prototype.constructor = TRecursoMalla;

/** – Lee el fichero con el recurso y rellena los buffers de datos
 (vértices, triángulos, texturas…)
 – Para la lectura del fichero podemos implementar un parser
 propio o utilizar librerías de terceros */
TRecursoMalla.prototype.cargarFichero = function(fichero, contexto)
{
    var yo = this;
    var onSuccess = function(data)
    {
        console.log("Objeto cargado ");
        yo.initBuffers(contexto, data);
    };


    var onError = function(reason)
    {
        console.error("Error al cargar el fichero: "+reason);
    };

    abrirArchivo(fichero, onSuccess, onError); //usamos métodos callback para manejar la asincroneidad
};

/** Vuelca los buffers de datos en OpenGL */
TRecursoMalla.prototype.draw = function()
{

    if(this.objetoVertexPositionBuffer == null || this.objetoVertexIndexBuffer == null)
    {
        return null;
    }

    /*** DIBUJAMOS OBJETO ***/

    gl.bindBuffer(gl.ARRAY_BUFFER, this.objetoVertexPositionBuffer); //Indicamos a WebGL el buffer actual
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.objetoVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0); //Indicamos a WebGL los valores a utilizar para las posiciones de los vertices

    /*
     gl.bindBuffer(gl.ARRAY_BUFFER, objetoVertexTextureCoordBuffer);
     gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, objetoVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

     gl.bindBuffer(gl.ARRAY_BUFFER, objetoVertexNormalBuffer);
     gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, objetoVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
     */

    /** PARA COLOR **/
    //gl.bindBuffer(gl.ARRAY_BUFFER, objetoVertexPositionBuffer);
    //gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    /** FIN COLOR **/

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.objetoVertexIndexBuffer);

    setMatrixUniforms(); //Indica a WebGL que almacene en la tarjeta grafica nuestra matriz modelo-vista actual
    gl.drawElements(gl.TRIANGLES, this.objetoVertexIndexBuffer.numItems, gl.UNSIGNED_INT, 0); // dibuja los vértices que te dí antes como triángulos, empezando con el elemento 0 del array y siguiendo con los siguientes numItems elementos


    //console.log("Termina draw de TRecurso Malla");
};

TRecursoMalla.prototype.initBuffers = function(gl, objetoData)
{

    if(objetoData.vertexNormals != null)
    {
        this.objetoVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.objetoVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objetoData.vertexNormals), gl.STATIC_DRAW);
        this.objetoVertexNormalBuffer.itemSize = 3;
        this.objetoVertexNormalBuffer.numItems = objetoData.vertexNormals.length / 3;
    }

    if(objetoData.vertexTextureCoords != null)
    {
        this.objetoVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.objetoVertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objetoData.vertexTextureCoords), gl.STATIC_DRAW);
        this.objetoVertexTextureCoordBuffer.itemSize = 2;
        this.objetoVertexTextureCoordBuffer.numItems = objetoData.vertexTextureCoords.length / 2;
    }

    this.objetoVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.objetoVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objetoData.vertexPositions), gl.STATIC_DRAW);
    this.objetoVertexPositionBuffer.itemSize = 3;
    this.objetoVertexPositionBuffer.numItems = objetoData.vertexPositions.length / 3;

    this.objetoVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.objetoVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(objetoData.indices), gl.STATIC_DRAW);
    this.objetoVertexIndexBuffer.itemSize = 1;
    this.objetoVertexIndexBuffer.numItems = objetoData.indices.length;

    //document.getElementById("loadingtext").style.display = 'none';
};
/** FIN CLASE TRECURSOMALLA **/
/** ****************************************************************************/