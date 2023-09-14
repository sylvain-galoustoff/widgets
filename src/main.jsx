import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './styles/index.scss'
import WebFont from 'webfontloader'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'

WebFont.load({
	google: {
		families: ['Roboto:300,400,700,900']
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter basename='/widgets'>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</BrowserRouter>
	</React.StrictMode>,
)
