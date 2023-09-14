import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import widgetsState from '../stores/widgets'

import { Routes, Route } from 'react-router-dom'

import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase'

import Menu from './Menu'
import Header from './header/Header'

import Dashboard from './dashboard/Dashboard'

function App() {

	const setWidgets = useSetRecoilState(widgetsState)

	useEffect(() => {

		onSnapshot(collection(db, 'widgets'),
			snap => {
				let widgetsData = []
				snap.forEach(doc => {

					widgetsData.push(doc.data())

				})
				setWidgets(widgetsData)
			})

	}, [setWidgets])

	return (
		<div>

			<Menu />

			<div id="content">

				<Header />

				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/user/:id" element={<Dashboard />} />
				</Routes>

			</div>

		</div>
	)
}

export default App
