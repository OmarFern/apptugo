import produce from 'immer'
import { Usuarios2Action, Usuarios2ActionTypes } from '../actions/usuarios2Actions'
import { ApiStatus, IUsuarios2Item } from '../models'

export const initialUsuarios2State: IUsuarios2State = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  usuarios2: [],
  foundusuarios2: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function usuarios2Reducer(state: IUsuarios2State = initialUsuarios2State, action: Usuarios2Action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case Usuarios2ActionTypes.SEARCH_USUARIOS2:
        draft.searchString = action.searchOptions.searchString
        break
      case Usuarios2ActionTypes.SEARCHING_USUARIOS2:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case Usuarios2ActionTypes.SEARCHING_USUARIOS2_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case Usuarios2ActionTypes.FOUND_USUARIOS2:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundusuarios2.push(...action.payload.usuarios2.docs) : (draft.foundusuarios2 = action.payload.usuarios2.docs)
        draft.totalDocs = action.payload.usuarios2.totalDocs
        break

      case Usuarios2ActionTypes.LOAD_USUARIOS2:
      case Usuarios2ActionTypes.LOADING_USUARIOS2:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundusuarios2 = []
        break

      case Usuarios2ActionTypes.LOADING_USUARIOS2_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case Usuarios2ActionTypes.LOADED_USUARIOS2:
        draft.loadingStatus = ApiStatus.LOADED
        draft.usuarios2 = action.payload.usuarios2.docs
        draft.totalDocs = action.payload.usuarios2.totalDocs
        break

      case Usuarios2ActionTypes.ADD_USUARIOS2:
      case Usuarios2ActionTypes.ADDING_USUARIOS2:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case Usuarios2ActionTypes.ADDING_USUARIOS2_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case Usuarios2ActionTypes.ADDED_USUARIOS2:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.usuarios2.push(action.payload.usuarios2.docs[0])
        if (draft.searchString) draft.foundusuarios2.push(action.payload.usuarios2.docs[0])
        break

      case Usuarios2ActionTypes.REMOVE_USUARIO2:
        draft.usuarios2.splice(
          draft.usuarios2.findIndex((usuario2) => usuario2._id === action.payload._id),
          1
        )
        break

      case Usuarios2ActionTypes.EDIT_USUARIOS2:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.usuarios2[draft.usuarios2.findIndex((usuario2) => usuario2._id === action.payload._id)] = action.payload
        break

      case Usuarios2ActionTypes.EDITED_USUARIOS2:
        draft.addingStatus = ApiStatus.LOADED
        draft.usuarios2[draft.usuarios2.findIndex((usuario2) => usuario2._id === action.payload._id)] = action.payload
        draft.foundusuarios2[draft.foundusuarios2.findIndex((usuario2) => usuario2._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IUsuarios2State {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  usuarios2: IUsuarios2Item[]
  foundusuarios2: IUsuarios2Item[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
