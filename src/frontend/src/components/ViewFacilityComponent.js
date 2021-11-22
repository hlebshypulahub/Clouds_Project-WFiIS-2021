import React, { Component } from "react";
import FacilityService from "../services/FacilityService";
import EmployeeService from "../services/EmployeeService";

class ViewFacilityComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.match.params.name,
            facility: {},
            employees: [],
        };
    }

    componentDidMount() {
        FacilityService.getFacilityByName(this.state.name).then((res) =>
            res.json().then((data) => {
                this.setState({ facility: data });
            })
        );

        EmployeeService.getEmployeesForFacility(this.state.name).then((res) =>
            res.json().then((data) => {
                this.setState({ employees: data });
            })
        );
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then((res) =>
            res.json().then((data) => {
                this.setState({
                    employees: this.state.employees.filter(
                        (emp) => emp.id !== id
                    ),
                });
            })
        );
    }

    updateEmployee(id) {
        this.props.history.push(`/put-employee/${id}`);
    }

    viewEmployee(id) {
        this.props.history.push(`/employee/${id}`);
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
                <div style={{ marginTop: "20px" }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        <button
                                            className="btn btn-info"
                                            onClick={() =>
                                                this.updateEmployee(employee.id)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() =>
                                                this.deleteEmployee(employee.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            style={{ marginLeft: "10px" }}
                                            onClick={() =>
                                                this.viewEmployee(employee.id)
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
            </div>
        );
    }
}

export default ViewFacilityComponent;
