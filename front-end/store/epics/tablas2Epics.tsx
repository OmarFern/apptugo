import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedTablas2,
  addingTablas2,
  addingTablas2Failed,
  editedTablas2,
  editingTablas2,
  editingTablas2Failed,
  foundTablas2,
  loadedTablas2,
  loadingTablas2,
  loadingTablas2Failed,
  removedTabla2,
  removingTabla2,
  removingTabla2Failed,
  searchingTablas2,
  searchingTablas2Failed,
  Tablas2Action,
  Tablas2ActionTypes,
} from '../actions/tablas2Actions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchTablas2Epic: Epic<Tablas2Action, Tablas2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Tablas2ActionTypes.SEARCH_TABLAS2)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/tablas2/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundTablas2(response.data, action.keep)),
        startWith(searchingTablas2()),
        catchError(() => of(searchingTablas2Failed()))
      )
    })
  )

const loadTablas2Epic: Epic<Tablas2Action, Tablas2Action, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(Tablas2ActionTypes.LOAD_TABLAS2)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/tablas2/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedTablas2(response.data)),
        startWith(loadingTablas2()),
        catchError(() => of(loadingTablas2Failed()))
      )
    })
  )
}

const addTablas2Epic: Epic<Tablas2Action, Tablas2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Tablas2ActionTypes.ADD_TABLAS2)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/tablas2/`, data, config)).pipe(
        map((response) => addedTablas2(response.data)),
        startWith(addingTablas2()),
        catchError((err) => of(addingTablas2Failed(err.response)))
      )
    })
  )

const removeTablas2Epic: Epic<Tablas2Action, Tablas2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Tablas2ActionTypes.REMOVE_TABLA2)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/tablas2/${action.payload._id}`)).pipe(
        map((response) => removedTabla2()),
        startWith(removingTabla2()),
        catchError(() => of(removingTabla2Failed()))
      )
    )
  )

const editTablas2Epic: Epic<Tablas2Action, Tablas2Action, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(Tablas2ActionTypes.EDIT_TABLAS2)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/tablas2/${action.payload._id}`, data, config)).pipe(
        map((response) => editedTablas2(response.data)),
        startWith(editingTablas2()),
        catchError(() => of(editingTablas2Failed()))
      )
    })
  )

export default combineEpics(searchTablas2Epic, loadTablas2Epic, addTablas2Epic, removeTablas2Epic, editTablas2Epic)
