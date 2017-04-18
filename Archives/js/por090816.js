  //_______________________________________________________
    //
    //                  Variables Globales
    //_______________________________________________________
    // 
    var isMouseDown;
    var mouse={x:undefined,y:undefined};
    var arrX=[];
    var arrY=[];
    var arrId=[];
    var arrHtml=[];
    var points={x:undefined,y:undefined,z:undefined,id:undefined,html:undefined};
    var camProp={x:0,y:0,z:1,haut:false,bas:false,droite:false,gauche:false,
      zoomIn:false,zoomOut:false};
    var timer = 0;
    var camEtat=false;
    var W=18;
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
         console.log("saved");
       }
     });
    }
    function load(name){
      $.ajax({ url: 'load.php',
       data: { name : name},
       type: 'GET',
       datatype : 'html',
       success: function(data) {

        var sketch = document.getElementById("sketch").innerHTML;

var server= data.substring(data.length, 2);
        if(sketch.length==0){
                          console.log("serverLength = "+(server.length));
        console.log("sketchLength = "+sketch.length);

          document.getElementById("sketch").innerHTML=server;
        }else{
        if(server.length > sketch.length){
          var update= server.substring(server.length,sketch.length);
                          console.log("serverLength = "+(server.length));
        console.log("sketchLength = "+sketch.length);
        console.log(update);
        document.getElementById("sketch").innerHTML+=update;
 
        }
      }
   //console.log("php "+data); // apple


   /*
   var sketch = document.getElementById("sketch").innerHTML;
   var update = data.length-(sketch.length-5);
   var content = data.substring(data.length-update);
   if(update>0 && content!="span>" && content!="n>"){
    var toReplace =  content.substring(0, content.indexOf("id=\""));
    if(toReplace!="<span "){
      console.log("error loading");
      
    }
    console.log("replace = "+toReplace);
    console.log("content ="+content);
    document.getElementById("sketch").innerHTML+=content;
     //console.log(update);
     console.log("loaded");
   }
   */
 }
});
    }


    //
    //_______________________________________________________
    //                           !
    //                    camera functions
    //                           !
    function camera(key,event){
if(key==33){
        camProp.zoomIn=event;
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
      console.log(event);
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
   function ioCamera(bool){

    var el = $("#container");
    if(bool){
      timer = setInterval(function(){
        console.log("active");
if(camProp.zoomIn==true){
          camProp.z=camProp.z/0.048;
          console.log(camProp.z);
console.log(document.getElementsByTagName("div").length);
          for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
            var posZ = document.getElementsByTagName("div")[i].style.fontSize.replace('px','');
            document.getElementsByTagName("div")[i].style.fontSize=posZ*camProp.z+"px";
          }
         

        }

        if(camProp.zoomOut==true){
          camProp.z=camProp.z*0.048;

        }
        if(camProp.gauche==true){
          camProp.x-=10;
          console.log(camProp.x);
          document.getElementById("sketch").style.marginLeft=camProp.x+"px";

        }
        if(camProp.droite==true){
          camProp.x+=10;
          console.log(camProp.x);
          document.getElementById("sketch").style.marginLeft=camProp.x+"px";
        }
        if(camProp.haut==true){
          camProp.y-=10;
          console.log(camProp.y);
          document.getElementById("sketch").style.marginTop=camProp.y+"px";

        }
        if(camProp.bas==true){
          camProp.y+=10;
          console.log(camProp.y);
          document.getElementById("sketch").style.marginTop=camProp.y+"px";

        }


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
        console.log(newStr);
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


   str="<iframe width=\"560\" height=\"315\" src=\""+newStr+"\" frameborder=\"0\" allowfullscreen></iframe>";
 }
}
document.getElementById("preview").innerHTML=str;

//document.getElementById("preview").style.fontSize=W*camProp.z+"px";
}
    //_______________________________________________________
    //                           !
    //                    main functions
    //                           !
    
    function setup(){
      load("data");
      console.log("hello");
      setInterval(draw, 170 );
////////////////////////////////////
var preview = document.createElement("span");
preview.id = "preview";
preview.style.fontSize=18+"px";
document.getElementById("gui").appendChild(preview);
var br = document.createElement("br");
document.getElementById("gui").appendChild(br);
var cmd = document.createElement("textarea");
cmd.id = "cmd";
document.getElementById("gui").appendChild(cmd);
}
////////////////////////////////////
function draw(){
  load("data");
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
  isMouseDown = false;
                  if(document.getElementById("cmd").value!=""&&document.getElementById("cmd").value!=" "){
    //_______________________________________________________
    //                    onSketch
    //data
    
    var posX = document.getElementById("gui").style.marginLeft.replace('px','');
    posX = parseInt(posX)-parseInt(camProp.x);
    var posY =document.getElementById("gui").style.marginTop.replace('px','');
    posY = parseInt(posY)-parseInt(camProp.y);
    var posZ =document.getElementById("preview").style.fontSize.replace('px','');
   posZ=W/camProp.z;
    var rdm=Math.random();
    var html = document.getElementById("preview").innerHTML;
/*
    arrX.push(posX);
    arrY.push(posY);
    arrId.push(rdm);
    arrHtml.push(html);

    points.x=arrX;
    points.y=arrY;
    points.id=arrId;
    points.html=arrHtml;
*/
  //toSend
  var element = document.createElement("div");
element.id=rdm;
element.style.marginLeft=posX+"px";
element.style.marginTop=posY+"px";
element.style.fontSize=posZ/camProp.z+"px";
console.log(element.style.fontSize);
document.getElementById("toSend").appendChild(element);
document.getElementById(rdm).innerHTML=html;    
  save("data",document.getElementById("toSend").innerHTML);
document.getElementById("toSend").innerHTML='';
//HTML
var element = document.createElement("div");
element.class="input";
element.id=rdm;
element.style.marginLeft=posX+"px";
element.style.marginTop=posY+"px";
element.style.fontSize=posZ+"px";

document.getElementById("sketch").appendChild(element);
document.getElementById(rdm).innerHTML=html;
//END
  document.getElementById("cmd").value='';
    drawPreview();
  //  console.log(points);
}

}
        //////////////////////////
        var keys=[];
        var combo ='';
        document.onkeydown = function(e){
         e = e || window.event;
         var key = e.which || e.keyCode;
         console.log(key);
         keys.push(key);

         
         combo+=keys[keys.length-1];
         var comboEtat=combo.includes("1767");
         console.log(comboEtat);
         if(key != 17 && comboEtat==false){
          document.getElementById("cmd").focus();
        }
        if(key==13){
         document.getElementById("cmd").value+="<br>";
         console.log( document.getElementById("cmd").value);
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