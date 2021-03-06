var stage;
var canvas;
var g;
var stars;
var car;
var carImg;
var speed = 8;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var BULLET_SPEED = 15;
var bullets;
var bulletG;

var level = 1;

var pause = 0;

var CarLimit = 6;
var OpponentsSpeed = 5;
var Opponents;


var PeopleLimit = 10;
var PeopleSpeed = 10;
var Peoples;


var CoinsLimit = 6;
var CoinsSpeed = 5;
var Coins;

var explosions;

var gameOver = false;

function PlaceCoins() {

    if (randRange(0, 100) > 95 && Coins.length < CoinsLimit) {

        var r = new Bitmap("image/starcoins.png");
        r.regX = r.image.width * 0.5;
        r.regY = r.image.height * 0.5;
        var num = randRange(180, 680);

        if (num < 290)
            r.x = 260;
        else if (num > 289 && num < 420)
            r.x = 345;
        if (num > 419 && num < 550)
            r.x = 475;
        if (num > 549)
            r.x = 550;

        r.y = -randRange(50, 100);
        Coins.push(r);
        stage.addChild(r);
    }
}
function UpdateCoins() {
    var loopLimit = Coins.length - 1;
    for (var i = loopLimit; i >= 0; --i) {
        Coins[i].y += CoinsSpeed;
        if (Coins[i].y > 600) {
            stage.removeChild(Coins[i]);
            Coins.splice(i, 1);
        }
    }
}


function PlaceOpponents() {

    if (randRange(0, 100) > 95 && Opponents.length < CarLimit) {

        var r = new Bitmap("image/opponentcar.png");
        r.regX = r.image.width * 0.5;
        r.regY = r.image.height * 0.5;
        var num = randRange(180, 680);

        if (num < 290)
            r.x = 210;
        else if (num > 289 && num < 420)
            r.x = 345;
        if (num > 419 && num < 550)
            r.x = 475;
        if (num > 549)
            r.x = 610;

        r.y = -randRange(50, 100);
        Opponents.push(r);
        stage.addChild(r);
    }
}
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function UpdateOpponents() {
    var loopLimit = Opponents.length - 1;
    for (var i = loopLimit; i >= 0; --i) {
        Opponents[i].y += OpponentsSpeed;
        if (Opponents[i].y > 600) {
            if (parseInt(document.getElementById('test').innerHTML) > 5)
                document.getElementById('test').innerHTML = parseInt(document.getElementById('test').innerHTML) - 5;
            stage.removeChild(Opponents[i]);
            Opponents.splice(i, 1);
        }
    }
}

function PlacePeople() {

    if (randRange(0, 100) > 97 && Peoples.length < PeopleLimit) {
        var j1 = randRange(10, 30);
        if (j1 < 11)
            var r = new Bitmap("image/q1.png");
        else if (j1 > 10 && j1 < 21)
            var r = new Bitmap("image/q2.png");
        else if (j1 > 20)
            var r = new Bitmap("image/q3.png");
        r.regX = r.image.width * 0.5;
        r.regY = r.image.height * 0.5;
        var num = randRange(180, 680);

        if (num < 290)
            r.x = 210;
        else if (num > 289 && num < 420)
            r.x = 345;
        if (num > 419 && num < 550)
            r.x = 475;
        if (num > 549)
            r.x = 610;

        r.y = -randRange(50, 100);
        Peoples.push(r);
        stage.addChild(r);
    }
}

function UpdatePeople() {
    var loopLimit = Peoples.length - 1;
    for (var i = loopLimit; i >= 0; --i) {
        Peoples[i].y += PeopleSpeed;
        if (Peoples[i].y > 600) {
            stage.removeChild(Peoples[i]);
            Peoples.splice(i, 1);
        }
    }
}

