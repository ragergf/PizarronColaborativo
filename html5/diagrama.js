var rectangulos = new Array();
var relaciones = new Array();
var ctx, drag, ancho, alto;

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

function Relacion(puntoA, puntoB)
{
	this.puntoA = puntoA;
	this.puntoB = puntoB;
}


function Relacion(rectanguloA, rectanguloB)
{
	this.rectanguloA = rectanguloA;
	this.rectanguloB = rectanguloB;
}

function Rectangulo(puntoInicial,puntoMedio,ancho,alto,texto)
{
	this.puntoInicial=puntoInicial;
	this.puntoMedio=puntoMedio;
	this.ancho=ancho;
	this.alto=alto;
	this.indexPuntoMedio=0
	this.texto=texto;
}


function Init()
{
	var p1 = new Punto(5,11);
	var puntoMedio, topPoint, bottomPoint, leftPoint, rightPoint;
	var x,y;
	ancho = 150;
	alto = 80;
		
	//crea rectangulos
	for(m=0;m < 5 ;m++)
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
		
	}
	
	//configuraciones manualas
	rectangulos[0].texto = "atributo_1";
	rectangulos[1].texto = "atributo_1\natributo2\natributo3\natributo4\natributo5";
	relaciones[0] = new Relacion(rectangulos[0], rectangulos[1]);
	//relaciones[1] = new Relacion(rectangulos[1], rectangulos[2]);
	//relaciones[2] = new Relacion(rectangulos[2], rectangulos[3]);
	//relaciones[3] = new Relacion(rectangulos[3], rectangulos[4]);

		
	// default styles
	style = {
		curve:	{ width: 6, color: "#333" },
		cpline:	{ width: 1, color: "#C00" },
		point: { radius: 1, width: 1, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
	}
	
	// event handlers
	canvas.onmousedown = DragStart;
	canvas.onmousemove = Dragging;
	canvas.onmouseup = canvas.onmouseout = DragEnd;
	
	DrawCanvas();
}


// draw canvas
function DrawCanvas() {
	var puntoMedio, topPoint, bottomPoint, leftPoint, rightPoint;
	var x, y;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
	//console.log('antes de dibujar los rectangulos');
	
			
	for (var p in rectangulos) {
		//console.log('p: '+ p);
		ctx.lineWidth = style.point.width;
		ctx.strokeStyle = style.point.color;
		ctx.fillStyle = style.point.fill;
		
		drawString(rectangulos[p].texto,rectangulos[p].puntoInicial.x,rectangulos[p].puntoInicial.y,'#66a',0,"sans-serif",12, rectangulos[p]);
		
		ctx.beginPath();
		//ctx.arc(puntos[p].x, puntos[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.strokeRect(rectangulos[p].puntoInicial.x, rectangulos[p].puntoInicial.y,rectangulos[p].ancho,rectangulos[p].alto)
		ctx.fill();
		ctx.stroke();
		
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
			
			ctx.lineWidth = style.point.width;
			ctx.strokeStyle = style.point.color;
			ctx.fillStyle = style.point.fill;
			ctx.beginPath();
			ctx.arc(rectangulos[p].puntoMedio.puntosMedios[q].x, rectangulos[p].puntoMedio.puntosMedios[q].y, style.point.radius, style.point.arc1, style.point.arc2, true);
			ctx.fill();
			ctx.stroke();
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
		
		
		// control lineas de Realacion
		ctx.lineWidth = style.cpline.width;
		ctx.strokeStyle = style.cpline.color;
		ctx.beginPath();
		
		ctx.moveTo(relaciones[p].rectanguloA.puntoMedio.puntosMedios[relaciones[p].rectanguloA.indexPuntoMedio].x, relaciones[p].rectanguloA.puntoMedio.puntosMedios[relaciones[p].rectanguloA.indexPuntoMedio].y);	
		ctx.lineTo(relaciones[p].rectanguloB.puntoMedio.puntosMedios[relaciones[p].rectanguloB.indexPuntoMedio].x, relaciones[p].rectanguloB.puntoMedio.puntosMedios[relaciones[p].rectanguloB.indexPuntoMedio].y);	
		ctx.stroke();
	}
	
	run();
}

// start dragging
	function DragStart(e) {
		e = MousePos(e);
		var dx, dy;
		for (var p in rectangulos) {
			dx = rectangulos[p].puntoInicial.x - e.x;
			dy = rectangulos[p].puntoInicial.y - e.y;
			//if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
			if(((rectangulos[p].puntoInicial.x < e.x ) &&  (e.x < (rectangulos[p].puntoInicial.x + ancho)) ) && ((rectangulos[p].puntoInicial.y < e.y )&&(e.y < (rectangulos[p].puntoInicial.y + alto)))){
				drag = p;
				dPoint = e;
				canvas.style.cursor = "move";
				return;
			}
		}
	}

	// dragging
	function Dragging(e) {
		if (drag) {
			e = MousePos(e);
			rectangulos[drag].puntoInicial.x += e.x - dPoint.x;
			rectangulos[drag].puntoInicial.y += e.y - dPoint.y;
			dPoint = e;
			DrawCanvas();
		}
	}
	
	
	// end dragging
	function DragEnd(e) {
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
	
	
	function drawString( text, posX, posY, textColor, rotation, font, fontSize, rectangulo) {
				
				var lines = text.split("\n");
				var metrics
				var i;
				var extraIzquierdo = 15;
				var extraSuperior = 0;
				var extraPosterior = 5;
				var extraDerecho = 10;
				var sangria=5;
				if (!rotation) rotation = 0;
				if (!font) font = "'serif'";
				if (!fontSize) fontSize = 16;
				if (!textColor) textColor = '#000000';
		 		ctx.save();
		 		ctx.font = fontSize + "px " + font;
		 		ctx.fillStyle = textColor;
		 		ctx.translate(posX, posY);
		 		ctx.rotate(rotation * Math.PI / 180);
				for (i = 0; i < lines.length; i++) {
			 		ctx.fillText(lines[i],extraIzquierdo, ((i+1)*(fontSize + sangria)) +extraSuperior);
					metrics = ctx.measureText(lines[i]);
					//console.log("Metrics: "+ metrics.width);
					if(rectangulo.ancho < (metrics.width + fontSize + extraDerecho))
						rectangulo.ancho = metrics.width + fontSize + extraDerecho;
				}
				rectangulo.alto = (i * fontSize) + fontSize+ (sangria * (i -1)) + extraPosterior;
		 		ctx.restore();
		 	}
		 	
		 	function run() {
				
				/*
				drawString('hallo wie gehts?\ndas ist \nein Winkel\n von 30 Grad!', 200, 200, '#444',30,"Chalkduster",12);
				drawString('auf\'m Kopf', 500, 100, '#363',180,"Chalkduster",24);
				drawString('und alles mit HTML5 JS coool',500,300,'#a66',-30,"Trebuchet MS",24);
				drawString('nach unten',10,10,'#66a',90,"Trebuchet MS",24);
				*/
				//drawString('anach oben',27,590,'#66a',0,"sans-serif",10);
		 	}
