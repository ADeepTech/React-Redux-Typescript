import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { render, screen } from '@testing-library/react';
import "./index.css"
import App from "./App"
import { configureStore } from "./store/store"

const { store, persistor } = configureStore()

test('Render App Test', () => {
  render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>);
  const linkElement = screen.getAllByText(/Products/i);
  expect(linkElement[0]).toBeInTheDocument();
});
