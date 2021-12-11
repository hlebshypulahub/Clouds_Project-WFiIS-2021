import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import EmployeeService from "../services/EmployeeService";
import CourseService from "../services/CourseService";
import FacilityService from "../services/FacilityService";

class AddCourseComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilityName: this.props.match.params.name,
            name: "",
            hours: 0,
            employee: {},
            facility: {},
            employees: [],
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeHoursHandler = this.changeHoursHandler.bind(this);
        this.employeeSelectHandler = this.employeeSelectHandler.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentDidMount() {
        FacilityService.getFacilityByName(this.state.facilityName).then(
            (res) => {
                res.json().then((data) => {
                    let facility = data;
                    this.setState({
                        facility,
                    });
                });
            }
        );

        EmployeeService.getEmployeesForFacility(this.state.facilityName).then(
            (res) => {
                res.json().then((data) => {
                    this.setState({ employees: data });
                });
            }
        );
    }

    saveCourse = (e) => {
        e.preventDefault();

        if (
            this.state.name === "" ||
            this.state.hours === "" ||
            (Object.keys(this.state.employee).length === 0 &&
                this.state.employee.constructor === Object)
        ) {
            return;
        }

        let course = {
            name: this.state.name,
            hours: this.state.hours,
            facility: this.state.facility,
            employee: this.state.employee,
        };

        CourseService.saveCourse(course).then((res) => {
            this.props.history.goBack();
        });
    };

    cancel() {
        this.props.history.push("/facilities");
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    };

    changeHoursHandler = (event) => {
        this.setState({ hours: event.target.value });
    };

    employeeSelectHandler = (id) => {
        EmployeeService.getEmployeeById(id).then((res) =>
            res.json().then((data) => {
                this.setState({ employee: data });
            })
        );
    };

    employeeLabel = () => {
        return !(
            Object.keys(this.state.employee).length === 0 &&
            this.state.employee.constructor === Object
        )
            ? this.state.employee.name
            : "Lecturer eymployee";
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">
                                Add a course at {this.state.facility.name}
                            </h3>
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
                                        <label>Hours:</label>
                                        <input
                                            className="form-control"
                                            placeholder="Hours"
                                            name="hours"
                                            value={this.state.hours}
                                            onChange={(e) =>
                                                this.changeHoursHandler(e)
                                            }
                                        />
                                    </div>
                                    <DropdownButton
                                        style={{ paddingBottom: "20px" }}
                                        title={this.employeeLabel()}
                                        id="dropdown-menu-align-right"
                                    >
                                        {this.state.employees.map(
                                            (e, index) => {
                                                return (
                                                    <Dropdown.Item
                                                        key={e.id}
                                                        href=""
                                                        onClick={() =>
                                                            this.employeeSelectHandler(
                                                                e.id
                                                            )
                                                        }
                                                    >
                                                        {e.name}
                                                    </Dropdown.Item>
                                                );
                                            }
                                        )}
                                    </DropdownButton>
                                    <button
                                        className="btn btn-success"
                                        onClick={this.saveCourse}
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

export default AddCourseComponent;
