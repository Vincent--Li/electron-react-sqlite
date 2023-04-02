import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import BomPage from './pages/Home/components/BomPage'

export default () => {
    return (
        <>
            <Switch>
                <Route path="/" component={Home} />
                <Route exact path="/bom/:id" component={BomPage} />
            </Switch>
        </>
    )
}