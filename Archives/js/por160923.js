//  v160923 : printing"
/*
_________________________________________________________________________

                                *SETUP
_________________________________________________________________________
*/
//0
function reset(where){ 
  update='';
    document.getElementById("sketch").innerHTML='';
dataName= where;
    
    console.log("data detected");
  isInstallDone=false;
     lastLoop = new Date;
     refreshing=10;
     isMouseDown;
     mouse={x:undefined,y:undefined};
     
     CameraIterations=0;
     oldCameraIterations;
     isCameraworking=false;
     CameraStopping=0;
     cameraIsNotMoving=false;
    //fonctions anonymes
     consoleContent;
    //server Arrays
     arrW=[];
     arrH=[];
     arrX=[];
     arrY=[];
     paths=[];
     arrZ=[];
     arrId=[];
     arrHtml=[];
    //user Arrays
     rightClick=false;
     minX=0;
     maxX=0;
     minY=0;
     maxY=0;
     minXPreview=0;
     maxXPreview=0;
     minYPreview=0;
     maxYPreview=0;
     oldWWidt=0;
     path=[];
     pathPrev=[];
     TempOp=[];
     TempArrW=[];
     TempArrH=[];
     TempArrX=[];
     TempArrY=[];
     TempArrZ=[];
     TempArrId=[];
     TempArrHtml=[];
     objets={x:undefined,y:undefined,z:undefined,h:undefined,w:undefined,id:undefined,html:undefined};
     camProp={x:0,y:0,z:1,haut:false,bas:false,droite:false,gauche:false,
      zoomIn:false,zoomOut:false,centreX:undefined,centreY:undefined};
       timer = 0;
       camEtat=false;
       W=36;
       a=0;
       b=0;
       install=false;
       elementsToLoad;
       
  camProp.centreX=window.innerWidth/2;
  camProp.centreY=window.innerHeight/2;
  oldWWidth=window.innerWidth;
  load(dataName);
  elementsToLoad=document.getElementById("getting").getElementsByTagName("br");
  echelle();
  refreshPositions(256);
}
function setup(){
  camProp.centreX=window.innerWidth/2;
  camProp.centreY=window.innerHeight/2;
  oldWWidth=window.innerWidth;
  document.getElementById("pointer").style.width=oldWWidth/100+"px";
  document.getElementById("pointer").style.height=oldWWidth/100+"px";

  load(dataName);
  console.log("loaded "+dataName);
  elementsToLoad=document.getElementById("getting").getElementsByTagName("br");
  setInterval(draw, 8 );
  setInterval(speedyDraw, 25);
  var preview = document.createElement("span");
  preview.id = "preview";
  preview.style.fontSize=W/camProp.z+"px";
  document.getElementById("gui").appendChild(preview);
  var drawPreview = document.createElement("span");
  drawPreview.id = "drawPreview";
  drawPreview.style.fontSize=W/camProp.z+"px";
  document.getElementById("gui").appendChild(drawPreview);
  var cmd = document.createElement("textarea");
  cmd.id = "cmd";
  document.getElementById("dev").appendChild(cmd);
  document.getElementById("preview").style.fontSize=oldWWidth/50+"px";
  echelle();
  refreshPositions(256);
}
//1
function load(name){
  $.ajax({ url: 'load.php',
   data: { name : name},
   type: 'GET',
   datatype : 'html',
   success: function(data) {


    if(update==''){
      update=data;
      document.getElementById("getting").innerHTML+=update;
    }
    if(update<data){
      var content=data.substring(data.length,update.length);

      document.getElementById("getting").innerHTML=content;
      update=data;
    }
    var elements=document.getElementById("getting").getElementsByTagName("br");
    if(install==true && document.getElementById("getting").innerHTML!=''){
      for (var i = 0; i <= elements.length - 1; i++) {

        createElement($(elements[i]).attr('tag'),"sketch",$(elements[i]).attr('d-px'),$(elements[i]).attr('d-py'),$(elements[i]).attr('d-ex'),$(elements[i]).attr('d-ey'),$(elements[i]).attr('d-ez'),$(elements[i]).attr('d-ew'),
          $(elements[i]).attr('d-eh'),$(elements[i]).attr('d-html'),$(elements[i]).attr('d-style'));
      }
      document.getElementById("getting").innerHTML='';
      refreshPositions(256);
    }


  }
});
}
function speedyDraw(){
  if(cameraIsNotMoving==false){
   refreshPositions(256);
 }
}

