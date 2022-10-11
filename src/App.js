import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';
import RecipeBox from './RecipeBox';
import React, {useEffect, useState, useRef} from 'react';
import ReactLoading from "react-loading";
import LoadingScreen from "./LoadingScreen";
import axios from 'axios';

const AppIcon = styled.img`
display: flex;
flex-direction: row;
align-items: center;
height: 75px;
width: 75px;
`;

const App = () => {
    const APP_ID = process.env.REACT_APP_API_ID;
    const APP_KEY = process.env.REACT_APP_API_KEY;
    const [recipes, setRecipes] = useState([]);
    const [prevUrl, setPrevUrl] = useState([]);
    const [nextUrl, setNextUrl] = useState([]);
    const [nextRecipes, setNextRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState("chicken")
    const [url, setUrl] = useState(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)

    const [pagination, setPagination] = useState(0);

    const prevSearchIdRef = useRef();
    useEffect(()=>{
      prevSearchIdRef.current = query;
    });
    const prevSearch = prevSearchIdRef.current

    let currentPagination = pagination;

    const fetchRecipes = async () => {

    if(prevSearch !== query){
      currentPagination = 0;
      setPagination(0);
    }



    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=8f7859bc&app_key=f7c43e28aea5bc242e86fe0f089dda3c&from${currentPagination}&to=${pagination + 20}`)
    const data = await response.json();
    setRecipes(data.hits);
    }

    const updateSearch = e => {
      setSearch(e.target.value);
      };


    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }

    const prevClick = () => {
      if(pagination === 0){
        return;
      }
      setPagination(pagination-20);
  }

  const nextClick = () => {

      setPagination(pagination+20);

  }



    useEffect(() => {
      fetchRecipes();
    }, [query, pagination])


    return (
        <>
            <Navbar bg="black" expand="lg" variant="dark">
                <Container fluid>
                    <AppIcon src='/RecipeLogo.svg'/>
                    <Navbar.Brand href="/home">Recipes for the Ages</Navbar.Brand>
                    <Navbar.Toggle className="navbar-toggle" aria-controls="navbarScroll"></Navbar.Toggle>
                    <Navbar.Collapse className="navbar-collapse" id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-3" style={{maxHeight: '100px'}} navbarScroll>

                        </Nav>
                        <Form onSubmit={getSearch} className="d-flex">
                            <FormControl type="search" placeholder="Search Recipes" className="me-2" value={search}
                                         onChange={updateSearch} aria-label="search"></FormControl>
                            <Button className="search-btn" variant="secondary" type="submit">
                                <h5>Search</h5>
                            </Button>
                        </Form>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            {recipes.length > 0 ? (
                <section className="hero">
                    <div className="container">
                        <div className="grid">
                            {recipes.map(recipe => (
                                <RecipeBox
                                    key={recipe.recipe.uri}
                                    title={recipe.recipe.label}
                                    image={recipe.recipe.image}
                                    calories={recipe.recipe.calories}
                                    ingredients={recipe.recipe.ingredients}
                                    link={recipe.recipe.url}
                                    ingredients={recipe.recipe.ingredients}
                                    source={recipe.recipe.source}
                                    healthLabels={recipe.recipe.healthLabels}
                                    servings={recipe.recipe.yield}
                                />
                            ))}
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button className="prev-btn" variant="secondary" onClick={prevClick}
                                    type="submit">Previous</Button>
                            <Button className="next-btn" variant="secondary" onClick={nextClick}
                                    type="submit">Next</Button>
                        </div>

                    </div>

                </section>

            ) : (
                <h2>Sorry !! No Recipes Found</h2>
            )}
        </>
    );
}

export default App;
