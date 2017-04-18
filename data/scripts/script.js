Traveler = function(name){
	this.name=name;
	this.sight=null;
	this.tool=null;
    this.scroll=null;
}

Sight = function(limbo,gate,name){
	this.name=name;
	this.gate=gate;
	this.limbo=limbo;
	this.x=0;
	this.y=0;
	this.z=1;
	this.aiming={x:0,y:0};
	this.speed=8;
	this.left=false;
	this.right=false;
	this.up=false;
	this.down=false;
	this.in=false;
	this.out=false;
	this.moving=false;
	this.scope={close:2,far:0.5};
	this.before=null;
};

Sight.create = function(limbo,index) {
	var sight = new Sight(limbo,limbo.gates[index],'perspective');
	var before = new Sight(limbo,limbo.gates[index],'perspective');
	sight.before=before;
	limbo.sights.push(sight);
}

Sight.prototype.aim = function(){
	this.aiming.x=rect(this.gate).w/2;
	this.aiming.y=rect(this.gate).h/2;
}

Sight.prototype.interface = function(key,bool){
	if(key=='left'){
		key=37;
	}
	if(key=='right'){
		key=39;
	}
	if(key=='up'){
		key=38;
	}
	if(key=='down'){
		key=40;
	}
	if(key=='in'){
		key=33;
	}
	if(key=='out'){
		key=34;
	}
	//console.log(key);
	if(key==39){
		this.right=bool;
	}
	if(key==37){
		this.left=bool;
	}
	if(key==38){
		this.up=bool;
	}
	if(key==40){
		this.down=bool;
	}
	if(key==33){
		this.in=bool;
	}
	if(key==34){
		this.out=bool;
	}
}

Sight.prototype.move = function(){
	if(this.right==true){
		this.x=this.x+this.speed/this.z;
	}
	if(this.left==true){
		//console.log('left');
		this.x=this.x-this.speed/this.z;
	}
	if(this.up==true){
		this.y=this.y-this.speed/this.z;
	}
	if(this.down==true){
		this.y=this.y+this.speed/this.z;
	}
	if(this.in==true){
		this.z=this.z*(1+0.001*this.speed);
	}
	if(this.out==true){
		this.z=this.z/(1+0.001*this.speed);
	}
	if(this.x!=this.before.x || this.y!=this.before.y || this.z!=this.before.z){
		this.before.x=this.x;
		this.before.y=this.y;
		this.before.z=this.z;
		this.moving=true;
		this.aim();
		//console.log(this.aiming.x);
		for (var i = this.limbo.ghosts.length - 1; i >= 0; i--) {
			this.limbo.ghosts[i].move(this.limbo,this);
		}
	}else{
		this.moving=false;
	}
}

Limbo = function(name){
	this.name=name;
	this.sights=[];
	this.gates=[];
	this.ghosts=[];
}

Limbo.DOMcreate = function(){
	var nothingness = new Limbo('nothingness');
	nothingness.gates.push(document.body);
	//console.log('hello limbo');
	return nothingness;
}

Ghost = function(name){
	this.name=name;
	this.x=undefined;
	this.y=undefined;
	this.w=undefined;
	this.h=undefined;
	this.z=undefined;
	this.visibility=1;
	this.isText = false;
	this.isImage = false;
	this.isVideo = false;
	this.isAudio = false;
	this.isTrace = false;
	this.content=undefined;
	this.haunted=null;
	this.seed=null;
}

Ghost.DOMsummon = function(name,limbo,sight,index,x,y,type){
	var summoned = new Ghost(name);
	var vessel = document.createElement('div');
	vessel.id=summoned.name;
	type(x,y,vessel);
	limbo.gates[index].appendChild(vessel);
	summoned.haunted=vessel;
	summoned.x=sight.aiming.x-(sight.aiming.x-(rect(summoned.haunted).x-sight.x*sight.z))/sight.z;
	summoned.y=sight.aiming.y-(sight.aiming.y-(rect(summoned.haunted).y-sight.y*sight.z))/sight.z;
	summoned.w=rect(summoned.haunted).w/sight.z;
	summoned.h=rect(summoned.haunted).h/sight.z;
	summoned.z=sight.z;
	//console.log('sight.z',sight.z);
	var seed = new Ghost('seed');
	seed = clone(summoned);
	//console.log(seed);
	summoned.seed=seed;
	limbo.ghosts.push(summoned);
}

testingVessel = function(x,y,el){
	el.style.marginLeft=x+'px';
	el.style.marginTop=y+'px';
	el.style.width='64px';
	el.style.height='64px';
	el.style.backgroundColor='blue';
	el.style.position='absolute';
}

