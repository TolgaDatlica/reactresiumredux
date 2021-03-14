import AirPlaneModel from '../../models/airplane.model'
import {RouteTypes} from '../../models/enums/airplaneRouteTypes.enum'
const airplanesList = [
    new AirPlaneModel(1, 'ISTANBUL_LONDON',  28.979530, 41.015137, RouteTypes.ISTANBUL_LONDON, 45 ),
    new AirPlaneModel(2, 'LONDON_NEWYORK',  -0.136439, 51.507359, RouteTypes.LONDON_NEWYORK, 45),
    new AirPlaneModel(3, 'NEWYORK_ISTANBUL',  -75.000000, 43.000000,  RouteTypes.NEWYORK_ISTANBUL, 275)
];
export default {
    airplaneData: {
        airplanes: airplanesList,
        error: ''
    }
}