function draw(){

  //echelle
  //console.log(camProp.z);
//fonction à faire : manque pour la taille de la brosse

 //
 if(isMouseDown && rightClick==true ) { 
  if(document.getElementById("cmd").value==""||document.getElementById("cmd").value==" "){

    drawing();

  }
} 
if(install==true){
  if(isInstallDone==false){
    refreshPositions(999999999);
    isInstallDone=true;
  }
  if(a>20){
    if(isMouseDown==false){
      load(dataName);
    }
    a=0;
  }else{

    a++;
  }
}else{
  installation();
  console.log("installation");
}

if(CameraIterations==oldCameraIterations){
  CameraStopping++;
}else{
  CameraStopping=0;
}
if(CameraStopping>5){
  if(cameraIsNotMoving!=true && isMouseDown==false){
    cameraIsNotMoving=true;
    refreshPositions(999999999);
  }
}else{
  cameraIsNotMoving=false;
}
oldCameraIterations=CameraIterations;

}
 //_______________________________________________________
    //
    //                 fonctions anonymes
    //_______________________________________________________
    // 
    function updatePaths(what,data,weigth) {

//The data for our line
var lineData = data;


      // Scale the range of the data again 
      var lineFunction = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })
      .curve(d3.curveCatmullRom.alpha(1));

    // Select the section we want to apply our changes to
    if(install==false){
     var path = d3.select(what)
     .attr("stroke-width", weigth/2)
     .attr("stroke", "tomato")
     .attr("d",lineFunction(lineData));
   }else{
    var path = d3.select(what)
    .attr("stroke-width", weigth/2)
    .attr("stroke", "rgb(72,72,72)")
    .attr("d",lineFunction(lineData));
  }


  
}
function refreshPositions(lagLimit){
  if(lagLimit<999999999){
    cameraIsNotMoving=false;
  }
  if(lagLimit==999999999){
  // document.getElementById("overlay").style.boxShadow="none";

  }else{
   /* if( document.getElementById("overlay").style.boxShadow!="0px 0px 64px 48px rgb(255,255,255) inset"){
      document.getElementById("overlay").style.boxShadow="0px 0px 64px 48px rgb(255,255,255) inset";
    }*/
  }
   // console.log("refreshPositions");
      //camProp.centreX-(camProp.centreX-arrX[i]-camProp.x)*camProp.z-camProp.x
      var Elements=document.getElementsByClassName("input");
     // console.log(Elements.length);
     //var coucou =Elements[Elements.length-1].getElementsByTagName("*");
     //colorConsole(coucou.length,"lightblue");
     var windowW=window.innerWidth;
     var windowH=window.innerHeight;
     var toDisplay=[];
     for (var i = 0; i < Elements.length; i++) {

//variables
TempArrZ[i]=arrZ[i]*camProp.z;
TempArrX[i]=camProp.centreX-(camProp.centreX-arrX[i]-camProp.x)*camProp.z;
TempArrY[i]=camProp.centreY-(camProp.centreY-arrY[i]-camProp.y)*camProp.z;
TempArrW[i]=arrW[i]*camProp.z;
TempArrH[i]=arrH[i]*camProp.z;


if(Elements[i].getAttribute("type")=="texte" && TempArrZ[i]>8){

  if(TempArrZ[i]>windowW/3){
    if(TempOp[i]>0){
      TempOp[i]-=0.1;
    }
  }else{
    if(TempOp[i]<1){
      TempOp[i]+=0.1;
    }
  }
}else{
 if(TempArrZ[i]<W/2){
  if(Elements[i].getAttribute("type")=="texte"){
    if(TempOp[i]>TempArrZ[i]*(TempArrZ[i]/250)){
      if(TempOp[i]>0){
        TempOp[i]-=0.1;
      }
    }else{
      TempOp[i]=TempArrZ[i]*(TempArrZ[i]/250);
    }
  }else{
    TempOp[i]=TempArrZ[i]*(TempArrZ[i]/250);
  }
}else{
  TempOp[i]=1-TempArrW[i]/(windowW*2);

}
if(TempArrX[i]<windowW/10){
  TempOp[i]+=(TempArrX[i]-windowW/10)/100;
}

if(TempArrX[i]+parseInt(arrW[i])*camProp.z>windowW-windowW/10){
  TempOp[i]+=(windowW-((TempArrX[i]+windowW/10)+parseInt(arrW[i])*camProp.z))/100;
}
if(TempArrY[i]<windowH/10){
  TempOp[i]+=(TempArrY[i]-windowH/10)/100;
}

if(TempArrY[i]+parseInt(arrH[i])*camProp.z>windowH-windowH/10){
  TempOp[i]+=(windowH-((TempArrY[i]+windowH/10)+parseInt(arrH[i])*camProp.z))/100;
} 
}

//Elements
if(lagLimit==256){
  if(camProp.z<1){
    if( TempArrY[i]<-TempArrH[i] ||TempArrY[i]+parseInt(arrH[i])>(windowH+TempArrH[i]/camProp.z)/camProp.z || TempArrX[i]<-TempArrW[i] 
      || TempArrX[i]+parseInt(arrW[i])>(windowW+TempArrW[i]/camProp.z)/camProp.z ||TempArrZ[i]>windowW/2 ||TempArrZ[i]<2 || TempOp[i]<0.05){
      Elements[i].style.visibility="hidden";
  }else{
    if(toDisplay.length<lagLimit){
      Elements[i].style.visibility="visible";
      toDisplay.push(i);
    }else{
      Elements[i].style.visibility="hidden";
    }
  }
}else{
  if( TempArrY[i]<-TempArrH[i] ||TempArrY[i]+parseInt(arrH[i])>(windowH*camProp.z+TempArrH[i]/camProp.z)/camProp.z || TempArrX[i]<-TempArrW[i] 
    || TempArrX[i]+parseInt(arrW[i])>(windowW*camProp.z+TempArrW[i]/camProp.z)/camProp.z ||TempArrZ[i]>windowW/2 ||TempArrZ[i]<2 || TempOp[i]<0.05){
    Elements[i].style.visibility="hidden";
}else{
  if(toDisplay.length<lagLimit){
    Elements[i].style.visibility="visible";
    toDisplay.push(i);
  }else{
    Elements[i].style.visibility="hidden";
  }
}


}
}else{
  if(Elements[i].getAttribute("type")=="texte" && TempArrZ[i]>8){
    if( TempArrZ[i]>windowW || TempArrZ[i]<0.1){
      Elements[i].style.visibility="hidden";
    }else{
      Elements[i].style.visibility="visible";
      toDisplay.push(i);

    }
  }else{
    if( TempArrW[i]>windowW || TempArrW[i]<0.1){
      Elements[i].style.visibility="hidden";
    }else{
      Elements[i].style.visibility="visible";
      toDisplay.push(i);

    }
  }
}
}
document.getElementById("composition").innerHTML=dataName+"<br>visible : "+toDisplay.length+"<br>total : "+Elements.length;


for (var i = toDisplay.length - 1; i >= 0; i--) {

/*
var color=parseInt(TempOp[toDisplay[i]]*255);
color=255-color;*/
if(lagLimit==256){
  Elements[toDisplay[i]].style.opacity=TempOp[toDisplay[i]];
}else{
  Elements[toDisplay[i]].style.opacity=1;
}
Elements[toDisplay[i]].style.fontSize=TempArrZ[toDisplay[i]]+"px";
Elements[toDisplay[i]].style.marginLeft=TempArrX[toDisplay[i]]+"px";
Elements[toDisplay[i]].style.marginTop=TempArrY[toDisplay[i]]+"px";
Elements[toDisplay[i]].style.width=TempArrW[toDisplay[i]]*1.015+"px";
Elements[toDisplay[i]].style.height=TempArrH[toDisplay[i]]+"px";

var pathUpdate=[];
var cible=undefined;
if(Elements[toDisplay[i]].tagName=="svg"){

  for (var j = paths[toDisplay[i]].path.length-1; j >=0 ; j--) {
    var tempPathX=paths[toDisplay[i]].path[j].x*camProp.z;
    var tempPathY=paths[toDisplay[i]].path[j].y*camProp.z;
    var pointUpdate={x:tempPathX,y:tempPathY};

    pathUpdate.push(pointUpdate);

  }

//console.log(pathUpdate);
cible = Elements[toDisplay[i]].getElementsByClassName("line")[0];
    //console.log(cible);

    updatePaths(cible,pathUpdate,TempArrZ[toDisplay[i]]);

  }

}

/*
var scale=parseInt(1/camProp.z);
var scaleMin=parseInt(10000/camProp.z);

if(scaleMin<1000 && scaleMin>0){
      document.getElementById("echelle").innerHTML=parseInt(scaleMin)+"µm";
  }
if(scaleMin<10000 && scaleMin>999){
      document.getElementById("echelle").innerHTML=parseInt(scaleMin/1000)+"mm";
  }
  if(scale>0 && scale<100){
      document.getElementById("echelle").innerHTML=scale+","++"cm "+((parseInt(scaleMin/1000))-10+"mm");
  }
  if(scale>100 && scale<100000){
      document.getElementById("echelle").innerHTML=parseInt(0.01/camProp.z)+"m";
  }
  if(scale>99999 && scale<9.461E+17){
      document.getElementById("echelle").innerHTML=parseInt(0.00001/camProp.z)+"km";
  }
  if(camProp.z<1.0014427791147818e-18 && camProp.z>1.067837116608579e-39){
      document.getElementById("echelle").innerHTML=parseInt(1.056970721911003e-18/camProp.z)+"al";
  }
  if(camProp.z<1.067837116608579e-39){
    document.getElementById("echelle").innerHTML="???";
  }
  if(camProp.z<1.067837116608579e-39){
document.getElementById("doc").style.backgroundImage="url('http://www.befreetoday.com.au/wp-content/uploads/2013/02/flames-1.gif')";
  }else{
document.getElementById("doc").style.backgroundImage="none";
 
  }
  */
}
function arrondir(nombre, decimales) {
  decimales = Math.round(decimales);
  nombre = Math.round(nombre * Math.pow(10, decimales)) / Math.pow(10, decimales);
  return nombre;
}
function echelleValue(Ym,Zm,Em,Pm,al,Tm,Gm,Mm,km,hm,dam,m,dm,cm,milli,micron,nm,fm,am) {//µm
  var value="<br>";
  if(Ym>99999){
    value=value+"???";
  }
  if(Ym>0&&Ym<100000){
    value=value+Ym+"Ym<br>";
  }
  if(Zm>0&&Zm<100000){
    value=value+Zm+"Zm<br>";
  }
  if(Em>0&&Em<100000){
    value=value+Em+"Em<br>";
  }
  
  if(Pm>0&&Pm<100000){
    value=value+Pm+"Pm<br>";
  }
  if(al>0&&al<100000){
    value=value+al+"al<br>";
  }
  if(Tm>0&&Tm<100000){
    value=value+Tm+"Tm<br>";
  }
  if(Gm>0&&Gm<100000){
    value=value+Gm+"Gm<br>";
  }
  if(Mm>0&&Mm<100000){
    value=value+Mm+"Mm<br>";
  }
  if(km>0&&km<100000){
    value=value+km+"km<br>";
  }
  if(hm>0&&hm<1000){
    value=value+hm+"hm<br>";
  }
  if(dam>0&&dam<1000){
    value=value+dam+"dam<br>";
  }
  if(m>0&&m<1000){
    value=value+m+"m<br>";
  }
  if(dm>0&&dm<100){
    value=value+dm+"dm<br>";
  }
  if(cm>0&&cm<100){
    value=value+cm+"cm<br>";
  }
  if(milli>0&&milli<100){
    value=value+milli+"mm<br>";
  }
  if(micron>0&&micron<1000){
    value=value+micron+"µm<br>";
  }
  if(nm>0&&nm<100000){
    value=value+nm+"nm<br>";
  }
  if(fm>0&&fm<100000){
    value=value+fm+"fm<br>";
  }
  if(am>0&&am<100000){
    value=value+am+"am<br>";
  }
  return value;
}
function echelle(){
  var Ym=arrondir(0.00000000000000000000000001/camProp.z,1);
  var Zm=arrondir(0.00000000000000000000001/camProp.z,1);
  var Em=arrondir(0.00000000000000000001/camProp.z,1);
  var Pm=arrondir(0.00000000000000001/camProp.z,1);
  var al=arrondir(Pm/9.46073,1);
  var Tm=arrondir(0.00000000000001/camProp.z,1);
  var Gm=arrondir(0.00000000001/camProp.z,1);
  var Mm=arrondir(0.00000001/camProp.z,1);
  var km=arrondir(0.00001/camProp.z,1);
  var hm=arrondir(0.0001/camProp.z,1);
  var dam=arrondir(0.001/camProp.z,1);
  var m=arrondir(0.01/camProp.z,1);
  var dm=arrondir(0.1/camProp.z,1);
  var cm=arrondir(1/camProp.z,1);
  var milli=arrondir(10/camProp.z,1);
  var micron=arrondir(10000/camProp.z,1);
  var nm=arrondir(10000000/camProp.z,1);
  var fm=arrondir(10000000000/camProp.z,1);
  var am=arrondir(10000000000000/camProp.z,1);
  document.getElementById("echelle").innerHTML=echelleValue(Ym,Zm,Em,Pm,al,Tm,Gm,Mm,km,hm,dam,m,dm,cm,milli,micron,nm,fm,am);
}
function colorConsole(msg, color,ligne) {
  if(consoleContent!=msg){
   console.log("%c"+msg+" : "+ligne,"color:"+color+";");
 }
 consoleContent=msg;
      //jeremy de barros
    }
    function createElement(what,where,ptX,ptY,posX,posY,posZ,posW,posH,html,style){
      //console.log("createElement");
      var pathData=[];
      arrX.push(posX);
      arrY.push(posY);
      arrZ.push(posZ);
      arrW.push(posW);
      arrH.push(posH);
      arrHtml.push(html);
     //user Array
     TempArrX.push(posX);
     TempArrY.push(posY);
     TempArrZ.push(posZ);
     TempArrW.push(posW);
     TempArrH.push(posH);
     TempArrHtml.push(html);
  var toPrint =  html.includes("class=\"toPrint\"");
     if(what=="svg"){

      var ptXarr = JSON.parse("[" + ptX + "]");
      var ptYarr = JSON.parse("[" + ptY + "]");
      for (var i = 0; i < ptXarr.length; i++) {
        var point = {x:ptXarr[i]-posX,y:ptYarr[i]-posY};
        pathData.push(point);
      }
      simpleData=simplify(pathData, 3, false);
      var toPush={path:pathData};
      paths.push(toPush);
//This is the accessor function we talked about above
var lineFunction = d3.line()
.x(function(d) { return d.x; })
.y(function(d) { return d.y; })
.curve(d3.curveCatmullRom.alpha(0.5));
//The SVG Container
var svgContainer = d3.select("#sketch").append("svg")
.attr("class", "input");

//The line SVG Path we draw
var lineGraph = svgContainer.append("path")
.attr("class", "line")
.attr("d", lineFunction(simpleData))
.attr("stroke", "rgb(72,72,72)")
.attr("stroke-width", posZ)
.attr("stroke-linecap","round")
.attr("fill", "none");
// ** Update data section (Called from the onclick)



}else{
  var toPush={path:undefined};
  paths.push(toPush);
  var element = document.createElement(what);
  if(install==false){
   element.style.color="tomato";
 }else{
  element.style.color="rgb(72,72,72)"
}
var img=html.includes("<img src=");
if(img==false){
element.style.cssText = style;
}else{
  element.style.position="absolute";
}
element.innerHTML=html;
element.className="input";
if(what=='p'){
  element.setAttribute("type","texte");
}
document.getElementById(where).appendChild(element);

if(toPrint==true){
var printElement = document.createElement(what);
printElement.innerHTML=html;
printElement.className="output";
printElement.style.fontSize=14.5+"pt";
document.getElementById("print").appendChild(printElement);
}

}
}
  //_______________________________________________________
    //
    //                  Variables Globales
    //_______________________________________________________
    // 
    var isInstallDone=false;
    var lastLoop = new Date;
    var refreshing=10;
    var isMouseDown;
    var mouse={x:undefined,y:undefined};
    var update='';
    var CameraIterations=0;
    var oldCameraIterations;
    var isCameraworking=false;
    var CameraStopping=0;
    var cameraIsNotMoving=false;
    //fonctions anonymes
    var consoleContent;
    //server Arrays
    var dataName="index";
    var arrW=[];
    var arrH=[];
    var arrX=[];
    var arrY=[];
    var paths=[];
    var arrZ=[];
    var arrId=[];
    var arrHtml=[];
    //user Arrays
    var rightClick=false;
    var minX=0;
    var maxX=0;
    var minY=0;
    var maxY=0;
    var minXPreview=0;
    var maxXPreview=0;
    var minYPreview=0;
    var maxYPreview=0;
    var oldWWidt=0;
    var path=[];
    var pathPrev=[];
    var TempOp=[];
    var TempArrW=[];
    var TempArrH=[];
    var TempArrX=[];
    var TempArrY=[];
    var TempArrZ=[];
    var TempArrId=[];
    var TempArrHtml=[];
    var objets={x:undefined,y:undefined,z:undefined,h:undefined,w:undefined,id:undefined,html:undefined};
    var camProp={x:0,y:0,z:1,haut:false,bas:false,droite:false,gauche:false,
      zoomIn:false,zoomOut:false,centreX:undefined,centreY:undefined};
      var timer = 0;
      var camEtat=false;
      var W=36;
      var a=0;
      var b=0;
      var install=false;
      var elementsToLoad;
    //_______________________________________________________
    //
    //                        FUNCTIONS
    //_______________________________________________________
    //                           !
    //                    server functions
    //                           !
    
    function save(name,content){
      $.ajax({ url: 'save.php',
       data: { name : name, content:content },
       type: 'post',
       datatype : 'html',
       success: function(data) {
       }
     });
    }


    function installation(){

      if(b<elementsToLoad.length){
        createElement($(elementsToLoad[b]).attr('tag'),"sketch",$(elementsToLoad[b]).attr('d-px'),$(elementsToLoad[b]).attr('d-py'),$(elementsToLoad[b]).attr('d-ex'),$(elementsToLoad[b]).attr('d-ey'),$(elementsToLoad[b]).attr('d-ez'),$(elementsToLoad[b]).attr('d-ew'),
          $(elementsToLoad[b]).attr('d-eh'),$(elementsToLoad[b]).attr('d-html'),$(elementsToLoad[b]).attr('d-style'));
        b++;
        refreshPositions(256);
      }else{
        var Things =  document.getElementsByClassName("input");
        for (var i = Things.length - 1; i >= 0; i--) {
          Things[i].style.color="rgb(72,72,72)";
        }
        install=true;
        document.getElementById("getting").innerHTML='';

      }
      
    }
    //
    //_______________________________________________________
    //                           !
    //                    camera functions
    //                           !
    function camera(key,event){

      camProp.centreX=window.innerWidth/2;
      camProp.centreY=window.innerHeight/2;
      //console.log(camProp);
      if(key==33){
        camProp.zoomIn=event;
      }
      if(key==34){
        camProp.zoomOut=event;
      }
      if(key==37){
        camProp.gauche=event;
      }
      if(key==39){
        camProp.droite=event;
      }
      if(key==38){
        camProp.haut=event;
      }
      if(key==40){
        camProp.bas=event;
      }
      //console.log(event);
      if(camProp.zoomOut==false && camProp.zoomIn==false && camProp.haut==false && camProp.gauche==false && camProp.droite==false && camProp.bas==false){
        camEtat=false;
        ioCamera(camEtat);
      }else{
        if(camEtat==false){
         camEtat=true;
         ioCamera(camEtat);
       }
     }
     
   }
