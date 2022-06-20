import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedTurnos,
  addingTurnos,
  addingTurnosFailed,
  editedTurnos,
  editingTurnos,
  editingTurnosFailed,
  foundTurnos,
  loadedTurnos,
  loadingTurnos,
  loadingTurnosFailed,
  removedTurno,
  removingTurno,
  removingTurnoFailed,
  searchingTurnos,
  searchingTurnosFailed,
  TurnosAction,
  TurnosActionTypes,
} from '../actions/turnosActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchTurnosEpic: Epic<TurnosAction, TurnosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TurnosActionTypes.SEARCH_TURNOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/turnos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundTurnos(response.data, action.keep)),
        startWith(searchingTurnos()),
        catchError(() => of(searchingTurnosFailed()))
      )
    })
  )

const loadTurnosEpic: Epic<TurnosAction, TurnosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(TurnosActionTypes.LOAD_TURNOS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/turnos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedTurnos(response.data)),
        startWith(loadingTurnos()),
        catchError(() => of(loadingTurnosFailed()))
      )
    })
  )
}

const addTurnosEpic: Epic<TurnosAction, TurnosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TurnosActionTypes.ADD_TURNOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/turnos/`, data, config)).pipe(
        map((response) => addedTurnos(response.data)),
        startWith(addingTurnos()),
        catchError((err) => of(addingTurnosFailed(err.response)))
      )
    })
  )

const removeTurnosEpic: Epic<TurnosAction, TurnosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TurnosActionTypes.REMOVE_TURNO)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/turnos/${action.payload._id}`)).pipe(
        map((response) => removedTurno()),
        startWith(removingTurno()),
        catchError(() => of(removingTurnoFailed()))
      )
    )
  )

const editTurnosEpic: Epic<TurnosAction, TurnosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TurnosActionTypes.EDIT_TURNOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/turnos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedTurnos(response.data)),
        startWith(editingTurnos()),
        catchError(() => of(editingTurnosFailed()))
      )
    })
  )

export default combineEpics(searchTurnosEpic, loadTurnosEpic, addTurnosEpic, removeTurnosEpic, editTurnosEpic)
