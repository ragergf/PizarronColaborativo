var admonApp = {};
var rolesUsuario;

admonApp.init = function()
{
//    alert("en admonApp");
    var mtto = $('#tabla').val();
    console.log("mtto: " +mtto);
    if(mtto == "grupo")
    {
        grupo.init();	
    }
    if(mtto == "chat")
    {
        chat.init();	
    }
    if(mtto == "chatAlumno")
    {
        chatAlumno.init();	
    }
    if(mtto == "pregunta")
    {
        pregunta.cargaChats();
        pregunta.init();	
    }
    
    if(mtto == "preguntaAlumno")
    {
        preguntaAlumno.cargaChats();
        preguntaAlumno.init();	
    }
    
    if(mtto == "chatpregunta")
    {
        chatpregunta.init();	
    }
    if(mtto == "alumno")
    {
        alumno.cargaRoles();
        alumno.cargaGrupos();
        alumno.init();	
    }   
    if(mtto == "usuario")
    {
        usuario.cargaRoles();
        usuario.init();	

    }
    if(mtto == "chatpreguntaview")
    {      	
        chatpreguntaview.init();
    }
    if(mtto == "respuestaAlumno")
    {      	
        respuestaAlumno.init();
    }
    if(mtto == "respuestaForoAlumno")
    {      	
        respuestaForoAlumno.init();
    }
    if(mtto == "respuestaMaestroForo")
    {      	
        respuestaMaestroForo.init();
    }
    if(mtto == "claseDiagramaView")
    {      	
        claseDiagramaView.cargaTipoClase();
        claseDiagramaView.init();                
    }
    if(mtto == "diagramaClaseControl")
    {      	        
        diagramaClaseControl.init();                
    }else
        gridGenerico.initGrid();
};