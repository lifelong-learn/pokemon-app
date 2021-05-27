import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  CircularProgress,
  TextField
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import PokemonCard from '../components/PokemonCard';
import useStyles from '../styles';

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState('');

  console.log();
  useEffect(() => {
    axios
      .request({
        method: "get",
        url: process.env.REACT_APP_POKEDEX_DATA_API,
        crossDomain: true
      })
      .then(response => response.data.results)
      .then(results => {
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[`${index + 1}`] = {
            id: `${index + 1}`,
            name: pokemon.name,
            sprite: process.env.REACT_APP_POKEDEX_IMAGE_API +
              (index + 1).toString() +
              process.env.REACT_APP_POKEDEX_IMAGE_EXTENSION
          }
        });

        setPokemonData(newPokemonData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (event) => {
    const pokeFilter = event.target.value;
    setFilter(pokeFilter.toLowerCase());
  };
 
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <Search className={classes.searchIcon} />
            <TextField
              placeholder="Pokemon"
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        { pokemonData ?
          (<Grid container spacing={2} className={classes.cardGrid}>
              {Object.keys(pokemonData).map(pokemonId => (
                pokemonData[pokemonId].name.includes(filter) &&
                (<PokemonCard key={pokemonId}
                  pokemon={pokemonData[pokemonId]}
                  history={history}
                />)))
              }
            </Grid>) :
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        }
      </Container>
    </>
  );
};

export { Pokedex as default };