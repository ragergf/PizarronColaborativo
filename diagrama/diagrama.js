        var rectangulos = new Array();
        var relaciones = new Array();
        var ctxDiagrama, drag, ancho, alto;
        var alturaTriangulo, alturaRombo;
        var mapRectangulos = new Object();
        var cadenaDiagrama="";
        var contadorDiagrama=0;
        var LIMITE_DIAGRAMA=13;
        var canvas;
        
     

function PuntoMedio(topPoint, bottomPoint, leftPoint, rightPoint)
{
	this.puntosMedios = new Array();
	this.puntosMedios[0] = topPoint;
	this.puntosMedios[1] = bottomPoint;
	this.puntosMedios[2] = leftPoint;
	this.puntosMedios[3] = rightPoint;
}

function Punto(x, y)
{
	this.x = x;
	this.y = y;
}

function Relacion(rectanguloA, rectanguloB)
{
	this.rectanguloA = rectanguloA;	
	this.rectanguloB = rectanguloB;
	
	this.padre =1;

	this.tipoRelacion=2;
	/*
	0	Nada
	1	Herencia
	2	Composicion
	3	Agregacion
	4	Asociacion
	5	Dependencia
	*/
}

function Rectangulo(puntoInicial,puntoMedio,ancho,alto,texto)
{
	this.puntoInicial=puntoInicial;
	this.puntoMedio=puntoMedio;
	this.ancho=ancho;
	this.alto=alto;
	this.indexPuntoMedio=0
	this.texto=texto;
        this.idClase=0;
	this.clase='';
	this.variables='';
	this.metodos='';
}

function Orientacion()
{
	this.a = this.b = this.c = this.d = this.e = this.f = 1;
}

function borrar(){
            console.log("dentro de borrar()...");
            lienzo = document.getElementById('canvas');
            ctxDiagrama = lienzo.getContext('2d');
            ctxDiagrama.clearRect(0, 0, lienzo.width, lienzo.height);
        }   

function InitClasesAjaxJson()
{
	console.log("en InitAjaxJson");
	$.ajax({ // ajax call starts
      url: 'http://localhost:8084/Chat/AdmonApp/ClasesViewAction.do?action=list', // JQuery loads serverside.php
      //data: 'button=' + $(this).val(), // Send value of the clicked button
      dataType: 'json', // Choosing a JSON datatype
    })
    .done(function(data) { // Variable data contains the data we get from serverside
        var contadorClases=0;
        var idClaseAux=0;
        var stringAux;
        for(var row in data.rows)
        {
            console.log(data.rows[row].clase)
            if(idClaseAux != data.rows[row].clase)
            {
                idClaseAux = data.rows[row].clase;
                x = data.rows[row].x;
                y = data.rows[row].y;

                //Reglas para definir los puntos medios
                leftPoint = new Punto(x, y + (alto/2));
                rightPoint = new Punto(x+ancho, y+(alto/2));
                topPoint = new Punto(x+(ancho/2), y);
                bottomPoint = new Punto(x+(ancho/2), y+alto);
                puntoMedio = new PuntoMedio(topPoint, bottomPoint, leftPoint, rightPoint);

                //inicializamos el rectangulo
                
                rectangulos[contadorClases] = new Rectangulo(new Punto(x,y), puntoMedio, 0, 0, '');
                rectangulos[contadorClases].clase = data.rows[row].clase;
                rectangulos[contadorClases].idClase = data.rows[row].idClase;
                mapRectangulos[data.rows[row].idClase] = rectangulos[contadorClases];
                contadorClases++;
            }
            stringAux = '';
            if(data.rows[row].tipoPropiedad == 'atributo')
            {
                if(rectangulos[contadorClases-1].variables.length > 0 )
                {                    
                    stringAux= '\n';
                }
                if(data.rows[row].visibilidad == 'public')
                {
                    stringAux += '+ ';
                }
                if(data.rows[row].visibilidad == 'private')
                {
                    stringAux += '- ';
                }
                if(data.rows[row].visibilidad == 'protected')
                {
                    stringAux += '# ';
                }
                
                rectangulos[contadorClases-1].variables += stringAux + data.rows[row].propiedad + " : " + data.rows[row].tipoDato;
            }
            else
            {
                if(rectangulos[contadorClases-1].metodos.length > 0 )
                {
                    stringAux= '\n';
                }
                if(data.rows[row].visibilidad == 'public')
                {
                    stringAux += '+ ';
                }
                if(data.rows[row].visibilidad == 'private')
                {
                    stringAux += '- ';
                }
                if(data.rows[row].visibilidad == 'protected')
                {
                    stringAux += '# ';
                }
                
                rectangulos[contadorClases-1].metodos += stringAux + data.rows[row].propiedad + " : " + data.rows[row].tipoDato;
            }
      }
      InitRelacionesAjaxJson()
    });
}

