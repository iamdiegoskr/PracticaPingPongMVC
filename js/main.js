(function(){

    //Clase Tablero
    self.Board = function(width, heigth){
        this.width = width;
        this.heigth = heigth;
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


function main(){

}