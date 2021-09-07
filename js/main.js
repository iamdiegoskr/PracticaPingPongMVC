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


(function(){

    //Clase para dibujar el tablero
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

})();


window.addEventListener('load', main);

function main(){

    let canvas = document.getElementById("canvas")

    let board = new Board(800,400);
    let boardView = new BoardView(canvas,board);

}