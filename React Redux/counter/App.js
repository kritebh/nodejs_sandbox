import React from "react"
import ReactDOM from "react-dom/client"
import Counter from "./Components/Counter"
import Users from "./Components/Users"
import { Provider } from "react-redux"
import store from "./Store/Store"
const App = ()=>{

    return (
        <Provider store={store}>
        <div>
        <Counter/>
        <Users/>
        </div>
        </Provider>
     )
}

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>)

