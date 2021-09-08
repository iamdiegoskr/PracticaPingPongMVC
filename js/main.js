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
            let elements = this.bars;
            //elements.push(this.ball)
            return elements;
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

        //Que voy a dibujar.
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
        play: function(){
            this.clean();
            this.draw();
        }
    }

    function draw(ctx, element){

            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }

    }

})();


let canvas = document.getElementById("canvas")//Canvas para dibujar
let board = new Board(800,400);//Tablero
const barLeft = new Bar(10,100,40,100,board);//Barra
const barRight  = new Bar(750, 100, 40, 100, board);//Barra2
let boardView = new BoardView(canvas,board);//Vista del tablero

window.requestAnimationFrame(controller)

document.addEventListener('keydown',(event)=>{

    event.preventDefault();

    if((event.key)=="ArrowDown"){
        barRight.down();
    }else if((event.key)=="ArrowUp"){
        barRight.up();
    }else if((event.key)=="w"){
        barLeft.up();
    }else if((event.key)=="s"){
        barLeft.down();
    }
})


//Especie de controlador
function controller(){
    boardView.play();
    window.requestAnimationFrame(controller);
}