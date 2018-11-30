import React, { Component } from 'react';
import { Dropdown, Button } from 'react-materialize';
import { connect } from 'react-redux';

import Category from './Category/Category';
import * as actions from '../../../store/actions/index'

class Categories extends Component {

    componentDidMount(){
        this.props.onFetchCategories();
    }

    render() {

        let categories = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if(this.props.fetchedCategories !== null){
            categories = this.props.fetchedCategories.map(category => {
                return <Category name={category.name} key={category.name}>{category.name}</Category>;
            });
        }

        return (
            <Dropdown trigger={
                <Button>Categorias</Button>
            }>
                {categories}
            </Dropdown>
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