let Util = new Utilidad();

class Estado{
    constructor() {

    }
    Crear(Json) {
        if (sessionStorage.getItem('ipsfaEstado') == undefined ){
            sessionStorage.setItem('ipsfaEstado', JSON.stringify(Json));
        }
    }
    ObtenerEstados(){
        let estado = JSON.parse(sessionStorage.getItem('ipsfaEstado'));

        $("#cmbmestado").html('<option value="S" selected="selected"></option>');
        $("#cmbestadof").html('<option value="S" selected="selected"></option>');
        $.each(estado, function (c, v){
            $("#cmbmestado").append('<option value="' + v.codigo + '">' + v.nombre + '</option>');
            $("#cmbestadof").append('<option value="' + v.codigo + '">' + v.nombre + '</option>');
        });

    }
    ObtenerCiudadMunicipio(estado, nombre){
        var sciudad = 'cmbmciudad';
        var smunicipio = 'cmbmmunicipio';
        if ( nombre != undefined){
            sciudad = 'cmbciudadf';
            smunicipio = 'cmbmunicipiof';
        }
        var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
        $.each(cm, function(c, v){
            if (v.codigo == estado){

                let ciudad = v.ciudad;
                let municipio = v.municipio;
                $("#" + sciudad).html('<option value="S" selected="selected"></option>');
                $("#" + smunicipio).html('<option value="S" selected="selected"></option>');
                $.each(ciudad, function (c,v){
                    $("#" + sciudad).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
                });
                $.each(municipio, function (c,v){
                    $("#" + smunicipio).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
                });
            }
        });
    }
    ObtenerParroquia(estado, municipio, nombre){
        var sparroquia = 'cmbmparroquia';
        if ( nombre != undefined){
            sparroquia = 'cmbparroquiaf';
        }
        var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
        $.each(cm, function(c, v){
            if (v.codigo == estado){
                var mun = v.municipio;
                $.each(mun, function (c,v){
                    if(v.nombre == municipio){
                        $("#" + sparroquia).html('<option value="S"></option>');
                        $.each(v.parroquia, function(cl, vl){
                            $("#" + sparroquia).append('<option value="' + vl + '">' + vl + '</option>');
                        });
                    }
                });
            }
        });
    }
}

function IniciarSesion(){
  console.log(sessionStorage.getItem('ipsfaToken') );
  if (sessionStorage.getItem('ipsfaToken') != undefined ){
    var e = sessionStorage.getItem("ipsfaToken");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;
    $("#_PerfilUsuario").html(Usuario.Perfil.descripcion);
    $("#_NombreUsuario").html(Usuario.nombre);
    console.log(Usuario);

  }
}


var Conn = new Conexion();
var Estados = new Estado();
$(function () {
  var promesa = CargarAPI({
      sURL: Conn.URL + "estado",
      metodo: 'GET',
      valores: '',
  });
  promesa.then(function(xhRequest) {
      Estados.Crear(JSON.parse(xhRequest.responseText));
  });
  IniciarSesion();

});

function CiudadMunicipio(valor){
    if (valor == undefined){
        Estados.ObtenerCiudadMunicipio($("#Salvarcmbmestado option:selected").val());
    }else{
        Estados.ObtenerCiudadMunicipio($("#cmbestadof option:selected").val(), true);
    }
}
function SeleccionarParroquia(valor){
    if (valor == undefined){
        Estados.ObtenerParroquia($("#cmbmestado option:selected").val(), $("#cmbmmunicipio option:selected").val());
    }else{
        Estados.ObtenerParroquia($("#cmbestadof option:selected").val(), $("#cmbmunicipiof option:selected").val(), true);
    }
}


function Pagina(pag){
  CargarUrl("_cuerpo","inc/" + pag);

}


function ConsultarID(e){
  if (e.keyCode == 13) {
      Buscar();
  }
}
