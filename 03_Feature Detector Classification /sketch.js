// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Webcam Image Classification with ml5
// https://youtu.be/D9BoBSkLvFo

let mobilenet;
let classifier;
let video;
let label = 'test';
let uButton; 
let wButton;
let trainButton;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}


function whileTraining(loss){
  if (loss === null) {
    console.log('finished training');
    classifier.classify(gotResults);
  } else {
    console.log('Loss:' + loss);
  }
  
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
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
  classifier = mobilenet.classification(video, videoReady); 
 

  uButton = createButton('sad');
  uButton.mousePressed(function(){
  classifier.addImage('sad');
});


  wButton = createButton('happy');
  wButton.mousePressed(function(){
  classifier.addImage('happy');
});

  trainButton = createButton('train');
  trainButton.mousePressed(function(){
  classifier.train(whileTraining);
});
 

}


function draw() {
  background(0);
  image(video, 0, 0,320,240);
  fill(225);
  textSize(16);
  text(label, 10, height - 10);

}