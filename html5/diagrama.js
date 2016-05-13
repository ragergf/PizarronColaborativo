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


function Relacion(puntoA, puntoB)
{
	this.puntoA = puntoA;
	this.puntoB = puntoB;
}

function Rectangulo(puntoInicial,puntoMedio,ancho,alto)
{
	this.puntoInicial=puntoInicial;
	this.puntoMedio=puntoMedio;
	this.ancho=ancho;
	this.alto=alto;
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
		x = (Math.random() * 100) + 1;
		y = (Math.random() * 100) + 1;
		
		//x=100+m;
		//y=100-m;
		console.log("x: "+x + ", y: "+y);
		
		topPoint = new Punto(x, y + (ancho/2));
		bottomPoint = new Punto(x+alto, y+(ancho/2));
		leftPoint = new Punto(x+(alto/2), y);
		rightPoint = new Punto(x+(alto/2), y+ancho);
		
		puntoMedio = new PuntoMedio(topPoint, bottomPoint, leftPoint, rightPoint);
		
		rectangulos[m] = new Rectangulo(new Punto(x,y), puntoMedio, null, null);
		
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
	
	console.log('antes de dibujar los rectangulos');
			
	for (var p in rectangulos) {
		console.log('p: '+ p);
		ctx.lineWidth = style.point.width;
		ctx.strokeStyle = style.point.color;
		ctx.fillStyle = style.point.fill;
		ctx.beginPath();
		//ctx.arc(puntos[p].x, puntos[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
		ctx.strokeRect(rectangulos[p].puntoInicial.x, rectangulos[p].puntoInicial.y,ancho,alto)
		ctx.fill();
		ctx.stroke();
	}
	

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
