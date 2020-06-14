// the game itself
let game;

// object containing all customizable options, stored in a single place so you can
// easily change the gameplay by etiding a single piece of code
let gameOptions = {

    // another object with the default size
    defaultSize: {

        // width of the game in the perfect scenario, in pixels
        width: 750,

        // height of the game in the perfect scenario, in pixels
        height: 1334,

        // maximum aspect ratio supported, a landscape iPad.
        // More than enough for a portrait game
        maxRatio: 4 / 3,

        // milliseconds needed to move the ninja by a pixel
        heroWalkTime: 2
    }
}

// function to be executed when the window loads
window.onload = function() {

    // get optimal window's width and height
    let width = gameOptions.defaultSize.width;
    let height = gameOptions.defaultSize.height;

    // this is the best case aspect ratio
    let perfectRatio = width / height;

    // actual window's width and height
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    // actual width and height ratio
    let actualRatio = Math.min(innerWidth / innerHeight, gameOptions.defaultSize.maxRatio);

    // if perfect ratio is greater than actual ratio...
    if(perfectRatio > actualRatio){

        // ... then adjust height
        height = width / actualRatio;
    }
    else{

        // ... otherwise adjust width
        width = height * actualRatio;
    }

    // game configuration object
    let gameConfig = {

        // render type, sets the type of renderer used to draw on the canvas.
        // You can choose among Phaser.AUTO, Phaser.CANVAS, Phaser.HEADLESS, Phaser.WEBGL
        type: Phaser.AUTO,

        // scale object hadles the way the game is scaled and aligned
        scale: {

            // scale mode sets the aspect mode.
            // FIT mode is likely to be the one you are looking for, as it works in most cases.
            // Modes you may want to play with are:
            // FIT: width and height are automatically adjusted to fit inside the given target area, while keeping the aspect ratio.
            // Depending on the aspect ratio there may be some space inside the area which is not covered.

            mode: Phaser.Scale.FIT,

            // center the game horizontally and vertically
            // available options are:
            // CENTER_BOTH: game canvas automatically centered.
            autoCenter: Phaser.Scale.CENTER_BOTH,

            // element ID where to render the game. Remember? The <div> in index.html
            parent: "mariagame",



            // game width, in pixels
            width: width,

            // game height, in pixels
            height: height,

        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },

        // background color
        backgroundColor: 0x132c43,

        scene: [BootScene,PlayGame,End]
    }

    // creation of the game itself
    game = new Phaser.Game(gameConfig);



    // give focus to window
    window.focus();



}
