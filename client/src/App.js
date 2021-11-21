import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// imports pages/components
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";

// redux state
import { useSelector } from "react-redux"

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const state = useSelector((state) => state)

  console.log(state)

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Nav />
            <Switch>

            </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
