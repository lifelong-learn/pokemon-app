import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';

import useStyles from '../styles';

const PokemonCard = (props) => {
  const classes = useStyles();
  const { pokemon, history } = props;
  const { id, name, sprite } = pokemon;
  return (
    <Grid item xs={12} sm={4}>
      <Card
        className={classes.card}
        onClick={() => history.push(`/${id}`)}
      >
        {/* <CardMedia
          className={classes.cardMedia}
          image={sprite}
          title={name}
        /> */}
        <CardContent>
          <Typography variant="subtitle1" align="center">{`${id}. ${name.toUpperCase()}`}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

};

export { PokemonCard as default }