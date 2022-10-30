/*gameEngine.js
  This file contains the Scene, Sprite, and Timer objects
*/

var keysDown = [];

function Scene(){

    this.canvas = document.getElementById("canvas");
    this.canvas.style.backgroundColor = "black";
    this.context = this.canvas.getContext("2d");
    var width;
    var height;
    
    this.setSize = function(width, height){
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    this.setBackgroundColor = function(color){
        this.canvas.style.backgroundColor = color;
    }

    this.setBackgroundImage = function(imageurl){

        var imgWidth = this.canvas.width;
        var imgHeight = this.canvas.height;
        
        this.canvas.style.backgroundSize = imgWidth + "px " + imgHeight + "px";
        this.canvas.style.backgroundImage = "url(" + imageurl + ")";
        this.canvas.style.backgroundRepeat = "no-repeat";
        this.canvas.style.backgroundPosition = "center";
        
    }

    this.setBorder = function(size, style, color){
        this.canvas.style.border = size + "px " + style + " " + color;
    }

    this.resetBackground = function(){
        this.setBorder(0, "none", "white");
        this.setBackgroundColor("white");
        this.setBackgroundImage("");
    }

    this.clear = function(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    this.initKeys = function(){
        for(var i=0; i<256; i++){
            keysDown[i] = false;
        }
    }

    this.keyPressed = function(e){
        keysDown[e.keyCode] = true;
    }

    this.keyReleased = function(e){
        keysDown[e.keyCode] = false;
    }

    this.start = function(){
        this.initKeys();
        document.onkeydown = this.keyPressed;
        document.onkeyup = this.keyReleased;
        this.intId = setInterval(callUpdate, 50);
    }

    this.show = function(){
        this.canvas.style.display = "block";
    }

    this.hide = function(){
        this.canvas.style.display = "none";
    }
}


function callUpdate(){
    update();
}

function Sprite(imageurl, width, height){
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.img = new Image();
    this.img.src = imageurl;
    this.width = width;
    this.height = height;
    this.x = 100;
    this.y = 100;
    this.dx = 5;
    this.dy = 0;
    this.maxdx = 25;
    this.maxdy = 25;
    //this.speed = 5;
    this.isVisible = true;
    //this.boundAction = "WRAP";

    this.draw = function(){
        this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        this.checkxyBounds();
        this.draw();
    }

    this.checkxyBounds = function(){
        //Below for wrap
        if(this.x > this.canvas.width){this.x = 0;}
        if(this.y > this.canvas.height){this.y = 0;}
        if(this.x < 0){this.x = this.canvas.width;}
        if(this.y < 0){this.y = this.canvas.height;}
    }

    this.setmaxdx = function(maxdx){
        this.maxdx = maxdx;
    }

    this.setmaxdy = function(maxdy){
        this.maxdy = maxdy;
    }

    
    this.checkKeys = function(keyNum){
        if(keysDown[Key_LEFT] == true){
            this.dx += -1;
        }
        if(keysDown[Key_RIGHT] == true){
            this.dx += 1;
        }
        if(keysDown[Key_UP] == true){
            this.dy += -1;
        }
        if(keysDown[Key_DOWN] == true){
            this.dy += 1;
        }
        this.checkdxdyBounds();
    }

    this.checkdxdyBounds = function(){
        if(this.dx > this.maxdx){this.dx = this.maxdx;}
        if(this.dy > this.maxdy){this.dy = this.maxdy;}
        if(this.dx < this.maxdx * -1){this.dx = this.maxdx * -1;}
        if(this.dy < this.maxdy * -1){this.dy = this.maxdy * -1;}
    }
}

//Keyboard key codes
Key_A = 65; Key_B = 66; Key_C = 67; Key_D = 68; Key_E = 69; Key_F = 70; 
Key_G = 71; Key_H = 72; Key_I = 73; Key_J = 74; Key_K = 75; Key_L = 76; 
Key_M = 77; Key_N = 78; Key_O = 79; Key_P = 80; Key_Q = 81; Key_R = 82; 
Key_S = 83; Key_T = 84; Key_U = 85; Key_V = 86; Key_W = 87; Key_X = 88; 
Key_Y = 89; Key_Z = 90;
Key_LEFT = 37; Key_RIGHT = 39; Key_UP = 38; Key_DOWN = 40; Key_SPACE = 32;
Key_ESC = 27; Key_PGUP = 33; Key_PGDOWN = 34; Key_HOME = 36; Key_END = 35;
Key_0 = 48; Key_1 = 49; Key_2 = 50; Key_3 = 51; Key_4 = 52; Key_5 = 53;
Key_6 = 54; Key_7 = 55; Key_8 = 56; Key_9 = 57; 