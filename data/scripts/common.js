 var initdraw=setInterval(draw, 25);
var functions_onload = new Array(); //L'array qui sert au stockage des fonctions

function percent(child,parent){
    return child*100/parent;
}

function eval_onload(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_onload[functions_onload.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}

window.onload = function (){
    for(var i = 0, longueur = functions_onload.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
       try{functions_onload[i](); //On exécute les fonctions.
       }catch(e){
        console.log(e);
       }
    }
   
}
var functions_onmousedown = new Array(); //L'array qui sert au stockage des fonctions

function eval_onmousedown(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_onmousedown[functions_onmousedown.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}
document.onmousedown=function(event){
    for(var i = 0, longueur = functions_onmousedown.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
        functions_onmousedown[i](); //On exécute les fonctions.
    }
}
var functions_onmouseup = new Array(); //L'array qui sert au stockage des fonctions

function eval_onmouseup(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_onmouseup[functions_onmouseup.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}
document.onmouseup=function(e){
    for(var i = 0, longueur = functions_onmouseup.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
        functions_onmouseup[i](); //On exécute les fonctions.
    }
}
var functions_onmousemove = new Array(); //L'array qui sert au stockage des fonctions

function eval_onmousemove(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_onmousemove[functions_onmousemove.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}
document.onmousemove = function(e) { 

    for(var i = 0, longueur = functions_onmousemove.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
        functions_onmousemove[i](); //On exécute les fonctions.
    }

}
var functions_onkeydown = new Array(); //L'array qui sert au stockage des fonctions

function eval_onkeydown(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_onkeydown[functions_onkeydown.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}
document.onkeydown = function(e){
        for(var i = 0, longueur = functions_onkeydown.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
        functions_onkeydown[i](); //On exécute les fonctions.
    }
}
var functions_onkeyup = new Array(); //L'array qui sert au stockage des fonctions

function eval_onkeyup(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_onkeyup[functions_onkeyup.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}
document.onkeyup = function(e){
        for(var i = 0, longueur = functions_onkeyup.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
        functions_onkeyup[i](); //On exécute les fonctions.
    }
}

var functions_ondraw = new Array(); //L'array qui sert au stockage des fonctions

function repeat(fonction) { //Fonction qui devra être appelée à la place de window.onload
    functions_ondraw[functions_ondraw.length] = fonction; //On stocke les fonctions dans l'array. Il commence à 0, et length donne l'indice du dernier élément + 1.
}
function draw(){
        for(var i = 0, longueur = functions_ondraw.length; i < longueur; i++){ //On utilise longueur pour ne pas recalculer la taille à chaque fois.
        functions_ondraw[i](); //On exécute les fonctions.
    }
}
function random(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function rect(elem){
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect = elem.getBoundingClientRect();
    offset  = elemRect.top - bodyRect.top;
    var offsetY=offset;
    offset  = elemRect.left - bodyRect.left;
    var offsetX=offset;
    return{
        x: offsetX,
        y: offsetY,
        w: elemRect.width,
        h: elemRect.height
    }
}
function getbytag(tag,index){
    return document.getElementsByTagName(tag)[index];
}
function getbyclass(tag,index){
    return document.getElementsByClassName(tag)[index];
}
function scroll_to(element){
    var x=false;
    var y=false;

    if(document.body.scrollLeft<rect(element).x){
        window.scrollTo(document.body.scrollLeft+40, document.body.scrollTop);
    }
    if(document.body.scrollLeft>rect(element).x){
        window.scrollTo(document.body.scrollLeft-40, document.body.scrollTop);
    }
    if(document.body.scrollLeft>rect(element).x-40 && document.body.scrollLeft<rect(element).x+40){
        window.scrollTo(rect(element).x, document.body.scrollTop);
        x=true;
    }
    if(document.body.scrollTop<rect(element).y){
        window.scrollTo(document.body.scrollLeft, document.body.scrollTop+40);
    }
    if(document.body.scrollTop>rect(element).y){
        window.scrollTo(document.body.scrollLeft, document.body.scrollTop-40);
    }
    if(document.body.scrollTop>rect(element).y-40 && document.body.scrollTop<rect(element).y+40){
        window.scrollTo(document.body.scrollLeft, rect(element).y);
        y=true;
    }

    if( x==true && y==true){
        return false;
    }

}
function replace_data(where,what){
    console.log("What",what);
    var data;
    
    $.ajax({ url: "/data/scripts/mod_common.php",
        data: { 
            file_name : where,
            content_to_replace : what
        },
        type:"post",
        success: function(d) {
            data=d;
        },
        complete: function() {
            console.log("What RETURN",data)
        }
    });
    
}
function post_data(where,what){
    var data;
    $.ajax({ url: "/data/scripts/mod_common.php",
        data: { 
            file_name : where,
            content : what
        },
        type:"post",
        success: function(d) {
            data=d;
        },
        complete: function() {
            console.log(data);
        }
    });
}
function check_data(where,myfunction){
    var data;
    $.ajax({ url: "/data/scripts/mod_common.php",
        data: { 
            file_name_to_check : where
        },
        type:"get",
        success: function(d) {
            data=d;
        },
        complete: function() {
            try{
            myfunction(data,where); //On exécute les fonctions.
            }catch(e){
                console.log(e);
            }
        }
    });
}

function erase_data(where){
    var data;
    $.ajax({ url: "/data/scripts/mod_common.php",
        data: { 
            file_name_to_erase : where
        },
        type:"post",
        success: function(d) {
            data=d;
        },
        complete: function() {
            console.log(data)
        }
    });
}
function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}
function button(el,f,index){
    var e = e || window.event;
    if(index==e.button){
        f();
    }
}
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}