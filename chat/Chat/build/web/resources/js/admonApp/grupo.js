var grupo = {};



grupo.init = function ()
{
	id = 'idGrupo';
	action = 'GrupoAction';
        adtionalParameters = "&listByIdMaestro="+$("#idMaestro_Session").val();
	caption = 'Grupos';
	sortname='idGrupo';
	colNames = ['idGrupo','grupo','idMaestro'];
        console.log('roles:'+rolesUsuario);
	colModel = [	           
	{name:'idGrupo',index:'idUsuario', width:50,editable:true,editoptions:{readonly:true,size:10}, search: true},
	{name:'descGrupo',index:'descGrupo', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},	
        {name:'idMaestro',index:'idMaestro', width:100,editable:false,editrules:{readonly:true}, search: false}
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
