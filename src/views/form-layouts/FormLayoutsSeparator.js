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


const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
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

  return (
    <Card>
      <CardHeader title=' ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
        <Grid container spacing={10}>
          <Grid item xs={6} sm={12}>
            <TextField 
               sx={{ width: '50%', marginLeft: '20px' }}
              required 
              id="outlined-required" 
              label="Project Name" 
              placeholder="Please enter project name.."
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6} sm={12}>
          <TextField 
              sx={{ width: '50%', marginLeft: '20px' }}
              required 
              id="outlined-error-helper-text"
              label="Project Description" 
              placeholder="Please enter project description.."
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6} sm={12}>
              <InputLabel id="multi-select-label"
              sx={{ width: '50%', marginLeft: '20px' }}
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
              sx={{ width: '50%', marginLeft: '20px' }}
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
          <Button size='large' type='submit' sx={{ ml: 7 }} variant='contained'>
            Build RAG
          </Button>
          
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
