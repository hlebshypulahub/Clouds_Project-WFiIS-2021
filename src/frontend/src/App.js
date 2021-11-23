import { HashRouter as Router, Route, Switch } from "react-router-dom";

import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import PutEmployeeComponent from "./components/PutEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import ListFacilityComponent from "./components/ListFacilityComponent";
import AddFacilityComponent from "./components/AddFacilityComponent";
import ViewFacilityComponent from "./components/ViewFacilityComponent";
import AddCourseComponent from "./components/AddCourseComponent";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Router>
                <HeaderComponent />
                <div className="container">
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={ListEmployeeComponent}
                        ></Route>
                        <Route
                            path="/employees"
                            component={ListEmployeeComponent}
                        ></Route>
                        <Route
                            path="/put-employee/:id"
                            component={PutEmployeeComponent}
                        ></Route>
                        <Route
                            path="/add-employee"
                            component={PutEmployeeComponent}
                        ></Route>
                        <Route
                            path="/employee/:id/add-course"
                            component={AddCourseComponent}
                        ></Route>
                        <Route
                            path="/employee/:id"
                            component={ViewEmployeeComponent}
                        ></Route>
                        <Route
                            path="/facilities"
                            component={ListFacilityComponent}
                        ></Route>
                        <Route
                            path="/add-facility"
                            component={AddFacilityComponent}
                        ></Route>
                        <Route
                            path="/facility/:name"
                            component={ViewFacilityComponent}
                        ></Route>
                    </Switch>
                </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