//function 

function ioCamera(bool){

  var el = $("#container");
  if(bool){
    timer = setInterval(function(){
      CameraIterations++;
      if(camProp.zoomIn==true){
        camProp.z=camProp.z/(1+48/1000);
        echelle();



      }

      if(camProp.zoomOut==true){
        camProp.z=camProp.z*(1+48/1000);
          //refreshPositions(256);
          echelle();
        }
        if(isMouseDown==false){
          if(camProp.gauche==true){
            camProp.x-=W/2/camProp.z;


          }
          if(camProp.droite==true){
            camProp.x+=W/2/camProp.z;

          }
          if(camProp.haut==true){
            camProp.y-=W/2/camProp.z;


          }
          if(camProp.bas==true){
            camProp.y+=W/2/camProp.z;

          }

        }

      },25);

  }else{
    clearInterval(timer); 
  }

}
   //_______________________________________________________
    //                           !
    //                    display functions
    //   
    function displayCmd(){

      var element=document.getElementById("preview").style;
      element.marginLeft=mouse.x+20+"px";
      element.marginTop=mouse.y+"px";
    }

    function displayPreview(){
      if(document.getElementById("cmd").value==""||document.getElementById("cmd").value==" "){
        document.getElementById("pointer").style.visibility="visible";
      }else{
        document.getElementById("pointer").style.visibility="hidden";
      }
//console.log("display");
var elementContent = document.createTextNode(document.getElementById("cmd").value);
var str =document.getElementById("cmd").value;
//data link
    var data = str.includes(".data");
if (data==true) {
  console.log("data detected");
var dataStr =  str.substring(0, str.indexOf(".data"));
str="<blue><font onmousedown=\"reset("+"'"+dataStr+"'"+");\" style=\"cursor: pointer;\" onmouseover=\"this.style.textDecoration='underline';\" onmouseout=\"this.style.textDecoration='none';\">"+dataStr+"</font></blue>";
}
if(str[0]=='!'){
  var newStr = str.substr(1, str.length);
  var jpg = newStr.includes(".jpg");
  var png = newStr.includes(".png");
  var gif = newStr.includes(".gif");
  var link = str.includes("http");
  if (jpg==true||png==true||gif==true) {
    console.log("img");
    str="<img src=\""+newStr+"\">";
    var windowW=window.innerWidth;
    var windowH=window.innerHeight;
    document.getElementById("preview").style.width=windowW/3+"px";
    document.getElementById("preview").style.heightMax=windowW/3+"px";
  }

  if (newStr.includes(".youtube.")) {
    if(newStr.includes("&list=")){
     newStr =  newStr.substring(0, newStr.indexOf("&list="));
   }

   if(newStr.includes("&index=")){
     newStr =  newStr.substring(0, newStr.indexOf("&index="));
   }
   var newStr = newStr.replace("watch?v=","embed/");


   str="<iframe src=\""+newStr+"\" frameborder=\"0\" allowfullscreen></iframe>";
 }
}else{
  document.getElementById("preview").style.width="auto";
  document.getElementById("preview").style.height="auto";
}
//preview
//document.getElementById("preview").style.fontsize=W/camProp.z+"px";
document.getElementById("preview").innerHTML=str;

}
    //_______________________________________________________
    //                           !
    //                    main functions
    //                           !
    function posting(){
          //_______________________________________________________
    //                    onSketch
    //data

    var posX = document.getElementById("preview").style.marginLeft.replace('px','');
    posX = camProp.centreX-(camProp.centreX-((parseInt(posX)+1)-camProp.x*camProp.z))/camProp.z;
    var posY =document.getElementById("preview").style.marginTop.replace('px','');
    posY = camProp.centreY-(camProp.centreY-((parseInt(posY)+1)-camProp.y*camProp.z))/camProp.z;
    var html = document.getElementById("preview").innerHTML;
    var posZ=(window.innerWidth/50)/camProp.z;
    var posW = document.getElementById("preview").offsetWidth*1.015/camProp.z;
    var posH =document.getElementById("preview").offsetHeight/camProp.z;
    var image = html.includes("<img");
    var style =  html.match(/style="[^"]*"/);
    
style=String(style);
html = html.replace(style,"style=\"width:100%;height:100%;\"");
style=style.replace("style=\"",'');
style=style.replace("\"",'');
    //define save
    element = document.createElement("br");
    if(image==false){
      element.setAttribute("tag","p");
    }else{
      element.setAttribute("tag","span");  
    }
    element.setAttribute("d-ex",posX);
    element.setAttribute("d-ey",posY);
    element.setAttribute("d-ew",posW);
    element.setAttribute("d-eh",posH);
    element.setAttribute("d-ez",posZ);
    element.setAttribute("d-html",html);
    element.setAttribute("d-style",style);
    //console.log(element);

    


  //posting

  document.getElementById("sending").appendChild(element);
  sketch=sketch+document.getElementById("sending").innerHTML;
  var toSave=document.getElementById("sending").innerHTML;
  if(posW!=0 && posH!=0){
   save(dataName,toSave);
 }
 document.getElementById("sending").innerHTML='';
//HTML
//createElement(posX,posY,posZ,posW,posH,html);

//END

document.getElementById("cmd").value='';


var data = html.includes(".data");
  if(data==true){

    html =  html.substring(0, html.indexOf(".data"));
reset(html);
  }
displayPreview();
}
function drawline(data){



  lineData=data;



//This is the accessor function we talked about above
var lineFunction = d3.line()
.x(function(d) { return d.x; })
.y(function(d) { return d.y; })
.curve(d3.curveCatmullRom.alpha(0.5));
//The SVG Container
var svgContainer = d3.select("#tempLine").append("svg");

//The line SVG Path we draw
var lineGraph = svgContainer.append("path")
.attr("id", "line")
.attr("d", lineFunction(lineData))
.attr("stroke", "pink")
.attr("stroke-width", (oldWWidth/100))
.attr("stroke-linecap","round")
.attr("fill", "none");

// ** Update data section (Called from the onclick)
}
function drawing(){

          //_______________________________________________________
    //                    onSketch
    //data
    //<div style="width:100px;height:100px;background-color:pink"></div>
    var posX = mouse.x;
    posX = camProp.centreX-(camProp.centreX-((parseInt(posX)+1)-camProp.x*camProp.z))/camProp.z;
    var posY =mouse.y;
    posY = camProp.centreY-(camProp.centreY-((parseInt(posY)+1)-camProp.y*camProp.z))/camProp.z;
    var html = document.getElementById("preview").innerHTML;
    var posZ=(oldWWidth/100)/camProp.z;
//preview

var prevPoint={ "x":mouse.x,   "y": mouse.y};
pathPrev.push(prevPoint);
console.log("drawing");
drawline(pathPrev);
pathPrev=[];
pathPrev.push(prevPoint);



    //define Svg space
    var point={ "x":mouse.x,   "y": mouse.y};
    path.push(point);
    element = document.getElementById("drawPreview").style;

    if(minX==0){
      minX=posX-posZ;
      minXPreview=mouse.x-(oldWWidth/100);
    }
    if(posX-posZ<minX){
      minX=posX-posZ;
      minXPreview=mouse.x-(oldWWidth/100);
    }
    if(maxX==0){
      maxX=posX+posZ;
      maxXPreview=mouse.x+(oldWWidth/100);
    }
    if(posX+posZ>maxX){
      maxX=posX+posZ;
      maxXPreview=mouse.x+(oldWWidth/100);
    }
    if(minY==0){
      minY=posY-posZ;
      minYPreview=mouse.y-(oldWWidth/100);
    }
    if(posY-posZ<minY){
      minY=posY-posZ;
      minYPreview=mouse.y-(oldWWidth/100);
    }
    if(maxY==0){
      maxY=posY+posZ;
      maxYPreview=mouse.y+(oldWWidth/100);
    }
    if(posY+posZ>maxY){
      maxY=posY+posZ;
      maxYPreview=mouse.y+(oldWWidth/100);
    }


    element.marginLeft=minXPreview+"px";
    element.marginTop=minYPreview+"px";
    element.width=maxXPreview-minXPreview+"px";
    element.height=maxYPreview-minYPreview+"px";


  } 

  function setupSvg(){
//console.log(path);
var simplyPath=simplify(path, 5, false);
    //console.log(simplyPath);
    var xPathToSend=[];
    var yPathToSend=[];
    /*
        posX = camProp.centreX-(camProp.centreX-((parseInt(posX)+1)-camProp.x*camProp.z))/camProp.z;
    var posY =mouse.y;
    posY = camProp.centreY-(camProp.centreY-((parseInt(posY)+1)-camProp.y*camProp.z))/camProp.z;
    
    */
    for (var i = 0; i < simplyPath.length; i++) {
      xPathToSend.push(camProp.centreX-(camProp.centreX-((parseInt(simplyPath[i].x)+1)-camProp.x*camProp.z))/camProp.z);
      yPathToSend.push(camProp.centreY-(camProp.centreY-((parseInt(simplyPath[i].y)+1)-camProp.y*camProp.z))/camProp.z);
    }
    path=[];
      //function createElement(what,where,posX,posY,posZ,posW,posH,html)
    //define save
    element = document.createElement("br");
    element.setAttribute("tag","svg");
    element.setAttribute("d-px",xPathToSend);
    element.setAttribute("d-py",yPathToSend);
    element.setAttribute("d-ex",minX);
    element.setAttribute("d-ey",minY);
    element.setAttribute("d-ew",maxX-minX);
    element.setAttribute("d-eh",maxY-minY);
    element.setAttribute("d-ez",(oldWWidth/50)/camProp.z);
    element.setAttribute("d-html","");
    minX=0;
    maxY=0;
    maxX=0;
    minY=0;
    


  //posting

  document.getElementById("sending").appendChild(element);
  sketch=sketch+document.getElementById("sending").innerHTML;
  var toSave=document.getElementById("sending").innerHTML;
//console.log(toSave);
save(dataName,toSave);
document.getElementById("sending").innerHTML='';
//HTML

//END
displayPreview();

}

