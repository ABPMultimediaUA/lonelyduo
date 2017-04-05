/** CLASE TNODO **/
function TNodo() {
    /* Atributos */
    /** si los declaras con VAR haces atributos privados, si los declaras con THIS publicos **/
    this.miEntidad = null;
    this.misHijos = [];
    this.miPadre = this;
    //si al crear el arbol no hay luces ni camaras me creo un array para almacenarlas
    if(TNodo.registroLuces == undefined)
        TNodo.registroLuces = [];
    if(TNodo.registroCamaras == undefined)
        TNodo.registroCamaras = [];

    // atributos para imprimir el arbol por pantalla
    this.miNombre ="";
    TNodo.nivel = 0; //empezamos en el nivel 0
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

        //console.log(Object.keys(this.miEntidad()));

        //compruebo si es una camara y la meto en el array
        if(this.miEntidad instanceof TCamara)
        {
            TNodo.registroCamaras.push(this);
        }
        //compruebo si es una luz y la meto en el array
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

TNodo.prototype.draw = function()
{
    if(this.miEntidad!=null) this.miEntidad.beginDraw(); TNodo.nivel++;

    console.log("Soy: "+this.miNombre+"|| En el nivel: "+TNodo.nivel+"|| Mi padre es: "+this.getPadre().getNombre());


    for(var i=0; i<this.misHijos.length; i++)
    {
        this.misHijos[i].draw(); //Hay que comprobar que el hijo no sea camara o luz
    }
    if(this.miEntidad!=null) this.miEntidad.endDraw(); TNodo.nivel--;
};

TNodo.prototype.setNombre = function(nombre)
{
    this.miNombre = nombre;
};

TNodo.prototype.getNombre = function()
{
    return this.miNombre;
};
/** FIN CLASE TNODO **/
/** ****************************************************************************/