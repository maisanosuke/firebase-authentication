import React from 'react'
import Alert from 'react-bootstrap/Alert';

function Flash({variant, message}) {
  return (
      <Alert variant={variant}>
          {message}
      </Alert>
  )
}

export default Flash
