import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Interest from '../../../components/Interest/Interest';

class MyInterests extends Component {
    render() {
        let myInterests;

        if (this.props.myInterests !== null && this.props.myInterests.length > 0) {
            myInterests = this.props.myInterests.map(interest => {
                return <Interest
                    key={interest._id}
                    name={interest.name}
                    price={interest.price}
                    description={interest.description}
                    myInterest={true}
                />
            });
        }

        if(this.props.myInterests !== null && this.props.myInterests.length === 0){
            myInterests = <h4>Você não possui interesses :(</h4>
        }

        return (
            <Aux>
                {myInterests}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        myInterests: state.auth.user.interests,
    }
}

export default connect(mapStateToProps, null)(MyInterests);