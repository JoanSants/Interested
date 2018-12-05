import React from 'react';
import { Card, Button } from 'react-materialize'

const contact = props => {
    return (
        <Card
            className='blue-grey darken-1'
            textClassName='white-text'
            title={props.name}
            actions={[<Button onClick={() => { props.fetchConcact(props.id) }}>Ver contato</Button>]}>
        </Card>
    )
}

export default contact;