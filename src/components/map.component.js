import React, { Component } from 'react'
import Airplanes from './airplanes.component'
import { Cartesian3 } from "cesium";
import {
    Viewer, CameraFlyTo
} from "resium";
const pointPosition = Cartesian3.fromDegrees(-0.136439, 51.507359, 8000000)
class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Viewer
                animation={false}
                homeButton={false}
                timeline={false}
                baseLayerPicker={false} >
                <Airplanes></Airplanes>
                <CameraFlyTo duration={3} destination={pointPosition} />
            </Viewer>
        );
    }

}
export default Map;
