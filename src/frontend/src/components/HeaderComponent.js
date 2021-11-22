import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./HeaderComponent.scss";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="my-box">
                            <div className="my-1">
                                <a
                                    href="https://github.com/hlebshypulahub/Clouds_Project-WFiIS-2021"
                                    className="navbar-brand"
                                >
                                    Employee Management App
                                </a>
                            </div>
                            <div className="my-2">
                                <div>
                                    <Link
                                        to="/employees"
                                        style={{ color: "#FFF" }}
                                    >
                                        Employees
                                    </Link>
                                </div>
                                <p>&nbsp;&nbsp;&nbsp;</p>
                                <div>
                                    <Link
                                        to="/facilities"
                                        style={{ color: "#FFF" }}
                                    >
                                        Facilities
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
