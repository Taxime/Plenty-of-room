//  v300816 conflit image
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
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Select the section we want to apply our changes to
    var path = d3.select(what)
    .attr("stroke-width", weigth/2)
    .attr("d",lineFunction(lineData));

    
  }
  function refreshPositions(){
    console.log("refreshPositions");
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



if(TempArrZ[i]<W/2){
  TempOp[i]=TempArrZ[i]*(TempArrZ[i]/250);
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

//Elements

if(camProp.z<1){
  if( TempArrY[i]<-TempArrH[i] || TempArrY[i]+parseInt(arrH[i])>(windowH+TempArrH[i]/camProp.z)/camProp.z || TempArrX[i]<-TempArrW[i] 
    || TempArrX[i]+parseInt(arrW[i])>(windowW+TempArrW[i]/camProp.z)/camProp.z ||TempArrW[i]<5 || TempOp[i]<0.05){
    Elements[i].style.visibility="hidden";
}else{
  Elements[i].style.visibility="visible";
  toDisplay.push(i);
}
}else{
  if( TempArrY[i]<-TempArrH[i] || TempArrY[i]+parseInt(arrH[i])>(windowH*camProp.z+TempArrH[i]/camProp.z)/camProp.z || TempArrX[i]<-TempArrW[i] 
    || TempArrX[i]+parseInt(arrW[i])>(windowW*camProp.z+TempArrW[i]/camProp.z)/camProp.z ||TempArrW[i]<5 || TempOp[i]<0.05){
    Elements[i].style.visibility="hidden";
}else{
  Elements[i].style.visibility="visible";
  toDisplay.push(i);
}


}
}


for (var i = toDisplay.length - 1; i >= 0; i--) {




  Elements[toDisplay[i]].style.opacity=TempOp[toDisplay[i]];
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

console.log(pathUpdate);
    cible = Elements[toDisplay[i]].getElementsByClassName("line")[0];
    console.log(cible);
    updatePaths(cible,pathUpdate,TempArrZ[toDisplay[i]]);

  }

}

}
function colorConsole(msg, color,ligne) {
  if(consoleContent!=msg){
   console.log("%c"+msg+" : "+ligne,"color:"+color+";");
 }
 consoleContent=msg;
      //jeremy de barros
    }
    function createElement(what,where,ptX,ptY,posX,posY,posZ,posW,posH,html){
      console.log("createElement");
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

     if(what=="svg"){

      var ptXarr = JSON.parse("[" + ptX + "]");
      var ptYarr = JSON.parse("[" + ptY + "]");
      for (var i = 0; i < ptXarr.length; i++) {
        var point = {x:ptXarr[i]-posX,y:ptYarr[i]-posY};
        pathData.push(point);
      }
      simpleData=simplify(pathData, 5, false);
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

element.style.position="absolute";
element.innerHTML=html;
element.className="input";
document.getElementById(where).appendChild(element);
}
}
  //_______________________________________________________
    //
    //                  Variables Globales
    //_______________________________________________________
    // 
    var isMouseDown;
    var mouse={x:undefined,y:undefined};
    var update='';
    //fonctions anonymes
    var consoleContent;
    //server Arrays
    var arrW=[];
    var arrH=[];
    var arrX=[];
    var arrY=[];
    var paths=[];
    var arrZ=[];
    var arrId=[];
    var arrHtml=[];
    //user Arrays
    var minX=0;
    var maxX=0;
    var minY=0;
    var maxY=0;
    var minXPreview=0;
    var maxXPreview=0;
    var minYPreview=0;
    var maxYPreview=0;
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
              $(elements[i]).attr('d-eh'),$(elements[i]).attr('d-html'));
          }
          document.getElementById("getting").innerHTML='';
          refreshPositions();
        }
        

      }
    });
    }

    function installation(){

      if(b<elementsToLoad.length){
        createElement($(elementsToLoad[b]).attr('tag'),"sketch",$(elementsToLoad[b]).attr('d-px'),$(elementsToLoad[b]).attr('d-py'),$(elementsToLoad[b]).attr('d-ex'),$(elementsToLoad[b]).attr('d-ey'),$(elementsToLoad[b]).attr('d-ez'),$(elementsToLoad[b]).attr('d-ew'),
          $(elementsToLoad[b]).attr('d-eh'),$(elementsToLoad[b]).attr('d-html'));
        b++;
        refreshPositions();
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
      if(camProp.zoomIn==true){
        camProp.z=camProp.z/(1+48/1000);


        document.getElementById("preview").style.fontSize=W;
      }

      if(camProp.zoomOut==true){
        camProp.z=camProp.z*(1+48/1000);
          //refreshPositions();
          document.getElementById("preview").style.fontSize=W;
        }
        if(camProp.gauche==true){
          camProp.x-=W/3.5/camProp.z;


        }
        if(camProp.droite==true){
          camProp.x+=W/3.5/camProp.z;

        }
        if(camProp.haut==true){
          camProp.y-=W/3.5/camProp.z;


        }
        if(camProp.bas==true){
          camProp.y+=W/3.5/camProp.z;

        }

        refreshPositions();
      },20);
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

