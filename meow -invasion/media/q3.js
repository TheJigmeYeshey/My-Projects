const LOADING = 0;
const MAIN_MENU = 1;
const PLAY = 2;
const MAYHEM = 3;
const LEADERBOARD = 4;
const SETTINGS = 5;
const INSTRUCTIONS = 6;

let currentScreen;
let ship;
let spaceships;
let cat;
let shipImage;
let catImage;
let bulletImage;
let space;
let spaceImage;
let earth;
let earthImage;
let planet;
let planetImage;
let fart;
let fartImage;
let angrycat;
let angryCatImage;
let skull;
let skullImage;
let heart;
let heartImage;
let flower;
let flowerImage;
let flowerPot;
let flowerPotImage;
let galaxyImage;
let garden;
let shipspeed = 10;
let felines;
let projections;
let laserSound;
let playMusic;
let mayhemMusic;
let meow;
let roar;
let hammer;
let poop;
let galaxy;
let ferals;
let runonce;
let runtwice;
let runthrice;
let refreshonce;
let flicker;
let justOnce;
let wallL;
let wallR;
let wallB;
let walls;
let gates;
let timer;
let a;
let musicVolume;
let effectsVolume;
let vid;
let scorelist;
let scoreCount = 0;
let counter = 0;
let soundParameter = 1;
let newX = [];
let newID = [];

function preload() {
    shipImage = loadAnimation(
        'shipanimation/smallfighter0001.png',
        'shipanimation/smallfighter0002.png',
        'shipanimation/smallfighter0003.png',
        'shipanimation/smallfighter0004.png',
        'shipanimation/smallfighter0005.png',
        'shipanimation/smallfighter0006.png',
        'shipanimation/smallfighter0007.png',
        'shipanimation/smallfighter0008.png',
        'shipanimation/smallfighter0009.png',
        'shipanimation/smallfighter0010.png',
        'shipanimation/smallfighter0011.png',
        'shipanimation/smallfighter0010.png',
        'shipanimation/smallfighter0009.png',
        'shipanimation/smallfighter0008.png',
        'shipanimation/smallfighter0007.png',
        'shipanimation/smallfighter0006.png',
        'shipanimation/smallfighter0005.png',
        'shipanimation/smallfighter0004.png',
        'shipanimation/smallfighter0003.png',
        'shipanimation/smallfighter0002.png',
        'shipanimation/smallfighter0001.png',);
    catImage = loadImage('images/cat.png');
    bulletImage = loadImage('images/bullet.png');
    spaceImage = loadImage('images/space.png');
    earthImage = loadImage('images/earth.gif');
    fartImage = loadImage('images/fart.png');
    planetImage = loadAnimation(
        'Output/0000.png',
        'Output/0001.png',
        'Output/0002.png',
        'Output/0003.png',
        'Output/0004.png',
        'Output/0005.png',
        'Output/0006.png',
        'Output/0007.png',
        'Output/0008.png',
        'Output/0009.png',
        'Output/0010.png',
        'Output/0011.png',
        'Output/0012.png',
        'Output/0013.png',
        'Output/0014.png',
        'Output/0015.png',
        'Output/0016.png',
        'Output/0017.png',
        'Output/0018.png',
        'Output/0019.png',
        'Output/0020.png',
        'Output/0021.png',
        'Output/0022.png',
        'Output/0023.png',
        'Output/0024.png',
        'Output/0025.png',
        'Output/0026.png',
        'Output/0027.png',
        'Output/0028.png',
        'Output/0029.png',
        'Output/0030.png',
        'Output/0031.png',
        'Output/0032.png',
        'Output/0033.png',
        'Output/0034.png',
        'Output/0035.png',
        'Output/0036.png',
        'Output/0037.png',
        'Output/0038.png',
        'Output/0039.png',
        'Output/0040.png',
        'Output/0041.png',
        'Output/0042.png',
        'Output/0043.png',
        'Output/0044.png',
        'Output/0045.png',
        'Output/0046.png',
        'Output/0047.png',
        'Output/0048.png',
        'Output/0049.png',
        'Output/0050.png',
        'Output/0051.png',
        'Output/0052.png',
        'Output/0053.png',
        'Output/0054.png',
        'Output/0055.png',
        'Output/0056.png',
        'Output/0057.png',
        'Output/0058.png',
        'Output/0059.png'

        );
    angryCatImage = loadImage('images/angrycat.png');
    skullImage = loadImage('images/skull.png');
    heartImage = loadImage('images/heart.png');
    flowerImage = loadImage('images/flower.png');
    flowerPotImage = loadImage('images/flower.png');
    galaxyImage = loadImage('images/galaxy.png');
    laserSound = loadSound('sounds/laser.wav');
    playMusic = loadSound('sounds/bit.mp3');
    mayhemMusic = loadSound('sounds/misery.mp3');
    meow = loadSound('sounds/meow.mp3');
    roar = loadSound('sounds/roar.mp3');
    blast = loadSound('sounds/blast.mp3');
    poop = loadSound('sounds/poop.mp3');
    hammer = loadSound('sounds/hammer.mp3');
    scorelist = loadJSON('leaderboard.json');
}

