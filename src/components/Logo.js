import React from 'react'
import { Form } from 'react-bootstrap'


const Logo = ({title,href, src,alt}) => {

  return (
    <h2 className="text-center">{title}
      <Form.Text className="text-muted">
        <a href={href} target="_blank" rel="noopener noreferrer"><img src={src} alt={alt} /></a>
      </Form.Text>
    </h2>
  )
}

export default Logo