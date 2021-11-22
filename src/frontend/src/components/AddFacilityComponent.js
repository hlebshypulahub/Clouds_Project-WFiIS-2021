import React, { Component } from "react";
import FacilityService from "../services/FacilityService";

class AddFacilityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            city: "",
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.saveFacility = this.saveFacility.bind(this);
    }

    // componentDidMount() {
    //     if (this.state.id === -1) {
    //         return;
    //     } else {
    //         EmployeeService.getEmployeeById(this.state.id).then((res) =>
    //             res.json().then((data) => {
    //                 let employee = data;
    //                 this.setState({
    //                     name: employee.name,
    //                     position: employee.position,
    //                 });
    //             })
    //         );
    //     }
    // }

    saveFacility = (e) => {
        e.preventDefault();

        let facility = {
            name: this.state.name,
            city: this.state.city,
        };

        if (this.state.id === -1) {
            FacilityService.createFacility(facility).then((res) => {
                this.props.history.push("/facilities");
            });
        } else {
            facility.id = this.state.id;

            FacilityService.updateFacility(facility).then((res) => {
                this.props.history.push("/facilities");
            });
        }
    };

    cancel() {
        this.props.history.push("/facilities");
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    };

    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Facility</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input
                                            className="form-control"
                                            placeholder="Name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={(e) =>
                                                this.changeNameHandler(e)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>City:</label>
                                        <input
                                            className="form-control"
                                            placeholder="City"
                                            name="city"
                                            value={this.state.city}
                                            onChange={(e) =>
                                                this.changeCityHandler(e)
                                            }
                                        />
                                    </div>
                                    <button
                                        className="btn btn-success"
                                        onClick={this.saveFacility}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFacilityComponent;
