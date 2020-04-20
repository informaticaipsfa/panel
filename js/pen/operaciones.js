

function ListarMetodoBanco(){
    var promesa = CargarAPI({
        sURL: Conn.URL + "nomina/listarpagos",
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var req = JSON.parse(xhRequest.responseText);

        $("#btnCuadre").hide();
        $("#cmbSolicitud").html(`<option value="0">NO HAY NOMINAS PENDIENTES POR PROCESAR</option>`);
        var i = 0;
        var combo = '';
        req.forEach(e => {
            combo += `<option value="${e.firma}">( ${ e.cantidad } ) ${e.obse} - ${e.mes} </option>`;            
            i++;
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
        sURL: Conn.URL + "nomina/eliminar/" + solicitud,
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
        sURL: Conn.URL + "nomina/publicar/" + solicitud,
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
        sURL: Conn.URL + "nomina/debaja/" + solicitud,
        metodo: 'GET',
        valores: '',
    });
    promesa.then(function(xhRequest) {
        var req = JSON.parse(xhRequest.responseText);       
        $.notify(req.msj, "success");
    });

}