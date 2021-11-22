import React, { Component } from "react";
import FacilityService from "../services/FacilityService";

class ViewFacilityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.match.params.name,
            facility: {},
        };
    }

    componentDidMount() {
        FacilityService.getFacilityByName(this.state.name).then((res) =>
            res.json().then((data) => {
                this.setState({ facility: data });
            })
        );
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Facility Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Name: &nbsp;</label>
                            <div>{this.state.facility.name}</div>
                        </div>
                        <div className="row">
                            <label>City: &nbsp;</label>
                            <div>{this.state.facility.city}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewFacilityComponent;