Ghost.prototype.move = function(limbo,sight){
	//console.log(this.name,'trying to move');
	if(sight.moving==true){
		//console.log(this.name,this.x);
		//console.log(sight.aiming.x);
		this.x=sight.aiming.x-(sight.aiming.x-this.seed.x-sight.x)*sight.z;
		this.y=sight.aiming.y-(sight.aiming.y-this.seed.y-sight.y)*sight.z;
		
		//C'est quoi ext ???
		var ext=this.seed.w*100/(this.w*sight.z);
		console.log(this.name,ext);
		console.log('this.seed.w*100',this.seed.w*100);
		console.log('this.w*sight.z',this.w*sight.z);
		if(ext<sight.scope.close || 
			this.x+(this.w*sight.z)/2<sight.scope.far*(ext*5) || 
			this.x+(this.w*sight.z)/2>rect(sight.gate).w-sight.scope.far*(ext*5) || 
			this.y+(this.h*sight.z)/2<sight.scope.far*(ext*5) || 
			this.y+(this.h*sight.z)/2>rect(sight.gate).h-sight.scope.far*(ext*5) ){
			if(this.visibility>-0.1){
				this.visibility=this.visibility-0.1;
			}
		}else{
			if(this.visibility<1){
				this.visibility=this.visibility+0.1;
			}
		}
		this.DOMmove(sight);
	}
}

Ghost.prototype.DOMmove = function(sight){
	if(this.visibility>0){
		if(document.getElementById(this.haunted.id)==null){
			document.body.appendChild(this.haunted);
		}else{
			
		}
		this.haunted.style.visibility='visible';
		this.haunted.style.opacity=this.visibility;
		this.haunted.style.marginLeft=this.x+'px';
		this.haunted.style.marginTop=this.y+'px';
		this.haunted.style.height=this.h*sight.z+'px';
		this.haunted.style.width=this.w*sight.z+'px';	
	}else{
		if(document.getElementById(this.haunted.id)==null){
		}else{
			this.haunted.parentNode.removeChild(this.haunted);
		}
	}
}
var main_limbo;
var setup=false;

eval_onload(
	function(){
		main_limbo = Limbo.DOMcreate();
		Sight.create(main_limbo,0);
		//console.log(main_limbo);
		document.getElementsByTagName('left')[0].addEventListener('mousedown',function(){
			main_limbo.sights[0].interface('left',true);
		});
		document.getElementsByTagName('left')[0].addEventListener('mouseup',function(){
			main_limbo.sights[0].interface('left',false)
		});
		document.getElementsByTagName('left')[0].addEventListener('mouseout',function(){
			main_limbo.sights[0].interface('left',false)
		});
		document.getElementsByTagName('up')[0].addEventListener('mousedown',function(){
			main_limbo.sights[0].interface('up',true);
		});
		document.getElementsByTagName('up')[0].addEventListener('mouseup',function(){
			main_limbo.sights[0].interface('up',false)
		});
		document.getElementsByTagName('up')[0].addEventListener('mouseout',function(){
			main_limbo.sights[0].interface('up',false)
		});
		document.getElementsByTagName('right')[0].addEventListener('mousedown',function(){
			main_limbo.sights[0].interface('right',true);
		});
		document.getElementsByTagName('right')[0].addEventListener('mouseup',function(){
			main_limbo.sights[0].interface('right',false)
		});
		document.getElementsByTagName('right')[0].addEventListener('mouseout',function(){
			main_limbo.sights[0].interface('right',false)
		});
		document.getElementsByTagName('down')[0].addEventListener('mousedown',function(){
			main_limbo.sights[0].interface('down',true);
		});
		document.getElementsByTagName('down')[0].addEventListener('mouseup',function(){
			main_limbo.sights[0].interface('down',false)
		});
		document.getElementsByTagName('down')[0].addEventListener('mouseout',function(){
			main_limbo.sights[0].interface('down',false)
		});
		document.getElementsByTagName('in')[0].addEventListener('mousedown',function(){
			main_limbo.sights[0].interface('in',true);
		});
		document.getElementsByTagName('in')[0].addEventListener('mouseup',function(){
			main_limbo.sights[0].interface('in',false)
		});
		document.getElementsByTagName('in')[0].addEventListener('mouseout',function(){
			main_limbo.sights[0].interface('in',false)
		});
		document.getElementsByTagName('out')[0].addEventListener('mousedown',function(){
			main_limbo.sights[0].interface('out',true);
		});
		document.getElementsByTagName('out')[0].addEventListener('mouseup',function(){
			main_limbo.sights[0].interface('out',false)
		});
		document.getElementsByTagName('out')[0].addEventListener('mouseout',function(){
			main_limbo.sights[0].interface('out',false)
		});
		document.body.addEventListener('mouseup',function(e){
			button(this,function(){
			Ghost.DOMsummon('gasper'+main_limbo.ghosts.length,main_limbo,main_limbo.sights[0],0,e.clientX,e.clientY,testingVessel);
		},2);
		});
		setup=true;
	}
);

repeat(function(){
	if(setup==true){
		main_limbo.sights[0].move();
	}
});