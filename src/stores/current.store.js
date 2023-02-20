import { players } from "../constants/players";

export const current = {
    selected: null,
    state: "choose-piece",
    options: [],
    player: players[0]
}
Object.seal(current);
