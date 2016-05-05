var puntos = new Array();
var lineas = new Array();
var ctx, drag;

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
	
	for(i=1, p=0, x=250, j=500; i < 6 ; i++, x=x+1, j=j-50, p=p+2)
	{
		lineas[i-1] = new Linea(new Punto(x, j), new Punto(j, x));
		puntos[p] = lineas[i-1].puntoA;
		puntos[p+1] = lineas[i-1].puntoB;
	}
	
	for(i = 0; i < lineas.length ; i++) { // listando los elementos del array
	  console.log('En la linea' + i + ' puntoA( ' +  lineas[i].puntoA.x + "," + lineas[i].puntoA.y + ')');
	  console.log('En la linea' + i + ' puntoB( ' +  lineas[i].puntoB.x + "," + lineas[i].puntoB.y + ')');
	}
	// default styles
	style = {
		curve:	{ width: 6, color: "#333" },
		cpline:	{ width: 1, color: "#C00" },
		point: { radius: 10, width: 2, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
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
		ctx.arc(puntos[p].x, puntos[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
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
			if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
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
