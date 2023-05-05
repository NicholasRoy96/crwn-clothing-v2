import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)
      const { user } = response
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch(e) {
      console.error(e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  return (
    <div className='sign-up-container'>
      <h2>
        Don't have an account?
      </h2>
      <form onSubmit={handleSubmit}>
        
        <FormInput label="Display Name" onChange={handleChange} name='displayName' type="text" value={displayName} required />

        <FormInput label="Email" onChange={handleChange} name='email' type="email" value={email} required />

        <FormInput label="Password" onChange={handleChange} name='password' type="password" value={password} required />

        <FormInput label="Confirm Password" onChange={handleChange} name='confirmPassword' type="password" value={confirmPassword} required />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm