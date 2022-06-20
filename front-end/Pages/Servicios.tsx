import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import unmodulescss from 'dist/css/un.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addServicios, editServicios, loadServicios, removeServicio, searchServicios } from '../store/actions/serviciosActions'
import { IServiciosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Servicios: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataServicios = {
    Nombre: '',
    Duracion: '',
  }
  const [Serviciosdata, setServiciosData] = React.useState<any>(initialDataServicios)
  const handleServiciosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setServiciosData({
      ...Serviciosdata,
      [name]: value,
    })
  }
  const serviciosData = useSelector((state: IState) => state.servicios)
  const [lang, setlang] = React.useState<any>('en')
  const theme = unmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForServicios = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchServicios(options) : loadServicios(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogServiciosAction, setdialogServiciosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchServicios(options) : loadServicios(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Servicio list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Servicio..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForServicios}
                    />

                    <LocalAddDialog
                      isOpen={dialogServiciosAction !== ''}
                      onOpen={() => setdialogServiciosAction('add')}
                      onSave={() => setdialogServiciosAction('')}
                      onClose={() => setdialogServiciosAction('')}
                      action={dialogServiciosAction}
                      addOptions={{ title: 'Add Servicio', text: 'Enter Servicio data', button: 'Add' }}
                      editOptions={{ title: 'Edit Servicio', text: 'Update Servicio data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IServiciosItem) => {
                        if (dialogServiciosAction === 'delete') {
                          dispatch(removeServicio(data))
                        } else {
                          dialogServiciosAction === 'add' ? dispatch(addServicios(data)) : dispatch(editServicios(data))
                        }
                      }}
                      color="primary"
                      data={Serviciosdata}
                      initialData={initialDataServicios}
                      setData={setServiciosData}
                      allowMultipleSubmit={dialogServiciosAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={Serviciosdata.Nombre || ''}
                        onChange={handleServiciosChange('Nombre')}
                        error={serviciosData?.errField === 'Nombre'}
                        helperText={serviciosData?.errField === 'Nombre' && serviciosData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Duracion"
                        type="text"
                        fullWidth
                        className={'field_Duracion'}
                        variant="standard"
                        value={Serviciosdata.Duracion || ''}
                        onChange={handleServiciosChange('Duracion')}
                        error={serviciosData?.errField === 'Duracion'}
                        helperText={serviciosData?.errField === 'Duracion' && serviciosData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre', 'Duracion', 'Actions']}
                      tableData={serviciosData.foundservicios.length ? serviciosData.foundservicios : (serviciosData.servicios as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.Nombre} />

                      <Field value={(fieldData: any) => fieldData.Duracion} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setServiciosData(e.element)
                            setdialogServiciosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeServicio(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Servicios
