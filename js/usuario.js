let listaUsuario = null;
//let Conn = new Conexion();
let util = new Utilidad();
$(function () {

    var promesa = CargarAPI({
        sURL: Conn.URL + "wusuario/listar",
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        listaUsuario = JSON.parse(xhRequest.responseText);
        llenarLista();
        llenarUsuarios();
    });
     $("#cmbUsuario").select2();
});

class Roles{
    constructor(){
        this.descripcion = "";
    }
}

class Privilegios{
    constructor(){
        this.metodo = "";
        this.descripcion = "";
        this.accion = "";
    }
}

class Menu{
    constructor(){
        this.url = "";
        this.js = "";
        this.icono = "";
        this.nombre = "";
        this.accion = "";
    }
}

class Perfil{
    constructor(){
        this.descripcion = "";
        this.privilegios = new Array();
        this.menu = new Array();
    }
}

class FirmaDigital{
    constructor(){
        this.direccionmac = "";
        this.direccionip = "";
        this.tiempo = "";
    }
}

class Usuariosss{
    constructor(){
        this.fechaCreacion = "";
        this.sistema = "";
        this.gerencia = "";

        this.cedula = "";
        this.nombre = "";
        this.login = "";
        this.correo = "";
        this.clave = "";
        this.rclave = "";
        this.sucursal = "";
        this.direccion = "";
        this.cargo = "";
        this.telefono = "";

        this.FirmaDigital = new FirmaDigital ();
        this.token = "";
        this.Roles = new Roles();
        this.Perfil = new Perfil();
      }


    Obtener(){
       this.fechacreacion =  $("#fechaCreacion").val();
       this.sistema =  $("#sistema").val();
       this.sistema =$("#cmbGerencia").val();

       this.cedula = $("#cedula").val();
       this.nombre = $("#nombre").val();
       this.login = $("#usuario").val();
       this.Roles.descripcion = $("#rolUsuario").val();
       this.Perfil.descripcion = $("#perfilUsuario").val();
       this.cargo = $("#cargo").val();
       this.telefono = $("#telefono").val();
       this.correo = $("#correo").val();
       this.FirmaDigital.direccionip = $("#direccionIp").val();
       this.FirmaDigital.direccionmac = $("#direccionMac").val();
       this.direccion = $("#direccionDomicilio").val();
<<<<<<< HEAD
=======
       this.clave = $("#clave").val();
       this.rclave = $("#rclave").val();

>>>>>>> 0af09481a447198e90711d7615fc99fdb8270dc6
       return this;
    }
    Salvar(){
      console.log(JSON.stringify(this.Obtener()));
      var requestE = CargarAPI({
          sURL: Conn.URL + "wusuario/crud",
          metodo: 'POST',
          valores: this.Obtener(),
      });
      requestE.then(function(xhRequest) {
        console.log("Obteniendo Datos...");
        console.log(xhRequest);
      });
    }
}

function Salvar(){
  var usuario = new Usuariosss();
  console.log("Enviando datos para salvar usuario");
  usuario.Salvar();
  console.log("Usuario Salvado!!!");

}

function llenarLista(){

    $("#cmbListadoUsuario").html("");

        listaUsuario.forEach(v => {
            $("#tblUsuarioCuerpo").append(`
            <tr><td>${v.sucursal}</td>
            <td></td>
            <td></td>
            <td>${v.nombre}</td>
            <td>${v.cedula}</td>
            <td>${v.usuario}</td>
            <td>${v.estatus}</td></tr>`) });
    };


function llenarUsuarios(){
    $("#cmbUsuario").html("");
    listaUsuario.forEach(v => {
        $("#cmbUsuario").append(`<option value='${v.cedula}'>${v.nombre}</option>`);
    });
}

function cargarUsuario(){
    var usuario = $("#cmbListadoUsuario option:selected").val();
    var promesa = CargarAPI({
        sURL: Conn.URL + "wusuario/crud/"+usuario,
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var datos = JSON.parse(xhRequest.responseText);
        llenarUsuario(datos);
    });

}

function llenarUsuario(datos){

    $("#fechaCreacion").val(datos.fechacreacion);
    $("#sistema").val(datos.sistema);
    $("#cmbGerencia").val(datos.sistema);
    $("#cmbSucursal").val(datos.sucursal);
    $("#departamento").val(datos.departamento);
    $("#areaTrabajo").val(datos.departamento);
    $("#cedula").val(datos.cedula);
    $("#apellidos").val(datos.nombre);
    $("#nombres").val(datos.nombre);
    $("#situacion").val(datos.situacion);
    $("#cargo").val(datos.cargo);
    $("#rolUsuario").val(datos.Roles.descripcion);
    $("#perfilUsuario").val(datos.Perfil.descripcion);
    $("#funciones").val(datos.funciones);
    $("#usuario").val(datos.usuario);
    $("#direccionIp").val(datos.FirmaDigital.direccionip);
    $("#direccionMac").val(datos.FirmaDigital.Direccionmac);
    $("#direccionDomicilio").val(datos.direccion);
    $("#telefono").val(datos.telefono);
    $("#correo").val(datos.correo);
    $("#estatus").val(datos.estatus);
<<<<<<< HEAD
=======
    $("#Clave").val(datos.Clave);
    $("#rclave").val(datos.rclave);

>>>>>>> 0af09481a447198e90711d7615fc99fdb8270dc6
}
function cargarMenu(){
    var usuario = $("#cmbUsuario option:selected").val();
    var promesa = CargarAPI({
        sURL: Conn.URL + "wusuario/crud/"+usuario,
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var datos = JSON.parse(xhRequest.responseText);
        llenarMenu(datos);
    });
}

function llenarMenu(){
    $("#cmbMenu").html("");
    listaUsuario.forEach(v => {
        $("#cmbMenu").append(`<option value='${v.cedula}'>${v.nombre}</option>`);
    });
}
