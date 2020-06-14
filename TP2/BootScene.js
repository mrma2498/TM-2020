

// inherits all the characteristics of its predecessor
class BootScene extends Phaser.Scene{

    // class constructor
    constructor(){
        super("bootScene");
    }


    // method automatically executed by Phaser when the scene preloads
    preload(){

        // load background image and assign it "background" key
        this.load.image("bootImage", "assets/sprites/bootImage2.jpg");

        this.load.image("background", "assets/sprites/background.png");

        this.load.image("playButton", "assets/sprites/play3.png");

        this.load.image("replay", "assets/sprites/rep.png");



        this.load.spritesheet("idle", "assets/sprites/pirate.png", {
            frameWidth: 1421,
            frameHeight: 1203
        });

        this.load.spritesheet("walk", "assets/sprites/walk.png", {
            frameWidth: 1421,
            frameHeight: 1203
        });

        this.load.image("treasure", "assets/sprites/treasure.png");

        this.load.spritesheet("enemy", "assets/sprites/enemy2.png", {
            frameWidth: 720,
            frameHeight: 480
        });

        this.load.image("Win", "assets/sprites/win.jpg");

        this.load.image("lives", "assets/sprites/heart3.png");

        this.load.spritesheet("die", "assets/sprites/die.png", {
            frameWidth: 1421,
            frameHeight: 1203
        });

        this.load.audio("grunt", "assets/sprites/grunt1.ogg");

        this.load.audio("heart", "assets/sprites/life.ogg");

        this.load.audio("gameover", "assets/sprites/gameover.ogg");

        this.load.audio("winsound", "assets/sprites/winGame.ogg");

    }

    // method automatically executed by Phaser once the scene has been created,
    // often immediately after "preload" method
    create(){


        // launch "PlayGame" scene
        //this.scene.start("PlayGame");
        this.addBackground()
        this.add.text(20,20, "Loading game...")



        // genera o numero de frames para a imagem do pirate(estático)
        this.anims.create({
            key: "idleA",
            frames: this.anims.generateFrameNumbers("idle", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        // genera o numero de frames para a imagem do pirate(estático)
        this.anims.create({
            key: "walkA",
            frames: this.anims.generateFrameNumbers("walk", {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "enemyA",
            frames: this.anims.generateFrameNumbers("enemy", {
                start: 0,
                end: 17
            }),
            frameRate: 10,
            repeat: -1
        });


        //creates button for the player to click to start game
        this.clickButton = this.add.sprite(900,700,"playButton")
            .setInteractive()
            .on('pointerdown', () => this.scene.start("PlayGame") );


    }


    addBackground(){
        let background = this.add.sprite(-50, -50, "bootImage");
        background.setOrigin(0, 0);
        background.displayWidth = game.config.width + 100;
        background.displayHeight = game.config.height + 100;
    }


}
