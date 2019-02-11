import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import axios from '../../../axios';
import * as actions from '../../../store/actions';
import Interest from '../../molecules/Interest';
import Spinner from '../../atoms/Spinner';
import styles from './styles.module.css';
import HeadingPrimary from '../../atoms/Headers/HeadingPrimary';
import MainAdvice from '../../atoms/Advices/MainAdvice';
import InterestPopUp from '../../organisms/InterestPopUp';

class CategoryInterests extends Component {

    state = {
        error: null,
        category: null,
        selectedInterest: null
    }

    componentWillReceiveProps() {
        for (let category in this.props.categories) {
            if (this.props.categories[category].name.toLowerCase() === this.props.match.params.name) {
                this.setState({category: this.props.categories[category]._id });
            }
        }
        this.props.onInitInterests();
    }

    //Show Popup
    InterestPopupHandler(id) {
        return this.setState({selectedInterest:id});
    }

    //Obter Contato com Autenticação
    postContactHandler = (id) => {
        const body = {
            _interest: id
        }
        axios.post('/users/contact', body, {
            headers: {
                "x-auth": this.props.token
            }
        }).then().catch(err => {
            this.setState({ error: err.response.data.error.message })
        })
    }

    render() {
        let selectedCategoryId = null;

        for (let category in this.props.categories) {
            if (this.props.categories[category].name.toLowerCase() === this.props.match.params.name) {
                selectedCategoryId = this.props.categories[category]._id
            }
        }

        let categoryUndefined = null;
        if (selectedCategoryId === null) {
            categoryUndefined = <Redirect to='/' />
        }

        let categoryInterests = Spinner;

        if (this.props.interests && this.props.interests.length > 0) {
            let filteredInterests = this.props.interests.filter(interest => interest._category === selectedCategoryId);
            categoryInterests = filteredInterests.map(interest => {
                if (interest._category === selectedCategoryId) {
                    return <Interest
                        key={interest._id}
                        interestData={{ id: interest._id,name: interest.name, price: interest.price, description: interest.description, urlImage: interest.urlImage }}
                        InterestPopupHandler={(id) => { this.InterestPopupHandler(id)}}
                        error={this.state.error}
                    />
                } else {
                    return null;
                }
            });
        }

        return (
            <Fragment>
                <HeadingPrimary>{this.props.match.params.name}</HeadingPrimary>
                {categoryInterests.length > 0 
                    ?
                    <section className={styles.InterestCategories}>
                        <InterestPopUp id={this.state.selectedInterest}/>
                        {categoryUndefined}
                        {categoryInterests}
                    </section>
                    : 
                    <MainAdvice>Esta categoria não possui interesses</MainAdvice>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        interests: state.interest.interests,
        token: state.auth.token
    }
}

const mapActionsToProps = dispatch => {
    return {
        onInitInterests: () => dispatch(actions.fetchInterests())
    }
}


export default connect(mapStateToProps, mapActionsToProps)(withRouter(CategoryInterests));