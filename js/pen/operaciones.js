

function ListarMetodoBanco(ano){
    if(ano == undefined){
        ano = "2019";
    }
    
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
            
            var lectivo = e.desd.split("-");
            console.log(lectivo[0], ano);
            if(lectivo[0] == ano){
                combo += `<option value="${e.firma}">( ${ e.cantidad } ) ${e.obse} - ${e.mes} </option>`;            
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