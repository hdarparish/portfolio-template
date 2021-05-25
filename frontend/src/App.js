import Home from "./pages/Home";
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
          {/*           <Route path="/projects" component={Resume} />
          <Route path="/contact" component={Contact} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
