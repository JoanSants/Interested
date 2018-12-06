import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import axios from '../../axios';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Interest from '../../components/Interest/Interest';
import Spinner from '../../components/UI/Spinner//Spinner';

class Categories extends Component {

    componentDidMount() {
        this.props.onInitInterests();
    }

    postContactHandler = (id) => {
        const body = {
            _interest:id
        }
        axios.post('/users/contact', body, {headers:{
            "x-auth":this.props.token
        }})
    }

    render() {
        let selectedCategoryId = null;
        for (let category in this.props.categories) {
            if (this.props.categories[category].name.toLowerCase() === this.props.match.params.name) {
                selectedCategoryId = this.props.categories[category]._id
            }
        }

        let categoryUndefined = null;
        if(selectedCategoryId === null){
            categoryUndefined = <Redirect to='/'/>
        }

        let categoryInterests = Spinner;

        if (this.props.interests) {

            categoryInterests = this.props.interests.map(interest => {
                if (interest._category === selectedCategoryId) {
                    return <Interest
                        key={interest._id}
                        id={interest._id}
                        name={interest.name}
                        interestImage={interest.image}
                        price={interest.price}
                        description={interest.description}
                        postContactHandler={(id) => {this.postContactHandler(id)}}
                    />
                }else{
                    return null;
                }
            });

            const filteredInterests = categoryInterests.filter(interest => {
                return interest !== null;
            })

            categoryInterests = filteredInterests;
        }

        return (
            <Aux>
                {categoryUndefined}
                <h4>{categoryInterests.length === 0 ? 'Esta categoria não possui interesses :(' : categoryInterests}</h4>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        interests: state.interest.interests
    }
}

const mapActionsToProps = dispatch => {
    return {
        onInitInterests: () => dispatch(actions.fetchInterests())
    }
}


export default connect(mapStateToProps, mapActionsToProps)(Categories);