function init() {
    debugger;
    myAudio = new Audio('sounds/music.ogg');
    myAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();


    Opponents = new Array();
    Coins = new Array();
    explosions = new Array();

    Peoples = new Array();

    bullets = new Array();
    bulletG = new Graphics();
    bulletG.setStrokeStyle(1);
    bulletG.beginStroke(Graphics.getRGB(255, 0, 0));
    bulletG.beginFill(Graphics.getRGB(255, 0, 0));
    bulletG.drawCircle(0, 0, 5);

    canvas = document.getElementById("canvas");
    stage = new Stage(canvas);

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    carImg = new Image();
    carImg.onload = oncarLoaded;
    carImg.src = "image/car.png";

    Ticker.setFPS(30);
    Ticker.addListener(window);
}
function oncarLoaded() {
    car = new Bitmap(carImg);
    car.regX = car.image.width * 0.5;
    car.regY = car.image.height * 0.5;
    car.x = 420;
    car.y = 550;

    stage.addChild(car);
}

function onKeyDown(e) {
    if (!e) { var e = window.event; }


    switch (e.keyCode) {
        // left
        case 37: moveLeft = true; moveRight = false;
            break;
            // up
        case 38: moveUp = true; moveDown = false;
            break;
            // right
        case 39: moveRight = true; moveLeft = false;
            break;
            // down
        case 40: moveDown = true; moveUp = false;
            break;



    }
}

function onKeyUp(e) {
    if (!e) { var e = window.event; }

    switch (e.keyCode) {
        // left
        case 37: moveLeft = false;
            break;
            // up
        case 38: moveUp = false;
            break;
            // right
        case 39: moveRight = false;
            break;
            // down
        case 40: moveDown = false;
            break;
            // Space bar for firing
        case 32: doFire();
            break;
        case 80:
            if (pause == 0) {
                pause = 1;
                document.getElementById('scream').src = "image/pause.gif";
                document.getElementById('Status').innerHTML = "Press P to resume";
            }
            else {
                pause = 0;
                document.getElementById('Status').innerHTML = "";
                if (level == 1)
                    document.getElementById('scream').src = "image/roadlev1.gif";
                else if (level == 2)
                    document.getElementById('scream').src = "image/roadmapslow.gif";
                else if (level == 3)
                    document.getElementById('scream').src = "image/roadmapfast.gif";
            }
            break;

        case 66:
            if (parseInt(document.getElementById('test').innerHTML) > 100) {
                megabomb();
                document.getElementById('test').innerHTML = parseInt(document.getElementById('test').innerHTML) - 100;
            }
            break;


    }
}



function checkMovement() {
    if (moveLeft) {
        if (car.x > 180)
            car.x -= speed;
        else
            car.x = car.x;//car.x = 700;
    }
    else if (moveRight) {
        if (car.x < 680)
            car.x += speed;
        else
            car.x = car.x;
        //if(car.x > 700)
        //car.x = 0;
    }

    if (moveUp) {
        if (car.y - speed > 24)
            car.y -= speed;
    }
    else if (moveDown) {
        if (car.y + speed < 550)
            car.y += speed;
    }
}

function tick() {
    if (pause == 0) {
        if (gameOver != true) {
            if (level == 1) {
                PlaceCoins();
                UpdateCoins();
                collideWithCoins();
            }

            else if (level == 2) {
                PlaceOpponents();
                UpdateOpponents();
                collideWithCarBullet();
                updateBullets();
                updateExplosions();
            }


            else if (level == 3) {
                PlaceOpponents();
                UpdateOpponents();

                PlacePeople();
                UpdatePeople();
                collideWithCarBullet();
                collidePeopleCarBullet();
                updateBullets();
                updateExplosions();
            }
        }



        checkMovement();
        stage.update();
    }
}

function updateBullets() {
    var bLimit = bullets.length - 1;

    for (var i = bLimit; i >= 0; --i) {
        bullets[i].y -= BULLET_SPEED;
        if (bullets[i].y < -3) {
            stage.removeChild(bullets[i]);
            bullets.splice(i, 1)
        }
    }
}

function doFire() {
    if (level > 1) {
        var bullet = new Shape(bulletG);
        bullet.scaleY = 1.5;
        bullet.x = car.x;
        bullet.y = car.y - 30;
        bullets.push(bullet);

        stage.addChild(bullet);
        var myAudio1 = new Audio('sounds/shot.ogg');
        myAudio1.play();
    }
}

function distance(obj1, obj2) {
    var difx = obj2.x - obj1.x;
    var dify = obj2.y - obj1.y;

    return Math.sqrt((difx * difx) + (dify * dify));
}

