class End extends Phaser.Scene{

    // class constructor
    constructor(){
        super("End");
    }

    preload(){


    }

    create(){

        this.addBackground()




        //colocar botão
        this.clickButton = this.add.image(900,700,"replay")
            .setScale(3)
            .setInteractive()
            .on('pointerdown', () => this.scene.start("PlayGame") );



    }

    addBackground(){
        let background = this.add.sprite(-50, -50, "Win");
        background.setOrigin(0, 0);
        background.displayWidth = game.config.width + 100;
        background.displayHeight = game.config.height + 100;
    }



}