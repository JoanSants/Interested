import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
        margin:'20px',
        backgroundColor:'#eee'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

const key = props => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <p>Nome: {props.name}</p>
                    <p>Valor: {props.price}</p>
                    <p>Quantidade: {props.quantity}</p>
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => props.buyKey(props.id)}>Comprar Chave</Button>
            </CardActions>
        </Card>
    )
}

export default withStyles(styles)(key);
