import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../../atoms/Category';
import Spinner from '../../atoms/Spinner';
import styles from './styles.module.css';
import * as actions from '../../../store/actions/index'

class Categories extends Component {

    componentDidMount() {
        this.props.onFetchCategories();
    }

    render() {
        let categories = <Spinner/>

        if (this.props.fetchedCategories !== null) {
            categories = this.props.fetchedCategories.map(category => {
                return <Category name={category.name} key={category.name}>{category.name}</Category>;
            });
        }

        return (
                <ul className={styles.CategoryContainer}>
                    {categories}
                </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchedCategories: state.category.categories
    }
}

const mapActionsToProps = dispatch => {
    return {
        onFetchCategories: () => dispatch(actions.fetchCategories())
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Categories);