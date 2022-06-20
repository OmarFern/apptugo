import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedUsuarios2,
  addingUsuarios2,
  addingUsuarios2Failed,
  editedUsuarios2,
  editingUsuarios2,
  editingUsuarios2Failed,
  foundUsuarios2,
  loadedUsuarios2,
  loadingUsuarios2,
  loadingUsuarios2Failed,
  removedUsuario2,
  removingUsuario2,
  removingUsuario2Failed,
  searchingUsuarios2,
  searchingUsuarios2Failed,
  Usuarios2Action,
  Usuarios2ActionTypes,
} from '../actions/usuarios2Actions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchUsuarios2Epic: Epic<Usuarios2Action, Usuarios2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Usuarios2ActionTypes.SEARCH_USUARIOS2)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/usuarios2/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundUsuarios2(response.data, action.keep)),
        startWith(searchingUsuarios2()),
        catchError(() => of(searchingUsuarios2Failed()))
      )
    })
  )

const loadUsuarios2Epic: Epic<Usuarios2Action, Usuarios2Action, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(Usuarios2ActionTypes.LOAD_USUARIOS2)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/usuarios2/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedUsuarios2(response.data)),
        startWith(loadingUsuarios2()),
        catchError(() => of(loadingUsuarios2Failed()))
      )
    })
  )
}

const addUsuarios2Epic: Epic<Usuarios2Action, Usuarios2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Usuarios2ActionTypes.ADD_USUARIOS2)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/usuarios2/`, data, config)).pipe(
        map((response) => addedUsuarios2(response.data)),
        startWith(addingUsuarios2()),
        catchError((err) => of(addingUsuarios2Failed(err.response)))
      )
    })
  )

const removeUsuarios2Epic: Epic<Usuarios2Action, Usuarios2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Usuarios2ActionTypes.REMOVE_USUARIO2)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/usuarios2/${action.payload._id}`)).pipe(
        map((response) => removedUsuario2()),
        startWith(removingUsuario2()),
        catchError(() => of(removingUsuario2Failed()))
      )
    )
  )

const editUsuarios2Epic: Epic<Usuarios2Action, Usuarios2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Usuarios2ActionTypes.EDIT_USUARIOS2)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/usuarios2/${action.payload._id}`, data, config)).pipe(
        map((response) => editedUsuarios2(response.data)),
        startWith(editingUsuarios2()),
        catchError(() => of(editingUsuarios2Failed()))
      )
    })
  )

export default combineEpics(searchUsuarios2Epic, loadUsuarios2Epic, addUsuarios2Epic, removeUsuarios2Epic, editUsuarios2Epic)
