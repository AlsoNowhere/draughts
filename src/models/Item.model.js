import { size } from "../constants/values";

export const Item = function(index){
    this.index = index;
    this.player = null;
    this.colour = Math.floor(index / size) % 2 === 0
        ? ((index % size) % 2 === 0 ? "black" : "red")
        : ((index % size) % 2 === 1 ? "black" : "red");
    this.king = false;
    Object.seal(this);
}
