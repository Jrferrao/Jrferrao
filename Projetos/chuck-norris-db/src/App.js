import React, { useState } from 'react'
import { useEffect } from 'react';
import { getAllCategories, getRandomJoke } from './utils/api';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Switch,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import './app.css'
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ShowToggles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;

`
const ChangeName = styled.div`
  display: flex;
  justify-content: space-evenly;


`
const ToggleSwitch = styled.div`
  align-self: center;
  padding: 25px 0;
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;

  & img{
    margin: 25px 0;
    border: 1px solid black;
    
  }

`
const JokesCard = styled.div`
  width: 600px;
  height: auto;
  background-color: #e1e1e1;
  box-shadow: 2px 2px 8px 1px;
  margin: 25px 0;
`

export default function App() {
  const classes = useStyles();

  const [jokes, setJokes] = useState([])
  const [categories, setCategories] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [count, setCount] = useState(1)
  const [filterByCategory, setFilterByCategory] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])


  const categoryFilterValues = [{
    name: 'include',
    value: 'limitTo'
  }, {
    name: 'exclude',
    value: 'exclude'
  }]
  const [selectedCategoryFilterValue, setSelectedCategoryFilterValue] = useState('include')


  const getJokes = async () => {
    const params = {}
    if (firstName) {
      params.firstName = firstName
    }
    if (lastName) {
      params.lastName = lastName
    }
    if (count) {
      params.count = count
    }
    if (filterByCategory) {
      params.categories = selectedCategories
      params.categoryAction = selectedCategoryFilterValue
    }

    const res = await getRandomJoke(params)

    setJokes(res?.data?.value || [])
  }

  useEffect(() => {
    getJokes()
  }, [filterByCategory])

  const getCategories = async () => {
    const res = await getAllCategories()
    setCategories(res?.data?.value)
    setSelectedCategories(res?.data?.value)
  }
  const toggleFilterByCategory = () => {
    setFilterByCategory(!filterByCategory)
  }


  useEffect(() => {
    getCategories()
  }, [])


  return (

    <MainContainer className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="title"
            color="inherit"
          >
            CHUCK NORRIS - Amazing Facts
          </Typography>
        </Toolbar>
      </AppBar>

      <img src="./images/chuck.jpeg" />

      <ChangeName>
        <FormControl margin="normal">
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl margin="normal">
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
        </FormControl>
      </ChangeName>
      <FormControl margin="normal">
        <InputLabel htmlFor="count">How Many</InputLabel>
        <Input number min="1" max="10" id="count" value={count} onChange={e => setCount(e.target.value)} />
      </FormControl>
      <ToggleSwitch>
        <FormControlLabel
          control={
            <Switch
              checked={filterByCategory}
              onChange={toggleFilterByCategory}
              color="primary"
            />

          }
          label="Filter by Category"
        />
      </ToggleSwitch>
      {filterByCategory && (
        <ShowToggles>
          <ToggleButtonGroup value={selectedCategories} onChange={(e, categories) => setSelectedCategories(categories)} aria-label="text formatting">
            {categories.map(cat => (
              <ToggleButton value={cat} aria-label={cat}>
                <span>{cat}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>


          <ToggleButtonGroup exclusive value={selectedCategoryFilterValue} onChange={(e, val) => setSelectedCategoryFilterValue(val)} aria-label="text formatting">
            {categoryFilterValues.map(cat => (
              <ToggleButton value={cat.value} aria-label={cat}>
                <span>{cat.name}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </ShowToggles>
      )}

      <Button variant="contained" color="primary" onClick={getJokes}>Show this AMAZING Jokes</Button>

      <List>
        {jokes.map(joke => (
          <JokesCard>
            <ListItem>
              <ListItemText primary={joke.joke} />
            </ListItem>
          </JokesCard>
        ))}
      </List>
    </MainContainer>
  )
}

