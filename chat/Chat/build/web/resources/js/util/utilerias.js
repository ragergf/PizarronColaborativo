function openChat(idRol, nombre, idUsuario)
{
//    alert('openChat...');
    window.open("http://localhost:8084/ChatEBlackBoard/chat.jsf?idRol="+idRol+"&nombre="+nombre+"&idUsuario="+idUsuario, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}