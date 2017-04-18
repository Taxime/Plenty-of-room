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
	far:0.5,
	close:2,

};
ghost = function(){
	this.x;
	this.y;
	this.a_x;
	this.a_y;
	this.w;
	this.h;
	this.a_w;
	this.a_h;
	this.z;
	this.opacity;
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
	child.style.width=rect(el).w+'px';
	child.style.height=rect(el).h+'px';
	child.style.marginLeft=rect(el).x+'px';
	child.style.marginTop=rect(el).y-rect(el).h/2+'px';
	var child_0=document.createElement('div');
	child_0.style.width=rect(el).w+'px';
	child_0.style.height=rect(el).h+'px';
	child_0.style.backgroundImage = "url('data/assets/form"+random(0,4)+".gif')";
	child_0.style.backgroundSize = '100%';
	child_0.style.backgroundRepeat = 'none';
	child_0.style.transform = 'rotate('+random(-360,360)+'deg)';
	child.appendChild(child_0);
	document.body.appendChild(child);
	el.style.backgroundImage="url('data/assets/cursor_default.png')";
	/*POR*/
	var g = new ghost();
	g.DOMElement=child;
	g.x=camera.centre_x-(camera.centre_x-(rect(el).x-camera.x*camera.z))/camera.z;
	g.y=camera.centre_y-(camera.centre_y-(rect(el).y-rect(el).h/2-camera.y*camera.z))/camera.z;
	g.a_x=camera.centre_x-(camera.centre_x-(rect(el).x-camera.x*camera.z))/camera.z;
	g.a_y=camera.centre_y-(camera.centre_y-(rect(el).y-rect(el).h/2-camera.y*camera.z))/camera.z;
	g.w=rect(el).w/camera.z;
	g.h=rect(el).h/camera.z;
	g.a_w=rect(el).w;
	g.a_h=rect(el).h;
	g.z=camera.z;
	g.opacity = 1;
	g.type='form';
	ghosts.push(g);
}
function camera_moves(e,bool){
	e = e || window.event;
	var key = e.which || e.keyCode;
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
	camera.vitesse=10;
	var el=document.createElement('div');
	el.style.width='96px';
	el.style.height='96px';
	el.style.backgroundImage="url('data/assets/cursor_default.png')";
	el.style.backgroundSize='100%';
	el.style.zIndex='999';
	el.id='pointeur';
	el.addEventListener('mouseup',function(){
		button(this,function(){
			createForm(el);
		},2);
	})
	el.addEventListener('mousedown',function(){
		button(this,function(){
			el.style.backgroundImage="url('data/assets/cursor_right.gif')";
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
			
			ghosts[i].x=camera.centre_x-(camera.centre_x-ghosts[i].a_x-camera.x)*camera.z;
			ghosts[i].y=camera.centre_y-(camera.centre_y-ghosts[i].a_y-camera.y)*camera.z;

			var ext=ghosts[i].a_w*100/(ghosts[i].w*camera.z);
			console.log(ext);
			if(ext<camera.close || ghosts[i].x+(ghosts[i].w*camera.z)/2<camera.far*ext || ghosts[i].x+(ghosts[i].w*camera.z)/2>window.innerWidth-camera.far*ext || ghosts[i].y+(ghosts[i].h*camera.z)/2<camera.far*ext || ghosts[i].y+(ghosts[i].h*camera.z)/2>window.innerHeight-camera.far*ext ){
				if(ghosts[i].opacity>-0.1){
					ghosts[i].opacity=ghosts[i].opacity-0.1;
				}
			}else{
				if(ghosts[i].opacity<1){
					ghosts[i].opacity=ghosts[i].opacity+0.1;
				}
			}
			if(ghosts[i].opacity>0){
				childs[i].style.visibility='visible';
				childs[i].style.opacity=ghosts[i].opacity;
				childs[i].style.marginLeft=ghosts[i].x+'px';
				childs[i].style.marginTop=ghosts[i].y+'px';
				childs[i].style.height=ghosts[i].h*camera.z+'px';
				childs[i].style.width=ghosts[i].w*camera.z+'px';	
				if(childs[i].getAttribute('type')=='form'){
					var form=childs[i].getElementsByTagName('div')[0];
					form.style.height=ghosts[i].h*camera.z+'px';
					form.style.width=ghosts[i].w*camera.z+'px';
				}
			}else{
				childs[i].style.visibility='hidden';
			}
		}
	}
});
