  //  v18082016 = normalisation des images / video, hide elements not visible
  //_______________________________________________________
    //
    //                 fonctions anonymes
    //_______________________________________________________
    // 
    function refreshPositions(){
      //camProp.centreX-(camProp.centreX-arrX[i]-camProp.x)*camProp.z-camProp.x

     // console.log(document.getElementsByClassName("input").length);

      for (var i = 0; i < document.getElementsByClassName("input").length; i++) {

//variables
TempArrZ[i]=arrZ[i]*camProp.z;
TempArrX[i]=camProp.centreX-(camProp.centreX-arrX[i]-camProp.x)*camProp.z;
TempArrY[i]=camProp.centreY-(camProp.centreY-arrY[i]-camProp.y)*camProp.z;
TempArrW[i]=arrW[i]*camProp.z;
TempArrH[i]=arrH[i]*camProp.z;
//Elements

if(camProp.z<1){
        if( TempArrY[i]<-TempArrH[i] || TempArrY[i]+parseInt(arrH[i])>(window.innerHeight+TempArrH[i]/camProp.z)/camProp.z || TempArrX[i]<-TempArrW[i] 
          || TempArrX[i]+parseInt(arrW[i])>(window.innerWidth+TempArrW[i]/camProp.z)/camProp.z ||TempArrW[i]<5 || TempArrW[i]/camProp.z>window.innerWidth/camProp.z || TempArrZ[i]<5 ){
    document.getElementsByClassName("input")[i].style.visibility="hidden";
}else{
  document.getElementsByClassName("input")[i].style.visibility="visible";
        document.getElementsByClassName("input")[i].style.fontSize=TempArrZ[i]+"px";
        document.getElementsByClassName("input")[i].style.marginLeft=TempArrX[i]+"px";
        document.getElementsByClassName("input")[i].style.marginTop=TempArrY[i]+"px";
        document.getElementsByClassName("input")[i].style.width=TempArrW[i]+"px";
        document.getElementsByClassName("input")[i].style.height=TempArrH[i]+"px";
}
}else{

        if( TempArrY[i]<-TempArrH[i] || TempArrY[i]+parseInt(arrH[i])>window.innerHeight+TempArrH[i] || TempArrX[i]<-TempArrW[i] 
          || TempArrX[i]+parseInt(arrW[i])>window.innerWidth+TempArrW[i] ||TempArrW[i]<5 || TempArrW[i]>window.innerWidth){
    document.getElementsByClassName("input")[i].style.visibility="hidden";
}else{
  document.getElementsByClassName("input")[i].style.visibility="visible";
        document.getElementsByClassName("input")[i].style.fontSize=TempArrZ[i]+"px";
        document.getElementsByClassName("input")[i].style.marginLeft=TempArrX[i]+"px";
        document.getElementsByClassName("input")[i].style.marginTop=TempArrY[i]+"px";
        document.getElementsByClassName("input")[i].style.width=TempArrW[i]+"px";
        document.getElementsByClassName("input")[i].style.height=TempArrH[i]+"px";
}

}
      }
    }
    function colorConsole(msg, color,ligne) {
     console.log("%c"+msg+" : "+ligne,"color:"+color+";");
      //jeremy de barros
    }
    function createElement(posX,posY,posZ,posW,posH,html){
     // console.log(posX,posY,posZ,posW,posH,html);
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
     colorConsole(TempArrW[TempArrW.length-1],"lightGreen");
     var element = document.createElement("div");
     element.style.marginLeft=posX+"px";
     element.style.marginTop=posY+"px";
     element.style.fontSize=posZ+"px";
      //element.style.width=posW+"px";
      //element.style.height=posH+"px";
      element.style.position="absolute";
      element.innerHTML=html;
      element.className="input";
      document.getElementById("sketch").appendChild(element);
    }
  //_______________________________________________________
    //
    //                  Variables Globales
    //_______________________________________________________
    // 
    var isMouseDown;
    var mouse={x:undefined,y:undefined};
    var update='';
    //server Arrays
    var arrW=[];
    var arrH=[];
    var arrX=[];
    var arrY=[];
    var arrZ=[];
    var arrId=[];
    var arrHtml=[];
    //user Arrays
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
         //console.log("saved");
       }
     });
    }
    function load(name){
      $.ajax({ url: 'load.php',
       data: { name : name},
       type: 'GET',
       datatype : 'html',
       success: function(data) {
        //console.log(data);
        
        if(update==''){
          update=data;
          document.getElementById("getting").innerHTML+=update;
         // colorTrace(document.getElementById("getting").getElementsByTagName("br").length,"pink","black",'');
       }
       if(update<data){
        var content=data.substring(data.length,update.length);
        colorConsole(content,"orange");
        document.getElementById("getting").innerHTML=content;
        //  colorTrace("length = "+content.length+"; content = "+content+';',"orange","black",62);
        update=data;
      }
      var elements=document.getElementById("getting").getElementsByTagName("br");
      if(install==true && document.getElementById("getting").innerHTML!=''){
console.log("loading");
        for (var i = 0; i <= elements.length - 1; i++) {
          //console.log("creating");
          //function createElement(posX,posY,posZ,posW,posH,html){
          createElement($(elements[i]).attr('d-px'),$(elements[i]).attr('d-py'),$(elements[i]).attr('d-pz'),$(elements[i]).attr('d-pw'),
            $(elements[i]).attr('d-ph'),$(elements[i]).attr('d-html'));
        }
document.getElementById("getting").innerHTML='';
      }
        refreshPositions();

    }
  });
    }

    function installation(){

      if(b<elementsToLoad.length){
createElement($(elementsToLoad[b]).attr('d-px'),$(elementsToLoad[b]).attr('d-py'),$(elementsToLoad[b]).attr('d-pz'),$(elementsToLoad[b]).attr('d-pw'),
            $(elementsToLoad[b]).attr('d-ph'),$(elementsToLoad[b]).attr('d-html'));
        b++;
        refreshPositions();
      }else{
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
        //console.log("active");
        if(camProp.zoomIn==true){
          camProp.z=camProp.z/(1+48/1000);
          ////console.log(camProp.z);
          ////console.log(document.getElementsByTagName("div").length);


          document.getElementById("preview").style.fontSize=W;
        }

        if(camProp.zoomOut==true){
          camProp.z=camProp.z*(1+48/1000);
          //refreshPositions();
          document.getElementById("preview").style.fontSize=W;
        }
        //console.log("fontsize= "+W/camProp.z);
        if(camProp.gauche==true){
          camProp.x-=W/4/camProp.z;
          //console.log(camProp.x);
          //document.getElementById("sketch").style.marginLeft=camProp.x+"px";

        }
        if(camProp.droite==true){
          camProp.x+=W/4/camProp.z;
          //console.log(camProp.x);
          //document.getElementById("sketch").style.marginLeft=camProp.x+"px";
        }
        if(camProp.haut==true){
          camProp.y-=W/4/camProp.z;
          //console.log(camProp.y);
          //document.getElementById("sketch").style.marginTop=camProp.y+"px";

        }
        if(camProp.bas==true){
          camProp.y+=W/4/camProp.z;
          //console.log(camProp.y);
          //document.getElementById("sketch").style.marginTop=camProp.y+"px";

        }

        refreshPositions();
      },17);
  }else{
    clearInterval(timer); 
  }
}
   //_______________________________________________________
    //                           !
    //                    display functions
    //   
    function displayCmd(){

      var element=document.getElementById("gui").style;
      element.marginLeft=mouse.x+20+"px";
      element.marginTop=mouse.y+"px";
    }
    function drawPreview(){

      var elementContent = document.createTextNode(document.getElementById("cmd").value);
      var str =document.getElementById("cmd").value;
      if(str[0]=='!'){
        var newStr = str.substr(1, str.length);
        //console.log(newStr);
        var jpg = newStr.includes(".jpg");
        var png = newStr.includes(".png");
        var gif = newStr.includes(".gif");
        if (jpg==true||png==true||gif==true) {
          str="<img src=\""+newStr+"\">";
        }
  //https://www.youtube.com/watch?v=kRPndPQaU0M&index=2&list=RDMMZUKDRmpczxE
  //https://www.youtube.com/embed/kRPndPQaU0M
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
    
    function setup(){
      camProp.centreX=window.innerWidth/2;
      camProp.centreY=window.innerHeight/2;
      load("data");
      elementsToLoad=document.getElementById("getting").getElementsByTagName("br");
      //console.log("hello");
      setInterval(draw, 8 );
////////////////////////////////////
var preview = document.createElement("span");
preview.id = "preview";
preview.style.fontSize=W/camProp.z+"px";
document.getElementById("gui").appendChild(preview);
var br = document.createElement("br");
document.getElementById("gui").appendChild(br);
var cmd = document.createElement("textarea");
cmd.id = "cmd";
document.getElementById("gui").appendChild(cmd);
}
////////////////////////////////////
function draw(){
  //colorConsole(install,"red");
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
if(isMouseDown) { 


} 
};
document.onmousedown=function(event){
  isMouseDown = true;


}
document.onmouseup=function(event){
  if(install==true){
  isMouseDown = false;
  if(document.getElementById("cmd").value!=""&&document.getElementById("cmd").value!=" "){
    //_______________________________________________________
    //                    onSketch
    //data
    //<div style="width:100px;height:100px;background-color:pink"></div>
    var posX = document.getElementById("gui").style.marginLeft.replace('px','');
    posX = camProp.centreX-(camProp.centreX-(posX-camProp.x*camProp.z))/camProp.z;
    var posY =document.getElementById("gui").style.marginTop.replace('px','');
    posY = camProp.centreY-(camProp.centreY-(posY-camProp.y*camProp.z))/camProp.z;
    var html = document.getElementById("preview").innerHTML;
    var posZ=W/camProp.z;
    var posW = document.getElementById("preview").offsetWidth*1.015/camProp.z;
    //console.log((document.getElementById("preview").offsetWidth));
    //console.log(posZ);
    var posH =document.getElementById("preview").offsetHeight/camProp.z;
//define origine
var element = document.getElementById("preview");
element.setAttribute("d-px",posX);
element.setAttribute("d-py",posY);
element.setAttribute("d-pw",posW);
element.setAttribute("d-ph",posH);
element.setAttribute("d-pz",posZ);
element.setAttribute("d-html",html);
var origine=document.getElementById("gui").innerHTML;

    //define save
    element = document.createElement("br");
    element.setAttribute("d-px",posX);
    element.setAttribute("d-py",posY);
    element.setAttribute("d-pw",posW);
    element.setAttribute("d-ph",posH);
    element.setAttribute("d-pz",posZ);
    element.setAttribute("d-html",html);
    //console.log(element);

    


  //posting

  //console.log("fontSize= "+element.style.fontSize);
  document.getElementById("posting").appendChild(element);
 // colorTrace("length = "+document.getElementById("posting").innerHTML.length+"; content = "+document.getElementById("posting").innerHTML+';',"lightgreen","black",321);
 sketch=sketch+document.getElementById("posting").innerHTML;
 var toSave=document.getElementById("posting").innerHTML;

 colorConsole(toSave,"lightgreen","347");
 if(posW!=0 && posH!=0){
 save("data",toSave);
 }
 document.getElementById("posting").innerHTML='';
//HTML
//createElement(posX,posY,posZ,posW,posH,html);

//END

document.getElementById("cmd").value='';
drawPreview();
  //  //console.log(objets);

}
}else{
  colorConsole("install not done","red");
}

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
         //console.log(comboEtat);
         if(key != 17 && comboEtat==false){
          document.getElementById("cmd").focus();
        }
        if(key==13){
         document.getElementById("cmd").value+="<br>";
         //console.log( document.getElementById("cmd").value);
       }
       drawPreview();
       if(keys.length>2){
        keys=[];
        combo='';
      }
      camera(key,true);
    }
    document.onkeyup = function(e){
      e = e || window.event;
      var key = e.which || e.keyCode;
      drawPreview();
      camera(key,false);

    }