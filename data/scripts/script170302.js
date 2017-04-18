var pointeur;
var oldCamera={
	x:0,
	y:0,
	z:1,
};
var camera={
	x:0,
	y:0,
	z:1,
	centre_x:undefined,
	centre_y:undefined,
	vitesse:1,
	left:false,
	right:false,
	up:false,
	down:false,
	in:false,
	out:false,
	in_use:false,

};
ghost = function(){
	this.x;
	this.y;
	this.w;
	this.h;
	this.type;
	this.DOMElement;
}
var ghosts=[];
function createForm(el){
	/*DOM*/
	var child=document.createElement('div');
	child.id=ghosts.length;
	child.className='child';
	child.setAttribute('type','form');
	child.style.width=rect(el).w*2+'px';
	child.style.height=rect(el).h*2+'px';
	child.style.marginLeft=rect(el).x-rect(el).w/2+'px';
	child.style.marginTop=rect(el).y-rect(el).w/2+'px';
	var child_0=document.createElement('div');
	child_0.style.width=rect(el).w*2+'px';
	child_0.style.height=rect(el).h*2+'px';
	child_0.style.backgroundImage = "url('data/assets/form"+random(0,4)+".gif')";
	child_0.style.backgroundSize = '100%';
	child_0.style.backgroundRepeat = 'none';
	child_0.style.transform = 'rotate('+random(-360,360)+'deg)';
	child.appendChild(child_0);
	document.body.appendChild(child);
	el.style.backgroundColor='transparent';
	/*POR*/
	var g = new ghost();
	g.DOMElement=child;
	g.x=camera.centre_x-(camera.centre_x-(rect(el).x-rect(el).w/2-camera.x*camera.z))/camera.z;
	g.y=camera.centre_y-(camera.centre_y-(rect(el).y-rect(el).h/2-camera.y*camera.z))/camera.z;
	g.w=rect(el).w*2/camera.z;
	g.h=rect(el).h*2/camera.z;
	g.type='form';
	ghosts.push(g);
}
function camera_moves(e,bool){
	e = e || window.event;
	var key = e.which || e.keyCode;
	console.log(key);
	if(key==39){
		camera.right=bool;
	}
	if(key==37){
		camera.left=bool;
	}
	if(key==38){
		camera.up=bool;
	}
	if(key==40){
		camera.down=bool;
	}
	if(key==33){
		camera.in=bool;
	}
	if(key==34){
		camera.out=bool;
	}
}
/*SETUP*/
eval_onload(function(){
	camera.centre_y=window.innerHeight/2;
	camera.centre_x=window.innerWidth/2;
	camera.vitesse=5;
	var el=document.createElement('div');
	el.style.width='16px';
	el.style.height='16px';
	el.style.outline='solid';
	el.style.outlineWidth='1px';
	el.style.outlineColor='tomato';
	el.style.zIndex='999';
	el.id='pointeur';
	el.addEventListener('mouseup',function(){
		button(this,function(){
			createForm(el);
		},2);
	})
	el.addEventListener('mousedown',function(){
		button(this,function(){
			el.style.backgroundColor='pink';
		},2);
	})
	document.body.appendChild(el);
	pointeur=document.getElementById('pointeur');
	document.body.addEventListener('mousemove',function(e) {
		pointeur.style.marginLeft=e.clientX-rect(pointeur).w/2+'px';
		pointeur.style.marginTop=e.clientY-rect(pointeur).h/2+'px';
	});
	document.body.addEventListener('keydown',function(e){
		camera_moves(e,true);
	});
	document.body.addEventListener('keyup',function(e){
		camera_moves(e,false);
	});
});
var count=0;
/*DRAW*/
repeat(function(){
	if(count>1){
		count=0;
		if(camera.right==true){
			camera.x=camera.x+camera.vitesse/camera.z;
		}
		if(camera.left==true){
			camera.x=camera.x-camera.vitesse/camera.z;
		}
		if(camera.up==true){
			camera.y=camera.y-camera.vitesse/camera.z;
		}
		if(camera.down==true){
			camera.y=camera.y+camera.vitesse/camera.z;
		}
		if(camera.in==true){
			camera.z=camera.z*(1+0.001*camera.vitesse);
		}
		if(camera.out==true){
			camera.z=camera.z/(1+0.001*camera.vitesse);
		}

		if(camera.x!=oldCamera.x || camera.y!=oldCamera.y || camera.z!=oldCamera.z){
			camera.in_use=true;
			oldCamera.x=camera.x;
			oldCamera.y=camera.y;
			oldCamera.z=camera.z;
		}else{
			camera.in_use=false;
		}
		if(camera.in_use==true){

			var childs=document.getElementsByClassName("child");
			for (var i = 0; i < childs.length; i++) {
				childs[i].style.marginLeft=camera.centre_x-(camera.centre_x-ghosts[i].x-camera.x)*camera.z+"px";
				childs[i].style.marginTop=camera.centre_y-(camera.centre_y-ghosts[i].y-camera.y)*camera.z+"px";
				childs[i].style.height=ghosts[i].h*camera.z+"px";
				childs[i].style.width=ghosts[i].w*camera.z+"px";	
				if(childs[i].getAttribute('type')=='form'){
					var form=childs[i].getElementsByTagName('div')[0];
					form.style.height=ghosts[i].h*camera.z+"px";
					form.style.width=ghosts[i].w*camera.z+"px";
				}
			}
		}
	}else{
		count++;
	}
});
