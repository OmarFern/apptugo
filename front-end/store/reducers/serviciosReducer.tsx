import produce from 'immer'
import { ServiciosAction, ServiciosActionTypes } from '../actions/serviciosActions'
import { ApiStatus, IServiciosItem } from '../models'

export const initialServiciosState: IServiciosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  servicios: [],
  foundservicios: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function serviciosReducer(state: IServiciosState = initialServiciosState, action: ServiciosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ServiciosActionTypes.SEARCH_SERVICIOS:
        draft.searchString = action.searchOptions.searchString
        break
      case ServiciosActionTypes.SEARCHING_SERVICIOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ServiciosActionTypes.SEARCHING_SERVICIOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ServiciosActionTypes.FOUND_SERVICIOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundservicios.push(...action.payload.servicios.docs) : (draft.foundservicios = action.payload.servicios.docs)
        draft.totalDocs = action.payload.servicios.totalDocs
        break

      case ServiciosActionTypes.LOAD_SERVICIOS:
      case ServiciosActionTypes.LOADING_SERVICIOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundservicios = []
        break

      case ServiciosActionTypes.LOADING_SERVICIOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ServiciosActionTypes.LOADED_SERVICIOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.servicios = action.payload.servicios.docs
        draft.totalDocs = action.payload.servicios.totalDocs
        break

      case ServiciosActionTypes.ADD_SERVICIOS:
      case ServiciosActionTypes.ADDING_SERVICIOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ServiciosActionTypes.ADDING_SERVICIOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ServiciosActionTypes.ADDED_SERVICIOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.servicios.push(action.payload.servicios.docs[0])
        if (draft.searchString) draft.foundservicios.push(action.payload.servicios.docs[0])
        break

      case ServiciosActionTypes.REMOVE_SERVICIO:
        draft.servicios.splice(
          draft.servicios.findIndex((servicio) => servicio._id === action.payload._id),
          1
        )
        break

      case ServiciosActionTypes.EDIT_SERVICIOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.servicios[draft.servicios.findIndex((servicio) => servicio._id === action.payload._id)] = action.payload
        break

      case ServiciosActionTypes.EDITED_SERVICIOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.servicios[draft.servicios.findIndex((servicio) => servicio._id === action.payload._id)] = action.payload
        draft.foundservicios[draft.foundservicios.findIndex((servicio) => servicio._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IServiciosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  servicios: IServiciosItem[]
  foundservicios: IServiciosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
