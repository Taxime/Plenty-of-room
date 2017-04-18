 var tolink={
    from:[],
    to:[],
    tag:[],
}
function write(){
    if(document.getElementById("write").getAttribute("statut")=="actif" && document.getElementById("champ").getAttribute("over")=="true" && String(document.getElementById("preview").innerHTML).length>0){
        var preview=document.getElementById("preview");
        var newElementCss="margin-left:"+rect(preview).x+"px;margin-top:"+(rect(preview).y-window.scrollY)+"px;";
        console.log(newElementCss);
        var newElement = createInput("div","input"+document.getElementsByClassName("input").length,"input",newElementCss,preview.innerHTML,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined).element;
        newElement.onclick = function() {
            linking(this);
        }
        document.getElementById("champ").appendChild(newElement);
    }
}
function linking(e){
    var pad=document.getElementById("pad");
    var preview=document.getElementById("preview");
    if(document.getElementById("link").getAttribute("statut")=="actif" ){
        if(inputs.tolink.to[inputs.tolink.to.length-1]==preview){
            inputs.tolink.to[inputs.tolink.to.length-1]=e;
            var lines=document.getElementsByClassName("line")
            for (var i = lines.length - 1; i >= 0; i--) {
                if(lines[i].id.includes("preview")){
                    lines[i].parentNode.removeChild(lines[i]);
                }
            }
        }else{
            inputs.tolink.tag.push(pad.value);
            inputs.tolink.from.push(e);
            inputs.tolink.to.push(preview);
        }
        console.log(inputs);
    }
}
function sdraw(){
    writePreview();
    preview();
    for (var i = inputs.tolink.from.length - 1; i >= 0; i--) {
        var div1=inputs.tolink.from[i];
        var div2=inputs.tolink.to[i];
        if(div1==div2){
            document.getElementById(div1+"-"+div2).parentNode.removeChild(document.getElementById(div1+"-"+div2));
        }else{
            link(div1, div2, "MediumPurple", 1,inputs.tolink.tag[i]);
        }

        
    }
    if(user.statut=="reading"){
        sonreading();
    }
    if(user.statut=="writing"){
        sonwriting();

    }
}
function link( div2,div1, color, thickness, tag) {
  var idCheck = document.getElementById(div1.id+'-'+div2.id);
    // bottom right
    var x1 = rect(div1).x;
    var y1 = rect(div1).y-window.scrollY;
    // top right
    var x2 = rect(div2).x;
    var y2 = rect(div2).y-window.scrollY;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    var lineCss ="text-align:center;padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg)";
    
    if(idCheck==null){
      console.log("idCheck = null");
    // make hr
    var line = createInput("div",div1.id+'-'+div2.id,"line",lineCss,"<div class=\"tag\"><font style=\"font-size:12pt;color:white;background-color:"+color+"\">"+tag+"</div>",undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined).element;
    document.getElementById("sketch").appendChild(line);
}else{
  if(lineCss!=idCheck.style.cssText){
    idCheck.style.cssText=lineCss;
}
}
}