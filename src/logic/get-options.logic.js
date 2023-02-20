import { players } from "../constants/players";
import { size } from "../constants/values";
import { Move } from "../models/Move.model";
import { current } from "../stores/current.store";
import { board } from "../constants/board";

const getAbove = (index) => {
    const arr = [];
    if (index >= size
        && index % size > 0) {
        if (board[index-size-1].player === null) {
            arr.push(new Move(board[index-size-1]));
        }
        else if (index >= size*2
                && index % size > 1
                && board[index-size-1].player !== current.player
                && board[index-size*2-2].player === null) {
            arr.push(new Move(board[index-size*2-2],board[index-size-1]));
        }
    }

    if (index >= size
        && index % size < size-1) {
        if (board[index-size+1].player === null) {
            arr.push(new Move(board[index-size+1]));
        }
        else if (index >= size*2
                && index % size < size-2
                && board[index-size+1].player !== current.player
                && board[index-size*2+2].player === null) {
            arr.push(new Move(board[index-size*2+2],board[index-size+1]));
        }
    }
    return arr;
}

const getBelow = (index) => {
    const arr = [];





    if (Math.floor(index / size) < size - 1
        && index % size > 0) {
        if (board[index+size-1].player === null) {
            arr.push(new Move(board[index+size-1]));
        }
        else if (Math.floor(index / size) < size - 2
                && index % size > 1
                && board[index+size-1].player !== current.player
                && board[index+size*2-2].player === null) {
            arr.push(new Move(board[index+size*2-2],board[index+size-1]));
        }
    }

    if (Math.floor(index / size) < size - 1
        && index % size < size-1) {
        if (board[index+size+1].player === null) {
            arr.push(new Move(board[index+size+1]));
        }
        else if (Math.floor(index / size) < size - 2
                && index % size < size-2
                && board[index+size+1].player !== current.player
                && board[index+size*2+2].player === null) {
            arr.push(new Move(board[index+size*2+2],board[index+size+1]));
        }
    }





    // if (Math.floor(index / size) < size - 1 && index % size > 0 && board[index+size-1].player === null) {
    //     arr.push(new Move(board[index+size-1]));
    // }
    // if (Math.floor(index / size) < size - 1 && index % size < size-1 && board[index+size+1].player === null) {
    //     arr.push(new Move(board[index+size+1]));
    // }






    return arr;
}

export const getOptions = (item) => {
    const arr = [];
    if (item.king) {
        arr.push(...getAbove(item.index),...getBelow(item.index));
    }
    else if (item.player === players[0]) {
        arr.push(...getBelow(item.index));
    }
    else if (item.player === players[1]) {
        arr.push(...getAbove(item.index));
    }
    return arr;
}
