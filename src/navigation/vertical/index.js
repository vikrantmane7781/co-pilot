// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/Home'
import Pdetails from 'mdi-material-ui/NoteEditOutline';
import RobotIcon from 'mdi-material-ui/Robot';
const navigation = () => {
  return [
    {
      sectionTitle: ' '
    },
    
    {
      icon: CubeOutline,
      title: 'Create Project',
      path: '/form-layouts'
    },
    {
      title: 'Project Details',
      icon: Pdetails,
      path: '/tables'
    },
    {
      title: 'Chat Bot',
      icon: RobotIcon,
      path: '/account-settings'
    },
  ]
}

export default navigation
