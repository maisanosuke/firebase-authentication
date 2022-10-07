import { ADD_USER, REMOVE_USER } from "./actionsType";

export const login = (user) => ({type: ADD_USER, payload: user});
export const logout = () => ({type: REMOVE_USER});