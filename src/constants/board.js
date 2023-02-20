
import { Item } from "../models/Item.model";
import { size } from "../constants/values";

export const board = Array(size*size).fill(null).map((_,i)=>new Item(i));
