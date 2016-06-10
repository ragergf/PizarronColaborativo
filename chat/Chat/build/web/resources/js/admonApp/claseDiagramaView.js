var claseDiagramaView = {};

claseDiagramaView.cargaTipoClase = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/TipoClaseAction.do?action=listForSelect', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside                        
            $("#grid").jqGrid('setColProp', 'tipoClase', { editoptions: { value: eval(data)} });
          });	
}

claseDiagramaView.init = function ()
{
	id = 'idClase';
	action = 'ClaseDiagramaAction';
        adtionalParameters='&listByIdMaestro='+$('#idMaestro_Session').val();
	caption = 'Clases';
	sortname='idClase';
	colNames = ['idClase','nombre','tipoClase','x', 'y'];
	colModel = [	           
	{name:'idClase',index:'idClase', width:50,editable:false,editoptions:{readonly:true,size:10}, search: true},
	{name:'nombre',index:'nombre', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'tipoClase',index:'tipoClase', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'},                
        {name:'x',index:'x', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'y',index:'y', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true}//,
//{name:'idMaestro',index:'idMaestro', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true}//,
        //{name:'hora',index:'hora', width:150,editable:false,editrules:{required:true}, editoptions:{size:10}, search: true}
	
        ];
	selectorEditDisabled = "#idClase";
        
};

gridGenerico.addData = function()
{
	return {idMaestro: $('#idMaestro_Session').val()};         
};

gridGenerico.editData = function(row)
{
	return {idMaestro: $('#idMaestro_Session').val()};           
};

gridGenerico.delData = function(row)
{
	return {idClase: $("#grid").jqGrid ('getCell', row, 'idClase')/*,
                hora: $("#grid").jqGrid ('getCell', row, 'hora')*/
                };               
};
