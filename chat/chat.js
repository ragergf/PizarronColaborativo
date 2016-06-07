var scoreAnswerUserId;
var estoyDibujando = false;
var estoyDibujandoRemoto = false;
var cadenaPizarron="";
var contadorPizarron=0;
var LIMITE_PIZARRON=13;
var diferenciaX = -5;
var diferenciaY = -45;
        
$( document ).ready(function() {
    iniciaChat();
});

function iniciaChat(){
    console.log("idRol: " + $("#idRol").val());
    console.log("nombre: " + $("#nombre").val());
    console.log("idUsuario: " + $("#idUsuario").val());

    console.log('llenando...');
    $(PrimeFaces.escapeClientId('form:rolId')).val($("#idRol").val());
    $(PrimeFaces.escapeClientId('form:userName')).val($("#nombre").val());
    $(PrimeFaces.escapeClientId('form:usrId')).val($("#idUsuario").val());
};

function handleMessagePush(data) {
    console.log("handleMessagePush empezando");
    console.log("handleMessagePush... "+data.handlerId);
    if(data.handlerId == 1)
        handleMessage(data);
    else if(data.handlerId == 2)
        handleQuestion(data);
    else if(data.handlerId == 3)
        handleAnswer(data);
    else if(data.handlerId == 4)
        handleScore(data);
    else if(data.handlerId == 5)
        pulsaRatonRemoto(data);
    else if(data.handlerId == 6)
        mueveRatonRemoto(data);
    else if(data.handlerId == 7)
        levantaRatonRemoto(data);
    else if(data.handlerId == 8)
        remotoHandlerPizarron(data);
    else if(data.handlerId == 9)
        intoTextoEBlackBoard(data);
    else if(data.handlerId == 10)
        remotoHandlerDiagrama(data);
};
    
function handleMessage(data) {
    var chatContent = $(PrimeFaces.escapeClientId('form:tabView:chatText'));
    console.log(data.message);
    console.log(chatContent);
    chatContent.append(data.message + '<br />');
    chatContent.scrollTop(chatContent.height());
}
        
function handleQuestion(data) {
    var chatContent = $(PrimeFaces.escapeClientId('form:tabView:chatText'));
    //console.log(data);
    chatContent.append(data.message + '<br />');
    chatContent.scrollTop(chatContent.height());
};
        
function handleAnswer(data) {
    var rol = $(PrimeFaces.escapeClientId('form:rolId'));
    var AnsQueID = $(PrimeFaces.escapeClientId('form:tabView:AnsQueID'));
    var divQuestion = "#divQuestion-" +data.answerQuestion;
    var chatContent = $(divQuestion);
    var appendContent;
    //console.log("AnsQueID: "+ AnsQueID.val());
    //console.log("divQuestion: "+divQuestion);
    if(rol.val() == 2)
        appendContent = data.message + ", score: <input type='text' id='textScore-"+data.answerQuestion+"-"+data.userId+"' size='4' DISABLED/> <input type='button' id='buttonAnswer-"+data.answerQuestion+"-"+data.userId+"' value='calificar' onclick='calificar(this);' />";         
    else
        appendContent = data.message + ", score: <input type='text' id='textScore-"+data.answerQuestion+"-"+data.userId+"' size='4' DISABLED/>";         
    //console.log(appendContent);
    chatContent.append(appendContent + '<br />');
    chatContent.scrollTop(chatContent.height());
};
        
function handleScore(data) {
   var score = data.score;
   var textScoreId = data.scoreAnswerUserId;

   //console.log('score: ' + score);
   //console.log('textScoreId: ' + textScoreId);

   $("#"+textScoreId).val(score);
};

function displayAnswer(){
    var rol = $(PrimeFaces.escapeClientId('form:rolId'));
    var AnsQueID = $(PrimeFaces.escapeClientId('form:tabView:AnsQueID'));
    var usrId = $(PrimeFaces.escapeClientId('form:usrId'));
    var questions = $('input:radio[name=questions]:checked').val();
    var textScoreId = 'textScore-'+questions+'-'+usrId.val();

    var textScore = $('#'+textScoreId);
    if (typeof textScore.val() === "undefined") {
        AnsQueID.val(questions);          
        if(rol.val() == 3)
            dlg1.show();                
    }
    else
    {
        alert('Usted ya contesto esta pregunta');
    }
};

function calificar(element){
    var rol = $(PrimeFaces.escapeClientId('form:rolId'));
    var screAnsUsrId = $(PrimeFaces.escapeClientId('form:tabView:screAnsUsrId'));

    var id  = element.id;
    var arr = id.split('-');

    screAnsUsrId.val('textScore-'+arr[1]+'-'+arr[2]);

    //console.log('scoreAnswerUserId... '+screAnsUsrId.val());

    if(rol.val() == 2)
        dlg2.show();                        
};

