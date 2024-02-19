// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress'; // Import LinearProgress
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer'
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})


const StickyHeaderCard = styled(Card)({
  overflowY: 'auto',
  position: 'relative',
});

const StickyHeader = styled(CardHeader)({
  position: 'sticky',
  top: 0,
  zIndex: 1000, // Adjust the z-index as needed
 
});

const StickyTableCell = styled(TableCell)({
  position: 'sticky',
  left: 0,
  zIndex: 1000, // Adjust the z-index as needed
 
});
const TechBox = styled(Box)({
  display: 'inline-block',
  padding: '4px 8px', // Adjust padding as needed
  marginRight: '8px', // Adjust margin as needed
  border: '1px solid #ccc', // Add border
  borderRadius: '4px', // Add border radius
});
const FormLayoutsSeparator = () => {
  
  const theme = useTheme();
  // ** States
  const rows = [
    { id: "Internet Banking Application",  name: ['Java','python','typescript'], age: 30, city: 'New York' },
    { id: "Road Detection System", name: ['Java','python','typescript'], age: 25, city: 'Los Angeles' },
    { id: "Event Management",  name: ['Java','python','typescript'] , age: 40, city: 'Chicago' },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleRemoveOption = (option) => () => {
    const filteredOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
    setSelectedOptions(filteredOptions);
  };

  const handleChipClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the Select component
  };

  const [loading, setLoading] = useState(false); // Step 2

  const handleBuildRAG = () => {
    setLoading(true); // Step 3

    // Simulate asynchronous operation (e.g., API request) for a few seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
 
    <>
    <Card sx={{padding:'25px'}}>
      
      <CardHeader title={loading? `Creating Project please wait`:`New Project`} titleTypographyProps={{ variant: 'h6' }}sx={{ marginLeft: '20px' }}/>
        {
          loading?(
            <Box sx={{ width: '100%' }}>
        <LinearProgress />
        </Box>
          ):(null)
        }
        <Divider sx={{ margin: 0 }} />
      
      <form onSubmit={e => e.preventDefault()}>
        <CardContent style={{ filter: loading ? 'blur(4px)' : 'none' }}>
        <Grid container spacing={7}>
          <Grid item xs={6} sm={12}>
            <TextField 
               sx={{ width: '90%', marginLeft: '20px',
               '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              },
              '& .MuiInputLabel-asterisk': {
                color: 'red', // Change the color of the asterisk here
              }  
            }}
              required 
              id="outlined-required" 
              label="Project Name" 
              placeholder="Please enter project name.."
              autoComplete="off"
              
            />
          </Grid>
          <Grid item xs={6} sm={12}>
          <TextField 
              sx={{ width: '90%', marginLeft: '20px' ,
              '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              },
              '& .MuiInputLabel-asterisk': {
                color: 'red', // Change the color of the asterisk here
              }
             }}
              required 
              id="outlined-error-helper-text"
              label="Project Description" 
              placeholder="Please enter project description.."
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6} sm={12}>
              <InputLabel id="multi-select-label"
              sx={{ width: '90%', marginLeft: '20px',
              '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              } ,
              
             }}
              >Select Technologies<span style={{ color: 'red' }}>*</span></InputLabel>
              <Select
                sx={{ width: '90%', marginLeft: '20px' }}
                labelId="multi-select-label"
                id="multi-select"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Select multiple options' }}
                renderValue={(selected) => (
                  <div>
                    {selected.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onDelete={handleRemoveOption(option)}
                        onMouseDown={handleChipClick} // Prevent the select box from opening when clicking on the chip button
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'white' : 'black', // Chip label color
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgb(207 207 207 / 17%);' : 'white', // Chip background color
                          border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'rgb(207 207 207 / 87%);'}`, // Chip border color,
                          fontSize: '0.9rem',
                        }}
                      />
                    ))}
                  </div>
                )}
              >
                <MenuItem value="option1">Java</MenuItem>
                <MenuItem value="option2">Python</MenuItem>
                <MenuItem value="option3">C++</MenuItem>
                {/* Add more MenuItem components for additional options */}
              </Select>

          </Grid>
          <Grid item xs={6} sm={12}>
          <TextField 
              sx={{ width: '90%', marginLeft: '20px',
              '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              },
              '& .MuiInputLabel-asterisk': {
                color: 'red', // Change the color of the asterisk here
              }
              }}
              required 
              id="outlined-error-helper-text"
              label="GitHub Repo" 
              placeholder="Enter your GitHub repo URL here.."
              autoComplete="off"
            />
          </Grid>
          
        </Grid>

        <CardActions>
          <Button size='large'
           type='submit' 
           onClick={handleBuildRAG} 
           sx={{ ml: 0 }} 
           variant='contained'
           style={{ backgroundColor: '#0070D2', color: 'white' }}>
            Build RAG
          </Button>
          
        </CardActions>
        </CardContent>
      
      </form>
     
    </Card>
    
    <StickyHeaderCard sx={{mt:2,height: '50vh',overflowY: 'auto',padding:'25px'}}>
      
     <StickyHeader title="Recent created projects.." titleTypographyProps={{ variant: 'h6' }}sx={{ marginLeft: '20px' }}/>
     <Divider sx={{ margin: 0 }} />
     <TableContainer component={Paper} sx={{ paddingLeft: '25px', paddingRight: '25px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#0070D2',fontSize: '15px !important', fontWeight: 'bold',width: '450px' }}>Project Name & Description</TableCell>
            <TableCell sx={{ color: '#0070D2',fontSize: '15px !important', fontWeight: 'bold' }}>Technologies</TableCell>
            <TableCell sx={{ color: '#0070D2',fontSize: '15px !important', fontWeight: 'bold' ,width: '150px', whiteSpace: 'nowrap'}}>Created On</TableCell>
            <TableCell sx={{ color: '#0070D2',fontSize: '15px !important', fontWeight: 'bold' ,width: '150px', whiteSpace: 'nowrap'}}>Created By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <StickyTableCell style={{ color: '#0070D2', fontSize: '14px' }}>{row.id}</StickyTableCell>
              <TableCell>
                  <TechBox>
                    {row.name.join(' | ')}
                  </TechBox>
                </TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </StickyHeaderCard>
    </>
     
  )
}

export default FormLayoutsSeparator
