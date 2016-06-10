var pregunta = {};

pregunta.cargaChats = function()
{   
        $.ajax({ // ajax call starts
            url: '/Chat/AdmonApp/ChatAction.do?action=listForSelectPregunta&byIdChat='+$("#param1").val(), // JQuery loads serverside.php            
            dataType: 'json', // Choosing a JSON datatype
          })
          .done(function(data) { // Variable data contains the data we get from serverside            
            rolesUsuario = data;
            $("#grid").jqGrid('setColProp', 'idChat', { editoptions: { value: eval(data)} });
          });	
}

pregunta.init = function ()
{
    var parameterIdChat = $("#param1").val();
	id = 'idPregunta';
	action = 'PreguntaAction';
        adtionalParameters='&listByIdChat='+$("#param1").val();
	caption = 'Preguntas';
	sortname='idPregunta';
	colNames = ['idPregunta','descPregunta','idChat'];
	colModel = [	           
	{name:'idPregunta',index:'idPregunta', width:50,editable:true,editoptions:{readonly:true,size:10}, search: true},
	{name:'descPregunta',index:'descPregunta', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'idChat',index:'idChat', width:100,editable:true,editrules:{required:true}, edittype:'select', search: true,formatter:'select'}
        
	
        ];
	selectorEditDisabled = "#idChat";
//        chat.cargaPanelBotones();
};

gridGenerico.addData = function()
{
	return {idMaestro: $('#idMaestro_Session').val()};           
};

gridGenerico.editData = function(row)
{
	return {idMaestro: $('#idMaestro_Session').val()
                };           
};

gridGenerico.delData = function(row)
{
	return {idChat: $("#grid").jqGrid ('getCell', row, 'idChat'),
                descChat: $("#grid").jqGrid ('getCell', row, 'descChat')
                };               
};
