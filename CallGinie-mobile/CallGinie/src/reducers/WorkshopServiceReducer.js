const INITIAL_STATE = {
    services:[],
    error:"",
    isLoaded:false,
    isAddedSuccessfully:false,
    addingServicesError:""
    
 };
 import   * as types from "../actions/types"
 
 export default function WorkshopServicesReducer(state = INITIAL_STATE, action) {
     switch (action.type) {
         case types.GET_WORKSHOP_SERVICE_LIST:
             return{
                 ...state,
                 services:action.payload.services,
                 isLoaded:true
             }
            case types.GET_WORKSHOP_SERVICE_LIST_ERROR:
            return{
                ...state,
                error:"error",
                isLoaded:true
            }
            case types.ADD_WORKSHOP_SERVICES:
            return {
                    ...state,
                    isAddedSuccessfully:!state.isAddedSuccessfully
            }
            case types.ADD_WORKSHOP_SERVICES_ERROR:
            return {
                    ...state,
                    isAddedSuccessfully:!state.isAddedSuccessfully,
                    error:"error"
            } 
            
         default:
             return state
     }
 
 }
 