import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            employee: {},
        };
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) =>
            res.json().then((data) => {
                this.setState({ employee: data });
            })
        );
    }

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
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;