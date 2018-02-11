let opciones = {
    destroy: true,
    'paging': true,
    'lengthChange': true,
    'searching': true,
    'ordering': true,
    'info': false,
    'autoWidth': false,
    "aLengthMenu": [[10, 25, 5, -1], [10, 25, 5, "Todo"]],
    "bStateSave": true,
    "order": [[3, "desc"]],
    "language": {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar&nbsp;&nbsp;",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
};

let opcionesf = {
  'paging': false,
  'searching': false,
  'info': false
};

let listaUsuario = null;

$(function () {
    listarPendientes();
    ListarColecciones();
});


function listarPendientes(){
  var tabla = `
  <table id="tblPendientes" class="table table-hover table-striped">
      <thead>
      <tr>
          <th>Observación</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Fin</th>
          <th>Estatus</th>
      </tr>
      </thead>
  </table>`;
  $("#_frmPendientes").html(tabla);
  var tblP = $('#tblPendientes').DataTable(opcionesf);
  tblP.clear().draw();
  var promesa = CargarAPI({
      sURL: Conn.URL + "wpanel/data/listarpendientes",
      metodo: 'POST',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      var datos = JSON.parse(xhRequest.responseText);
      datos.forEach( v => {
        var estatus = `<small class="label label-warning"></i>Pendiente</small>`;
        var fin = "";
        var observacion = "";
        if (v.estatus == 1){
          estatus = `<small class="label label-success">Finalizado</small>`;
          var fin = v.fechafin;
        }
        observacion = v.observacion;
        if (v.tipo == "CSV"){
          observacion = `<a href="tmp/${v.codigo}.csv">${v.observacion}</a>`
        }
        tblP.row.add([
          observacion,
          v.fechainicio,
          fin,
          estatus
        ]).draw(false);
      });
  });
  return true;
}


function ListarColecciones(){
  var tabla = `
  <table id="tblColeccion" class="table table-hover table-striped">
      <thead>
        <tr>
            <th>Nombre</th>
        </tr>
      </thead>
  </table>`;
  $("#_frmColeccion").html(tabla);
  var tblC = $('#tblColeccion').DataTable(opcionesf);
  tblC.clear().draw();
  var promesa = CargarAPI({
      sURL: Conn.URL + "wpanel/data/listarcolecciones",
      metodo: 'POST',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      var datos = JSON.parse(xhRequest.responseText);
      for (var i = 0; i < datos.length; i++) {
        tblC.row.add([datos[i]]).draw(false);
      }

  });
  return true;
}


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

class Usuario{
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
       this.clave = $("#clave").val();
       this.rclave = $("#rclave").val();
       return this;
    }
    Salvar(){

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
  var usuario = new Usuario();
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
    $("#Clave").val(datos.Clave);
    $("#rclave").val(datos.rclave);
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


function ValidarColeccion(){
  var promesa = CargarAPI({
      sURL: Conn.URL + "wpanel/data/vreduccion",
      metodo: 'POST',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      var datos = JSON.parse(xhRequest.responseText);

      if (datos.tipo == 0){
        $("#alertcoleccion").slideDown();
      }else{
        MensajeExtraerColeccion();
      }
  });
}


function CrearColeccion(){
  $("#alertcoleccion").hide();
  $("#_cargando").show();
  var promesa = CargarAPI({
      sURL: Conn.URL + "wpanel/data/crearreduccion",
      metodo: 'POST',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      var datos = JSON.parse(xhRequest.responseText);

      $("#_cargando").hide();
      if (datos.tipo == 0){
        $.notify("El servidor no esta disponible...", {
         	animate: {
         		enter: 'animated bounceIn',
         		exit: 'animated bounceOut'
         	},
           type: 'danger'
         });
      }else{
        $.notify("El proceso está en progreso, ver pendientes", "success");
      }
  });
}


function ExtraerColeccion(){
  var promesa = CargarAPI({
      sURL: Conn.URL + "wpanel/data/exreduccion",
      metodo: 'POST',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      var datos = JSON.parse(xhRequest.responseText);

      if (datos.tipo == 0){
        $("#alertcoleccion").slideDown();
      }else{
        $.notify("El archivo está en proceso, ver pendientes", "success");
      }
  });
}


function MensajeCrearColeccion(){
  $("#_contenido").html("¿Está seguro que desea crear la reducción esto puede tardar varios minutos?");
  var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                    onClick="CrearColeccion()">Si</button>
                 <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
  $("#_botonesmsj").html(botones);
  $('#modMsj').modal('show');
}

function MensajeExtraerColeccion(){
  $("#_contenido").html("¿Está seguro que desea extraer la reducción esto puede tardar varios minutos?");
  var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                    onClick="ExtraerColeccion()">Si</button>
                 <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
  $("#_botonesmsj").html(botones);
  $('#modMsj').modal('show');
}