function InitRelacionesAjaxJson()
{
	console.log("en InitAjaxJson");
	$.ajax({ // ajax call starts
      url: 'http://localhost:8084/Chat/AdmonApp/RelacionAction.do?action=list', // JQuery loads serverside.php
      //data: 'button=' + $(this).val(), // Send value of the clicked button
      dataType: 'json', // Choosing a JSON datatype
    })
    .done(function(data) { // Variable data contains the data we get from serverside
        var contadorClases=0;
        var idClaseAux=0;
        var stringAux;
        for(var row in data.rows)
        {
            rec = mapRectangulos[data.rows[row].idClaseA];
            console.log("rec.puntoInicial.x: "+rec.puntoInicial.x);
            console.log("rec.puntoInicial.y: "+rec.puntoInicial.y);
            console.log(data.rows[row].idRelacion)
            relaciones[row] = new Relacion(mapRectangulos[data.rows[row].idClaseA], mapRectangulos[data.rows[row].idClaseB]);
            relaciones[row].padre = 1;
            relaciones[row].tipoRelacion = data.rows[row].tipoRelacion;
      }
      DrawCanvas();
    });
}

function Init()
{
	var p1 = new Punto(5,11);
	var puntoMedio, topPoint, bottomPoint, leftPoint, rightPoint;
	var x,y;
	ancho = 150;
	alto = 80;
	alturaTriangulo=7;
	alturaRombo=7;
		
        InitClasesAjaxJson();
        
	//crea rectangulos
	/*for(m=0;m < 5 ;m++)
	{
		x = (Math.random() * 200) + 1;
		y = (Math.random() * 200) + 1;
		
		//x=100+m;
		//y=100-m;
		//console.log("x: "+x + ", y: "+y);
		
		//Reglas para definir los puntos medios
		leftPoint = new Punto(x, y + (alto/2));
		rightPoint = new Punto(x+ancho, y+(alto/2));
		topPoint = new Punto(x+(ancho/2), y);
		bottomPoint = new Punto(x+(ancho/2), y+alto);
		
		puntoMedio = new PuntoMedio(topPoint, bottomPoint, leftPoint, rightPoint);
		
		//inicializamos el rectangulo
		rectangulos[m] = new Rectangulo(new Punto(x,y), puntoMedio, 0, 0, '');
		
	}*/
	
	//configuraciones manualas
	
	
	/*
        rectangulos[0].clase = "Clase 0";
	rectangulos[0].variables = "atributo_1\natributo2";
	rectangulos[0].metodos = "metodo1\nmetodo2\nmetodo3\nmetodo4";
	
	rectangulos[1].clase = "clase 1";
	rectangulos[1].variables = "atributo_1\natributo2\natributo3";
	rectangulos[1].metodos = "metodo1";
	
	rectangulos[2].clase = "clase 3";
	rectangulos[2].variables = "atributo_1";
	rectangulos[2].metodos = "metodo1";
	
	rectangulos[3].clase = "clase 4";
	rectangulos[3].variables = "atributo_1";
	rectangulos[3].metodos = "metodo1\nmetodo2\nmetodo3";
	
	relaciones[0] = new Relacion(rectangulos[0], rectangulos[1]);
	relaciones[0].padre = 1;
	relaciones[0].tipoRelacion = 2;
	
	relaciones[1] = new Relacion(rectangulos[0], rectangulos[3]);
	relaciones[1].padre = 1;
	relaciones[1].tipoRelacion = 3;
	
	relaciones[2] = new Relacion(rectangulos[2], rectangulos[1]);
	relaciones[2].padre = 1;
	relaciones[2].tipoRelacion = 4;
	//relaciones[1] = new Relacion(rectangulos[1], rectangulos[2]);
	//relaciones[2] = new Relacion(rectangulos[2], rectangulos[3]);
	//relaciones[3] = new Relacion(rectangulos[3], rectangulos[4]);
        */
		
	// default styles
	style = {
		curve:	{ width: 6, color: "#333" },
		cpline:	{ width: 1, color: "#000" },
		point: { radius: 0.1, width: 1, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI },
		triangle:{width: 1, color: "#000", fill:"#000"},
		diamond:{width: 1, color: "#000",fill:"#000"}
	}
	
	// event handlers
	canvas.onmousedown = DragStart;
	canvas.onmousemove = Dragging;
	canvas.onmouseup = canvas.onmouseout = DragEnd;
	
	
}


