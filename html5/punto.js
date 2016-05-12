var puntos = new Array();
var puntosMedios = new Array();
var lineas = new Array();
var ctx, drag, ancho, alto;

function PuntoMedio(topPoint, bottomPoint, leftPoint, rightPoint)
{
	this.topPoint = topPoint;
	this.bottomPoint = bottomPoint;
	this.leftPoint = leftPoint;
	this.rightPoint = rightPoint;
}

function Punto(x, y)
{
	this.x = x;
	this.y = y;
}

function Linea(puntoA, puntoB)
{
	this.puntoA = puntoA;
	this.puntoB = puntoB;
}

function Init()
{
	var p1 = new Punto(5,11);
	ancho = 150;
	alto = 80;
	
	puntos[0] = p1;
	
	console.log('puntos.length = ' + puntos.length);
	
	/*
	for(i = 1; i < 11 ; i++) { // listando los elementos del array
	  puntos[i] = new Punto(i, (i*2));
	}
	
	for(i = 0; i < puntos.length ; i++) { // listando los elementos del array
	  console.log('En la posición: ' + i + ' esta el elemento: x: ' +  puntos[i].x + ", y: " + puntos[i].y);
	}
	*/
	
	for(i=1, p=0, x=50, j=400; i < 3 ; i++, x=x+170, j=j-20, p=p+2)
	{
		lineas[i-1] = new Linea(new Punto(x, j), new Punto(j, x));
		puntos[p] = lineas[i-1].puntoA;
		puntos[p+1] = lineas[i-1].puntoB;
		
		puntosMedios[p] = new PuntoMedio(new Punto(puntos[p].x +(ancho/2), puntos[p].y), new Punto(puntos[p].x +(ancho/2), puntos[p].y + alto),
		new Punto(puntos[p].x, puntos[p].y + (alto/2)), new Punto(puntos[p].x + ancho, puntos[p].y + (alto/2)));
		
		puntosMedios[p+1] = new PuntoMedio(new Punto(puntos[p+1].x +(ancho/2), puntos[p+1].y), new Punto(puntos[p+1].x +(ancho/2), puntos[p+1].y + alto),
		new Punto(puntos[p+1].x, puntos[p+1].y + (alto/2)), new Punto(puntos[p+1].x + ancho, puntos[p+1].y + (alto/2)));
		
		
	}
	
	for(i = 0; i < lineas.length ; i++) { // listando los elementos del array
	  console.log('En la linea' + i + ' puntoA( ' +  lineas[i].puntoA.x + "," + lineas[i].puntoA.y + ')');
	  console.log('En la linea' + i + ' puntoB( ' +  lineas[i].puntoB.x + "," + lineas[i].puntoB.y + ')');
	}
	// default styles
	style = {
		curve:	{ width: 6, color: "#333" },
		cpline:	{ width: 1, color: "#C00" },
		point: { radius: 3, width: 1, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
	}
	
	// event handlers
	canvas.onmousedown = DragStart;
	canvas.onmousemove = Dragging;
	canvas.onmouseup = canvas.onmouseout = DragEnd;
	
	DrawCanvas();
}


// draw canvas
function DrawCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	console.log('antes de dibujar los puntos');
	for (var p in puntosMedios) {
		console.log('p medio: '+ p);
		
		puntosMedios[p] = new PuntoMedio(new Punto(puntos[p].x +(ancho/2), puntos[p].y), new Punto(puntos[p].x +(ancho/2), puntos[p].y + alto),
		new Punto(puntos[p].x, puntos[p].y + (alto/2)), new Punto(puntos[p].x + ancho, puntos[p].y + (alto/2)));
		
		
		
		ctx.lineWidth = style.point.width;
		ctx.strokeStyle = style.point.color;
		ctx.fillStyle = style.point.fill;
		ctx.beginPath();
		ctx.arc(puntosMedios[p].topPoint.x, puntosMedios[p].topPoint.y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(puntosMedios[p].bottomPoint.x, puntosMedios[p].bottomPoint.y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(puntosMedios[p].leftPoint.x, puntosMedios[p].leftPoint.y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(puntosMedios[p].rightPoint.x, puntosMedios[p].rightPoint.y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.fill();
		ctx.stroke();
	}
	
	for(i = 0; i < lineas.length ; i++) { // listando los elementos del array
		console.log('pintando linea' + i + ' puntoA( ' +  lineas[i].puntoA.x + "," + lineas[i].puntoA.y + ')');
		console.log('pintando linea' + i + ' puntoB( ' +  lineas[i].puntoB.x + "," + lineas[i].puntoB.y + ')');
		// control lines
		ctx.lineWidth = style.cpline.width;
		ctx.strokeStyle = style.cpline.color;
		ctx.beginPath();
		ctx.moveTo(lineas[i].puntoA.x, lineas[i].puntoA.y);	
		ctx.lineTo(lineas[i].puntoB.x, lineas[i].puntoB.y);
		ctx.stroke();
	}
	
	console.log('antes de dibujar los puntos');
	for (var p in puntos) {
		console.log('p: '+ p);
		ctx.lineWidth = style.point.width;
		ctx.strokeStyle = style.point.color;
		ctx.fillStyle = style.point.fill;
		ctx.beginPath();
		//ctx.arc(puntos[p].x, puntos[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.strokeRect(puntos[p].x, puntos[p].y,ancho,alto)
		ctx.fill();
		ctx.stroke();
	}
	

}


// start dragging
	function DragStart(e) {
		e = MousePos(e);
		var dx, dy;
		for (var p in puntos) {
			dx = puntos[p].x - e.x;
			dy = puntos[p].y - e.y;
			//if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
			if(((puntos[p].x < e.x ) &&  (e.x < (puntos[p].x + ancho)) ) && ((puntos[p].y < e.y )&&(e.y < (puntos[p].y + alto)))){
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
			puntos[drag].x += e.x - dPoint.x;
			puntos[drag].y += e.y - dPoint.y;
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
