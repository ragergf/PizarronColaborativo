<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles" %>
 
<tiles:insert definition="rager-template" >
	<tiles:put name="body" value="/jsp/menu/body.jsp" />
</tiles:insert>
<script src="/resources/js/menu/menu.js" type="text/javascript"></script>
<script type="text/javascript">
   $(function() {
	menu.init();
});
</script>