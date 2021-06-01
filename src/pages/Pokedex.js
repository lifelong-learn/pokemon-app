import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [displayCount, setDisplayCount] = useState(18);
  const loadingRef = useRef(null);

  const showMorePokemon = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting &&
      displayCount < Object.values(pokemonData).length) {
      setDisplayCount(displayCount + 9);
    }
  });

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

    const observer = new IntersectionObserver(showMorePokemon, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current)
      }  
    };
  }, [showMorePokemon]);

  const handleSearchChange = (event) => {
    const pokeFilter = event.target.value;
    setFilter(pokeFilter.toLowerCase());
    setDisplayCount(9);
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
              {Object.values(pokemonData)
                .filter(pokemon => pokemon.name.includes(filter))
                .slice(0, displayCount)
                .map(pokemon => (
                  <PokemonCard key={pokemon.id}
                    pokemon={pokemon}
                    history={history}
                  />)
                )
              }
              <div ref={loadingRef}><CircularProgress /></div>
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