import React,{createContext,useContext,useReducer} from 'react';
import reducer,{initialState} from './reducer';

//Prepares the Data layer
export const StateContext = createContext();

//Wrap our app and provide the data layer
export const StateProvider = ({reducer,intialState,children})=>(
<StateContext.Provider value ={useReducer(reducer,initialState)}>{children}</StateContext.Provider>
);

//pull the information from data layer
export const useStateValue=()=>useContext(StateContext);

