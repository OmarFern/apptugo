import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedServicios,
  addingServicios,
  addingServiciosFailed,
  editedServicios,
  editingServicios,
  editingServiciosFailed,
  foundServicios,
  loadedServicios,
  loadingServicios,
  loadingServiciosFailed,
  removedServicio,
  removingServicio,
  removingServicioFailed,
  searchingServicios,
  searchingServiciosFailed,
  ServiciosAction,
  ServiciosActionTypes,
} from '../actions/serviciosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchServiciosEpic: Epic<ServiciosAction, ServiciosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ServiciosActionTypes.SEARCH_SERVICIOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/servicios/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundServicios(response.data, action.keep)),
        startWith(searchingServicios()),
        catchError(() => of(searchingServiciosFailed()))
      )
    })
  )

const loadServiciosEpic: Epic<ServiciosAction, ServiciosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ServiciosActionTypes.LOAD_SERVICIOS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/servicios/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedServicios(response.data)),
        startWith(loadingServicios()),
        catchError(() => of(loadingServiciosFailed()))
      )
    })
  )
}

const addServiciosEpic: Epic<ServiciosAction, ServiciosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ServiciosActionTypes.ADD_SERVICIOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/servicios/`, data, config)).pipe(
        map((response) => addedServicios(response.data)),
        startWith(addingServicios()),
        catchError((err) => of(addingServiciosFailed(err.response)))
      )
    })
  )

const removeServiciosEpic: Epic<ServiciosAction, ServiciosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ServiciosActionTypes.REMOVE_SERVICIO)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/servicios/${action.payload._id}`)).pipe(
        map((response) => removedServicio()),
        startWith(removingServicio()),
        catchError(() => of(removingServicioFailed()))
      )
    )
  )

const editServiciosEpic: Epic<ServiciosAction, ServiciosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ServiciosActionTypes.EDIT_SERVICIOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/servicios/${action.payload._id}`, data, config)).pipe(
        map((response) => editedServicios(response.data)),
        startWith(editingServicios()),
        catchError(() => of(editingServiciosFailed()))
      )
    })
  )

export default combineEpics(searchServiciosEpic, loadServiciosEpic, addServiciosEpic, removeServiciosEpic, editServiciosEpic)
