import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import "./styles/global.css" 
import "./App.css";
import "./components/Buttons/Button.css"
import "./components/DashboardCards/Cards.css"
import "./components/DataTable/Table.css"
import "./components/Layout/Layout.css"
import "./components/Modals/Modal.css"
import "./components/Pagination.css"
import "./components/SearchBar/SearchBar.css"
import "./pages/Pages.css"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)