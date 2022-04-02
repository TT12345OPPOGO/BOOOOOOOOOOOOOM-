song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLefWrist = 0;
scoreRightWrist = 0;
InNumberleftwristY = 400.34568765;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload()
{
    song = loadSound("pog.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw()
{
    image(video, 0, 0, 600, 500)

    fill("#30D5C8");
    stroke("#30D5C8");

    
    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);

    if(rightWristY >0 && rightWristY<= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    if(rightWristY >100 && rightWristY<= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    if(rightWristY >200 && rightWristY<= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY >300 && rightWristY<= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    if(rightWristY >400 && rightWristY<= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scoreLefWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20)
    InNumberleftwristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftwristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    }
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLefWrist = results[0].pose.keypoints[9].score;
        console.log( "scoreRightWrist = " + scoreRightWrist +"scoreLeftWrist = " + scoreLefWrist)  

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+rightWristY);
    }
}