if(str[0]=='!'){
  var newStr = str.substr(1, str.length);
  var jpg = newStr.includes(".jpg");
  var png = newStr.includes(".png");
  var gif = newStr.includes(".gif");
  var link = str.includes("http");
  if (jpg==true||png==true||gif==true) {
    str="<img src=\""+newStr+"\">";
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
}
//preview
document.getElementById("preview").style.fontsize=W/camProp.z+"px";
document.getElementById("preview").innerHTML=str;
//document.getElementById("preview").style.fontSize=W*camProp.z+"px";
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
    var posZ=W/camProp.z;
    var posW = document.getElementById("preview").offsetWidth*1.015/camProp.z;
    var posH =document.getElementById("preview").offsetHeight/camProp.z;


    //define save
    element = document.createElement("br");
    element.setAttribute("tag","p");
    element.setAttribute("d-ex",posX);
    element.setAttribute("d-ey",posY);
    element.setAttribute("d-ew",posW);
    element.setAttribute("d-eh",posH);
    element.setAttribute("d-ez",posZ);
    element.setAttribute("d-html",html);
    //console.log(element);

    


  //posting

  document.getElementById("sending").appendChild(element);
  sketch=sketch+document.getElementById("sending").innerHTML;
  var toSave=document.getElementById("sending").innerHTML;
  if(posW!=0 && posH!=0){
   save("data",toSave);
 }
 document.getElementById("sending").innerHTML='';
//HTML
//createElement(posX,posY,posZ,posW,posH,html);

//END

document.getElementById("cmd").value='';
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
                            .attr("stroke-width", W/2)
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
    var posZ=W/camProp.z;
//preview

var prevPoint={ "x":mouse.x,   "y": mouse.y};
   pathPrev.push(prevPoint);
   drawline(pathPrev);
pathPrev=[];
pathPrev.push(prevPoint);


    
    //define Svg space
    var point={ "x":mouse.x,   "y": mouse.y};
    path.push(point);
    element = document.getElementById("drawPreview").style;

    if(minX==0){
      minX=posX-posZ;
      minXPreview=mouse.x-W;
    }
    if(posX-posZ<minX){
      minX=posX-posZ;
      minXPreview=mouse.x-W;
    }
    if(maxX==0){
      maxX=posX+posZ;
      maxXPreview=mouse.x+W;
    }
    if(posX+posZ>maxX){
      maxX=posX+posZ;
      maxXPreview=mouse.x+W;
    }
    if(minY==0){
      minY=posY-posZ;
      minYPreview=mouse.y-W;
    }
    if(posY-posZ<minY){
      minY=posY-posZ;
      minYPreview=mouse.y-W;
    }
    if(maxY==0){
      maxY=posY+posZ;
      maxYPreview=mouse.y+W;
    }
    if(posY+posZ>maxY){
      maxY=posY+posZ;
      maxYPreview=mouse.y+W;
    }


    element.marginLeft=minXPreview+"px";
    element.marginTop=minYPreview+"px";
    element.width=maxXPreview-minXPreview+"px";
    element.height=maxYPreview-minYPreview+"px";


  } 

  function setupSvg(){
console.log(path);
    var simplyPath=simplify(path, 5, false);
    console.log(simplyPath);
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
    element.setAttribute("d-ez",W/camProp.z);
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
save("data",toSave);
document.getElementById("sending").innerHTML='';
//HTML

//END
displayPreview();

}
function setup(){
  camProp.centreX=window.innerWidth/2;
  camProp.centreY=window.innerHeight/2;
  load("data");
  elementsToLoad=document.getElementById("getting").getElementsByTagName("br");
  setInterval(draw, 8 );
////////////////////////////////////
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
////////////////////////////////
}
////////////////////////////////////
function draw(){
  if(isMouseDown) { 
    if(document.getElementById("cmd").value==""||document.getElementById("cmd").value==" "){

      drawing();

    }
  } 
  if(install==true){

    if(a>20){
      load("data");

      a=0;
    }
    a++;
  }else{
    installation();
  }
}

    //_______________________________________________________
    //                           !
    //                    interface functions
    //                           !
    
    document.onmousemove = function(event) { 
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

  document.getElementById("pointer").style.marginLeft=mouse.x-9+"px";
  document.getElementById("pointer").style.marginTop=mouse.y-9+"px";
}
};
document.onmousedown=function(event){
  isMouseDown = true;
  if(document.getElementById("cmd").value==""||document.getElementById("cmd").value==" "){

    drawing();

  }
  document.getElementById("drawPreview").style.opacity=1;

}
document.onmouseup=function(event){
  document.getElementById("drawPreview").style.opacity=0;
  if(install==true){
    isMouseDown = false;
    if(document.getElementById("cmd").value!=""&&document.getElementById("cmd").value!=" "){
      posting();


    }else{
      setupSvg();
    }
  }else{
    alert("install not done");
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
         var comboEtat=combo.includes("1767");
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