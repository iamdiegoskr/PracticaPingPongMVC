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
            elements.push(this.ball)
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
        this.speed = 10;

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

        draw: function(){
            for (let i =  this.board.elements.length -1 ; i >= 0; i--) {
                let ele = this.board.elements[i];
                draw(this.ctx, ele);

            }
        }

    }

    function draw(ctx, element){
        console.log(element);
        if(element!=null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }
        }
    }

})();



//Tablero
let board = new Board(800,400);
console.log(board);

   //Barra
const bar = new Bar(0,100,40,100,board);
const bar2 = new Bar(760, 100, 40, 100, board);

//Vista del tablero
let boardView = new BoardView(canvas,board);

document.addEventListener('keydown',(event)=>{
    if((event.key)=="ArrowDown"){
        console.log("Pa abajo mijo");
        bar.down();
    }else if((event.key)=="ArrowUp"){
        console.log("Pa arriba mijo");
        bar.up();
    }

    console.log(bar.toStrign());
})

window.addEventListener('load', main);

//Especie de controlador
function main(){

    //Canvas donde se va a dibujar.
    let canvas = document.getElementById("canvas")


    boardView.draw()

}