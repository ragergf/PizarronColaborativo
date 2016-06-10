var chat = {};

chat.verPreguntas = function ()
{      
//    alert('ver preguntas');        
    var selRow = $("#grid").jqGrid('getGridParam','selrow');    
//    alert(selRow);
    if (selRow == null) {
        alert("selecione un chat");
    }    
    else
    {
        var selRowId = $("#grid").jqGrid ('getGridParam', 'selrow');
        var celValue = $("#grid").jqGrid ('getCell', selRowId, 'idChat');
        $("#mtto").val('pregunta');
        $("#param1").val(celValue);
        $("#formPanelBotones").submit(); 
    }
};

chat.cargaPanelBotones = function ()
{
    
    $("#botones").append("<center><html:link onclick='chat.verPreguntas();'><img src='/Chat/resources/img/pregunta.png' alt='pregunta'></html:link><center>");
//    $("#panelBotones").append("<center><html:link action='/Menu.do?mtto=pregunta'><img src='/Chat/resources/img/pregunta.png' alt='chat'></html:link><center>");
};

chat.init = function ()
{
	id = 'idChat';
	action = 'ChatAction';
        adtionalParameters='&listByIdMaestro='+$('#idMaestro_Session').val();
	caption = 'Chats';
	sortname='idChat';
	colNames = ['idSesion','descSesion','idMaestro', 'hora'];
	colModel = [	           
	{name:'idChat',index:'idChat', width:50,editable:true,editoptions:{readonly:true,size:10}, search: true},
	{name:'descChat',index:'descChat', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'idMaestro',index:'idMaestro', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true}//,
        //{name:'hora',index:'hora', width:150,editable:false,editrules:{required:true}, editoptions:{size:10}, search: true}
	
        ];
	selectorEditDisabled = "#idChat";
        chat.cargaPanelBotones();
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
                descChat: $("#grid").jqGrid ('getCell', row, 'descChat')/*,
                hora: $("#grid").jqGrid ('getCell', row, 'hora')*/
                };               
};
