// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Webcam Image Classification with ml5
// https://youtu.be/D9BoBSkLvFo

let mobilenet;
let predictor;
let video;
let value = 0 ;
let trainButton;
let slider;
let addButton;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}


function whileTraining(loss){
  if (loss === null) {
    console.log('finished training');
    predictor.predict(gotResults);
  } else {
    console.log('Loss:' + loss);
  }
  
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    value = result;
    predictor.predict(gotResults);
  }
}


// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
  predictor = mobilenet.regression(video, videoReady); 
 
  slider = createSlider(0,1,0.5,0.01);


  addButton = createButton('add example image');
  addButton.mousePressed(function(){
  predictor.addImage(slider.value());
  });



  trainButton = createButton('train');
  trainButton.mousePressed(function(){
  predictor.train(whileTraining);
});
 

}

function draw() {
  background(0);
  image(video, 0, 0,320,240);
  rectMode(CENTER);
  rect(value*width,height/2,50,50);
  fill(255,0,200);

  fill(225);
  textSize(16);
  text(value, 10, height - 10);

}