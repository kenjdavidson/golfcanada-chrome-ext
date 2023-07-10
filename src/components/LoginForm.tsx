import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface LoginFormProps {
  onLogin?: (username: string, password: string) => void,
  validations?: string[]
}

export const LoginForm = ({
  onLogin,
  validations
}: LoginFormProps): ReactElement => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[] | undefined>(validations)

  const isLoginDisabled = (): boolean => !username || !password;
  const performLogin = () => onLogin && !!username && !!password && onLogin(username, password);
  const performClear = () => {
    setUsername('');
    setPassword('');
  }

  return (
    <Stack 
      direction='column' 
      spacing={2}>
      <TextField 
        id='golf-canada-username' 
        label='Username' 
        aria-label='enter golf canada username'
        size='small' 
        margin="dense" 
        fullWidth 
        required          
        value={username} 
        onChange={event => setUsername(event.target.value)}
        inputProps={{
          'data-testid': 'testUsername'
        }} />
      <FormControl 
        variant="outlined"
        size='small'>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={ () => setShowPassword(!showPassword) }
                onMouseDown={ () => setShowPassword(!showPassword) }
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          aria-label='enter golf canada password'
          required          
          value={password} 
          onChange={event => setPassword(event.target.value)}
          inputProps={{
            'data-testid': 'testPassword'
          }} 
        />
      </FormControl>                
      <Stack
        direction='row'
        spacing={2}>
        <Button
          variant='contained'
          disabled={isLoginDisabled()}
          onClick={performLogin}>
            Login          
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={performClear}>
            Clear
        </Button>
      </Stack>
      {
        errors && errors?.map((error) => (
          <Alert key={error} severity='error'>{error}</Alert>
        ))
      }
    </Stack>
  )
}