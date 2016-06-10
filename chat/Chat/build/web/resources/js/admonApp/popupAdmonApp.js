var popupAdmonApp = {};


popupAdmonApp.init = function()
{
//    alert("en admonApp");
    var mtto = $('#popupTabla').val();
    console.log("popupTabla: " +mtto);
    
    if(mtto == "claseDiagramaView")
    {      	
        claseDiagramaView.cargaTipoClase();
        claseDiagramaView.init();                
    }
    if(mtto == "propiedadClase")
    {      	
        propiedadClase.cargaClase();
        propiedadClase.cargaTipoDato();
        propiedadClase.cargaVisibilidad();
        propiedadClase.cargaTipoPropiedad();
        propiedadClase.cargaTipoRelacion();
        propiedadClase.init();                
    }
    
    gridGenerico.initGrid();
};