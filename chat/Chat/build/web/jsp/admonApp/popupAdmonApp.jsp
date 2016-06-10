<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>
 
<tiles:insert definition="popup-template" >
	<tiles:put name="body" value="/jsp/admonApp/bodyPopup.jsp" />
</tiles:insert>
<!-- <script src="/AREPON/js/administracion/gridGenerico.js" type="text/javascript"></script> -->
<!-- <script src="/AREPON/js/administracion/estatus.js" type="text/javascript"></script> -->
<script src="/Chat/resources/js/admonApp/popupAdmonApp.js" type="text/javascript"></script>
<script type="text/javascript">
   $(function() {
//       alert('iniciando AdmonApp');
	popupAdmonApp.init();
});
</script>
