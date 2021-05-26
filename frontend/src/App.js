import Home from "./pages/Home";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "@fontsource/roboto";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/projects" component={Project} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