function intoTextoEBlackBoard(data){
    console.log("dentro de intoTextoEBlackBoard()...");
    lienzo = document.getElementById('canvas');
    ctx = lienzo.getContext('2d');
    ctx.font = "bold 10px sans-serif";
    ctx.clearRect(0, 0, lienzo.width, 20);
    ctx.fillText(data.textoEBlackBoard,10,18);               
};
        
function borrar(){
    console.log("dentro de borrar()...");
    lienzo = document.getElementById('canvas');
    ctx = lienzo.getContext('2d');
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
};

function comenzar(){
    console.log("dentro de comenzar()...");
    lienzo = document.getElementById('canvas');
    ctx = lienzo.getContext('2d');

    //Dejamos todo preparado para escuchar los eventos
    lienzo.addEventListener('mousedown',pulsaRaton,false);
    lienzo.addEventListener('mousemove',mueveRaton,false);
    lienzo.addEventListener('mouseup',levantaRaton,false);
};
        
function pulsaRaton(capturo){
    if(!estoyDibujando)
    {
        estoyDibujando = true;
        ctx.beginPath();
        ctx.moveTo(capturo.clientX+ diferenciaX,capturo.clientY+ diferenciaY);
        //console.log("pulsaRaton => x: "+capturo.clientX+", y: "+ capturo.clientY);
        notificaEventoPizarron(capturo.clientX+ diferenciaX, capturo.clientY+ diferenciaY, 5);
    }
};

function mueveRaton(capturo){
        if(estoyDibujando){
            ctx.strokeStyle='#000';
            ctx.lineTo(capturo.clientX+ diferenciaX,capturo.clientY+ diferenciaY);
            //console.log("mueveRaton => x: "+capturo.clientX+", y: "+ capturo.clientY);
            ctx.stroke();
            notificaEventoPizarron(capturo.clientX+ diferenciaX, capturo.clientY+ diferenciaY, 6);
        }
};

function levantaRaton(capturo){
    if(estoyDibujando)
    {
        ctx.closePath();
        estoyDibujando = false;
        notificaEventoPizarron(capturo.clientX+ diferenciaX, capturo.clientY+ diferenciaY, 7);
        //console.log("levantaRaton => x: "+capturo.clientX+", y: "+ capturo.clientY);
    }
};
        
function notificaEventoPizarron(X,Y,evento){
    if (contadorPizarron == 0)
        cadenaPizarron = X + '-' + Y + '-' + evento;
    else
        cadenaPizarron += '*' + X + '-' + Y + '-' + evento;

    contadorPizarron++;

    if(contadorPizarron == LIMITE_PIZARRON || evento == 7)
    {
        var bufCan = $(PrimeFaces.escapeClientId('form:bufCan'));
        bufCan.val(cadenaPizarron);
        contadorPizarron = 0;
        handleBlackBoard2();

    }

};  
    
function remotoHandlerPizarron(data){
    console.log("remotoHandler");
    var bufferCanvas = data.bufferCanvas;
    var arr = bufferCanvas.split('*');
    var X,Y,evento;

    arr.forEach(function(entry) {
        console.log(entry);
        arr2 = entry.split('-');
        X = arr2[0];
        Y = arr2[1];
        evento = arr2[2];
        console.log("X "+X);
        console.log("Y "+Y);
        console.log("evento: "+evento);
        if(evento == 5)
        {
            pulsaRatonRemoto(X, Y);
        }
        else if(evento == 6)
        {
            mueveRatonRemoto(X, Y);
        }
        else if(evento == 7)
        {
            levantaRatonRemoto(X, Y);
        }
    });
};
        
function pulsaRatonRemoto(X, Y){
    console.log('pulsaRatonRemoto');
    console.log('estoyDibujando: '+ estoyDibujando);
    if(!estoyDibujando)
    {
        console.log('entre pulsaRatonRemoto');

        estoyDibujandoRemoto = true;
        ctx.beginPath();
        ctx.moveTo(X,Y);
        console.log("pulsaRatonRemoto => x: "+X+", y: "+ Y);
    }
};

function mueveRatonRemoto(X, Y){

    console.log('pulsaRatonRemoto');
    console.log('estoyDibujando: '+ estoyDibujando);
    if(!estoyDibujando)
    {
        console.log('entre pulsaRatonRemoto');
        if(estoyDibujandoRemoto){                
            ctx.strokeStyle='#000';
            ctx.lineTo(X,Y);
            console.log("mueveRatonRemoto => x: "+X+", y: "+Y);
            ctx.stroke();
        }
    }
};

function levantaRatonRemoto(X, Y){
    console.log('pulsaRatonRemoto');
    console.log('estoyDibujando: '+ estoyDibujando);
    ctx.closePath();
    estoyDibujandoRemoto = false;
};

function textoEBlackBoard(){

};        
