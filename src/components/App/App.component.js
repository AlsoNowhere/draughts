import template from "./App.template";
import { size, girth } from "../../constants/values";
import { players } from "../../constants/players";
import { current } from "../../stores/current.store";
import { getOptions } from "../../logic/get-options.logic";
import { board } from "../../constants/board";
import { playerMove } from "../../logic/player-move.logic";

const defaultStyles = `width:${girth}px;height:${girth}px;`;
const boardStyles = `width:${size*girth}px;`;

export const App = function(){

	this.oninit = function(){
		this.board.forEach((x,i)=>{
			i < size * 3 && x.colour === "red" && (x.player = players[0]);
			i >= size * size - size * 3 && x.colour === "red" && (x.player = players[1]);

			// i < size * 1 && x.colour === "red" && (x.player = players[0]);
			// i >= size * size - size * 1 && x.colour === "red" && (x.player = players[1]);

			// i < size * 3 && i > size * 2 && x.colour === "red" && (x.player = players[0]);
			// i >= size * size - size * 3 && i < size * size - size * 2 && x.colour === "red" && (x.player = players[1]);

			// [5].forEach(x=>(board[x].player=players[0]));
			// [12,26,30].forEach(x=>(board[x].player=players[2]));
			// [14].forEach(x=>(board[x].player=players[1]));

			// [35,17,37,19,21,14].forEach(x=>(board[x].player=players[0]));
			// [44].forEach(x=>(board[x].player=players[1]));
		});
	}

	this.board = board;
	this.boardStyles = boardStyles;
	this.isAI = () => current.player && current.player.ai;
	this.itemStyles = function(){

		let background = this._item.colour;
		this._item === current.selected && (background = "pink");
		!!current.options.find(x=>x.location===this._item) && (background = "lightgreen");
		!!current.options.find(x=>x.target===this._item) && (background = "lightblue");

		return `${defaultStyles}background-color:${background};`;
	}
	this.itemTemplate = function(){
		if (this._item.player === null) {
			return ``;
		}
		const kinged = this._item.king ? `<span class="block relative">K</span>` : ``;
		return `<span
			class="block middle round text-centre"
			style="width:${girth*2/3}px;height:${girth*2/3}px;background-color:${this._item.player.colour};line-height:${girth*2/3+2}px;">${kinged}</span>`;
	}

	this.currentPlayer = () => current.player.colour;
	this.scores = () => players.map(x=>({
		colour: x.colour,
		counters: board.filter(y=>y.player===x).length,
		kinged: board.filter(y=>y.player===x&&y.king).length
	}));

	this.clickItem = function(){
		if (this._item.colour !== "red" || (this._item.player !== null && this._item.player !== current.player)) {
			return false;
		}
		if (this._item.player !== null) {
			if (current.selected === this._item) {
				current.selected = null;
				current.options = [];
			}
			else {
				const options = getOptions(this._item);
				if (options.length > 0) {
					current.selected = this._item;
					current.options = options;
				}
			}
		}
		else if (!!current.options.find(x=>x.location===this._item)) {
			const move = current.options.find(x=>x.location===this._item);
			playerMove(this._item,move);
		}
	}
}

App.component = new dill.Component("app",template);