function setup () {
    createCanvas(800,800);
    currentScreen = 0;
    let px = random(800);
    let py = random(-800, 0);

    //Buttons
    playButton = createButton('PLAY!'); 
    playButton.position(325 - playButton.size().width / 2, 400);
    playButton.style('font-size', '50px');
    playButton.size(200,100);
    playButton.mouseClicked(playButtonClicked);
    leaderBoardButton = createButton('LEADERBOARD'); 
    leaderBoardButton.position(357 - leaderBoardButton.size().width / 2, 500);
    leaderBoardButton.style('font-size', '18px');
    leaderBoardButton.size(200,50);
    leaderBoardButton.mouseClicked(leaderBoardButtonClicked);
    settingsButton = createButton('SETTINGS'); 
    settingsButton.position(340 - settingsButton.size().width / 2, 550);
    settingsButton.style('font-size', '18px');
    settingsButton.size(200,50);
    settingsButton.mouseClicked(settingsButtonClicked);
    playButton.hide();
    leaderBoardButton.hide();
    settingsButton.hide();

    //for game
    runonce = true;
    runtwice = true;
    refreshonce = true;
    projections = new Group();
    felines = new Group();
    ferals = new Group();
    walls = new Group();
    spaceships = new Group();
    galaxy = new Group();
    gates = new Group();
    garden = new Group();

    //for slider
    musicVolume = createSlider(0,1,1,0.1);
    musicVolume.position(400,400);
    musicVolume.style('width','200px');
    musicVolume.hide();
    effectsVolume = createSlider(0,1,1,0.1);
    effectsVolume.position(400,500);
    effectsVolume.style('width','200px');
    effectsVolume.hide();

    //for video
    vid = createVideo('video/sleeping.mp4');
    vid.position(0,100);
    vid.size(800,500);

    playBtn = createButton("Play Video");
    playBtn.position(30, 40);
    playBtn.mouseClicked(playVideo);
    
    pauseBtn = createButton("Pause Video");
    pauseBtn.position(150, 40);
    pauseBtn.mouseClicked(pauseVideo);

}

function playButtonClicked () {
    currentScreen = INSTRUCTIONS;
    playButton.hide();
    leaderBoardButton.hide();
    settingsButton.hide();
}

function settingsButtonClicked () {
    currentScreen = SETTINGS;
    playButton.hide();
    leaderBoardButton.hide();
    settingsButton.hide();
}

function leaderBoardButtonClicked () {
    currentScreen = LEADERBOARD;
    playButton.hide();
    leaderBoardButton.hide();
    settingsButton.hide();
}

playMusic.play();

function draw () {
    if (currentScreen===LOADING) {
        drawLoadingScreen ();
    }
    if (currentScreen===MAIN_MENU) {
        drawMainMenuScreen ();
    }
    if (currentScreen===PLAY) {
        
        if (scoreCount<10) {
            drawPlayScreen();
        } else {
            drawMayhemScreen();
        }
    }
    if (currentScreen===LEADERBOARD) {
        drawLeaderBoardScreen();
    }
    if (currentScreen===SETTINGS) {
        drawSettingsScreen();
    }
    if (currentScreen===INSTRUCTIONS) {
        drawInstructionsScreen();
    }
}