// draw canvas
function DrawCanvas() {
	var puntoMedio, topPoint, bottomPoint, leftPoint, rightPoint;
	var x, y, alturaFigura = 0 ;
//        console.log(canvas);

	ctxDiagrama.clearRect(0, 0, canvas.width, canvas.height);
	
	
	//console.log('antes de dibujar los rectangulos');
	
			
	for (var p in rectangulos) {
		//console.log('p: '+ p);
		ctxDiagrama.lineWidth = style.point.width;
		ctxDiagrama.strokeStyle = style.point.color;
		ctxDiagrama.fillStyle = style.point.fill;
		
		drawString('#000',0,"sans-serif",12, rectangulos[p]);
		
		ctxDiagrama.beginPath();
		//ctxDiagrama.arc(puntos[p].x, puntos[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctxDiagrama.strokeRect(rectangulos[p].puntoInicial.x, rectangulos[p].puntoInicial.y,rectangulos[p].ancho,rectangulos[p].alto)
		ctxDiagrama.fill();
		ctxDiagrama.stroke();
		
		x= rectangulos[p].puntoInicial.x;
		y= rectangulos[p].puntoInicial.y;
		leftPoint = new Punto(x, y + (rectangulos[p].alto/2));
		rightPoint = new Punto(x+rectangulos[p].ancho, y+(rectangulos[p].alto/2));
		topPoint = new Punto(x+(rectangulos[p].ancho/2), y);
		bottomPoint = new Punto(x+(rectangulos[p].ancho/2), y+rectangulos[p].alto);
		
		//puntoMedio = new PuntoMedio(topPoint, bottomPoint, leftPoint, rightPoint);
		
		rectangulos[p].puntoMedio.puntosMedios[0] = topPoint;
		rectangulos[p].puntoMedio.puntosMedios[1] = bottomPoint;
		rectangulos[p].puntoMedio.puntosMedios[2] = leftPoint;
		rectangulos[p].puntoMedio.puntosMedios[3] = rightPoint;
		
		/**/
		for(var q in rectangulos[p].puntoMedio.puntosMedios)
		{
			//console.log("rectangulo "+p+" en puntoMedio "+q);
			
			ctxDiagrama.lineWidth = style.point.width;
			ctxDiagrama.strokeStyle = style.point.color;
			ctxDiagrama.fillStyle = style.point.fill;
			ctxDiagrama.beginPath();
			ctxDiagrama.arc(rectangulos[p].puntoMedio.puntosMedios[q].x, rectangulos[p].puntoMedio.puntosMedios[q].y, style.point.radius, style.point.arc1, style.point.arc2, true);
			ctxDiagrama.fill();
			ctxDiagrama.stroke();
		}
		/**/
	}
	
	for(var p in relaciones) { // listando los elementos del array
		
		var d, d_min, x1, x2, y1, y2;
		var puntosMediosRA, puntosMediosRB;
		var puntosMediosRA = relaciones[p].rectanguloA.puntoMedio.puntosMedios;
		var puntosMediosRB = relaciones[p].rectanguloB.puntoMedio.puntosMedios;
		
		d_min = 100000;
		
		//console.log("Puntos Medios reloacion - "+p);
		
		for(var i in puntosMediosRA)
		{
			//console.log("(RA)["+i+"] x: " + puntosMediosRA[i].x);
			//console.log("(RA)["+i+"] y: " + puntosMediosRA[i].y);
			x1 = puntosMediosRA[i].x;
			y1 = puntosMediosRA[i].y;
			for (var j in puntosMediosRB)
			{
				//console.log("(RB)["+j+"] x: " + puntosMediosRB[j].x);
				//console.log("(RB)["+j+"] y: " + puntosMediosRB[j].y);
				x2 = puntosMediosRB[j].x;
				y2 = puntosMediosRB[j].y;
				d = Math.sqrt( (((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))));
				//console.log("distancia: " + d);
				
				if(d < d_min)
				{
					d_min = d;
					relaciones[p].rectanguloA.indexPuntoMedio = i;
					relaciones[p].rectanguloB.indexPuntoMedio = j;
				}
				
			}
		}
		
		puntoA = relaciones[p].rectanguloA.puntoMedio.puntosMedios[relaciones[p].rectanguloA.indexPuntoMedio];
		puntoB = relaciones[p].rectanguloB.puntoMedio.puntosMedios[relaciones[p].rectanguloB.indexPuntoMedio];
		
		//Se dibuja el simbolo de la relacion
		if (relaciones[p].padre == 1)
		{
			puntoPadre = puntoA;
			orientacion = relaciones[p].rectanguloA.indexPuntoMedio;			
		}
		else
		{
			puntoPadre = puntoB;
			orientacion = relaciones[p].rectanguloA.indexPuntoMedio;
		}
		//console.log("tipo relacion: " +relaciones[p].tipoRelacion);
		if(relaciones[p].tipoRelacion == 1)
		{	
			
			herencia(ctxDiagrama, puntoPadre, orientacion, relaciones[p].tipoRelacion);
		}
		if(relaciones[p].tipoRelacion == 2)
		{	
			
			composicion(ctxDiagrama, puntoPadre, orientacion, relaciones[p].tipoRelacion);
		}
		if(relaciones[p].tipoRelacion == 3)
		{	
			
			agregacion(ctxDiagrama, puntoPadre, orientacion, relaciones[p].tipoRelacion);
		}
		if(relaciones[p].tipoRelacion == 4)
		{	
			ctxDiagrama.setLineDash([5]);
			dependencia(ctxDiagrama, puntoPadre, orientacion, relaciones[p].tipoRelacion);
		}
		
		
		
		// control lineas de Realacion
		ctxDiagrama.lineWidth = style.cpline.width;
		ctxDiagrama.strokeStyle = style.cpline.color;
		ctxDiagrama.beginPath();
		
		
		
		ctxDiagrama.moveTo(puntoA.x, puntoA.y);	
		ctxDiagrama.lineTo(puntoB.x, puntoB.y);	
		ctxDiagrama.stroke();
		ctxDiagrama.setLineDash([]);
	}
	
	run();
	/*
	herencia(ctxDiagrama, 100, 50, 7, 0);
	herencia(ctxDiagrama, 200, 50, 7, 1);
	herencia(ctxDiagrama, 300, 50, 7, 2);
	herencia(ctxDiagrama, 400, 50, 7, 3);
	*/
}

