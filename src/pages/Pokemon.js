import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
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
      species,
      height,
      weight,
      types,
      fullImageUrl
    } = pokemon;

    return (
      <>
        <Typography variant="h2">
          {`${id}. ${name.toUpperCase()}`}
        </Typography>
        <img
          width="500"
          src={fullImageUrl}
          title={name}
        />
        <Typography variant="h3">
          Pokemon Info
        </Typography>
        <Typography>
          Species: {species.name}
        </Typography>
        <Typography>
          Height: {`${parseFloat(height)/10} m`}
        </Typography>
        <Typography>
          Weight: {`${parseFloat(weight)/10} kg`}
        </Typography>
        <Typography variant="h4">
          Types: {types.map((element) => {
            const { type } = element;
            return <Typography key={type.slot}>{type.name}</Typography>
          })}
        </Typography>
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          { pokemon === undefined && <CircularProgress /> }
          { pokemon !== undefined && pokemon && generatePokemonJSX() }
          { pokemon === false && <Typography>Pokemon not found</Typography> }
          { pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push("/")}>
              Back to Pokedex
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export { Pokemon as default };