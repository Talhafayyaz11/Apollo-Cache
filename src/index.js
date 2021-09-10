import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache()
});

const COUNTRY = gql`
query country($code: ID!) {
  country(code: $code) {
    name
    emoji
  }
}
`
const CONTINENTS = gql`
query continent($code: ID!) {
  continent(code: $code) {
    name
  }
}
`

function ExchangeRates() {
  const [code, setCode] = React.useState("")
  const [ContinentCode] = React.useState("")

  const { loading, error, data } = useQuery(COUNTRY, { variables: { code } });
  const { loading: loadingContinents, error: ContinentErrors, data: continents } = useQuery(CONTINENTS, { variables: { code: ContinentCode } });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>
    <input value={code} onChange={({ target }) => setCode(target.value)} />
    <p>{data?.country?.name} {data?.country?.emoji}</p>
  </div>
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <ExchangeRates />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