function calcularOrientacion(objOrientacion, puntoPadre, orientacion, tipoRelacion)
{
	var a = b = c = d = e = f = 1;
	
	if (tipoRelacion == 1 || tipoRelacion == 4)
	{
		if(orientacion == 0)
		{
			a = c = d = -1;
			puntoPadre.y += (alturaTriangulo * (-1));
		}
		if(orientacion == 1)
		{
			a = -1;
			puntoPadre.y += (alturaTriangulo);
		}
		if(orientacion == 2)
		{
			a = b = d = -1;
			puntoPadre.x += (alturaTriangulo * (-1));
		}
		if(orientacion == 3)
		{
			d = -1;
			puntoPadre.x += (alturaTriangulo);
		}
	}
	if (tipoRelacion == 2 || tipoRelacion == 3)
	{
		if(orientacion == 0)
		{
			a = b = d = -1;
			e = 0;
			f = -1;
			
			puntoPadre.y += ((alturaRombo*2) * (-1));
		}
		if(orientacion == 1)
		{
			c = -1;
			e = 0;
			f = 1;
			
			
			puntoPadre.y += ((alturaRombo*2));
		}
		if(orientacion == 2)
		{
			a = c = d = -1;
			e = -1;
			f = 0;
			
			puntoPadre.x += ((alturaRombo*2) * (-1));
		}
		if(orientacion == 3)
		{
			b = -1;
			e = 1;
			f = 0;
			
			puntoPadre.x += ((alturaRombo*2));
		}
	}
	

	
	objOrientacion.a = a;
	objOrientacion.b = b;
	objOrientacion.c = c;
	objOrientacion.d = d;
	objOrientacion.e = e;
	objOrientacion.f = f;
}

