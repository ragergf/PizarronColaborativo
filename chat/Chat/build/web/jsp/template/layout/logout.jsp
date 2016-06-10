<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<logic:present name="user" scope="session">
    <%--<html:link action="/ValidaLogin.do?action=logout">cerrar sesion</html:link>--%>
</logic:present>