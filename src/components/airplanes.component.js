import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as airplaneActions from '../redux/actions/actionAirplanes';
import { Cartesian3, Cartesian2 } from "cesium";
import {Entity, LabelGraphics, BillboardGraphics} from "resium";
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap'
class Airplanes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AirplaneName: "ISTANBUL_LONDON",
            Route: "ISTANBUL_LONDON"
        }
    }
    componentDidMount() {
        this.props.action.GetAllAirplane();
        setInterval(() => {
            this.props.action.SendAirplanePositionRequest(this.props.airplanes);
        }, 1000);

    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    deleteAirplane = (id) => {
        this.props.action.DeleteAirplane(id);
    }
    
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    newAirplane = () => {
        const data = {
            Name: this.state.AirplaneName,
            Route: this.state.Route
        }
        this.props.action.NewAirplane(data);
    }
    render() {
        return (
            <div >
                <div className="container" style={{ position: 'absolute', top: "10px", maxWidth:"500px" }}>
                    <div className="row justify-content-start">
                        <div className="col-md-12 align-self-start">
                            <Form>
                                <FormGroup>
                                    <Label for="AirplaneName" style={{ color: "white" }}>Airplane Name</Label>
                                    <Input type="text" name="AirplaneName" id="airplaneName" placeholder="Please type a name" 
                                    
                                    value={this.state.AirplaneName } onChange={this.myChangeHandler} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Route" style={{ color: "white" }}>Route</Label>
                                    <Input type="select" name="Route" id="routeTypes" value={this.state.Route}
                                    onChange={this.myChangeHandler}>
                                        <option>ISTANBUL_LONDON</option>
                                        <option>LONDON_NEWYORK</option>
                                        <option>NEWYORK_ISTANBUL</option>
                                    </Input>
                                </FormGroup>
                                <Button onClick={() => this.newAirplane()}>Submit</Button>
                            </Form>
                        </div>
                    </div>
                   <br></br>
                    <div className="row justify-content-start">
                        <div className="col-md-12 align-self-start">
                            <Table style={{color:"white"}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Route</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {this.props.airplanes.map((airplane) => (
                                        <tr key={airplane.Id}>
                                            <td>{airplane.Name}</td>
                                            <td>{airplane.Route}</td>
                                            <td>
                                                <Button className="btn btn-danger" onClick={() => this.deleteAirplane(airplane.Id)}>-</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                {this.props.airplanes.map((airplane) => (
                    <div key={airplane.Id}>
                        <Entity name={airplane.Name} description={airplane.Id}
                            position={new Cartesian3.fromDegrees(airplane.Longitude, airplane.Latitude, 8000)}>
                            <LabelGraphics
                                text={airplane.Name}
                                scale={0.3}
                            ></LabelGraphics>
                        </Entity>
                        <Entity position={new Cartesian3.fromDegrees(airplane.Longitude, airplane.Latitude, 8000)}>
                            <BillboardGraphics scale={0.4} image={require("../images/airplane.png")}
                                pixelOffset={new Cartesian2(0, 20)}>
                            </BillboardGraphics>
                        </Entity>
                    </div>

                ))}
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        airplanes: [...state.airplaneReducers.airplanes]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: {
            GetAllAirplane: bindActionCreators(airplaneActions.GetAllAirplane, dispatch),
            DeleteAirplane: bindActionCreators(airplaneActions.DeleteAirplane, dispatch),
            NewAirplane: bindActionCreators(airplaneActions.NewAirplane, dispatch),
            SendAirplanePositionRequest: bindActionCreators(airplaneActions.getAirplanePositionRequest, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Airplanes)
