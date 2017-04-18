  //_______________________________________________________
    //
    //                  Variables Globales
    //_______________________________________________________
    // 

    var mouse={x:undefined,y:undefined};
    var points={x:0,y:0,z:0};
    var camProp={x:0,y:0,z:0,haut:false,bas:false,droite:false,gauche:false};
    var timer = 0;
    var camEtat=false;
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
   //console.log("php "+data); // apple
   var sketch = document.getElementById("sketch").innerHTML;
   var update = data.length-(sketch.length-5);
   var content = data.substring(data.length-update);
   if(update>0){
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
 }
});
    }
    //_______________________________________________________
    //                           !
    //                    camera functions
    //                           !
    function camera(key,event){

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
      if(camProp.haut==false && camProp.gauche==false && camProp.droite==false && camProp.bas==false){
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
//https://www.youtube.com/embed/djfEaX2tA7M
document.getElementById("preview").innerHTML=str;
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
};
document.onmousedown=function(event){
  if(document.getElementById("cmd").value!=""&&document.getElementById("cmd").value!=" "){
  //onSketch

  var element = document.createElement("span");
  element.style.position="absolute";
  console.log("camPropx = "+camProp.x);
  var posX =document.getElementById("gui").style.marginLeft.replace('px','');
  posX = parseInt(posX)-parseInt(camProp.x);
  var posY =document.getElementById("gui").style.marginTop.replace('px','');
  posY = parseInt(posY)-parseInt(camProp.y);
  element.style.marginLeft=posX+"px";
  element.style.marginTop=posY+"px";
  var rdm=Math.random();
  element.id=rdm;
  document.getElementById("sketch").appendChild(element);
  document.getElementById(rdm).innerHTML=document.getElementById("preview").innerHTML;
  //toSend
  var element = document.createElement("span");
  element.style.position="absolute";
  element.style.marginLeft=posX+"px";
  element.style.marginTop=posY+"px";
  var rdm=Math.random();
  element.id=rdm;
  document.getElementById("toSend").appendChild(element);
  document.getElementById(rdm).innerHTML=document.getElementById("preview").innerHTML;
  //////
  document.getElementById("cmd").value='';
  drawPreview();
  save("data",document.getElementById("toSend").innerHTML);
  document.getElementById("toSend").innerHTML='';
  console.log("sending");
}
}
document.onmouseup=function(event){
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