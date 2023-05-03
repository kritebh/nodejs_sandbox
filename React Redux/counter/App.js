import React from "react"
import {createRoot} from "react-dom/client"
import Counter from "./Components/Counter"

const App = ()=>{
    <div>
        <Counter/>
    </div>
}

const root = createRoot(document.getElementById("root"));
root.render(<App/>)

