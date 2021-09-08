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
            elements.push(ball)
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

        //Asigno la barra al tablero.
        this.board.bars.push(this);

        //Que voy a dibujar.
        this.kind = "rectangle";
    }

    self.Bar.prototype = {

        down: function(){

        },
        up: function(){

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
            for (let i =  board.elements.length -1 ; i >= 0; i--) {
                let ele = board.elements[i];

                draw(this.ctx, ele);

            }
        }

    }

    function draw(ctx, element){

        switch(element.kind){
            case "square":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
        }

    }

})();


window.addEventListener('load', main);

//Especie de controlador
function main(){

    let canvas = document.getElementById("canvas")

    let board = new Board(800,400);
    let boardView = new BoardView(canvas,board);

}