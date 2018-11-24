import React, { Component } from 'react';
import axios from '../../../axios';
import { Dropdown, Button } from 'react-materialize';

import Category from './Category/Category';

class Categories extends Component {

    state = {
        categories: [],
        error: false
    }

    componentDidMount() {
        axios.get( '/categories' )
            .then( response => {
                const categories = response.data.categories;
                this.setState({categories: categories});
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    render() {
        let categories = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;

        if (!this.state.error) {
            categories = this.state.categories.map(category => {
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

export default Categories;