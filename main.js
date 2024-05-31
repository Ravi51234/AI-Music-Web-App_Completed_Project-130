music1 = "Music-1.mp3";
music2 = "Music-2.mp3";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
leftWristStatus = "";
rightWristStatus = "";

function preload(){
    loadSound(music1);
    loadSound(music2);
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(350, 150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", gotPoses);
}

function modelReady(){
    console.log("Model Loaded!!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + ", Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score = " + leftWristScore + ", Right Wrist Score = " + rightWristScore);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    leftWristStatus = music1.isPlaying();
    rightWristStatus = music2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        music2.stop();

        if(leftWristStatus == false){
            music1.play();
            document.getElementById("song_name").innerHTML = "Song - Cradle Ringtone";
        }
    }
    
    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20);
        music1.stop();

        if(rightWristStatus == false){
            music2.play();
            document.getElementById("song_name").innerHTML = "Song - Shape Of You Ringtone";
        }
    }
}