function collideWithCoins() {
    var numCoins = Coins.length - 1;
    var curCoin;
    for (var i = numCoins; i >= 0; --i) {
        curCoin = Coins[i];
        if (distance(curCoin, car) < 45) {
            stage.removeChild(curCoin);
            document.getElementById('test').innerHTML = parseInt(document.getElementById('test').innerHTML) + 1;
            if (parseInt(document.getElementById('test').innerHTML) > 100) {
                level = 2;
                document.getElementById('Glevel').innerHTML = "2";
                document.getElementById('Gun').innerHTML = "Activated";
                for (var i = Coins.length; i >= 0; --i)
                    stage.removeChild(Coins[i]);
                document.getElementById('scream').src = "image/roadmapslow.gif"
            }
            var myAudio3 = new Audio('sounds/CoinEffect.ogg');
            myAudio3.play();
        }

    }
}

function createExplosion(xpos, ypos) {

    var exp = new Bitmap("image/explode.png");
    exp.regX = exp.image.width * 0.5;
    exp.regY = exp.image.height * 0.5;
    exp.x = xpos;
    exp.y = ypos;
    explosions.push(exp);
    stage.addChild(exp);
    var myAudio2 = new Audio('sounds/death.ogg');
    myAudio2.play();
}
function updateExplosions() {
    var loopLimit = explosions.length - 1;
    for (var i = loopLimit; i >= 0; --i) {
        explosions[i].alpha -= 0.1;
        if (explosions[i].alpha <= 0) {
            stage.removeChild(explosions[i]);
            explosions.splice(i, 1);
        }
    }
}
function endGame() {
    createExplosion(car.x, car.y);
    stage.removeChild(car);
    document.getElementById('scream').src = "image/gameOver.gif"
    document.getElementById('Status').innerHTML = "Press F5 or refresh screen to restart";
    gameOver = true;
    var goverText = new Text("GAME OVER", "72pt bold Arial", "#cc0000");
    goverText.textAlign = "center";
    goverText.x = 320;
    goverText.y = 240;
    stage.addChild(goverText);

}



function megabomb() {
    var numOCars = Opponents.length - 1;
    var curOCar;

    for (var i = numOCars; i >= 0; --i) {
        stage.removeChild(Opponents[i]);
        createExplosion(Opponents[i].x, Opponents[i].y);
        Opponents.splice(i, 1);
    }
}
function collidePeopleCarBullet() {
    var numPCars = Peoples.length - 1;
    var numBullets = bullets.length - 1;
    var curPCar, curBullet;

    for (var i = numPCars; i >= 0; --i) {
        curPCar = Peoples[i];
        if (distance(curPCar, car) < 45) {
            endGame();
        }
        for (var j = numBullets; j >= 0; --j) {
            curBullet = bullets[j];

            if (distance(curPCar, curBullet) < 32) {

                endGame();
            }
        }
        numBullets = bullets.length - 1;
    }
}


function collideWithCarBullet() {
    var numOCars = Opponents.length - 1;
    var numBullets = bullets.length - 1;
    var curOCar, curBullet;

    for (var i = numOCars; i >= 0; --i) {
        curOCar = Opponents[i];
        if (distance(curOCar, car) < 45) {
            endGame();
        }
        for (var j = numBullets; j >= 0; --j) {
            curBullet = bullets[j];

            if (distance(curOCar, curBullet) < 32) {

                document.getElementById('test').innerHTML = parseInt(document.getElementById('test').innerHTML) + 10;
                if (parseInt(document.getElementById('test').innerHTML) > 300 && parseInt(document.getElementById('test').innerHTML) < 310) {
                    level = 3;
                    document.getElementById('Glevel').innerHTML = "3";
                    document.getElementById('scream').src = "image/roadmapfast.gif";
                    OpponentsSpeed = 10;
                    CarLimit = 10;
                }
                stage.removeChild(curOCar);
                stage.removeChild(curBullet);
                createExplosion(curOCar.x, curOCar.y);
                Opponents.splice(i, 1);
                bullets.splice(j, 1);
            }
        }
        numBullets = bullets.length - 1;
    }
}
