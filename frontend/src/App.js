import { BrowserRouter, Route, Switch } from "react-router-dom";
//pages
import Home from "./pages/Home";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
//components
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/projects" component={Project} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          {/*           <Route path="/dashboard" component={Dashboard} /> */}
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
