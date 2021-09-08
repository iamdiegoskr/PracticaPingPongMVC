(function(){

    //Clase Tablero
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    //Generar metodos de la clase tablero.

    self.Board.prototype = {

        get elements(){
            let elements = this.bars.map((element)=>element); //Paso una copia y no la referencia
            elements.push(this.ball)
            return elements;
        }

    }

})();


//Crear bola

(function(){

    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.speedY = 0;
        this.speedX = 3;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI/2;
        this.speed = 3;

        board.ball = this;
        this.kind = "circle"
    }

    self.Ball.prototype = {

        move:function(){
            this.x += this.speedX * this.direction;
            this.y += this.speedY;
        },

        get width(){
            return this.radius*2;
        },

        get height(){
            return this.radius*2;
        },

        collision:function(bar){
            //Reaccionamos a la colision con la barra que recibimos por parametro

               //Reacciona a la colisiona con una barra que recibe como parametro  
            let relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

            let normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speedY = this.speed * -Math.sin(this.bounce_angle);
            this.speedX = this.speed * Math.cos(this.bounce_angle);

            if (this.x > (this.board.width / 2)) this.direction = -1;
            else this.direction = 1;

        }

    }

})();


//Crear clase barras
(function(){

    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.speed = 20;

        //Asigno la barra al tablero.
        this.board.bars.push(this);

        this.kind = "rectangle";
    }

    self.Bar.prototype = {

        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toStrign: function(){
            return `x = ${this.x}, y=${this.y}`;
        }

    }


})();

(function(){

    //Clase para dibujar el tablero
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {

        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for (let i =  this.board.elements.length -1 ; i >= 0; i--) {
                let ele = this.board.elements[i];
                draw(this.ctx, ele);

            }
        },
        checkCollisions: function(){
            for (let i = this.board.bars.length - 1; i >= 0 ; i--) {
                let bar = this.board.bars[i];
                if(hit(bar,this.board.ball)){ //Validar colisison entre elementos
                    console.log("bum");
                    this.board.ball.collision(bar);
                }

            }
        },
        play: function(){

            if(this.board.playing){
                this.clean();
                this.draw();
                this.checkCollisions();
                this.board.ball.move();
            }
        }
    }

    function hit(a,b){ //Revisa si a colisiona con b
        let hit = false;

        //Colisiones horizontales
        if(b.x + b.width >= a.x && b.x < a.x + a.width){
         //Colisiona verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
        }

        //Colisión de a con b
        if(b.x <= a.x && b.x + b.width >= a.x + a.width){

            if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
        }

        //Colision b con a
        if(a.x <= b.x && a.x + a.width >= b.x + b.width){

         //Colisiona verticales
            if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
        }

        return hit;
    }

    function draw(ctx, element){

            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x,element.y,element.radius,0,7);
                    ctx.fill();
                    ctx.closePath();
                    break;
            }

    }

})();


let canvas = document.getElementById("canvas")//Canvas para dibujar
let board = new Board(800,400);//Tablero
const barLeft = new Bar(10,100,40,100,board);//Barra
const barRight  = new Bar(750, 100, 40, 100, board);//Barra2
let boardView = new BoardView(canvas,board);//Vista del tablero
let ball = new Ball(350, 100, 10, board);


boardView.draw();
window.requestAnimationFrame(controller)

document.addEventListener('keydown',(event)=>{

    event.preventDefault();

    if((event.key)=="ArrowDown"){
        event.preventDefault();
        barRight.down();
    }else if((event.key)=="ArrowUp"){
        event.preventDefault();
        barRight.up();
    }else if((event.key)=="w"){
        event.preventDefault();
        barLeft.up();
    }else if((event.key)=="s"){
        event.preventDefault();
        barLeft.down();
    }else if(event.keyCode==32){
        event.preventDefault();
        board.playing = !board.playing;
    }
})


//Especie de controlador
function controller(){
    boardView.play();
    window.requestAnimationFrame(controller);
}