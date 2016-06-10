<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>
 
<tiles:insert definition="rager-template" >
	<tiles:put name="body" value="/jsp/login/body.jsp" />
</tiles:insert>
<!-- <script src="/AREPON/js/administracion/gridGenerico.js" type="text/javascript"></script> -->
<!-- <script src="/AREPON/js/administracion/estatus.js" type="text/javascript"></script> -->
<script src="/Chat/resources/js/login/login.js" type="text/javascript"></script>
<script type="text/javascript">
   $(function() {
	login.init();
});
</script>