import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';

import useStyles from '../styles';

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const classes = useStyles();
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_POKEMON_DATA_API + pokemonId)
      .then(response => response.data)
      .then(data => {
        const pokemonData = {
          ...data,
          fullImageUrl: process.env.REACT_APP_POKEMON_IMAGE_API +
            data.name +
            process.env.REACT_APP_POKEMON_IMAGE_EXTENSION
        };

        setPokemon(pokemonData);
      })
      .catch(err => setPokemon(false));
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const {
      name,
      id,
      height,
      weight,
      types,
      fullImageUrl
    } = pokemon;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMediaPokemon}
          image={fullImageUrl}
          title={name}
        />
        <CardContent>
          <Typography variant="h2">
            {`${id}. ${name.toUpperCase()}`}
          </Typography>
          <Typography variant="h3">
            Pokemon Stats
          </Typography>
          <Typography>
            Height: {`${parseFloat(height)/10} m`}<br />
            Weight: {`${parseFloat(weight)/10} kg`}
          </Typography>
          <Typography>
            Types: {types
              .map(type => type.type.name)
              .reduce((acc, element) => acc + ', ' + element)}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="sm">
      <Grid container className={classes.cardGrid}>
        <Grid item xs={12}>
          { pokemon === undefined && <CircularProgress /> }
          { pokemon !== undefined && pokemon && generatePokemonJSX() }
          { pokemon === false && <Typography>Pokemon not found</Typography> }
          { pokemon !== undefined && (
            <Button variant="contained" color="primary" onClick={() => history.push("/")}>
              Back to Pokedex
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export { Pokemon as default };