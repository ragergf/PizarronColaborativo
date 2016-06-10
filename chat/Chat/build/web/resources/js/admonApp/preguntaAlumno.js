var preguntaAlumno = {};

preguntaAlumno.cargaChats = function()
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

preguntaAlumno.responder = function ()
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
        var celValue = $("#grid").jqGrid ('getCell', selRowId, 'idPregunta');
        $("#mtto").val('respuestaAlumno');
        $("#param1").val(celValue);
        $("#formPanelBotones").submit(); 
    }
};

preguntaAlumno.cargaPanelBotones = function ()
{
    
    $("#botones").append("<center><html:link onclick='preguntaAlumno.responder();'><img src='/Chat/resources/img/responder.png' alt='responder'></html:link><center>");
//    $("#panelBotones").append("<center><html:link action='/Menu.do?mtto=pregunta'><img src='/Chat/resources/img/pregunta.png' alt='chat'></html:link><center>");
};

preguntaAlumno.init = function ()
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
        preguntaAlumno.cargaPanelBotones();
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
