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
import { addUsuarios2, editUsuarios2, loadUsuarios2, removeUsuario2, searchUsuarios2 } from '../store/actions/usuarios2Actions'
import { IUsuarios2Item } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Usuarios2: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataUsuarios2 = {
    Nombre: '',
    Apellido: '',
    Email: '',
  }
  const [Usuarios2data, setUsuarios2Data] = React.useState<any>(initialDataUsuarios2)
  const handleUsuarios2Change = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setUsuarios2Data({
      ...Usuarios2data,
      [name]: value,
    })
  }
  const usuarios2Data = useSelector((state: IState) => state.usuarios2)
  const [lang, setlang] = React.useState<any>('en')
  const theme = unmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForUsuarios2 = (event) => {
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
    dispatch(options.searchString ? searchUsuarios2(options) : loadUsuarios2(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogUsuarios2Action, setdialogUsuarios2Action] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchUsuarios2(options) : loadUsuarios2(options))
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
                <Typography variant="h4">Usuario_2 list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Usuario2..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForUsuarios2}
                    />

                    <LocalAddDialog
                      isOpen={dialogUsuarios2Action !== ''}
                      onOpen={() => setdialogUsuarios2Action('add')}
                      onSave={() => setdialogUsuarios2Action('')}
                      onClose={() => setdialogUsuarios2Action('')}
                      action={dialogUsuarios2Action}
                      addOptions={{ title: 'Add Usuario_2', text: 'Enter Usuario_2 data', button: 'Add' }}
                      editOptions={{ title: 'Edit Usuario_2', text: 'Update Usuario_2 data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IUsuarios2Item) => {
                        if (dialogUsuarios2Action === 'delete') {
                          dispatch(removeUsuario2(data))
                        } else {
                          dialogUsuarios2Action === 'add' ? dispatch(addUsuarios2(data)) : dispatch(editUsuarios2(data))
                        }
                      }}
                      color="primary"
                      data={Usuarios2data}
                      initialData={initialDataUsuarios2}
                      setData={setUsuarios2Data}
                      allowMultipleSubmit={dialogUsuarios2Action === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={Usuarios2data.Nombre || ''}
                        onChange={handleUsuarios2Change('Nombre')}
                        error={usuarios2Data?.errField === 'Nombre'}
                        helperText={usuarios2Data?.errField === 'Nombre' && usuarios2Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Apellido"
                        type="text"
                        fullWidth
                        className={'field_Apellido'}
                        variant="standard"
                        value={Usuarios2data.Apellido || ''}
                        onChange={handleUsuarios2Change('Apellido')}
                        error={usuarios2Data?.errField === 'Apellido'}
                        helperText={usuarios2Data?.errField === 'Apellido' && usuarios2Data.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Email"
                        className={'field_Email'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Usuarios2data.Email || ''}
                        onChange={handleUsuarios2Change('Email')}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre', 'Apellido', 'Email', 'Actions']}
                      tableData={usuarios2Data.foundusuarios2.length ? usuarios2Data.foundusuarios2 : (usuarios2Data.usuarios2 as any)}
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

                      <Field value={(fieldData: any) => fieldData.Apellido} />

                      <Field value={(fieldData: any) => fieldData.Email} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setUsuarios2Data(e.element)
                            setdialogUsuarios2Action('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeUsuario2(e.element))
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

export default Usuarios2
