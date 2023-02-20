
export const Player = function(colour,ai=false){
    this.colour = colour;
    this.ai = ai;
    Object.seal(this);
}
