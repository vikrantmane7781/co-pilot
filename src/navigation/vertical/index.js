// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

const navigation = () => {
  return [
    {
      sectionTitle: ' '
    },
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/'
    },
    {
      icon: CubeOutline,
      title: 'RAG',
      path: '/form-layouts'
    },
    {
      title: 'Project Details',
      icon: Table,
      path: '/tables'
    },
    {
      title: 'Chat Bot',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
  ]
}

export default navigation
