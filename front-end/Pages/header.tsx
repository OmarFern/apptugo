import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import unmodulescss from 'dist/css/un.module.scss'
import React, { FunctionComponent } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadTablas2, searchTablas2 } from '../store/actions/tablas2Actions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const header: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const theme = unmodulescss
  const Tabla_2 = useSelector((state: IState) => state.tablas2).tablas2
  const tablas2Data = useSelector((state: IState) => state.tablas2)
  const dispatch = useDispatch()
  const [LoadfromDatabaseloadoptions, setLoadfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchTablas2(options) : loadTablas2(options))
  }
  React.useEffect(() => {
    performLoadfromDatabaseload({
      ...LoadfromDatabaseloadoptions,
    })
  }, [LoadfromDatabaseloadoptions])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
        <AppBar elevation={0} position="relative" title="">
          <Toolbar>
            <NavLink to="/">HOME</NavLink>
          </Toolbar>
        </AppBar>

        <Carousel>
          <picture>
            <img src="/img/hero0.jpg" alt="/img/hero0.jpg" width="100%" height="80%" />
          </picture>

          <picture>
            <img src="/img/hero.jpg" alt="/img/hero.jpg" width="100%" height="80%" />
          </picture>

          <picture>
            <img src="/img/hero0.jpg" alt="/img/hero0.jpg" width="100%" height="80%" />
          </picture>

          <picture>
            <img src="/img/hero3.jpg" alt="/img/hero3.jpg" width="100%" height="80%" />
          </picture>
        </Carousel>
      </div>

      <Container maxWidth={false}>
        <div title="div">
          <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
            {Tabla_2.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div title="div">
                    <picture>
                      <img src={`/img/${item.imagen}`} alt={`/img/${item.imagen}`} width="480" height="365" />
                    </picture>

                    <div title="div">
                      <Typography variant="h5">{item.Nombre}</Typography>

                      <Typography variant="h6">{item.Descripcion}</Typography>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </Grid>
        </div>

        <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
          {Tabla_2.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div title="div">
                  <picture>
                    <img src={`/img/${item.imagen}`} alt={`/img/${item.imagen}`} width="480" height="365" />
                  </picture>

                  <div title="div">
                    <Typography variant="h5">{item.Nombre}</Typography>

                    <Typography variant="h6">{item.Descripcion}</Typography>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </Grid>
      </Container>

      <Container maxWidth={false}>
        <Grid item className={theme.contenedor_padre3}>
          <div title="div">
            <Typography variant="h6">Audio y subtitulos</Typography>

            <Typography variant="h6">Contactanos</Typography>
          </div>

          <div title="div">
            <Typography variant="h6">Avisos legales</Typography>

            <Typography variant="h6">Inversores</Typography>
          </div>

          <div title="div">
            <Typography variant="h6">Centro de ayuda</Typography>

            <Typography variant="h6">Empleo</Typography>
          </div>

          <div title="div">
            <Typography variant="h6">Tarjeta regalo</Typography>

            <Typography variant="h6">Terminos de uso</Typography>
          </div>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default header
