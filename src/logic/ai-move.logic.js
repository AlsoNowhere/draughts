
import { current } from "../stores/current.store";
import { board } from "../constants/board";
import { getOptions } from "./get-options.logic";
import { endTurn } from "./end-turn.logic";
import { playerMove } from "./player-move.logic";
import { timeAIWaitsFor } from "../constants/values";

export const aiMove = () => {
    setTimeout(()=>{
        const listOfCounters = board.filter(x=>x.player===current.player);
        const listOfPossibleMoves = listOfCounters.filter(x=>getOptions(x).length>0);

        if (listOfPossibleMoves.length === 0) {
            return endTurn();
        }

        const oneToMove = listOfPossibleMoves[Math.floor(Math.random()*listOfPossibleMoves.length)];
        current.selected = oneToMove;
        const optionsToMoveTo = getOptions(oneToMove);
        const oneOptionToMoveTo = optionsToMoveTo[Math.floor(Math.random()*optionsToMoveTo.length)];

        playerMove(oneOptionToMoveTo.location,oneOptionToMoveTo);
    },timeAIWaitsFor);
}

export const aiRecurse = () => {
    const choice = current.options[Math.floor(Math.random()*current.options.length)];
    setTimeout(()=>{
        playerMove(choice.location,choice);
    },timeAIWaitsFor);
}
