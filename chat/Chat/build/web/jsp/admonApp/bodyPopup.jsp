
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>


<logic:present parameter="popupMtto">
	<bean:parameter id="popupTabla" name="popupMtto" />
	<input type="hidden" id="popupTabla" value="<%=popupTabla%>">        
        <script src="/Chat/resources/js/admonApp/gridGenerico.js" type="text/javascript"></script>
        
	<script src="/Chat/resources/js/admonApp/<%=popupTabla%>.js" type="text/javascript"></script>
                       
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
        
        <br>
                
</logic:present>

<logic:notPresent parameter="bandera">
	<input type="hidden" id="popupTabla" value="no_existe">
</logic:notPresent>