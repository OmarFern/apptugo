import produce from 'immer'
import { TurnosAction, TurnosActionTypes } from '../actions/turnosActions'
import { ApiStatus, ITurnosItem } from '../models'

export const initialTurnosState: ITurnosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  turnos: [],
  foundturnos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function turnosReducer(state: ITurnosState = initialTurnosState, action: TurnosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TurnosActionTypes.SEARCH_TURNOS:
        draft.searchString = action.searchOptions.searchString
        break
      case TurnosActionTypes.SEARCHING_TURNOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case TurnosActionTypes.SEARCHING_TURNOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case TurnosActionTypes.FOUND_TURNOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundturnos.push(...action.payload.turnos.docs) : (draft.foundturnos = action.payload.turnos.docs)
        draft.totalDocs = action.payload.turnos.totalDocs
        break

      case TurnosActionTypes.LOAD_TURNOS:
      case TurnosActionTypes.LOADING_TURNOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundturnos = []
        break

      case TurnosActionTypes.LOADING_TURNOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case TurnosActionTypes.LOADED_TURNOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.turnos = action.payload.turnos.docs
        draft.totalDocs = action.payload.turnos.totalDocs
        break

      case TurnosActionTypes.ADD_TURNOS:
      case TurnosActionTypes.ADDING_TURNOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case TurnosActionTypes.ADDING_TURNOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case TurnosActionTypes.ADDED_TURNOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.turnos.push(action.payload.turnos.docs[0])
        if (draft.searchString) draft.foundturnos.push(action.payload.turnos.docs[0])
        break

      case TurnosActionTypes.REMOVE_TURNO:
        draft.turnos.splice(
          draft.turnos.findIndex((turno) => turno._id === action.payload._id),
          1
        )
        break

      case TurnosActionTypes.EDIT_TURNOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.turnos[draft.turnos.findIndex((turno) => turno._id === action.payload._id)] = action.payload
        break

      case TurnosActionTypes.EDITED_TURNOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.turnos[draft.turnos.findIndex((turno) => turno._id === action.payload._id)] = action.payload
        draft.foundturnos[draft.foundturnos.findIndex((turno) => turno._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ITurnosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  turnos: ITurnosItem[]
  foundturnos: ITurnosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
