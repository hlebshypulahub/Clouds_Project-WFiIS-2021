import React, { Component } from "react";

class FooterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <p className="text-muted">
                        Neo4j Project : Hleb Shypula : WFiIS AGH 2021
                    </p>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;
