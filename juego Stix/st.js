var canva, enemigo, int,nuevo=0, enemigoA;

function main() {
	canva = document.getElementById("mycanvas");
	ctx.fillStyle="indianred";

	ctx.fillRect(0,0,700,500);	
	ctx.fillStyle="#522626";
	ctx.fillRect(0,0,700,50);
	Juego();
}
	
window.onkeyup = function (event) {
	controlTeclas(event, false);
}

function Punto(x,y) {
	this.x = x;
	this.y = y;
}
function enemigoBorder(k,l){
	this.k=k;
	this.l=l;
}

function Enemigo(x,y,movx,movy) {
	this.x = x;
	this.y = y;
	this.movx = movx;
	this.movy = movy;
}

function Juego() {
	x = 0;
	y = 50;
	k=14;
	l=50;
	dir = -1;
	movimiento = 0;

	camino = new Array();
	enlinea = 1;
	area 	= new Array();
	area[0] = new Punto(0,50);
	area[1] = new Punto(700,50);
	area[2] = new Punto(700,498);
	area[3] = new Punto(0,498);
	
	direccion = new Array(false, false, false, false);

	window.clearInterval(int);
	int=setInterval("dibujar()", 30);

	window.onkeydown = function (e) {
		controlTeclas(e, true);
	};
		if(Math.random()<0.5){
			sx = -2;
			sy = -2;
		}else{
			sx = 2;
			sy = 2;
		}
		enemigo = new Enemigo(300, 200, sx, sy);		
		pat = ctx.createPattern(canva, "repeat");
		
}

function dibujar() {
	var i,j;
	
	
	if(nuevo==0){
		ctx.clearRect(200,0,250,30);
		ctx.font="25px Arial";
		ctx.fillText("   ATrott * * * 100 %" ,200,20);
	}
					
	movimiento = 0;
	od = dir;
	for(i in direccion) {
		if(direccion[i]) {
			dir = Number(i);
			movimiento = 1;
		}			
	}
	if(movimiento) {
		if(! revisarLinea(area,x,y)) {
			if((od+1)%4==dir||od==(dir+1)%4) {
				camino.push(new Punto(x,y))
			}			
		}
	}

	if(movimiento==1) {
		ox = x; oy = y;
		if(dir==0)
			y+=-4;
		if(dir==1)
			x+=4;
		if(dir==2)
			y+=4;
		if(dir==3)
			x+=-4;
	
		if(revisarLinea(area,x,y))
		{
			if(enlinea==0) {
				if(camino[0].x==x&&camino[0].y==y) {
					camino = new Array();
				} else {
				
					camino.push(new Punto(x,y));
					a = cortar(area, camino);
					areax = cuadrado(a[0]);
					areay = cuadrado(a[1]);
					nuevo=1;
					if(areax>areay) {
						 ctx.clearRect(200,0,250,30);
					ctx.font="25px Arial";
					ctx.fillText("   ATrott * * *" + Math.floor((areax*100)/630000)+ " %",200,20);
						area = a[0];
						this.harea = a[1];
						if(areax<50000) {
							mensaje("ganaste");
						}
					} else {
					ctx.clearRect(200,0,250,30);
					ctx.font="25px Arial";
					ctx.fillText("    ATrott * * *" + Math.floor((areay*100)/630000)+ " %",200,20);
						area = a[1];
						this.harea = a[0];
						if(areay<50000) {
							mensaje("ganaste");
						}
					}
					
					var ne=0;
						ex = enemigo.x;
						ey = enemigo.y;
						if(  inArea(ex,ey) || revisarLinea(area, ex,ey)) {
							ne=enemigo;
						}
					
						if(ne==0)
							mensaje("ganaste");
						camino = new Array();
				}




			}
			enlinea = 1;
			camino[0] = new Punto(x,y);
		} else {
			if(enlinea == 1) {			
				if(inArea(x,y)) {
					enlinea = 0;
				} else {
					x = ox; y = oy; movimiento = 0;
				}
			} else {
				ax = camino[0].x;				
				ay = camino[0].y;
				for(i=1;i<camino.length-2;i++) {
					bx = camino[i].x;		
					by = camino[i].y;
					if(unalinea(ax, ay,bx,by,x,y)) {
						camino = camino.slice(0, i);
						camino.push(new Punto(x,y));
					}
					
				ax = bx; ay = by;
				}
				
			}
		}
	} 
	
	if(enlinea==0) {
		ax = camino[0].x; 
		ay = camino[0].y;
		for(i=1;i<camino.length;i++) {
			bx = camino[i].x; by = camino[i].y;
			if(unalinea(ax, ay,bx,by,enemigo.x,enemigo.y)) {
				mensaje("perdiste");	
			}
			ax = bx; ay = by;
		}
			if(unalinea(ax, ay,x,y,enemigo.x,enemigo.y)) {
				mensaje("perdiste");
				
			}
		
	}

	ctx.fillStyle=pat;
	ctx.strokeStyle="yellow";
	dibujarArea(area);
		
	ctx.beginPath()			//linea trazada
	for ( cam in camino) {
		ctx.lineTo(camino[cam].x,camino[cam].y)
	}
	ctx.lineTo(x,y)
	ctx.stroke()
	
	ctx.fillStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.fillRect(x,y,10,10);
	ctx.closePath();
	ctx.fill();
	
		ex = enemigo.x+enemigo.movx;
		ey = enemigo.y+enemigo.movy;
		enemigo.x = ex;
		enemigo.y = ey;
		ax = area[area.length-1].x;
		ay = area[area.length-1].y;
		for(j in area) {
			bx = area[j].x;		by = area[j].y;
			if(unalinea(ax, ay,bx,by,ex,ey)) {
				if(ax==bx) {
					enemigo.movx = - enemigo.movx;
				}
				if(ay==by) {
					enemigo.movy = - enemigo.movy;
				}
			}
			ax = bx; ay = by;	
		}
		ctx.beginPath();
		ctx.fillRect(ex,ey,30,30);
		ctx.closePath();
		ctx.fill();

	ctx.beginPath();
	ctx.fillRect(k,l,100,5);
	ctx.closePath();
	ctx.fill();
	k++;
	if(x>=k){
		l++;

	}
}


