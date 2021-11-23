import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import EmployeeService from "../services/EmployeeService";
import CourseService from "../services/CourseService";

class PutEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: "",
            hours: 0,
            course: {},
            employee: {},
            courses: [],
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeHoursHandler = this.changeHoursHandler.bind(this);
        this.courseSelectHandler = this.courseSelectHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) =>
            res.json().then((data) => {
                let employee = data;
                this.setState({
                    employee,
                });
            })
        );

        CourseService.getCourses().then((res) =>
            res.json().then((data) => {
                this.setState({ courses: data });
            })
        );
    }

    saveEmployee = (e) => {
        e.preventDefault();

        if (
            (this.state.name === "" || this.state.hours === "") &&
            Object.keys(this.state.course).length === 0 &&
            this.state.course.constructor === Object
        ) {
            return;
        }

        let course =
            this.state.name === "" || this.state.hours === ""
                ? this.state.course
                : {
                      name: this.state.name,
                      hours: this.state.hours,
                  };

        let employee = {
            ...this.state.employee,
            courses: [...this.state.employee.courses, course],
        };

        employee.id = this.state.id;

        EmployeeService.updateEmployee(employee).then((res) => {
            this.props.history.goBack();
        });
    };

    cancel() {
        this.props.history.push("/employees");
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    };

    changeHoursHandler = (event) => {
        this.setState({ hours: event.target.value });
    };

    courseSelectHandler = (id) => {
        CourseService.getCourseById(id).then((res) =>
            res.json().then((data) => {
                this.setState({ course: data });
            })
        );
    };

    courseLabel = () => {
        return !(
            Object.keys(this.state.course).length === 0 &&
            this.state.course.constructor === Object
        )
            ? this.state.course.name
            : "Existing course";
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">
                                Add a course for {this.state.employee.name}
                            </h3>
                            <h4 className="text-center">New course:</h4>
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
                                        title={this.courseLabel()}
                                        id="dropdown-menu-align-right"
                                    >
                                        {this.state.courses.map((c, index) => {
                                            return (
                                                <Dropdown.Item
                                                    key={c.id}
                                                    href=""
                                                    onClick={() =>
                                                        this.courseSelectHandler(
                                                            c.id
                                                        )
                                                    }
                                                >
                                                    {`${c.name} + ", hours: " + ${c.hours}`}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </DropdownButton>
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
