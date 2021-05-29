 song="";
 status="";
 objects=[];

 function preload(){
 song = loadSound("alarm.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector('cocossd', modelLoded);
document.getElementById("status_detected_or_not").innerHTML="Status : detecting person";
}

function modelLoded(){
  console.log("Model Loded!");
  status=true;
  
}

function gotResults(error,results){
  if(error){
console.log(error);
}

console.log(results);
objects=results;
}

function draw(){
  image(video,0,0,380,380); 
  if(status != "") {
    r= random(255);
    g= random(255);
    b= random(255);
    objectDetector.detect(video,gotResults);

for(i=0; i< objects.length;i++){
  document.getElementById("status_detected_or_not").innerHTML="status : person detected";
  
  fill(r,g,b);

  percent=floor(objects[i].confidence * 100);
  text(objects[i].label + " " + percent + "%", objects[i].x + 15 ,objects[i].y + 15 );

  noFill();
  stroke(r,g,b);
  rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height );

 if(objects[i].label=="person") {
   document.getElementById("numberobjects").innerHTML="person found";
   console.log("stop");
   song.stop();
 }

  else{
    document.getElementById("numberobjects").innerHTML=" person not detected";
    console.log("play");
    song.play() 
  }
}

  
}
}