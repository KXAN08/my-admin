import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import { QueryProvider } from './query/QueryProvider.jsx'


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryProvider>
			<Toaster position='top-right' reverseOrder={false} />
			<App />
		</QueryProvider>
	</StrictMode>
)
