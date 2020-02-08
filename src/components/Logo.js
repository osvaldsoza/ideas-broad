import React from 'react'
import PropTypes from 'prop-types'
import {Form} from 'react-bootstrap'


const Logo = ({title, href, src, alt}) => {

    return (
        <h2 className="text-center">{title}
            <Form.Text className="text-muted">
                <a href={href} target="_blank" rel="noopener noreferrer"><img src={src} alt={alt}/></a>
            </Form.Text>
        </h2>
    )
}

Logo.propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string
}
Logo.defaultProps = {
    title: '',
    href: '',
    src: '',
    alt: ''
}
export default Logo