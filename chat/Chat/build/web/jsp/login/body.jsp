<%-- 
    Document   : body
    Created on : 19-jun-2014, 19:34:51
    Author     : RagerSoft
--%>

<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html:html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
    <html:form action="/ValidaLogin.do">
        <html:hidden property="action" value="login"/>
        <table>
            <tr>
                <td>
                    <bean:message key="login.user"/>
                </td>
                <td>
                    <html:text property="user"/>
                </td>
            </tr>
            <tr>
                <td>
                    <bean:message key="login.password"/>
                </td>
                <td>
                    <html:password property="password"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <html:submit></html:submit>
                </td>
            </tr>           
            <tr>
                <td colspan="2">
                     <html:errors property="loginError" />
                </td>
            </tr>
        </table>
    </html:form>
    </body>
</html:html>
