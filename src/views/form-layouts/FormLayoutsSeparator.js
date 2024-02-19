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

import { useTheme } from '@mui/material/styles';
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const theme = useTheme();
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }
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
    <Card>
      
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
        <Grid container spacing={10}>
          <Grid item xs={6} sm={12}>
            <TextField 
               sx={{ width: '50%', marginLeft: '20px',
               '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              }  }}
              required 
              id="outlined-required" 
              label="Project Name" 
              placeholder="Please enter project name.."
              autoComplete="off"
              
            />
          </Grid>
          <Grid item xs={6} sm={12}>
          <TextField 
              sx={{ width: '50%', marginLeft: '20px' ,
              '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              } }}
              required 
              id="outlined-error-helper-text"
              label="Project Description" 
              placeholder="Please enter project description.."
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6} sm={12}>
              <InputLabel id="multi-select-label"
              sx={{ width: '50%', marginLeft: '20px',
              '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              }  }}
              >Select Technologies</InputLabel>
              <Select
                sx={{ width: '50%', marginLeft: '20px' }}
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
                          border: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'rgb(207 207 207 / 87%);'}`, // Chip border color
                        }}
                      />
                    ))}
                  </div>
                )}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
                {/* Add more MenuItem components for additional options */}
              </Select>

          </Grid>
          <Grid item xs={6} sm={12}>
          <TextField 
              sx={{ width: '50%', marginLeft: '20px',
              '& .MuiFormLabel-root': {
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Input label color
              }  }}
              required 
              id="outlined-error-helper-text"
              label="GitHub Repo" 
              placeholder="Enter your GitHub repo URL here.."
              autoComplete="off"
            />
          </Grid>
          
        </Grid>


        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large'
           type='submit' 
           onClick={handleBuildRAG} 
           sx={{ ml: 7 }} 
           variant='contained'
           style={{ backgroundColor: '#0070D2', color: 'white' }}>
            Build RAG
          </Button>
          
        </CardActions>
       
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
