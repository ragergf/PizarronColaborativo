var propiedadClase = {};

propiedadClase.cargaClase = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/ClaseAction.do?action=listForSelect', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside                        
            $("#grid").jqGrid('setColProp', 'idClase', { editoptions: { value: eval(data)} });
          });	
};

propiedadClase.cargaTipoDato = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/TipoDatoAction.do?action=listForSelect', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside                        
            $("#grid").jqGrid('setColProp', 'tipoDato', { editoptions: { value: eval(data)} });
          });	
};

propiedadClase.cargaVisibilidad = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/VisibilidadAction.do?action=listForSelect', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside                        
            $("#grid").jqGrid('setColProp', 'visibilidad', { editoptions: { value: eval(data)} });
          });	
};

propiedadClase.cargaTipoPropiedad = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/TipoPropiedadAction.do?action=listForSelect', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside                        
            $("#grid").jqGrid('setColProp', 'tipoPropiedad', { editoptions: { value: eval(data)} });
          });	
};

propiedadClase.cargaTipoRelacion = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/TipoRelacionAction.do?action=listForSelect&sinHerencia=1', // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside                        
            $("#grid").jqGrid('setColProp', 'tipoRelacion', { editoptions: { value: eval(data)} });
          });	
};


propiedadClase.init = function ()
{
	id = 'idPropiedad';
	action = 'PropiedadClaseAction';
        adtionalParameters='&listByIdMaestro='+$('#idMaestro_Session').val();
	caption = 'Propiedades de la clase';
	sortname='idPropiedad';
	colNames = ['idPropiedad','Clase','nombre', 'tipoDato', 'tipoRelacion','visibilidad', 'tipoPropiedad','idRelacion'];
	colModel = [	           
	{name:'idPropiedad',index:'idPropiedad', width:50,editable:false,editoptions:{readonly:true,size:10}, search: true},
	{name:'idClase',index:'idClase', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'},        
        {name:'nombre',index:'nombre', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'tipoDato',index:'tipoDato', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'},        
        {name:'tipoRelacion',index:'tipoDato', width:100,editable:true,editrules:{required:false}, edittype:'select', search: true,formatter:'select'},        
        {name:'visibilidad',index:'visibilidad', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'},        
        {name:'tipoPropiedad',index:'tipoPropiedad', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'},        
        {name:'idRelacion',index:'idRelacion', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true}
        ];
	selectorEditDisabled = "#idPropiedad";
        
};

gridGenerico.addData = function(row)
{
	return {idPropiedad: $("#grid").jqGrid ('getCell', row, 'idPropiedad'),
                idRelacion: $("#grid").jqGrid ('getCell', row, 'idRelacion')/*idRelacion,
                hora: $("#grid").jqGrid ('getCell', row, 'hora')*/
                };                        
};

gridGenerico.editData = function(row)
{
	return {idPropiedad: $("#grid").jqGrid ('getCell', row, 'idPropiedad'),
                idRelacion: $("#grid").jqGrid ('getCell', row, 'idRelacion')/*idRelacion,
                hora: $("#grid").jqGrid ('getCell', row, 'hora')*/
                };                        
};

gridGenerico.delData = function(row)
{
	return {idPropiedad: $("#grid").jqGrid ('getCell', row, 'idPropiedad'),
                idRelacion: $("#grid").jqGrid ('getCell', row, 'idRelacion')/*idRelacion,
                hora: $("#grid").jqGrid ('getCell', row, 'hora')*/
                };               
};
