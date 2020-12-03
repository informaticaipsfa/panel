
let DATA = '';

class WGit {
    constructor(){
        this.paquete = '';
        this.host = '';
        this.origen = '';
        this.data = '';
    }
    Crear(req) {
        console.log(req);
    }

    Salvar(){

    }
    Obtener(data){
        this.paquete = $("#cmbPaquete").val();
        this.host = "local";
        this.origen = "master";
        this.data = data;
        return this;
    }
    Ejecutar(data){
        $("#_cargando").show();
        $("#btnCompilar").hide();
        var promesa = CargarAPI({
            sURL: Conn.URLSEC + "/wpanel/data/gitall",
            metodo: 'POST',
            valores: this.Obtener(data),
        });
        promesa.then(function(xhRequest) {
  
            $("#txtConsola").val(xhRequest.responseText);
            $("#_cargando").hide();
            if ($("#cmbPaquete").val() == "bus") $("#btnCompilar").show();
            
            // ********************************************
            if ( $("#cmbPaquete").val() == "pension" && data != "log" ){
                $("#_cargando").show();
                var promesa = CargarAPI({
                    sURL: Conn.URLSEC + "/pensionado/gitall",
                    metodo: 'POST',
                    valores: '',
                });    
                promesa.then(function(xhRequest) {
                    var json = JSON.parse(xhRequest.responseText)
                    $("#txtConsola").val(json.rs);
                    $("#_cargando").hide();
                });
            }
            // *********************************************
        });
    }
    Compilar(data){
        $("#_cargando").show();
        $("#btnCompilar").hide();
        var promesa = CargarAPI({
            sURL: Conn.URLSEC + "/wpanel/data/compilar",
            metodo: 'POST',
            valores: this.Obtener(data),
        });
        promesa.then(function(xhRequest) {
            $("#txtConsola").val(xhRequest.responseText);
            $("#_cargando").hide();
            
            
           

        }); 


    }


}

//Actualizar los diferente paquetes de SSSIFANB
function GitAll(data){
    if ($("#cmbPaquete").val() == "S") return;
    var git = new WGit();
    git.Ejecutar(data);
   
}

function Compilar(){
    if ($("#cmbPaquete").val() != "bus") return;
    var git = new WGit();
    git.Compilar('data');
}

