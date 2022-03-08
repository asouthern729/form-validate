const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small') /* finds child element */ 
  small.innerText = message
}

// Show success green outline
const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// Check if email is valid
const checkEmail = (input) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(re.test(input.value)) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach(input => {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
const checkLength = (input, min, max) => {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input)
  }
}

// Check for matching passwords
const checkPassword = (input, input2) => {
  if(input.value !== input2.value) {
    showError(input2, 'Passwords do not match')
    showError(input, '')
  } else {
    showSuccess(input, input2)
  }
}

// Get field name
const getFieldName = (input) => {
  return input.id.substr(0, 1).toUpperCase() + input.id.substr(1)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPassword(password, password2)
})