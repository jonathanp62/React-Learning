/*
 * (#)App.tsx   0.3.0   11/20/2025
 *
 * @author  Jonathan Parker
 * @version 0.3.0
 * @since   0.3.0
 *
 * MIT License
 *
 * Copyright (c) 2025 Jonathan M. Parker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { JSX } from "react";
import type { ApiContextType } from "./types/ApiContextType.tsx";

import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./redux/Store.tsx"

import ApiContext from "./ApiContext.tsx";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Cart from "./pages/Cart.tsx";
import Item from "./pages/Item.tsx";
import packageJson from "../package.json";

/**
 * The application component.
 *
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
    const apiContext: ApiContextType = {
        baseUrl: packageJson.appConfig.apiBaseUrl,
        debug: packageJson.appConfig.debug
    }

    const contextValue: ApiContextType = useMemo((): ApiContextType => apiContext, []);

    return (
        <ApiContext.Provider value={contextValue}>
            <Provider store={store}>
                <Routes>
                    <Route element={ <Layout />} >
                        <Route path="/" element={ <Home /> } />
                        <Route path="/cart" element={ <Cart /> } />
                        <Route path="/item/:id" element={ <Item /> } />
                    </Route>
                </Routes>
            </Provider>
        </ApiContext.Provider>
    );
}

export default App;
