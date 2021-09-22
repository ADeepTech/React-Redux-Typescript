/*
 * Copyright (c) ADeepTech
 * Licensed under the MIT license
 * https://github.com/ADeepTech/React-KanbanBoard-DevOps/blob/master/LICENSE
 * @author AndyNgKM
 */
import { createStore, combineReducers, applyMiddleware, Store } from "redux"
import { persistStore, persistReducer, Persistor } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import cartReducer, { CartState } from "./reducers/cartReducer"
import fakestoreReducer, { FakeStoreState } from "./reducers/fakestoreReducer"

export interface ApplicationState {
    cart: CartState
    fakestore: FakeStoreState
}

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    cart: cartReducer,
    fakestore: fakestoreReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function configureStore(): { store: Store<ApplicationState>, persistor: Persistor } {
    let store = createStore(persistedReducer, {}, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}
