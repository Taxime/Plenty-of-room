import processing.pdf.*;
JSONArray sketch;

ArrayList<Trait> Traits = new ArrayList<Trait>();
float x=1, y=1, z=1, W=1, centreX, centreY;
boolean cam0, cam1, cam2, cam3, cam4, cam5;
int traitSelect;

void load() {
}

void cam() {
  if (cam0==true) {
    x=x+width/frameRate/2/z;
  }
  if (cam1==true) {
    x=x-width/frameRate/2/z;
  }
  if (cam2==true) {
    y=y-height/frameRate/2/z;
  }
  if (cam3==true) {
    y=y+height/frameRate/2/z;
  }
  if (cam4==true) {

    z=z/(1+frameRate/1000);
  }
  if (cam5==true) {

    z=z*(1+frameRate/1000);
  }
}

void keyReleased() {
  if (key=='d') {
    cam0=false;
  }
  if (key=='q') {
    cam1=false;
  }
  if (key=='z') {
    cam2=false;
  }
  if (key=='s') {
    cam3=false;
  }
  if (key=='-') {
    cam4=false;
  }
  if (key=='+') {
    cam5=false;
  }
}

void keyPressed() {
  if (key=='d') {
    cam0=true;
  }
  if (key=='q') {
    cam1=true;
  }
  if (key=='z') {
    cam2=true;
  }
  if (key=='s') {
    cam3=true;
  }

  if (key=='-') {
    cam4=true;
  }
  if (key=='+') {

    cam5=true;
  }
}

void newTrait() {
  Traits.add(new Trait());
  traitSelect=Traits.size()-1;
}

class Trait {
  JSONArray traitData;
  ArrayList<Point>  Points= new ArrayList<Point>();
  class Point {
    float _x, _y, _w;
    Point (float x, float y, float w) { 
      _x = x;
      _y = y;
      _w = w;
    }
  }

  Trait() {
    traitData = new JSONArray();
    Points = new ArrayList();
  }

  void draw() {
    Points.add(new Point(centreX-(centreX-(mouseX-x*z))/z, centreY-(centreY-(mouseY-y*z))/z, W/z));
  }

  void end() {
    newTrait();
  }

  void display() {


    noFill();
    if (Points.size()>2 ) {

      for ( int i = 0; i < Points.size(); i++ ) {
        if ( i>2 && centreX-(centreX-(Points.get(i)._x+x))*z>-W && centreX-(centreX-(Points.get(i)._x+x))*z<width+W*2 && centreY-(centreY-(Points.get(i)._y+y))*z>-W && centreY-(centreY-(Points.get(i)._y+y))*z<height+W*2 && Points.get(i)._w*z>0.5 && Points.get(i)._w*z<height*2) {
          strokeWeight(Points.get(i)._w*z);
          stroke(192, 192, 255);
          beginShape();
          curveVertex(centreX-(centreX-Points.get(i)._x-x)*z, centreY-(centreY-Points.get(i)._y-y)*z);
          curveVertex(centreX-(centreX-Points.get(i-1)._x-x)*z, centreY-(centreY-Points.get(i-1)._y-y)*z);
          curveVertex(centreX-(centreX-Points.get(i-2)._x-x)*z, centreY-(centreY-Points.get(i-2)._y-y)*z);
          curveVertex(centreX-(centreX-Points.get(i-3)._x-x)*z, centreY-(centreY-Points.get(i-3)._y-y)*z);
          endShape();
        }
      }
    }
  }
}




void setup() {
  frameRate(48);
  size(1280, 960);
  surface.setResizable(true);
  Traits = new ArrayList();
  Traits.add(new Trait());
  strokeJoin(ROUND);
  strokeCap(ROUND);
  sketch = new JSONArray();
  sketch = loadJSONArray("new.json");
}

void draw() {
  if (traitSelect!=sketch.size()) {
    background(255);
        fill(0);
    textSize(10);
    text("loading "+traitSelect+" / "+sketch.size(), 10, 10);
    Traits.get(traitSelect).read();
  } else {

    centreX=width/2;
    centreY=height/2;
    W=height/20;
    background(255);
    cam();
    if (mousePressed) 
    {
      Traits.get(traitSelect).draw();
    }
    for (int i = 0; i <Traits.size(); i++) {
      Traits.get(i).display();
    }
    stroke(120, 40, 255);
    strokeWeight(W);
    point(mouseX, mouseY);
    fill(0);
    textSize(10);
    text("FPS "+frameRate, 10, 10);
  }
}



void mouseReleased() {
  Traits.get(traitSelect).end();
}