import { ADD_USER, REMOVE_USER } from "../action/actionsType"

export default function reducer(user=(localStorage.getItem('user')||null), action){
    switch(action.type){
        case ADD_USER: {
            localStorage.setItem('user', action.payload);
            return action.payload;
        }
        case REMOVE_USER: {
            localStorage.clear();
            return null;
        }
        default: return user;
    }

}