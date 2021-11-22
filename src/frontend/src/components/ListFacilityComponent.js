import React, { Component } from "react";
import FacilityService from "../services/FacilityService";

class ListFacilityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilities: [],
        };

        this.addFacility = this.addFacility.bind(this);
        this.deleteFacility = this.deleteFacility.bind(this);
        this.viewFacility = this.viewFacility.bind(this);
    }

    deleteFacility(name) {
        FacilityService.deleteFacility(name).then((res) =>
            res.json().then((data) => {
                this.setState({
                    facilities: this.state.facilities.filter(
                        (fac) => fac.name !== name
                    ),
                });
            })
        );
    }

    viewFacility(name) {
        this.props.history.push(`/facility/${name}`);
    }

    addFacility() {
        this.props.history.push("/add-facility");
    }

    componentDidMount() {
        FacilityService.getFacilities().then((res) =>
            res.json().then((data) => {
                this.setState({ facilities: data });
            })
        );
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Facility List</h2>
                <div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.facilities.map((facility) => (
                                <tr key={facility.name}>
                                    <td>{facility.name}</td>
                                    <td>{facility.city}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() =>
                                                this.deleteFacility(facility.name)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() =>
                                                this.viewFacility(facility.name)
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary" onClick={this.addFacility}>
                    Add Facility
                </button>
            </div>
        );
    }
}

export default ListFacilityComponent;
