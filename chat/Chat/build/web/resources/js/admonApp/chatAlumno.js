var chatAlumno = {};

chatAlumno.verPreguntas = function ()
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
        $("#mtto").val('preguntaAlumno');
        $("#param1").val(celValue);
        $("#formPanelBotones").submit(); 
    }
};

chatAlumno.cargaPanelBotones = function ()
{
    
    $("#botones").append("<center><html:link onclick='chatAlumno.verPreguntas();'><img src='/Chat/resources/img/pregunta.png' alt='pregunta'></html:link><center>");
//    $("#panelBotones").append("<center><html:link action='/Menu.do?mtto=pregunta'><img src='/Chat/resources/img/pregunta.png' alt='chat'></html:link><center>");
};

chatAlumno.init = function ()
{
	id = 'idChat';
	action = 'ChatAction';
        adtionalParameters='&listByIdMaestro='+$('#idMaestro_Session').val();
	caption = 'Chats';
	sortname='idChat';
	colNames = ['idChat','descChat','idMaestro'];
	colModel = [	           
	{name:'idChat',index:'idChat', width:50,editable:true,editoptions:{readonly:true,size:10}, search: true},
	{name:'descChat',index:'descChat', width:150,editable:true,editrules:{required:true}, editoptions:{size:10}, search: true},
        {name:'idMaestro',index:'idMaestro', width:150,editable:false,editrules:{required:false}, editoptions:{size:10}, search: true}
	
        ];
	selectorEditDisabled = "#idChat";
        chatAlumno.cargaPanelBotones();
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
