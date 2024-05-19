import setTitle from './setTitle'
import ServerApi from './Classes/ServerApi'
import CloudDashboard from '@/components/CloudDashboard/CloudDashboard'

setTitle('Cloud Dashboard')

new CloudDashboard('body', 'ws://localhost:10000/dashboard', ServerApi)
