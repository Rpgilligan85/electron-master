import AppHome from './components/AppHome'
import AppPreview from './components/AppPreview'

export const routes = [
	{ path: '', component: AppHome },
	{ path: '/preview/:index', component: AppPreview, props: true },
]