
import { aiMove } from "../logic/ai-move.logic";
import { players } from "../constants/players";
import { current } from "../stores/current.store";

export const endTurn = () => {
    const playerIndex = players.findIndex(x=>x===current.player);
    current.player = playerIndex === players.length - 1 ? players[0] : players[playerIndex+1];

    dill.change();

    if (current.player.ai) {
        aiMove();
    }
}
