<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 trict//EN" "w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="/Chat/resources/css/redmond/jquery-ui-1.10.4.custom.css" />
        <link rel="stylesheet" type="text/css" href="/Chat/resources/css/examen/examen.css" />
        <link rel="stylesheet" type="text/css" href="/Chat/resources/css/menu/menu.css" />
        <link rel="stylesheet" type="text/css" href="/Chat/resources/css/menu/cabecera.css" />
<!-- 	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"> -->
	<link rel="stylesheet" type="text/css" href="/Chat/resources/css/jqgrid/ui.jqgrid.css" />
	<!--<link rel="stylesheet" type="text/css" href="/examenWebRager/resources/css/arepon/arepon_tabs.css" />-->
	
	<script src="/Chat/resources/js/jquery/jquery-1.7.1.min.js"></script>
	<script src="/Chat/resources/js/jquery/jquery-ui.js"></script>
	
	<script type="text/javascript" src="/Chat/resources/js/jquery/jquery.tools.min.js"></script>
	
	<script src="/Chat/resources/js/jqgrid/grid.locale-es.js" type="text/javascript"></script>
	<script src="/Chat/resources/js/jqgrid/jquery.jqGrid.src.js" type="text/javascript"></script>
	<script src="/Chat/resources/js/util/utilerias.js" type="text/javascript"></script>
<!--     Librerias Jquery -->

    <meta http-equiv="Content-Type" content="text/html"></meta>
</head>
<body>
    <tiles:insert attribute="titulo"/>
    <section id="main-content">
    <table align="center">
        <tr>
            <td>
                <table class="app">
                    <tr>
                        <td class="menuExamenLeft" />                        
                        <td align="center" height="100">
                            <tiles:insert attribute="header"/>
                        </td>
            
                    </tr>
                    <tr>  
                        <td>
                        <table class="menuExamen">
                            <tr>
                                <td class="menuExamenLeft">
                                    <tiles:insert attribute="menuLeft"/> 
                                </td>
                                <td class="bodyExamen">
                                    <tiles:insert attribute="body"/> 
                                </td>
                            </tr>                       
                        </table>    
                        </td>
                    
                    </tr>
                    <tr>
                        <td class="menuExamenLeft" />
                        <td height="100">
                            <tiles:insert attribute="footer"/> 
                        </td>
                    </tr>               
                </table>
            </td>
        </tr>
    </table>
    </section>
</body>
</html>