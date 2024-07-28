import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx";

import {Provider} from "react-redux";
import { store } from "./redux/store.js";

const rootEleme = document.getElementById('root')

if (rootEleme) {
    const root = ReactDOM.createRoot(rootEleme)

    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    )
}

