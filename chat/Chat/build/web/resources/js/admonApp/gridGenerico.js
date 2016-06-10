var gridGenerico = {};
var action;
var adtionalParameters = '';
var colModel;
var colNames;
var editData;
var delData;
var caption;
var sortname;
var id;
var selectorEditDisabled;

gridGenerico.initGrid = function ()
{
	$("#grid").jqGrid({
	   	url: '/Chat/AdmonApp/'+action+'.do?action=list'+adtionalParameters,
		datatype: 'local',
		mtype: 'POST',
	   	colNames:colNames,
	   	colModel:colModel,
                ajaxGridOptions: {cache: false},
	   	postData: { 
		},
		rowNum:20,
	   	rowList:[20,40,60],
	   	height: 300,
	   	width:770,
		rownumbers: true,
	   	pager: '#pager',
	   	sortname: sortname,
	    viewrecords: true,
	    sortorder: "asc",
	    caption: caption,
	    emptyrecords: "Empty records",
	    loadonce: false,
	    loadComplete: function() {
		},
	    jsonReader : {
	        root: "rows",
	        page: "page",
	        total: "total",
	        records: "records",
	        repeatitems: true,
	        cell: "cell",
	        id: id
	    },
	    loadError: function (jqXHR, textStatus, errorThrown) {
	        alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
	    } 
	});
	$("#grid").jqGrid('navGrid','#pager',
			{edit:false,add:false,del:false,search:true},
			{ },
	        { },
	        { }, 
			{ sopt:['eq'],
		        closeOnEscape: true, 
	        	multipleSearch: false, 
	         	closeAfterSearch: true }
	);


	
	$("#grid").navButtonAdd('#pager',
			{ 	id:"add_jqgrid",
				caption:"Agregar", 
				buttonicon:"ui-icon-plus", 
				onClickButton: gridGenerico.addRow,
				position: "last", 
				title:"", 
				cursor: "pointer"
			} 
	);
	
	$("#grid").navButtonAdd('#pager',
			{ 	id:"edit_jqgrid",
				caption:"Editar", 
				buttonicon:"ui-icon-pencil", 
				onClickButton: gridGenerico.editRow,
				position: "last", 
				title:"", 
				cursor: "pointer"
			} 
	);
	
	$("#grid").navButtonAdd('#pager',
		{ 	id:"del_jqgrid",
			caption:"Borrar", 
			buttonicon:"ui-icon-trash", 
			onClickButton: gridGenerico.deleteRow,
			position: "last", 
			title:"", 
			cursor: "pointer"
		} 
	);
	
	$("#btnFilter").click(function(){
		$("#grid").jqGrid('searchGrid',
			{multipleSearch: false, 
				sopt:['eq']}
		);
	});	
	
	$("#grid").jqGrid('setGridParam', { 'datatype' : 'json' });

};

gridGenerico.addRow = function()
{
    $("#grid").jqGrid('editGridRow','new',
    		{ 	url: '/Chat/AdmonApp/'+action+'.do?action=add',
    			width: 380,
                        editData: gridGenerico.addData(),
			    addCaption: "Agregar Registro",
			    bSubmit: "Aceptar",
				bCancel: "Cancelar",
				bClose: "Cerrar",
				bYes : "Si",
				bNo : "No",
				bExit : "Cancelar",
			    recreateForm: true,
			    beforeShowForm: function(form) {},
				closeAfterAdd: true,
				reloadAfterSubmit:false,
				afterSubmit : function(response, postdata) 
				{ 
//                                    console.log(response);
//                                    console.log(response.responseText);
                                    var responseJson = $.parseJSON(response.responseText);
//                                    console.log(responseJson.message);
                                    
                                    var result = eval('(' + response.responseText + ')');
                                    var errors = "";
					
                                    if (responseJson.success == false) {
                                        for (var i = 0; i < result.message.length; i++) {
                                                errors +=  result.message[i] + "<br/>";
                                        }
                                    }  
                                    else 
                                    {   console.log("aculizando grid");
                                        $("#grid").trigger("reloadGrid");
                                        $("#dialog").text('El registro se ha guardado con correctamente.');
                                        $("#dialog").dialog( 
                                        {	title: 'Correcto',
                                                modal: true,
                                                buttons: {"Ok": function()  
                                                        {
                                                        $(this).dialog("close");
                                                        } 
                                                }
                                        });
                                    }
                                    var new_id = null;
			    	
                                    return [result.success, errors, new_id];
				}
    		});
};

gridGenerico.editRow = function()
{
	var row = $("#grid").jqGrid('getGridParam','selrow');	
	if( row != null ) {
		$("#grid").jqGrid('editGridRow',row,
			{	url: '/Chat/AdmonApp/'+action+'.do?action=update',
				width: 380,
				editData: gridGenerico.editData(row),
				editCaption: "Editar Registro",
			    bSubmit: "Aceptar",
				bCancel: "Cancelar",
				bClose: "Cerrar",
				saveData: "El registro ha cambiado! Desea aplicar los cambios?",
				bYes : "Si",
				bNo : "No",
				bExit : "Cancelar",
		        recreateForm: true,
		        beforeShowForm: function(form) {
		        	$(selectorEditDisabled).prop("disabled", true);
		        },
				closeAfterEdit: true,
				reloadAfterSubmit:false,
				afterSubmit : function(response, postdata) 
				{ 
		            var result = eval('(' + response.responseText + ')');
					var errors = "";
					
		            if (result.success == false) {
						for (var i = 0; i < result.message.length; i++) {
							errors +=  result.message[i] + "<br/>";
						}
		            }  else {
		            	$("#grid").trigger("reloadGrid");
		            	$("#dialog").text('El registro se ha modifacdo correctamente.');
						$("#dialog").dialog( 
								{	title: 'Correcto',
									modal: true,
									buttons: {"Ok": function()  {
										$(this).dialog("close");} 
									}
								});
	                }
		        	
					return [result.success, errors, null];
				}
			});
	}
	else $( "#dialogSelectRow" ).dialog();
};

gridGenerico.deleteRow = function()
{
    var row = $("#grid").jqGrid('getGridParam','selrow');
	if( row != null ) 
		$("#grid").jqGrid( 'delGridRow', row,
          	{ url: '/Chat/AdmonApp/'+action+'.do?action=delete',
						delData: gridGenerico.delData(row),
		          		caption: "Borrar",
		        		msg: "Desea borrar el registro?",
		        		bSubmit: "Borrar",
		        		bCancel: "Cancelar",
						recreateForm: true,
			            beforeShowForm: function(form) { 
			            },
          				reloadAfterSubmit:false,
          				closeAfterDelete: true,
          				afterSubmit : function(response, postdata) 
						{ 
			                var result = eval('(' + response.responseText + ')');
							var errors = "";
//							alert(result);
			                if (result.success == false) {
								for (var i = 0; i < result.message.length; i++) {
									errors +=  result.message[i] + "<br/>";
								}
			                }  else {
			                	$("#grid").trigger("reloadGrid");
			                	$("#dialog").text('El registro se ha borrado correctamente.');
								$("#dialog").dialog( 
										{	title: 'Correcto',
											modal: true,
											buttons: {"Ok": function()  {
												$(this).dialog("close");} 
											}
										});
			                }
		                	var new_id = null;
		                	
							return [result.success, errors, new_id];
						}
          	});
	 else $( "#dialogSelectRow" ).dialog();
};