function drawLoadingScreen () {
    background(0);
    fill(255);
    textSize(50);
    text('Press SPACEBAR to continue',70,700);
    if (keyWentDown(32)) {
        currentScreen=MAIN_MENU;
        playMusic.play();
        vid.hide();
        playBtn.hide();
        pauseBtn.hide();
    }
}

function drawMainMenuScreen () {
    background(0);
    textSize(80);
    fill(255);
    text('MEOW INVASION',70,200);
    textSize(30);
    text('A tiny gift for you',500,300);
    image(flowerImage,350,270,75,115.5);
    playButton.show();
    leaderBoardButton.show();
    settingsButton.show();
}
function drawInstructionsScreen () {
    background(0);
    textSize(30);
    fill(255);
    text("Hello! I've been appointed to assa- to instruct you.",20,50);
    text("We are being invaded by malicious space felines.",20,125);
    text("We really need your help.",20,200);
    text("It's simple! Press 'A' and 'D' to move left and right.",20,275);
    text("And 'SPACEBAR' to shoot projectiles.",20,350);
    text("DON'T let these monstrous cats touch you.",20,425);
    text("And especially....",20,500);
    text("DON'T let them into our gates",20,575);
    text("That's it!",20, 650);
    text("Oh! and enjoy our gift XOXO",20,725);
    textSize(15);
    text('PRESS ENTER -->',600,750);
    if (keyWentDown(13)) {
        currentScreen = PLAY;
    }
}
function drawLeaderBoardScreen () {
    //leaderboard
    if (runthrice) {
    }
    background(0);
    for (n=0;n<2;n++) {
        for (m=0;m<2;m++) {
            image(galaxyImage,n*400,m*400,400,400);
        }
    }
    textSize(75);
    fill(255);
    text('LEADERBOARD',100,200);
    textSize(20);
    text('<--Backspace',600,70);
    textSize(20);
    text("Don't listen to him!",300,700);
    for (let d=0; d<Object.keys(scorelist).length; d++) {
        if (d===0) {
            fill(255,255,255);
        }
        if (d===3) {
            fill(255,255,0);
        }
        textSize(50);
        text(scorelist[d].PlayerID+'.'+scorelist[d].Name+': '+scorelist[d].Score,250,600-100*d);
    }
    if (keyWentDown(8)) {
        currentScreen = MAIN_MENU;
    }
}
function drawSettingsScreen () {
    background(0);
    textSize(20);
    text('<--Backspace',600,70);
    textSize(75);
    text('SETTINGS',200,200);
    fill(255);
    textSize(20);
    text("Don't Trust The Gift!!",300,600);
    textSize(50);
    text('MUSIC',210,420);
    text('EFFECTS',150,520);
    textSize(20);
    text('<--Backspace',600,70);
    musicVolume.show();
    effectsVolume.show();
    laserSound.setVolume(effectsVolume.value());
    mayhemMusic.setVolume(musicVolume.value());
    playMusic.setVolume(musicVolume.value());
    meow.setVolume(effectsVolume.value());
    roar.setVolume(effectsVolume.value());
    blast.setVolume(effectsVolume.value());
    hammer.setVolume(effectsVolume.value());
    poop.setVolume(effectsVolume.value());
    if (keyWentDown(8)) {
        currentScreen = MAIN_MENU;
        musicVolume.hide();
        effectsVolume.hide();
    }
}

