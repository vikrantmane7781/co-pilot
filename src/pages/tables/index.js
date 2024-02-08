// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
// ** Demo Components Imports

import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import Divider from '@mui/material/Divider'
const MUITable = () => {
  return (
    <Grid container spacing={6}>
      
     
      <Grid item xs={12}>

        <Card>
          <Link href='#'>
          <CardHeader title={`Project Description `} titleTypographyProps={{ variant: 'h6' }} />
          </Link>
          
      <Divider sx={{ margin: 0 }} />
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
