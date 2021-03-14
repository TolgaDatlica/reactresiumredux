import {RouteTypes} from './enums/airplaneRouteTypes.enum'
export default class AirPlaneModel {
    constructor(Id, Name, Longitude, Latitude, route = RouteTypes.ISTANBUL_LONDON){
        this.Id = Id;
        this.Name = Name;
        this.Longitude = Longitude;
        this.Latitude = Latitude;
        this.Route = route;
    }
}