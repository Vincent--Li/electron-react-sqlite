import React from 'react'
import { Route, HashRouter } from 'react-router-dom'

import Home from './pages/Home/Home'
import BomPage from './pages/Home/BomPage'

export default () => {
    return (
        <>
            <HashRouter>
                <Route exact path="/" component={Home} />
                <Route path="/bom/:id" component={BomPage} />
            </HashRouter>
        </>
    )
}