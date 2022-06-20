import { combineReducers } from 'redux'
import tablas2Reducer, { initialTablas2State, ITablas2State } from './tablas2Reducer'
import usuarios2Reducer, { initialUsuarios2State, IUsuarios2State } from './usuarios2Reducer'

export interface IState {
  tablas2: ITablas2State
  usuarios2: IUsuarios2State
}

export const initialState: IState = {
  tablas2: initialTablas2State,
  usuarios2: initialUsuarios2State,
}

export default combineReducers({
  tablas2: tablas2Reducer,
  usuarios2: usuarios2Reducer,
})
