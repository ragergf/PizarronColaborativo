<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>


<logic:present name="user" scope="session">
    <logic:equal name="user" property="idRol" value="1">
        <ul id="menu">
            <li>
                <html:link action="/Menu.do?mtto=usuario">USUARIOS</html:link>
            </li>           
        </ul>
        
	<%--<html:link action="/Menu.do?mtto=usuario"><img src="/Chat/resources/img/usuarios.png" alt="usuarios"></html:link>--%>
    </logic:equal>
    <logic:equal name="user" property="idRol" value="2">
        
        <ul id="menu">
            <li>
                <html:link action="/Menu.do?mtto=grupo">Grupos</html:link>
            </li>
            <li>
                <html:link action="/Menu.do?mtto=alumno">Alumnos</html:link>
            </li>
            <li>
                <html:link action="/Menu.do?mtto=chat">Chat</html:link>
            </li>
            <li>
                <html:link action="/Menu.do?mtto=diagramaClaseControl">Diagramas de Clases</html:link>
            </li>
            <li>
                <html:link action="/frame.do">Chat</html:link>
                <!--<a href="#" onclick="openChat(${sessionScope.user.idRol},'${sessionScope.user.nombre}',${sessionScope.user.idUsuario});">chat</a>-->
            </li>
        </ul>                	        
        
    </logic:equal>
    <logic:equal name="user" property="idRol" value="3">
        <ul id="menu">            
            <li>
                <html:link action="/frame.do">Chat</html:link>
                <!--<a href="#" onclick="openChat(${sessionScope.user.idRol},'${sessionScope.user.nombre}',${sessionScope.user.idUsuario});">chat</a>-->
            </li>
            
            <li>
                <html:link action="/Menu.do?mtto=diagramaClaseControl">Diagramas de Clases</html:link>
            </li>
            
        </ul> 
    </logic:equal>
    <br>
    
</logic:present>



<logic:present name="user" scope="session">
  
    <input type="hidden" id="idUsuario_Session" value="${sessionScope.user.idUsuario}">
    
    <input type="hidden" id="idUsuario_Session" value="${sessionScope.user.idUsuario}">

    <logic:present name="maestro" scope="session">
        <!--Bienvenido MAESTRO-->
        <input type="hidden" id="idMaestro_Session" value="${sessionScope.maestro.idMaestro}">
    </logic:present>
    
    <logic:present name="alumno" scope="session">
        <!--Bienvenido ALUMNO-->
        <input type="hidden" id="idAlumno_Session" value="${sessionScope.alumno.idAlumno}">
    </logic:present>
        
    <logic:present name="grupoalumnoview" scope="session">
        <!--Bienvenido ALUMNO-->
        <input type="hidden" id="idGrupoAlumno_Session" value="${sessionScope.grupoalumnoview.idGrupoAlumno}">
        <input type="hidden" id="idGrupo_Session" value="${sessionScope.grupoalumnoview.idGrupo}">
    </logic:present>
</logic:present>
    