function drawPlayScreen () {
    timer++;
    if (runonce) {
        createBackGround();
        spawnShip();
        for (let i = 0; i++;) {
            let px = random(0, 800);
            let py = -10;
            createCat(px, py);
        }
        createWall();
        runonce = false;
    }
    if (keyDown('a')) {
        ship.position.x -= shipspeed;
    }
    if (keyDown('d')) {
        ship.position.x += shipspeed;
    }
    if (keyWentDown(32)) {
        if (spaceships.length !=0 && gates.length != 0) {
            let bullet = createSprite(ship.position.x, ship.position.y - 50);
            bullet.addImage(bulletImage);
            bullet.setSpeed(10, 270);
            bullet.setCollider('circle',0,0,10);
            bullet.debug=true;
            projections.add(bullet);
            laserSound.play();
        } else {
            poop.play();
        }
    }
    if (keyWentDown(8)) {
        currentScreen = MAIN_MENU;
    }
    if(felines.length<1){
        let px = random(0, 800);
        let py = -20;
        createCat(px, py);
    }
    if (garden.length<1 && scoreCount>4){
        let px = random(0, 800);
        let py = -20;
        createflowerPot(px,py);
    }
 
    felines.overlap(projections,explode);
    ship.overlap(felines,explosion);
    ship.overlap(garden,surprise);
    felines.cull(20);
    garden.cull(20);
    background(0);
    ship.collide(walls);
    felines.overlap(gates,explosion);
    garden.overlap(projections,tank);
    drawSprites();
    if (scoreCount<2) {
        textSize(50);
        fill(255);
        text("let's take it slow....",200,400);
    }
    if (scoreCount>1 && scoreCount<5) {
        textSize(50);
        fill(255);
        text("You're Doing Great!",200,400);
    }
    if (scoreCount>4 && scoreCount<7) {
        textSize(50);
        fill(255);
        text("Here's a gift for you ^_^",150,400);
    }
    if (scoreCount>6 && scoreCount<10) {
        textSize(40);
        fill(255);
        text("Now that you've got the hang of it",100,400);
    }
    if (spaceships.length===0) {
        displayGameOver();
        textSize(40);
        fill(255);
        playMusic.stop();
    }
    if (gates.length===0) {
        displayGameOver();
        textSize(40);
        fill(255);
        playMusic.stop();
    }
    if (scoreCount>9) {
        ship.remove();
        planet.remove();
        fart.remove();
        space.remove();
        cat.remove();
        wallB.remove();
        flowerPot.remove();
        playMusic.stop();
    }
    displayScore_Life();
    textSize(20);
    text('<--Backspace',600,70);
}

function drawMayhemScreen() {
    background(255,0,0);
    if (runtwice) {
        mayhemMusic.play();
        hellSpace();
        spawnShip();
        for (let i = 0; i++;) {
            let qx = random(800);
            let qy = -30;
            createAngryCat(qx, qy);
        }
        createWall();
        runtwice = false;
    }
    if (keyDown('a')) {
        ship.position.x -= shipspeed;
    }
    if (keyDown('d')) {
        ship.position.x += shipspeed;
    }
    if (keyWentDown(32)) {
        if (spaceships.length !=0 & gates.length !=0) {
            let bullet = createSprite(ship.position.x, ship.position.y - 50);
            bullet.addImage(bulletImage);
            bullet.setSpeed(10, 270);
            bullet.setCollider('circle',0,0,10);
            //bullet.debug=true;
            projections.add(bullet);
            laserSound.play();
        } else {
            poop.play();
        }
    }
    if (keyWentDown(8)) {
        currentScreen = MAIN_MENU;
    }
    if(ferals.length<5){
        let px = random(800);
        let py = -20;
        createAngryCat(px, py);
    }
    if (garden.length<3 && scoreCount>15){
        let px = random(0, 800);
        let py = -20;
        createflowerPot(px,py);
    }
 
    ferals.overlap(projections,murder);
    ship.overlap(ferals,explosion);
    ferals.cull(20);
    ship.collide(walls);
    ferals.overlap(gates,explosion);
    drawSprites();
    lightFlicker();
    if (scoreCount>9 && scoreCount<15) {
        textSize(50);
        fill(255);
        text("BURN IN HELL YOU MORON!!!",50,400);
    }
    if (scoreCount>15 && scoreCount<21) {
        textSize(30);
        fill(0);
        text("HAPPY DEATH DAY! HERE'S YOUR GIFT!",100,400);
    }
    if (scoreCount>31 && scoreCount<36) {
        textSize(70);
        fill(255);
        text("Okay....You're Good",150,400);
    }
    if (scoreCount>45 && scoreCount<50) {
        textSize(50);
        fill(255);
        text("Wait...you're still here?!",200,400);
    }
    if (scoreCount>55 && scoreCount<61) {
        textSize(50);
        fill(255);
        text("there's nothing else.....",100,400);
    }
    if (scoreCount>70 && scoreCount<76) {
        textSize(50);
        fill(255);
        text("OMG!  Aren't you Bored?",200,400);
    }
    displayScore_Life();
    if (spaceships.length===0) {
        displayGameOver();
        mayhemMusic.stop();
    }
    if (gates.length===0) {
        displayGameOver();
        mayhemMusic.stop();
    }
}

