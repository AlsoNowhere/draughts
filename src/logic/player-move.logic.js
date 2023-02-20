
import { players } from "../constants/players";
import { current } from "../stores/current.store";
import { board } from "../constants/board";
import { getOptions } from "./get-options.logic";
import { size } from "../constants/values";
import { endTurn } from "./end-turn.logic";
import { aiRecurse } from "./ai-move.logic";

export const playerMove = (boardItemToMoveTo,move) => {
    if (move.target !== null) {
        move.target.player = null;
        move.target.king = false;
    }

    const _players = [...players];
    players.length = 0;
    players.push(..._players.filter(x=>!!board.find(y=>y.player===x)));

    boardItemToMoveTo.player = current.selected.player;
    boardItemToMoveTo.king = current.selected.king;

    current.selected.player = null;
    current.selected.king = false;

    const targets = getOptions(boardItemToMoveTo).filter(x=>!!x.target);

    if (move.target && targets.length > 0) {
        current.options = targets;
        current.selected = boardItemToMoveTo;
        if (current.player.ai) {
            dill.change();
            aiRecurse();
        }
    }
    else {
        current.options = [];
        current.selected = null;

        if (boardItemToMoveTo.index < size || boardItemToMoveTo.index > size * size - size) {
            boardItemToMoveTo.king = true;
        }

        endTurn();
    }
}
