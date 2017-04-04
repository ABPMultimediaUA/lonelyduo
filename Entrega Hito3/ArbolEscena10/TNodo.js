/** CLASE TNODO **/
function TNodo() {
    /* Atributos */
    /** si los declaras con VAR haces atributos privados, si los declaras con THIS publicos **/
    this.miEntidad = null;
    this.misHijos = [];
    this.miPadre = this;
    if(TNodo.registroLuces == undefined)
        TNodo.registroLuces = []; //me creo un array para registrar las luces y las camaras
    if(TNodo.registroCamaras == undefined)
        TNodo.registroCamaras = []; //me creo un array para registrar las luces y las camaras

    // atributos para imprimir el arbol por pantalla
    this.miNombre ="";
    TNodo.nivel = 0;
}

/* Métodos */ /** si queremos un método privado se declara sin THIS */
TNodo.prototype.addHijo = function(nuevoNodo)
{
    this.misHijos.push(nuevoNodo);
    nuevoNodo.setPadre(this);

    return this.misHijos.length;
};

TNodo.prototype.remHijo = function(nodo)
{
    var aux = this.misHijos.indexOf(nodo);
    if(aux != -1)
        this.misHijos.splice(aux, 1);

    return this.misHijos.length;
};

TNodo.prototype.setEntidad = function(nuevaEntidad)
{
    if(nuevaEntidad != null)
    {
        this.miEntidad = nuevaEntidad;

        /* Hago comprobaciones pertinentes para saber si la entidad pasada por parametro es una camara o una luz
            si es alguna de ellas la meto en el array pertinente */
        if(this.miEntidad instanceof TCamara)
        {
            TNodo.registroCamaras.push(this);
        }
        else if(this.miEntidad instanceof TLuz)
        {
            TNodo.registroLuces.push(this);
        }

        return true;
    }
    else
    {
        return false;
    }
};

TNodo.prototype.getEntidad = function()
{
    return this.miEntidad;
};

TNodo.prototype.getPadre = function()
{
    return this.miPadre;
};

TNodo.prototype.setPadre = function(padre)
{
    this.miPadre = padre;
};

TNodo.prototype.setNombre = function(nombre)
{
    this.miNombre = nombre;
};

TNodo.prototype.getNombre = function()
{
    return this.miNombre;
};

TNodo.prototype.draw = function()
{
    console.log("draw");

    if(this.miEntidad!=null)
    {
        this.miEntidad.beginDraw();
    }

    TNodo.nivel++;

    //console.log("Soy: "+this.miNombre+"|| En el nivel: "+TNodo.nivel+"|| Mi padre es: "+this.getPadre().getNombre());


    for(var i=0; i<this.misHijos.length; i++)
    {
        //Hay que comprobar que el hijo no sea camara o luz
        if(this.misHijos[i] instanceof TCamara || this.misHijos[i] instanceof TLuz)
        {
            console.log('MEC! la entidad a dibujar es una camara o una luz');
        }
        this.misHijos[i].draw();
    }

    if(this.miEntidad!=null)
    {
        this.miEntidad.endDraw();
    }

    TNodo.nivel--;
};
/** FIN CLASE TNODO **/
/** ****************************************************************************/