function cuadrado(area) {
	var s = 0;
	ax = area[0].x; 
	ay = area[0].y;
	bx = area[1].x; 
	by = area[1].y;
	for(i=2;i<area.length;i++) {
		cx = area[i].x; cy = area[i].y;
		if(bx == cx) {
			s += (bx-ax)*(cy-by);
		} else {
			s += (by-ay)*(bx-cx);
		}
		op=cx; ol=cy;
		bx = cx; by = cy;
		ctx.fillRect(op,ol,ax,ay);

	}
	return Math.abs(s);
}

function inArea(x,y) {
	ax = area[area.length-1].x;
	ay = area[area.length-1].y;
	peri = 0;
	for(ar in area) {
		bx = area[ar].x;		
		by = area[ar].y;
		if(ay==by && ay<=y) {
			if (ax>=x && bx<x	||	ax<x && bx>=x) {
				peri += 1;
			}
		}
		ax = bx; ay = by;
	}
	return peri%2==1;		
}

function controlTeclas(event, valorB) {
	var clave = event.keyCode;
	if(clave==38)
		direccion[0] = valorB;
	if(clave==39) 
		direccion[1] = valorB;
	if(clave==40)
		direccion[2] = valorB;
	if(clave==37)
		direccion[3] = valorB;
}

function mensaje(arg) {
	window.clearInterval(int);
	ctx.clearRect(200,0,250,30);
	ctx.fillText("      ***"+arg+"***" ,200,20);
	
}

function dibujarArea(area) {
	ctx.beginPath();
	for ( i in area) {
		ctx.lineTo(area[i].x,area[i].y);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function cortar(area, camino) {
	var area1 = new Array();
	var area2 = new Array();
	var puntoFinal = new Array();
	puntoFinal[0] = camino[0];
	puntoFinal[1] = camino[camino.length-1];
	for(j in puntoFinal) {
		ax = area[area.length-1].x; ay = area[area.length-1].y;
		for(i in area) {
			bx = area[i].x; by = area[i].y;
			if(ax==puntoFinal[j].x&&ay==puntoFinal[j].y){
				break;
			}
			if(unalinea(ax,ay,bx,by,puntoFinal[j].x,puntoFinal[j].y)) {
				area.splice(Number(i), 0, puntoFinal[j]);
				break;
			}
			ui=ax; uo=ay;
			ax = bx; ay = by;
			ctx.fillRect(ui,uo,ax,ay);
		}
	}
	i = 0;
	for(e=0;e<=2;) {
		bx = area[i].x; by = area[i].y;
		switch(e) {
			case 0:
				if(bx==puntoFinal[0].x&&by==puntoFinal[0].y) {
					e = 1;
					area1 = camino.slice(0);
							area1.shift();
					area2 = camino.slice(0);
							area2.reverse();
							area2.shift();
				}
				break;
			case 1:
				if(bx==puntoFinal[1].x&&by==puntoFinal[1].y) {
					e = 2;
				}
				area2.push(area[i]);
				break;
			case 2:
				if(bx==puntoFinal[0].x&&by==puntoFinal[0].y) {
					e=3;
				}
				area1.push(area[i]);
		}
		i = (i+1)%area.length;
	}
	
	var areas = new Array(area1, area2);
	return areas;
}

function caminoEnBordesEnemy(areaCamino){
	
k++;


}

function revisarLinea(area,x,y) {
	var i;
	ax = area[area.length-1].x;
	ay = area[area.length-1].y;
	for(i in area) {
		bx = area[i].x;		by = area[i].y;
		if(unalinea(ax, ay,bx,by,x,y))
			return true;
		ax = bx; ay = by;
	}
	return false;
}

function unalinea(ax,ay,bx,by,x,y) {
	if(x==ax&&x==bx) {
		if((y>=ay&&y<=by)||(y>=by&&y<=ay)) {
			return true;
		}
	} else if(y==ay&&y==by) {
		if((x>=ax&&x<=bx)||(x>=bx&&x<=ax)) {
			return true;
		}
	}
	return false;
}


