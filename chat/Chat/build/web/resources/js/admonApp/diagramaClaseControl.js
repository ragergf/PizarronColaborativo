var diagramaClaseControl = {};

diagramaClaseControl.init = function()
{
    diagramaClaseControl.cargaPanelBotones();
};

diagramaClaseControl.cargaPanelBotones = function ()
{
    $("#botones").width("135px");
    console.log("cargaPanelBotones...");
    $("#botones").append(
            "<ul id='menu'>"+
                "<li><a href='#' onclick='diagramaClaseControl.muestraPopup(\"claseDiagramaView\")'>Clases</a></li>"+
                "<li><a href='#' onclick='diagramaClaseControl.muestraPopup(\"propiedadClase\")'>Propiedades</a></li>"+
                "<li><a href='#' onclick='diagramaClaseControl.muestraPopup()'>Relaciones</a></li>"+
            "</ul>");
//    $("#panelBotones").append("<center><html:link action='/Menu.do?mtto=pregunta'><img src='/Chat/resources/img/pregunta.png' alt='chat'></html:link><center>");
};

diagramaClaseControl.muestraPopup = function(ruta)
{
    console.log('muestraPopup... ' + ruta);
    
    $('#popup').dialog({   
      bgiframe: true,
      open: function() {
          $('#contenido').load('/Chat/PopupAdmon.do?popupMtto='+ruta);
          console.log('pinto hola');
      },
      width:'800px'
  });
};