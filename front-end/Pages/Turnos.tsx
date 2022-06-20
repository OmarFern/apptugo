import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import unmodulescss from 'dist/css/un.module.scss'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addTurnos, editTurnos, loadTurnos, removeTurno, searchTurnos } from '../store/actions/turnosActions'
import { ITurnosItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Turnos: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataTurnos = {
    Nombre: '',
    Fecha: '',
    Servicio: null,
  }
  const [Turnosdata, setTurnosData] = React.useState<any>(initialDataTurnos)
  const handleTurnosChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setTurnosData({
      ...Turnosdata,
      [name]: value,
    })
  }
  const turnosData = useSelector((state: IState) => state.turnos)
  const [lang, setlang] = React.useState<any>('en')
  const theme = unmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForTurnos = (event) => {
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
    dispatch(options.searchString ? searchTurnos(options) : loadTurnos(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogTurnosAction, setdialogTurnosAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const serviciosAutocompleteData = useSelector((state: IState) => state.servicios)
  const [ServicioOptions, setServicioOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchServicioServicios = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'Nombre', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/servicios/search/', { params: searchOptions }).then((result) => {
      setServicioOptions(
        result.data.docs.map((servicio) => {
          return { label: servicio.Nombre, value: servicio._id }
        })
      )
    })
  }
  const [ServicioValue, setServicioValue] = React.useState(null)
  React.useEffect(() => {
    if (!Turnosdata.Servicio) return undefined
    const asArray = Array.isArray(Turnosdata.Servicio) ? Turnosdata.Servicio : [Turnosdata.Servicio]
    setServicioValue(asArray.map((item) => ({ label: item.Nombre, value: item._id })))
  }, [Turnosdata.Servicio])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchTurnos(options) : loadTurnos(options))
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
                <Typography variant="h4">Turno list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Turno..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForTurnos}
                    />

                    <LocalAddDialog
                      isOpen={dialogTurnosAction !== ''}
                      onOpen={() => setdialogTurnosAction('add')}
                      onSave={() => setdialogTurnosAction('')}
                      onClose={() => setdialogTurnosAction('')}
                      action={dialogTurnosAction}
                      addOptions={{ title: 'Add Turno', text: 'Enter Turno data', button: 'Add' }}
                      editOptions={{ title: 'Edit Turno', text: 'Update Turno data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ITurnosItem) => {
                        if (dialogTurnosAction === 'delete') {
                          dispatch(removeTurno(data))
                        } else {
                          dialogTurnosAction === 'add' ? dispatch(addTurnos(data)) : dispatch(editTurnos(data))
                        }
                      }}
                      color="primary"
                      data={Turnosdata}
                      initialData={initialDataTurnos}
                      setData={setTurnosData}
                      allowMultipleSubmit={dialogTurnosAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={Turnosdata.Nombre || ''}
                        onChange={handleTurnosChange('Nombre')}
                        error={turnosData?.errField === 'Nombre'}
                        helperText={turnosData?.errField === 'Nombre' && turnosData.errMessage}
                      />

                      <TextField
                        label="Fecha"
                        type="datetime-local"
                        fullWidth
                        step="900"
                        value={
                          Turnosdata.Fecha
                            ? new Date(
                                new Date(Turnosdata.Fecha).setMinutes(new Date(Turnosdata.Fecha).getMinutes() - new Date().getTimezoneOffset())
                              )
                                .toISOString()
                                .slice(0, 16)
                            : ''
                        }
                        onChange={handleTurnosChange('Fecha')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <Autocomplete
                        value={ServicioValue}
                        onType={typeInSearchServicioServicios}
                        onChange={(newValue) =>
                          handleTurnosChange('Servicio')(
                            newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, Nombre: item.label })) : []
                          )
                        }
                        loading={serviciosAutocompleteData.loadingStatus === 'loading'}
                        options={ServicioOptions}
                        label="Servicio"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre', 'Fecha', 'Servicio', 'Actions']}
                      tableData={turnosData.foundturnos.length ? turnosData.foundturnos : (turnosData.turnos as any)}
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

                      <Field value={(fieldData: any) => moment(fieldData.Fecha).format('')} />

                      <Field value={(fieldData: any) => (fieldData.Servicio ? fieldData.Servicio.Nombre : '')} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setTurnosData(e.element)
                            setdialogTurnosAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeTurno(e.element))
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

export default Turnos
