

function ListarMetodoBanco(ano){
    if(ano == undefined){
        ano = "2019";
    }
    
    var promesa = CargarAPI({
        sURL: Conn.URLSEC + "/nomina/listarpagos",
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var req = JSON.parse(xhRequest.responseText);
        console.log(req);
        $("#btnCuadre").hide();
        $("#cmbSolicitud").html(`<option value="0">NO HAY NOMINAS PENDIENTES POR PROCESAR</option>`);
        var i = 0;
        var combo = '';
        req.forEach(e => {
            
            var lectivo = e.desd.split("-");
            console.log(lectivo[0], ano);
            if(lectivo[0] == ano){
                combo += `<option value="${e.firma}">( ${ e.cantidad } ) ${e.obse} - ${e.mes} | ${e.firma} </option>`;            
                i++;
            }

            $("#btnCuadre").show();
        });
        if(i > 0){
            $("#cmbSolicitud").html(combo);
        }
    });
}


function eliminarNomina(){
    var solicitud = $("#cmbSolicitud").val();

    var promesa = CargarAPI({
        sURL: Conn.URLSEC + "/nomina/eliminar/" + solicitud,
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var req = JSON.parse(xhRequest.responseText);
        $.notify(req.msj, "success");
        
    });

}

function publicarNomina(){
    var solicitud = $("#cmbSolicitud").val();

    var promesa = CargarAPI({
        sURL: Conn.URLSEC + "/nomina/publicar/" + solicitud,
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var req = JSON.parse(xhRequest.responseText);       
        $.notify(req.msj, "success");
    });

}

function deBajaNomina(){
    var solicitud = $("#cmbSolicitud").val();

    var promesa = CargarAPI({
        sURL: Conn.URLSEC + "/nomina/debaja/" + solicitud,
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var req = JSON.parse(xhRequest.responseText);       
        $.notify(req.msj, "success");
    });

}


function MensajeEliminarNomina(){
    $("#_contenidoAlert").html("¿Está seguro que desea eliminar la nómina? luego no podrá recuperar está información.");
    var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar"
                      onClick="eliminarNomina()">Si</button>
                   <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsjAlert").html(botones);
    $('#modMsjAlert').modal('show');
  }
