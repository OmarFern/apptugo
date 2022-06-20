import blue from '@mui/material/colors/blue'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import unmodulescss from 'dist/css/un.module.scss'
import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: blue,
  },
})

const paguina1: FunctionComponent = (props: any) => {
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
      <ThemeProvider theme={aptugotheme}>
        <div>
          <Typography variant="h2">
            <div title="div">
              <Typography variant="h4">texto1</Typography>
            </div>
          </Typography>

          <Grid item className={theme.contenedor_padre6}>
            <Grid item className={theme.contenedor_hijo}>
              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>
            </Grid>

            <Grid item className={theme.contenedor_hijo}>
              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>

              <div title="div">
                <Typography variant="h4">texto1</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>

      <Grid item className={theme.contenedor_padre3}>
        <div title="div">
          <Typography variant="h4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore incidunt, non, ut eveniet voluptate, o</Typography>
        </div>

        <div title="div">
          <Typography variant="h4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore incidunt, non, ut eveniet voluptate,</Typography>
        </div>

        <div title="div">
          <Typography variant="h4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore incidunt, non, ut eveniet voluptate,</Typography>
        </div>
      </Grid>
    </React.Fragment>
  )
}

export default paguina1
