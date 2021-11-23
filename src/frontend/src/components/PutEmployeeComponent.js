import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import EmployeeService from "../services/EmployeeService";
import FacilityService from "../services/FacilityService";

class PutEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id
                ? this.props.match.params.id
                : this.props.location.state.id,
            name: "",
            position: "",
            facility: {},
            facilities: [],
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.facilitySelectHandler = this.facilitySelectHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return;
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) =>
                res.json().then((data) => {
                    let employee = data;
                    this.setState({
                        name: employee.name,
                        position: employee.position,
                        facility: employee.facility,
                    });
                })
            );

            FacilityService.getFacilities().then((res) =>
                res.json().then((data) => {
                    this.setState({ facilities: data });
                })
            );
        }
    }

    saveEmployee = (e) => {
        e.preventDefault();

        if (this.state.id === -1) {
            let employee = {
                name: this.state.name,
                position: this.state.position,
            };

            EmployeeService.createEmployee(employee).then((res) => {
                this.props.history.push("/employees");
            });
        } else {
            let employee = {
                name: this.state.name,
                position: this.state.position,
                facility: this.state.facility,
            };

            employee.id = this.state.id;

            EmployeeService.updateEmployee(employee).then((res) => {
                this.props.history.goBack();
            });
        }
    };

    cancel() {
        this.props.history.push("/employees");
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    };

    changePositionHandler = (event) => {
        this.setState({ position: event.target.value });
    };

    facilitySelectHandler = (name) => {
        FacilityService.getFacilityByName(name).then((res) =>
            res.json().then((data) => {
                this.setState({ facility: data });
            })
        );
    };

    facilityLabel = () => {
        return !(
            this.state.facility === null ||
            (Object.keys(this.state.facility).length === 0 &&
                this.state.facility.constructor === Object)
        )
            ? this.state.facility.name
            : "Facility";
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.state.id === -1 ? (
                                <h3 className="text-center">Add Employee</h3>
                            ) : (
                                <h3 className="text-center">Update Employee</h3>
                            )}
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
                                        <label>Position:</label>
                                        <input
                                            className="form-control"
                                            placeholder="Position"
                                            name="position"
                                            value={this.state.position}
                                            onChange={(e) =>
                                                this.changePositionHandler(e)
                                            }
                                        />
                                    </div>
                                    {this.state.id !== -1 && (
                                        <DropdownButton
                                            style={{ paddingBottom: "20px" }}
                                            title={this.facilityLabel()}
                                            id="dropdown-menu-align-right"
                                        >
                                            {this.state.facilities.map(
                                                (fac, index) => {
                                                    return (
                                                        <Dropdown.Item
                                                            key={fac.name}
                                                            href=""
                                                            onClick={() =>
                                                                this.facilitySelectHandler(
                                                                    fac.name
                                                                )
                                                            }
                                                        >
                                                            {fac.name}
                                                        </Dropdown.Item>
                                                    );
                                                }
                                            )}
                                        </DropdownButton>
                                    )}
                                    <button
                                        className="btn btn-success"
                                        onClick={this.saveEmployee}
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

export default PutEmployeeComponent;
