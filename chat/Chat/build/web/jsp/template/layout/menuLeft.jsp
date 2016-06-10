<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<logic:present name="user" scope="session">    
          
    <span class="site-desc">Bienvenido:&nbsp<bean:write name="user" property="nombre" />&nbsp</span>
    <br>
    <br>
    <div id="panelBotones">        
            <div id="botones">
            </div>
    </div>
    
</logic:present>
    
