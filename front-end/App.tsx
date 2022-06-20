import React from 'react'
import { Route, Switch } from 'react-router-dom'

const header = React.lazy(() => import('./Pages/header'))
const Usuarios2 = React.lazy(() => import('./Pages/Usuarios_2'))
const Tablas2 = React.lazy(() => import('./Pages/Tablas_2'))
const paguina1 = React.lazy(() => import('./Pages/paguina_1'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/header',
      name: 'header',
      component: header,
    },
    {
      path: '/Usuarios_2',
      name: 'Usuarios_2',
      component: Usuarios2,
    },
    {
      path: '/Tablas_2',
      name: 'Tablas_2',
      component: Tablas2,
    },
    {
      path: '/paguina_1',
      name: 'paguina_1',
      component: paguina1,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
