var respuestaForoAlumno = {};



respuestaForoAlumno.init = function ()
{
	id = 'id';
	action = 'RespuestaAlumnoViewAction';
        adtionalParameters = "&listByIdAlumno="+$("#idAlumno_Session").val();
	caption = 'Foro';
	sortname='id';
	colNames = ['id','idPregunta','descPregunta','idChat','descRespuesta','calificacion','comentario'];
//        console.log('roles:'+rolesUsuario);
	colModel = [	           
	{name:'id',index:'id', width:50,editable:false,editoptions:{readonly:true,size:10}, search: true},
	{name:'idPregunta',index:'idPregunta', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true},	
        {name:'descPregunta',index:'descPregunta', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true},	
        {name:'idChat',index:'idChat', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true},	
        {name:'descRespuesta',index:'descRespuesta', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},	
        {name:'calificacion',index:'calificacion', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true},	
        {name:'comentario',index:'comentario', width:100,editable:false,editrules:{readonly:false}, search: false}
//        {name:'idRol',index:'idRol', width:100,editable:true,editrules:{required:true}, edittype:'select',editoptions:{dataUrl:'/Chat/AdmonApp/RolesAction.do?action=listForSelect'}, search: true,formatter:'select'}
        
	];
	selectorEditDisabled = "#idGrupo";
//	editData={id_pf: $("#grid").jqGrid ('getCell', row, 'id_pf'), id_docto: $("#grid").jqGrid ('getCell', row, 'id_docto')};
//	delData={id_estatus: $("#grid").jqGrid ('getCell', row, 'id_estatus')};
};

gridGenerico.addData = function()
{
	return {idMaestro:$("#idMaestro_Session").val()};           
};

gridGenerico.editData = function(row)
{
	return {idMaestro:$("#idMaestro_Session").val()};
};

gridGenerico.delData = function(row)
{
	return {idGrupo: $("#grid").jqGrid ('getCell', row, 'idGrupo'),
                descGrupo: $("#grid").jqGrid ('getCell', row, 'descGrupo'),                
                idMaestro:$("#idMaestro_Session").val()};
};
