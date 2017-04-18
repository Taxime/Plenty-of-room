var pointeur;
var oldCamera={
	x:0,
	y:0,
	z:1,
};
var user={
	mousedown:false,
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
	child_0.style.backgroundImage = "url('data/assets/form"+random(0,8)+".gif')";
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
	el.style.pointerEvents='none';
	el.id='pointeur';
	document.body.appendChild(el);
	pointeur=document.getElementById('pointeur');

	var left=document.getElementsByTagName("left")[0];
	var right=document.getElementsByTagName("right")[0];
	var up=document.getElementsByTagName("up")[0];
	var down=document.getElementsByTagName("down")[0];
	var _in=document.getElementsByTagName("in")[0];
	var out=document.getElementsByTagName("out")[0];

	left.addEventListener("mousedown", function(e){
		camera.right=true;
	});
	left.addEventListener("mouseup", function(e){
		camera.right=false;
	});
	left.addEventListener("mouseout", function(e){
		camera.right=false;
	});
	right.addEventListener("mousedown", function(e){
		camera.left=true;
	});
	right.addEventListener("mouseup", function(e){
		camera.left=false;
	});
	right.addEventListener("mouseout", function(e){
		camera.left=false;
	});
	up.addEventListener("mousedown", function(e){
		camera.down=true;
	});
	up.addEventListener("mouseup", function(e){
		camera.down=false;
	});
	up.addEventListener("mouseout", function(e){
		camera.down=false;
	});
	right.addEventListener("mousedown", function(e){
		camera.left=true;
	});
	right.addEventListener("mouseup", function(e){
		camera.left=false;
	});
	right.addEventListener("mouseout", function(e){
		camera.left=false;
	});
	down.addEventListener("mousedown", function(e){
		camera.up=true;
	});
	down.addEventListener("mouseup", function(e){
		camera.up=false;
	});
	down.addEventListener("mouseout", function(e){
		camera.up=false;
	});
	_in.addEventListener("mousedown", function(e){
		camera.in=true;
	});
	_in.addEventListener("mouseup", function(e){
		camera.in=false;
	});
	_in.addEventListener("mouseout", function(e){
		camera.in=false;
	});
	out.addEventListener("mousedown", function(e){
		camera.out=true;
	});
	out.addEventListener("mouseup", function(e){
		camera.out=false;
	});
	out.addEventListener("mouseout", function(e){
		camera.out=false;
	});

	document.body.addEventListener('mousedown',function(){
		button(this,function(){
			pointeur.style.backgroundImage="url('data/assets/cursor_right.gif')";
		},2);
		user.mousedown=true;
	});

	document.body.addEventListener('mouseup',function(){
		button(this,function(){
			createForm(pointeur);
		},2);
		user.mousedown=false;
	});

	document.body.addEventListener('mousemove',function(e) {
		pointeur.style.marginLeft=e.clientX+'px';
		pointeur.style.marginTop=e.clientY+'px';
		if(user.mousedown==false){
			if(rect(pointeur).x<rect(left).w || rect(pointeur).x>rect(right).x || rect(pointeur).y<rect(up).h || rect(pointeur).y>rect(down).y || rect(pointeur).x<rect(_in).w && rect(pointeur).y<rect(_in).h){
				pointeur.style.backgroundImage="url('data/assets/cursor_touch.png')";
			}else{
				pointeur.style.backgroundImage="url('data/assets/cursor_default.png')";
			}
		}
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
			if(ext<camera.close || ghosts[i].x+(ghosts[i].w*camera.z)/2<camera.far*(ext*5) || ghosts[i].x+(ghosts[i].w*camera.z)/2>window.innerWidth-camera.far*(ext*5) || ghosts[i].y+(ghosts[i].h*camera.z)/2<camera.far*(ext*5) || ghosts[i].y+(ghosts[i].h*camera.z)/2>window.innerHeight-camera.far*(ext*5) ){
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
