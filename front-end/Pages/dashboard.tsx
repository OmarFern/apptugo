import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import unmodulescss from 'dist/css/un.module.scss'
import React, { FunctionComponent } from 'react'
import Carousel from 'react-material-ui-carousel'
import { NavLink } from 'react-router-dom'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const theme = unmodulescss

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <Container maxWidth={false}></Container>

      <AppBar elevation={0} position="relative" title="">
        <Toolbar>
          <div title="div">
            <Button color="inherit">
              <NavLink to="/">HOME</NavLink>
            </Button>
          </div>

          <div title="div">
            <Button color="inherit">
              <NavLink to="/header">HEADER</NavLink>
            </Button>
          </div>

          <div title="div">
            <Button color="inherit">
              <NavLink to="/paguina_1">TABLAS</NavLink>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div title="divCarrucel">
        <Carousel>
          <picture>
            <img src="/img/banner2.jpg" alt="/img/banner2.jpg" width="100%" />
          </picture>

          <picture>
            <img src="/img/banner3.jpg" alt="/img/banner3.jpg" width="100%" />
          </picture>
        </Carousel>
      </div>

      <Container disableGutters maxWidth={false}>
        <Grid container alignItems="center" justifyContent="space-around" spacing={4}>
          <Grid item>
            <picture>
              <img src="/img/1.jpg" alt="/img/1.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/2.jpg" alt="/img/2.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/3.jpg" alt="/img/3.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/4.jpg" alt="/img/4.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/5.jpg" alt="/img/5.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/6.jpg" alt="/img/6.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/9.jpg" alt="/img/9.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/7.jpg" alt="/img/7.jpg" width="480" height="334" />
            </picture>
          </Grid>

          <Grid item>
            <picture>
              <img src="/img/10.jpg" alt="/img/10.jpg" width="480" height="334" />
            </picture>
          </Grid>
        </Grid>
      </Container>

      <div title="div foother">
        <div title="div">
          <List></List>
          <picture>
            <img src="/img/banner5.jpg" alt="/img/banner5.jpg" width="100%" />
          </picture>
        </div>
      </div>

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

export default Dashboard
