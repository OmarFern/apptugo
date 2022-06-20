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
import FileUpload from '../components/FileUpload/FileUpload'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addTablas2, editTablas2, loadTablas2, removeTabla2, searchTablas2 } from '../store/actions/tablas2Actions'
import { ITablas2Item } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Tablas2: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataTablas2 = {
    Nombre: '',
    Descripcion: '',
    imagen: '',
  }
  const [Tablas2data, setTablas2Data] = React.useState<any>(initialDataTablas2)
  const handleTablas2Change = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setTablas2Data({
      ...Tablas2data,
      [name]: value,
    })
  }
  const tablas2Data = useSelector((state: IState) => state.tablas2)
  const [lang, setlang] = React.useState<any>('en')
  const theme = unmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForTablas2 = (event) => {
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
    dispatch(options.searchString ? searchTablas2(options) : loadTablas2(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogTablas2Action, setdialogTablas2Action] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchTablas2(options) : loadTablas2(options))
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
                <Typography variant="h4">Tabla_2 list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Tabla2..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForTablas2}
                    />

                    <LocalAddDialog
                      isOpen={dialogTablas2Action !== ''}
                      onOpen={() => setdialogTablas2Action('add')}
                      onSave={() => setdialogTablas2Action('')}
                      onClose={() => setdialogTablas2Action('')}
                      action={dialogTablas2Action}
                      addOptions={{ title: 'Add Tabla_2', text: 'Enter Tabla_2 data', button: 'Add' }}
                      editOptions={{ title: 'Edit Tabla_2', text: 'Update Tabla_2 data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ITablas2Item) => {
                        if (dialogTablas2Action === 'delete') {
                          dispatch(removeTabla2(data))
                        } else {
                          dialogTablas2Action === 'add' ? dispatch(addTablas2(data)) : dispatch(editTablas2(data))
                        }
                      }}
                      color="primary"
                      data={Tablas2data}
                      initialData={initialDataTablas2}
                      setData={setTablas2Data}
                      allowMultipleSubmit={dialogTablas2Action === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={Tablas2data.Nombre || ''}
                        onChange={handleTablas2Change('Nombre')}
                        error={tablas2Data?.errField === 'Nombre'}
                        helperText={tablas2Data?.errField === 'Nombre' && tablas2Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Descripcion"
                        type="text"
                        fullWidth
                        multiline
                        className={'field_Descripcion'}
                        variant="standard"
                        value={Tablas2data.Descripcion}
                        onChange={handleTablas2Change('Descripcion')}
                      />

                      <FileUpload label="imagen" value={Tablas2data.imagen} onChange={handleTablas2Change('imagen')} variant="standard" />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre', 'Descripcion', 'imagen', 'Actions']}
                      tableData={tablas2Data.foundtablas2.length ? tablas2Data.foundtablas2 : (tablas2Data.tablas2 as any)}
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

                      <Field value={(fieldData: any) => fieldData.Descripcion} />

                      <Field value={(fieldData: any) => (fieldData.imagen ? <img src={`/img/${fieldData.imagen}`} /> : <div />)} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setTablas2Data(e.element)
                            setdialogTablas2Action('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeTabla2(e.element))
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

export default Tablas2
