import {RouteTypes} from './enums/airplaneRouteTypes.enum'
export default class AirPlaneModel {
    constructor(Id, Name, Longitude, Latitude, route = RouteTypes.ISTANBUL_LONDON, rotation=0, history=[]){
        this.Id = Id;
        this.Name = Name;
        this.Longitude = Longitude;
        this.Latitude = Latitude;
        this.Route = route;
        this.Rotation = rotation;
        this.History = history;
    }
}