import { USER } from '../actions';

const initialState = {

  email: '',

};
// aqui useReducer é uma função que recebe dois parâmetros, o primeiro é o estado inicial e o segundo é a ação que será executada
// o estado inicial é o estado inicial da minha aplicação, que no caso é um objeto vazio
// a ação é o que eu quero fazer com o meu estado, no caso é o que eu quero fazer com o meu email
function userReducer(state = initialState, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
