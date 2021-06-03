import React, { useState, useEffect, useRef } from 'react';
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
  const numOfPokemonPerScroll = 18;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState('');
  const [displayCount, setDisplayCount] = useState(numOfPokemonPerScroll);
  const loadingRef = useRef(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_POKEDEX_DATA_API)
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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting &&
        displayCount < Object.values(pokemonData).length) {
        setDisplayCount(displayCount => displayCount + numOfPokemonPerScroll);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (loadingRef.current)
      observer.observe(loadingRef.current);

    return () => {
      observer.disconnect();
    };
  });

  const handleSearchChange = (event) => {
    const pokeFilter = event.target.value;
    setFilter(pokeFilter.toLowerCase());
    setDisplayCount(numOfPokemonPerScroll);
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
        { pokemonData && (
          <Grid container spacing={2} className={classes.cardGrid}>
            {Object.values(pokemonData)
              .filter(pokemon => pokemon.name.includes(filter))
              .slice(0, displayCount)
              .map((pokemon) => (
                <PokemonCard key={pokemon.id}
                  pokemon={pokemon}
                  history={history}
                />)
              )
            }
          </Grid>
          )
        }
        <div ref={pokemonData ? loadingRef : null} className={classes.progress}>
          {pokemonData && (displayCount < Object.values(pokemonData).length) ?
            <CircularProgress /> : ''}
        </div>
      </Container>
    </>
  );
};

export { Pokedex as default };