function composicion(ctxDiagrama, puntoPadre, orientacion, tipoRelacion)
{
	var objOrientacion = new Orientacion();
	var x = puntoPadre.x;
	var y = puntoPadre.y;
//	console.log("Composicion");
	calcularOrientacion(objOrientacion, puntoPadre, orientacion, tipoRelacion);
//	console.log("orientacion: " +orientacion);
//	console.log("x: " +x);
//	console.log("y: " +y);
//	console.log("alturaRombo: " +alturaRombo);
//	console.log("objOrientacion.a: " +objOrientacion.a);
//	console.log("objOrientacion.b: " +objOrientacion.b);
//	console.log("objOrientacion.c: " +objOrientacion.c);
//	console.log("objOrientacion.d: " +objOrientacion.d);
//	console.log("objOrientacion.e: " +objOrientacion.e);
//	console.log("objOrientacion.f: " +objOrientacion.f);
	
	ctxDiagrama.lineWidth = style.diamond.width;
	ctxDiagrama.strokeStyle = style.diamond.color;
	ctxDiagrama.fillStyle = style.diamond.fill;
	ctxDiagrama.beginPath();
	ctxDiagrama.moveTo(x,y);
	ctxDiagrama.lineTo(x + (alturaRombo * objOrientacion.a), y + (alturaRombo * objOrientacion.b));
	ctxDiagrama.lineTo(x + (alturaRombo * 2 * objOrientacion.e), y + (alturaRombo * 2 * objOrientacion.f));
	ctxDiagrama.lineTo(x + (alturaRombo * objOrientacion.c), y + (alturaRombo * objOrientacion.d) );
	ctxDiagrama.fill();
}

function agregacion(ctxDiagrama, puntoPadre, orientacion, tipoRelacion)
{
	var objOrientacion = new Orientacion();
	var x = puntoPadre.x;
	var y = puntoPadre.y;

	calcularOrientacion(objOrientacion, puntoPadre, orientacion, tipoRelacion);
	
	ctxDiagrama.lineWidth = style.diamond.width;
	ctxDiagrama.strokeStyle = style.diamond.color;
	ctxDiagrama.fillStyle = style.diamond.fill;
	ctxDiagrama.beginPath();
	ctxDiagrama.moveTo(x,y);
	ctxDiagrama.lineTo(x + (alturaRombo * objOrientacion.a), y + (alturaRombo * objOrientacion.b));
	ctxDiagrama.lineTo(x + (alturaRombo * 2 * objOrientacion.e), y + (alturaRombo * 2 * objOrientacion.f));
	ctxDiagrama.lineTo(x + (alturaRombo * objOrientacion.c), y + (alturaRombo * objOrientacion.d) );
	ctxDiagrama.closePath();
	ctxDiagrama.stroke();
}

function herencia(ctxDiagrama, puntoPadre, orientacion, tipoRelacion )
{
	var objOrientacion = new Orientacion();
	var x = puntoPadre.x;
	var y = puntoPadre.y;

	calcularOrientacion(objOrientacion, puntoPadre, orientacion, tipoRelacion);
	
	ctxDiagrama.lineWidth = style.triangle.width;
	ctxDiagrama.strokeStyle = style.triangle.color;
	ctxDiagrama.fillStyle = style.triangle.fill;
	
	ctxDiagrama.beginPath();
	ctxDiagrama.moveTo(x ,y);
	ctxDiagrama.lineTo(x + (alturaTriangulo * objOrientacion.a), y + (alturaTriangulo * objOrientacion.c));	
	ctxDiagrama.lineTo(x + (alturaTriangulo * objOrientacion.b), y + (alturaTriangulo * objOrientacion.d));
	ctxDiagrama.closePath();
	ctxDiagrama.stroke();
}