function spawnShip() {
    ship = createSprite(width / 2, height * 9 / 10);
    ship.setCollider('rectangle',0,0,60,140);
    /*ship.debug=true;*/
    ship.addAnimation('normal', shipImage);
    spaceships.add(ship);

}

function createCat(x, y) {
    cat = createSprite(x, y);
    cat.addImage(catImage);
    cat.setCollider('circle',0,0,35);
    /*cat.debug=true;*/
    cat.attractionPoint(2, ship.position.x, ship.position.y);
    felines.add(cat);
}

function explode(hitter,hittee) {
    hitter.remove();
    hittee.remove();
    meow.play();
    scoreCount += 1;
}

function murder(victim, weapon) {
    victim.remove();
    weapon.remove();
    roar.play();
    scoreCount += 1;
}

function surprise(birthday, gift) {
    birthday.remove();
    gift.remove();
    blast.play();
    fill(255);
    textSize(50);
    text('HA! You Fell For It',200,650);
}

function tank(strong, glass) {
    glass.remove();
    hammer.play();
}

function explosion(exploder,explodee) {
    exploder.remove();
    explodee.remove();
}

function createWall() {
    wallL=createSprite(-50,400,100,800);
    wallR=createSprite(850,400,100,800);
    wallB=createSprite(400,850,800,100);
    walls.add(wallL);
    walls.add(wallR);
    gates.add(wallB);
    
}

function displayScore_Life() {
    fill(255);
    textSize(50);
    text('Score: '+scoreCount,10,100);
    textSize(20);
    text('Press "W" and "D" to move left and right. Press "SPACEBAR" to shoot projectiles!', 20,780);
}

function displayGameOver() {
    counter++;
    fill(0);
    textSize(100);
    textStyle(BOLD);
    text('GAME OVER',100,400);
    if (counter % 240 === 0) {
        location.reload();
        scoreCount = 0;
    }
    soundParameter += 1;
}

function createBackGround() {
    space = createSprite(400,400);
    space.addImage('stars',spaceImage);
    planet = createSprite(200,400);
    planet.addAnimation('zamling', planetImage);
    galaxy.add(planet);
    fart = createSprite(800,800);
    fart.addImage('green', fartImage);
    galaxy.add(fart);
}

function createAngryCat(a,b) {
    angrycat = createSprite(a,b);
    angrycat.addImage(angryCatImage);
    angrycat.setCollider('circle',0,0,35);
    /*cat.debug=true;**/
    angrycat.attractionPoint(4, ship.position.x, ship.position.y);
    ferals.add(angrycat);
}

function hellSpace() {
    skull = createSprite(200,400);
    skull.addImage('skeleton',skullImage);
    heart = createSprite(600,800);
    heart.addImage('beating',heartImage);
}

function lightFlicker() {
    if (frameCount % 5 === 0) {
        flicker = !flicker;
    }
    if (flicker) {
        fill(color('rgba(0, 0, 0, 0.2)'));
    } else {
        fill(color('rgba(0, 0, 0, 0)'));
    }
    rect(0,0,800,800);
}

function createflowerPot(c,d) {
    flowerPot = createSprite(c,d);
    flowerPot.addImage(flowerPotImage);
    flowerPot.setCollider('circle',0,0,35);
    //flowerPot.debug=true;
    flowerPot.attractionPoint(2, ship.position.x, ship.position.y);
    garden.add(flowerPot);
}

function playVideo() {
    vid.play();
  }
    
  function pauseVideo() {
    vid.pause();
  }
