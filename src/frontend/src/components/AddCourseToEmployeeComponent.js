import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import EmployeeService from "../services/EmployeeService";
import CourseService from "../services/CourseService";

class AddCourseComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            course: {},
            employee: {},
            courses: [],
        };

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

        CourseService.getCoursesNotEmployee(this.state.id).then((res) =>
            res.json().then((data) => {
                this.setState({ courses: data });
            })
        );
    }

    saveEmployee = (e) => {
        e.preventDefault();

        if (
            Object.keys(this.state.course).length === 0 &&
            this.state.course.constructor === Object
        ) {
            return;
        }

        CourseService.addCourseToEmployee(
            this.state.course.id,
            this.state.employee.id
        ).then((res) => {
            this.props.history.goBack();
        });
    };

    cancel() {
        this.props.history.push("/employees");
    }

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
            : "Course";
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
                                                this.courseSelectHandler(c.id)
                                            }
                                        >
                                            {c.name}, hours: {c.hours}
                                        </Dropdown.Item>
                                    );
                                })}
                            </DropdownButton>
                            <div className="row" style={{ margin: "0 auto" }}>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCourseComponent;
