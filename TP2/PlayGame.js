


class PlayGame extends Phaser.Scene{


    // class constructor
    constructor(){
        super("PlayGame");

    }

    init(){

        this.enemyMaxY = 1200;
        this.enemyMinY = 100;
        this.lives=3;

    }

    preload(){
    }

    // method automatically executed by Phaser once the scene has been created
    create(){

        // custom method to add background image
        this.addBackground();
        this.enemiesCollision();

        //adiciona tesouro ao jogo
        this.treasure = this.add.sprite(1700, 60, 'treasure');
        this.treasure.setScale(1.3);

        this.addPlayer();
        this.addEnemies();



        this.cursors = this.input.keyboard.createCursorKeys();


        //adiciona os corações das vidas
        this.livesIcon = this.physics.add.group({
            key: 'lives',
            repeat: 2,
            setXY: { x: 50, y: 30, stepX: 50 }
        });


        for (let i = 0; i < 3; i++){
            this.livesIcon.getChildren()[i].setScale(0.15);
        }


        this.grunt = this.sound.add("grunt");
        this.heart = this.sound.add("heart");
        this.gameover = this.sound.add("gameover");
        this.winsound = this.sound.add("winsound")


    }

    // method to add background image
    addBackground(){

        // add background image as sprite, at coordinates x: -50, y: - 50
        let background = this.add.sprite(-50, -50, "background");

        // set background sprite origin - or registration point - to top left corner
        background.setOrigin(0, 0);

        // set background sprite display width to game width + 100 pixels
        background.displayWidth = game.config.width + 100;

        // set background sprite display height to game height + 100 pixels
        background.displayHeight = game.config.height + 100;


    }



    addPlayer() {
// add hero sprite

        this.hero = this.physics.add.sprite(250,1300, "idle");
        this.hero.body.collideWorldBounds = true;


        // set hero registration point to right bottom corner
        this.hero.setOrigin(1, 1);
        this.hero.setScale(0.15);

        // play "idle" animation
        this.hero.anims.play("idleA");

    }

    addEnemies(){

        //cria os inimigos
        this.enemies = this.physics.add.group({
            key: 'enemy',
            repeat: 3,
            setXY: {
                x: 110,
                y: 100,
                stepX: 500,
                stepY: 250
            }
        })

        this.enemies.children.iterate(function (child) {
            child.body.immovable = true;
        });

        this.enemies.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
        });



        // scale enemies
        for (let i = 0; i < 4; i++)
        {
            this.enemies.getChildren()[i].setScale(0.32);
        }

        //cria animação para os inimigos
        for (let i = 0; i < 4; i++) {
            this.enemies.getChildren()[i].anims.play("enemyA");
        }


        Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
            enemy.speed = Math.random() * 2 + 1;
        }, this);



    }


    //Cria o movimento dos inimigos
    enemiesMovement() {
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;
        for (let i = 0; i < numEnemies; i++) {


            // move enemies
            enemies[i].y += enemies[i].speed;

            // reverse movement if reached the edges
            if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
                enemies[i].speed *= -1;


            } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
                enemies[i].speed *= -1;

            }

        }

    }


    enemiesCollision() {


        this.enemiesCollided = [false, false, false, false]; //valor a falso para 4 inimigos



    }


    update() {

        this.hero.setVelocity(0);



        {

            if (this.cursors.left.isDown)
            {
                this.hero.setVelocityX(-180);
                this.hero.anims.play('walkA', true);
            }
            else if (this.cursors.right.isDown)
            {
                this.hero.setVelocityX(180);
                this.hero.anims.play('walkA', true);
            }
            else if (this.cursors.down.isDown)
            {
                this.hero.setVelocityY(180);
                this.hero.anims.play('walkA', true);

            }
            else if (this.cursors.up.isDown)
            {
                this.hero.setVelocityY(-180);
                this.hero.anims.play('walkA', true);
            }
            else
                this.hero.anims.play("idleA",true);


        }


        if (Phaser.Geom.Intersects.RectangleToRectangle(this.hero.getBounds(), this.treasure.getBounds())) {
            this.WinGame();}


        this.enemiesMovement();
        this.physics.add.collider(this.hero,this.enemies)



        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;

        for (let i = 0; i < numEnemies; i++) {

            // enemy collision
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.hero.getBounds(), enemies[i].getBounds())) {
                //create on collision event instead


                if (this.enemiesCollided[i]!== true){
                    this.lives--;
                    this.heart.play();
                    this.grunt.play();
                    this.livesIcon.getChildren()[this.lives].setVisible(false); //remove um coração por por cada vida

                    //gameOver
                    if (this.lives===0){
                        this.gameover.play();


                        this.time.delayedCall(1000, function() {
                            this.scene.start("End");
                        }, [], this);

                    }


                }
                this.enemiesCollided[i]=true;



                this.time.delayedCall(5000, function() {
                    this.enemiesCollided[i]=false;
                }, [], this);




                break;
            }



        }


    }

    //ganhar jogo
    WinGame(){



        //mudar para a cena de vitória
        this.time.delayedCall(1500, function() {
            this.winsound.play();
            this.scene.start("End");
        }, [], this);

    }



}

