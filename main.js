function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("Mobilenet", modelLoaded);
}

function modelLoaded() {
  console.log("Model is loaded");
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

previous = "";

function gotResult(error, results) {
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence > .5) && (previous != results[0].label)){
      console.log(results);
      previous = results[0].label;
      synth = window.SpeechSynthesis;
      speakthis = "The object recognized is " + results[0].label;
      utterThis = new SpeechSynthesisUtterance(speakthis);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}