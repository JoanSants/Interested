import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';

import Category from './Category/Category';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../../store/actions/index'

class Categories extends Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidMount() {
        this.props.onFetchCategories();
    }

    render() {
        const { anchorEl } = this.state;

        let categories = <p style={{ textAlign: 'center' }}>Não foi possível obter as categorias!</p>;
        if (this.props.fetchedCategories !== null) {
            categories = this.props.fetchedCategories.map(category => {
                return <Category name={category.name} key={category.name}>{category.name}</Category>;
            });
        }

        return (
            <Aux>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="inherit"
                >
                    Categorias
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {categories}
                </Menu>
            </Aux>
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

