import * as actionTypes from './actionTypes'
import {RouteTypes} from '../../models/enums/airplaneRouteTypes.enum'

let uniqueId = 4;
const GetAllAirplane = () => {
    return (dispatch) => {
        dispatch(getAllAirplanePending());
        setTimeout(() => {
            dispatch(getAllAirplaneComplete([]));
        }, 1000);
    }
}

const getAllAirplanePending = () => { return { type: actionTypes.GET_ALL_AIRPLANE_PENDING};}
const getAllAirplaneComplete = (data) => {return { type: actionTypes.GET_ALL_AIRPLANE_COMPLETE, payload: data };}

const NewAirplane  = (airplaneData) => {
    return (dispatch) => {
        uniqueId ++;
        dispatch(addNewAirplanePending());
        
        setTimeout(() => {
            if(airplaneData.Route === RouteTypes.LONDON_NEWYORK){
                airplaneData.Longitude = -0.136439;
                airplaneData.Latitude = 51.507359;
            } else if(airplaneData.Route === RouteTypes.NEWYORK_ISTANBUL){
                airplaneData.Longitude = -75.000000;
                airplaneData.Latitude = 43.000000;
            } else if(airplaneData.Route === RouteTypes.ISTANBUL_LONDON){
                airplaneData.Longitude = 30.979530;
                airplaneData.Latitude = 41.015137;
            }
            airplaneData.Id = uniqueId;
            dispatch(addNewAirplaneComplete(airplaneData));
        }, 1000);
    }
}
const addNewAirplanePending = () => { return { type: actionTypes.ADD_AIRPLANE_PENDING};}
const addNewAirplaneComplete = (data) => {return { type: actionTypes.ADD_AIRPLANE_COMPLETE, payload: data };}

const DeleteAirplane = (data) => {
    return (dispatch)=>{
        dispatch(deleteAirplanePending());
        setTimeout(() => {
            dispatch(deleteAirplaneComplete(data));
        }, 1000);
    }
}
const deleteAirplanePending = () => { return { type: actionTypes.REMOVE_AIRPLANE_PENDING};}
const deleteAirplaneComplete = (data) => {return { type: actionTypes.REMOVE_AIRPLANE_COMPLETE, payload: data };}



const getAirplanePositionRequest = (data) => {
    data.forEach(element => {
        if(element.Route === RouteTypes.LONDON_NEWYORK){
            element.Longitude += ((-75.000000 - element.Longitude) / 1000);
            element.Latitude += ((43.000000 - element.Latitude) / 1000);
            element.Rotation = Math.atan2((-75.000000 - element.Longitude), (43.000000 - element.Latitude)) 
            element.Rotation = element.Rotation * -1;
        } else if(element.Route === RouteTypes.NEWYORK_ISTANBUL){
            element.Longitude += ((28.979530 - element.Longitude) / 1000);
            element.Latitude += ((41.015137 - element.Latitude) / 1000);
            element.Rotation = Math.atan2((28.979530 - element.Longitude), (41.015137- element.Latitude))
            element.Rotation = element.Rotation * -1;
        } else if(element.Route === RouteTypes.ISTANBUL_LONDON){
            element.Longitude += ((-0.136439 - element.Longitude) / 1000);
            element.Latitude += ((51.507359 - element.Latitude) / 1000);
            element.Rotation = Math.atan2((-0.136439 - element.Longitude), (51.507359 - element.Latitude)) 
            element.Rotation = element.Rotation * -1;
        }
        element.History.push(element.Longitude);
        element.History.push(element.Latitude);
    });
    return (dispatch)=>{
        dispatch(getAirplanePositionResponse(data));
    }
}
const getAirplanePositionResponse = (data) => { return { type: actionTypes.GET_AIRPLANE_POSITION_RESPONSE, payload: data };}



export { GetAllAirplane, NewAirplane, DeleteAirplane, getAirplanePositionRequest}