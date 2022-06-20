import produce from 'immer'
import { Tablas2Action, Tablas2ActionTypes } from '../actions/tablas2Actions'
import { ApiStatus, ITablas2Item } from '../models'

export const initialTablas2State: ITablas2State = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  tablas2: [],
  foundtablas2: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function tablas2Reducer(state: ITablas2State = initialTablas2State, action: Tablas2Action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Tablas2ActionTypes.SEARCH_TABLAS2:
        draft.searchString = action.searchOptions.searchString
        break
      case Tablas2ActionTypes.SEARCHING_TABLAS2:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case Tablas2ActionTypes.SEARCHING_TABLAS2_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case Tablas2ActionTypes.FOUND_TABLAS2:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundtablas2.push(...action.payload.tablas2.docs) : (draft.foundtablas2 = action.payload.tablas2.docs)
        draft.totalDocs = action.payload.tablas2.totalDocs
        break

      case Tablas2ActionTypes.LOAD_TABLAS2:
      case Tablas2ActionTypes.LOADING_TABLAS2:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundtablas2 = []
        break

      case Tablas2ActionTypes.LOADING_TABLAS2_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case Tablas2ActionTypes.LOADED_TABLAS2:
        draft.loadingStatus = ApiStatus.LOADED
        draft.tablas2 = action.payload.tablas2.docs
        draft.totalDocs = action.payload.tablas2.totalDocs
        break

      case Tablas2ActionTypes.ADD_TABLAS2:
      case Tablas2ActionTypes.ADDING_TABLAS2:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case Tablas2ActionTypes.ADDING_TABLAS2_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case Tablas2ActionTypes.ADDED_TABLAS2:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.tablas2.push(action.payload.tablas2.docs[0])
        if (draft.searchString) draft.foundtablas2.push(action.payload.tablas2.docs[0])
        break

      case Tablas2ActionTypes.REMOVE_TABLA2:
        draft.tablas2.splice(
          draft.tablas2.findIndex((tabla2) => tabla2._id === action.payload._id),
          1
        )
        break

      case Tablas2ActionTypes.EDIT_TABLAS2:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.tablas2[draft.tablas2.findIndex((tabla2) => tabla2._id === action.payload._id)] = action.payload
        break

      case Tablas2ActionTypes.EDITED_TABLAS2:
        draft.addingStatus = ApiStatus.LOADED
        draft.tablas2[draft.tablas2.findIndex((tabla2) => tabla2._id === action.payload._id)] = action.payload
        draft.foundtablas2[draft.foundtablas2.findIndex((tabla2) => tabla2._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ITablas2State {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  tablas2: ITablas2Item[]
  foundtablas2: ITablas2Item[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
