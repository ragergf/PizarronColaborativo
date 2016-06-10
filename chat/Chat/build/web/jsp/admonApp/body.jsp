
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<logic:present parameter="param1">
    <bean:parameter id="param1" name="param1" />
</logic:present>

<logic:present parameter="mtto">
	<bean:parameter id="tabla" name="mtto" />
	<input type="hidden" id="tabla" value="<%=tabla%>">
        <logic:notEqual name="tabla"  value="diagramaClaseControl">
            <script src="/Chat/resources/js/admonApp/gridGenerico.js" type="text/javascript"></script>
        </logic:notEqual>
	<script src="/Chat/resources/js/admonApp/<%=tabla%>.js" type="text/javascript"></script>
             
        <logic:notEqual name="tabla"  value="diagramaClaseControl">
	<table style="HEIGHT:100%;WIDTH:100%;" border="0" cellpadding="0" cellspacing="0" align="center">
		<tr>
			<td height="100%" align="center" colspan="4" valign="top">
				<table width="50%" border="0" align="right" cellpadding="0" cellspacing="0">
				<tr>
			    	<td>
			    		<div id="jqgrid">
							<table id="grid"></table>
							<div id="pager"></div>
						</div>
					</td>
				</tr>
				</table>
			</td>
		</tr>
                <tr>
                   
                </tr>
	</table>
        </logic:notEqual>
        <br>
        

        <div id="popup">
            <div id="contenido">
            </div>
        </div>
	
</logic:present>

<logic:notPresent parameter="bandera">
	<input type="hidden" id="tabla" value="no_existe">
</logic:notPresent>