function dependencia(ctxDiagrama, puntoPadre, orientacion, tipoRelacion )
{
	var objOrientacion = new Orientacion();
	var x = puntoPadre.x;
	var y = puntoPadre.y;

	calcularOrientacion(objOrientacion, puntoPadre, orientacion, tipoRelacion);
	
	ctxDiagrama.lineWidth = style.triangle.width;
	ctxDiagrama.strokeStyle = style.triangle.color;
	ctxDiagrama.fillStyle = style.triangle.fill;
	
	ctxDiagrama.beginPath();
	ctxDiagrama.moveTo(x ,y);
	ctxDiagrama.lineTo(x + (alturaTriangulo * objOrientacion.a), y + (alturaTriangulo * objOrientacion.c));	
	ctxDiagrama.lineTo(x + (alturaTriangulo * objOrientacion.b), y + (alturaTriangulo * objOrientacion.d));
	ctxDiagrama.fill();
}

// start dragging
	function DragStart(e) {
		e = MousePos(e);
		var dx, dy;
		for (var p in rectangulos) {
			dx = rectangulos[p].puntoInicial.x - e.x;
			dy = rectangulos[p].puntoInicial.y - e.y;
			//if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
			if(((rectangulos[p].puntoInicial.x < e.x ) &&  (e.x < (rectangulos[p].puntoInicial.x + rectangulos[p].ancho)) ) && ((rectangulos[p].puntoInicial.y < e.y )&&(e.y < (rectangulos[p].puntoInicial.y + rectangulos[p].alto)))){
				drag = p;
				dPoint = e;
				canvas.style.cursor = "move";
//				console.log('selecciono la clase: ' + rectangulos[p].clase);
				return;
			}
		}
                notificaEventoDiagrama(rectangulos[drag].puntoInicial.x , rectangulos[drag].puntoInicial.y, rectangulos[drag].idClase, 5);
	}

	// dragging
	function Dragging(e) {
		if (drag) {
			e = MousePos(e);
			rectangulos[drag].puntoInicial.x += e.x - dPoint.x;
			rectangulos[drag].puntoInicial.y += e.y - dPoint.y;
			dPoint = e;
			DrawCanvas();
                        notificaEventoDiagrama(rectangulos[drag].puntoInicial.x , rectangulos[drag].puntoInicial.y, rectangulos[drag].idClase, 6);
		}
	}
	
	
	// end dragging
	function DragEnd(e) {
            console.log(drag);
                notificaEventoDiagrama(e.x , e.y, 0, 7);
		drag = null;
		canvas.style.cursor = "default";
		DrawCanvas();
	}

	
	// event parser
	function MousePos(event) {
		event = (event ? event : window.event);
		return {
			x: event.pageX - canvas.offsetLeft,
			y: event.pageY - canvas.offsetTop
		}
	}
	
	
	function drawString(textColor, rotation, font, fontSize, rectangulo) {
				
				var text = rectangulo.clase + '\n' +rectangulo.variables + '\n' + rectangulo.metodos;
				var posX = rectangulo.puntoInicial.x;
				var posY = rectangulo.puntoInicial.y;
				
				var separadorVariablesMetodos = rectangulo.variables.split("\n").length;
				
				var lines = text.split("\n");
				var metrics
				var i;
				var extraIzquierdo = 10;
				var extraSuperior = 0;
				var extraPosterior = 5;
				var extraDerecho = 10;
				var sangria=5;
				if (!rotation) rotation = 0;
				if (!font) font = "'serif'";
				if (!fontSize) fontSize = 16;
				if (!textColor) textColor = '#000000';
		 		ctxDiagrama.save();
		 		ctxDiagrama.font = fontSize + "px " + font;
		 		ctxDiagrama.fillStyle = textColor;
		 		ctxDiagrama.translate(posX, posY);
		 		ctxDiagrama.rotate(rotation * Math.PI / 180);
				for (i = 0; i < lines.length; i++) {
			 		ctxDiagrama.fillText(lines[i],extraIzquierdo, ((i+1)*(fontSize + sangria)) +extraSuperior);
					metrics = ctxDiagrama.measureText(lines[i]);
					//console.log("Metrics: "+ metrics.width);
					if(rectangulo.ancho < (metrics.width + fontSize + extraDerecho))
						rectangulo.ancho = metrics.width + fontSize + extraDerecho;
				}
				rectangulo.alto = (i * fontSize) + fontSize+ (sangria * (i -1)) + extraPosterior;
		 		
				ctxDiagrama.beginPath();
				ctxDiagrama.moveTo(0, (sangria + fontSize)+5);	
				ctxDiagrama.lineTo(rectangulo.ancho, (sangria + fontSize)+5);	
				ctxDiagrama.stroke();
				
				
				ctxDiagrama.beginPath();		
				ctxDiagrama.moveTo(0, ((sangria + fontSize)*(separadorVariablesMetodos + 1))+5);	
				ctxDiagrama.lineTo(rectangulo.ancho, ((sangria + fontSize)*(separadorVariablesMetodos + 1))+5);	
				ctxDiagrama.stroke();
				
				separadorVariablesMetodos
				
				ctxDiagrama.restore();
				
				
		 	}
		 	
		 	function run() {
				
				/*
				drawString('hallo wie gehts?\ndas ist \nein Winkel\n von 30 Grad!', 200, 200, '#444',30,"Chalkduster",12);
				drawString('auf\'m Kopf', 500, 100, '#363',180,"Chalkduster",24);
				drawString('und alles mit HTML5 JS coool',500,300,'#a66',-30,"Trebuchet MS",24);
				drawString('nach unten',10,10,'#66a',90,"Trebuchet MS",24);
				*/
				//drawString('anach oben',27,590,'#66a',0,"sans-serif",10);
		 	};
			
			
            function initDiagrama(){
                canvas = document.getElementById("diagramaCanvas");
                
                if (canvas.getContext('2d')) {
                        ctxDiagrama = canvas.getContext("2d");
                        Init(canvas.className == "quadraticss");
                }	
            };
        
        


        function remotoHandlerDiagrama(data)
        {
            console.log("remotoHandlerDiagrama");
            console.log("data.bufferCanvas: "+data.bufferCanvas);
            var bufferCanvas = data.bufferCanvas;
            var arr = bufferCanvas.split('*');
            var X=0,Y=0,idClaseAux;
            
            arr.forEach(function(entry) {
                console.log(entry);
                arr2 = entry.split('-');
                
                X = arr2[0];
                Y = arr2[1];
                idClaseAux = arr2[2];
                if(idClaseAux != 0)
                {
                console.log("X "+X);
                console.log("Y "+Y);
                console.log("idClaseAux "+idClaseAux);
                console.log("mapRectangulos[idClaseAux].clase: " + mapRectangulos[idClaseAux].clase);
//                mapRectangulos[idClaseAux].puntoInicial.x = X;
//                mapRectangulos[idClaseAux].puntoInicial.y = Y;
                console.log("mapRectangulos[idClaseAux].puntoInicial.x: " + mapRectangulos[idClaseAux].puntoInicial.x);
                console.log("mapRectangulos[idClaseAux].puntoInicial.y: " + mapRectangulos[idClaseAux].puntoInicial.y);
                }
            });
            DrawCanvas();
        };
        
        function notificaEventoDiagrama(X,Y,idClase, evento)
        {
            if(evento != 7)
            {
            if (contadorDiagrama == 0)
                cadenaDiagrama = X + '-' + Y + '-' + idClase;
            else
                cadenaDiagrama += '*' + X + '-' + Y + '-' + idClase;
            
            contadorDiagrama++;
            }
            if(contadorDiagrama == LIMITE_DIAGRAMA||evento == 7)
            {
                console.log('invocando handleDiagrama...');
                var bufCan = $(PrimeFaces.escapeClientId('form:bufCan'));
                bufCan.val(cadenaDiagrama);
                contadorDiagrama = 0;
                cadenaDiagrama='';
                handleDiagrama();
                                
            }
                
        }  
			
			
			
			
			
			
			
			
			
			
			