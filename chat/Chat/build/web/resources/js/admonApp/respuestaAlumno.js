var respuestaAlumno = {};



respuestaAlumno.init = function ()
{
	id = 'idRespuesta';
	action = 'RespuestaAction';
        adtionalParameters = "&listByIdMaestro="+$("#idMaestro_Session").val();
	caption = 'Respuestas';
	sortname='idRespuesta';
	colNames = ['idRespuesta','descRespuesta'];
        console.log('roles:'+rolesUsuario);
	colModel = [	           
	{name:'idRespuesta',index:'idRespuesta', width:50,editable:true,editoptions:{readonly:true,size:10}, search: true},
	{name:'descRespuesta',index:'descRespuesta', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true}        
//        {name:'idRol',index:'idRol', width:100,editable:true,editrules:{required:true}, edittype:'select',editoptions:{dataUrl:'/Chat/AdmonApp/RolesAction.do?action=listForSelect'}, search: true,formatter:'select'}
        
	];
	selectorEditDisabled = "#idGrupo";
//	editData={id_pf: $("#grid").jqGrid ('getCell', row, 'id_pf'), id_docto: $("#grid").jqGrid ('getCell', row, 'id_docto')};
//	delData={id_estatus: $("#grid").jqGrid ('getCell', row, 'id_estatus')};
};

gridGenerico.addData = function()
{
	return {idPregunta:$("#param1").val(),
                    idGrupoAlumno:$("#idGrupoAlumno_Session").val()};           
};

gridGenerico.editData = function(row)
{
	return {idPregunta:$("#param1").val(),
                    idGrupoAlumno:$("#idGrupoAlumno_Session").val()}; 
};

gridGenerico.delData = function(row)
{
	return {idGrupo: $("#grid").jqGrid ('getCell', row, 'idGrupo'),
                descGrupo: $("#grid").jqGrid ('getCell', row, 'descGrupo'),                
                idMaestro:$("#idMaestro_Session").val()};
};
