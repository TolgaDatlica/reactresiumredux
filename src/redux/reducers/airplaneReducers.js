import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState'

const airplanereducers = (state = initialState.airplaneData, action) => {
    switch (action.type) {
        case actionTypes.ADD_AIRPLANE_PENDING:
            return {
                ...state
            }
        case actionTypes.ADD_AIRPLANE_COMPLETE:
            const addedAirplanes = [...state.airplanes, action.payload];
            return {
                ...state,
                airplanes: addedAirplanes
            }

        case actionTypes.REMOVE_AIRPLANE_PENDING:
            return {
                ...state
            }
        case actionTypes.REMOVE_AIRPLANE_COMPLETE:
            const deleteAirplane = [...state.airplanes.filter(airplane => airplane.Id !== action.payload)]
            return {
                ...state,
                airplanes: deleteAirplane
            }
        case actionTypes.GET_AIRPLANE_POSITION_RESPONSE:
            return {
                ...state,
                airplanes: action.payload
            }
        default: // need this for default case
            return state

    }
}

export default airplanereducers;