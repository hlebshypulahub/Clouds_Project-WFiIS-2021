import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            employee: {},
            hoursSum: 0,
        };

        this.resetCourses = this.resetCourses.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) =>
            res.json().then((data) => {
                this.setState({ employee: data });
            })
        );

        EmployeeService.getEmployeeHoursSum(this.state.id).then((res) =>
            res.json().then((data) => {
                this.setState({ hoursSum: data });
            })
        );
    }

    resetCourses = (e) => {
        e.preventDefault();

        EmployeeService.resetCourses(this.state.id).then((res) => {
            EmployeeService.getEmployeeHoursSum(this.state.id).then((res) =>
                res.json().then((data) => {
                    this.setState({ hoursSum: data });
                })
            );
        });
    };

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Name: &nbsp;</label>
                            <div>{this.state.employee.name}</div>
                        </div>
                        <div className="row">
                            <label>Position: &nbsp;</label>
                            <div>{this.state.employee.position}</div>
                        </div>
                        <div className="row">
                            <label>Course hours sum: &nbsp;</label>
                            <div>{this.state.hoursSum}</div>
                        </div>
                        <button
                            className="btn btn-success"
                            onClick={this.resetCourses}
                        >
                            Reset courses due to promotion
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;