////////////////////////////////////


    //_______________________________________________________
    //                           !
    //                    interface functions
    //                           !
    
    document.onmousemove = function(event) { 
      var newWWidth=window.innerWidth;
      if(newWWidth != oldWWidth){
       document.getElementById("preview").style.fontSize=newWWidth/50+"px";
       document.getElementById("pointer").style.width=newWWidth/100+"px";
       document.getElementById("pointer").style.height=newWWidth/100+"px";
     }
     if ( event.pageX == null && event.clientX != null ) {
      var doc = document.documentElement, body = document.body;
      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc   && doc.clientTop  || body && body.clientTop  || 0);
    }
    mouse.x=event.pageX;
    mouse.y=event.pageY;
/////////////////
displayCmd();
//pointer

if(document.getElementById("cmd").value==""||document.getElementById("cmd").value==" "){

  document.getElementById("pointer").style.marginLeft=mouse.x-(newWWidth/100)/2+"px";
  document.getElementById("pointer").style.marginTop=mouse.y-(newWWidth/100)/2+"px";
}
};
document.onmousedown=function(event){
  if(event.button==2){
    document.oncontextmenu =new Function("return false;");
    rightClick=true;
  }else{
    document.oncontextmenu =new Function("return true;");
    rightClick=false;
  }
  isMouseDown = true;
  if(document.getElementById("cmd").value==""||document.getElementById("cmd").value==" "){
    if(rightClick==true){
      drawing();
    }
  }
  document.getElementById("drawPreview").style.opacity=1;

}
document.onmouseup=function(event){

 oldWWidth=window.innerWidth;
 if(event.button==2){
  rightClick=true;
}else{
  rightClick=false;
}
document.getElementById("drawPreview").style.opacity=0;
if(install==true){
  isMouseDown = false;
  if(document.getElementById("cmd").value!=""&&document.getElementById("cmd").value!=" " ){
    if(rightClick==true){

      posting();
    }


  }else{
    if(rightClick==true){
      setupSvg();
    }
  }
}

pathPrev=[];
document.getElementById("tempLine").innerHTML='';

}
        //////////////////////////
        var keys=[];
        var combo ='';
        document.onkeydown = function(e){

         e = e || window.event;
         var key = e.which || e.keyCode;
         //console.log(key);
         keys.push(key);

         
         combo+=keys[keys.length-1];
         var comboEtat=combo.includes("17");
         if(key != 17 && comboEtat==false){
          document.getElementById("cmd").focus();
        }
        if(key==13){
         document.getElementById("cmd").value+="<br>";
       }
       displayPreview();
       if(keys.length>2){
        keys=[];
        combo='';
      }
      camera(key,true);

    }
    document.onkeyup = function(e){
      e = e || window.event;
      var key = e.which || e.keyCode;
      displayPreview();
      camera(key,false);

    }