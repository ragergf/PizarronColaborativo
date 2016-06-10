var usuario = {};

usuario.cargaRoles = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/RolesAction.do?action=listForSelect', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside            
            rolesUsuario = data;
            $("#grid").jqGrid('setColProp', 'idRol', { editoptions: { value: eval(data)} });
          });	
}

usuario.init = function ()
{
	id = 'idUsuario';
	action = 'UsuarioAction';
	caption = 'Usuarios';
	sortname='idUsuario';
	colNames = ['idUsuario','usuario','password','nombre','rol'];
        console.log('roles:'+rolesUsuario);
	colModel = [	           
	{name:'idUsuario',index:'idUsuario', width:50,editable:true,editoptions:{readonly:true,size:10}, search: true},
	{name:'usuario',index:'usuario', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
	{name:'password',index:'password', width:100,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'nombre',index:'nombre', width:100,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'idRol',index:'idRol', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'}
//        {name:'idRol',index:'idRol', width:100,editable:true,editrules:{required:true}, edittype:'select',editoptions:{dataUrl:'/Chat/AdmonApp/RolesAction.do?action=listForSelect'}, search: true,formatter:'select'}
        
	];
	selectorEditDisabled = "#idUsuario";
//	editData={id_pf: $("#grid").jqGrid ('getCell', row, 'id_pf'), id_docto: $("#grid").jqGrid ('getCell', row, 'id_docto')};
//	delData={id_estatus: $("#grid").jqGrid ('getCell', row, 'id_estatus')};
};

gridGenerico.addData = function()
{
	return {};           
};

gridGenerico.editData = function(row)
{
	return {};
};

gridGenerico.delData = function(row)
{
	return {idUsuario: $("#grid").jqGrid ('getCell', row, 'idUsuario'),
                usuario: $("#grid").jqGrid ('getCell', row, 'usuario'),
                password: $("#grid").jqGrid ('getCell', row, 'password'),
                nombre: $("#grid").jqGrid ('getCell', row, 'nombre'),
                idRol: $("#grid").jqGrid ('getCell', row, 'idRol')};
};
