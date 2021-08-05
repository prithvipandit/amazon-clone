export const initialState = {
    basket : [],
    user : null,
};

const reducer =(state,action) => {
// if(action.type==='ADD_TO_BASKET' && isGood(state.basket,action.item)){return {...state, basket : [...state.basket,action.item]};}
// else{return {state, basket : state.basket};}

     switch(action.type){

        case "EMPTY_BASKET" : return {...state,basket:[]}
       
         case "ADD_TO_BASKET" : return isGood(state.basket,action.item)?{...state, basket : [...state.basket,action.item]}:{state, basket : state.basket};
        // case "Update_Basket" : return updateMyBasket(state.basket,action.item)?{...state, basket : [...state.basket,action.item]}:{state, basket : state.basket};
        
        case "REMOVE_TO_BASKET" : const indx=state.basket.findIndex(
            (basketItem)=>basketItem.id===action.id
        );
        let newBasket=[...state.basket];
        if(indx>=0){
            newBasket.splice(indx,1)
        }
        

        return {...state, basket:newBasket};

         case "UPDATE_BASKET" : let updatedBasket=[...state.basket];
         for(let item of updatedBasket){
             if(item.id===action.id){item.cart=action.cart;break;}
         }
         
         return {...state,basket : updatedBasket}

         case "SET_USER" : return {...state,user:action.user};

       
        
        default : return {state};
     }
};

function isGood(basket,x){
    
    for(let item of basket){
       if(item.id===x.id)return false;
    }
 
return true;
};





export default reducer;