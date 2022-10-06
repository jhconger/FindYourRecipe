import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';
import RecipeBox from './RecipeBox';
import React, {useEffect, useState} from 'react';
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

const App =()=> {
    const APP_ID = "2d320d45";
    const APP_KEY = "07015b8fb7809a5ee4afdbe546b5d4b7";
    const [recipes, setRecipes] = useState ([]);
    const [next, setNext] = useState ([]);
    const [nextRecipes, setNextRecipes] = useState ([]);
    const [search,setSearch] = useState('');
    const [query, setQuery] = useState("chicken")
    const [url, setUrl] = useState(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)

    useEffect(() => {
        getRecipes()
    }, [query]);

    useEffect(() => {
        getRecipes();
    }, []);
    // useEffect(() => {
    //     getNextRecipes();
    // }, []);
    // useEffect(() => {
    //     getNext();
    // }, []);


        const getRecipes = async () => {
            try {
                // Make a first request
                const result = await axios.get(url);
                setRecipes(result.data.hits);
                setNext(result.data._links.next.href);
                const result2 = await axios.get(next);
                setUrl(result2.data._links.next.href);
                console.log(url);
            } catch (e) {
                // Handle error here
            }
        };

    //     getRecipes();
    // }, []);

    // const getNextRecipes = async () => {
    //     const response = await fetch(next)
    //     const data = await response.json();
    //     console.log(data.hits);
        // setRecipes(data.hits);
        // updateUrl()
        // updateRecipes();
        // console.log(data._links.next.href);
        // setNext(data._links.next.href);
        // console.log(next)
        // getNextRecipes();
    // };
    // const updateUrl = e =>{
    //     setUrl(next);
    //     console.log(url);
    //     getRecipes();
    //
    // };
    const updateSearch = e =>{
        setSearch(e.target.value);
    };

    const updateNext = e =>{
        setNext(e.target.value);
    };

    const updateRecipes = e =>{
        getRecipes();

    };

    const getSearch = e => {
    e.preventDefault();
    setQuery(search);
        console.log(search);

        setSearch('');
    };

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 6000)
    }, []);

    return (
        <>
            <Navbar bg="black" expand="lg" variant="dark">
                <Container fluid>
                    <AppIcon src='/RecipeLogo.svg'/>
                    <Navbar.Brand href="/home">Recipes for the Ages</Navbar.Brand>
                    <Navbar.Toggle className="navbar-toggle" aria-controls="navbarScroll"></Navbar.Toggle>
                    <Navbar.Collapse className="navbar-collapse" id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-3" style={{maxHeight:'100px'}} navbarScroll>

                        </Nav>
                        <Form onSubmit={getSearch} className="d-flex">
                            <FormControl type="search" placeholder="Search Recipes" className="me-2" value={search} onChange={updateSearch} aria-label="search"></FormControl>
                            <Button className="search-btn" variant="secondary" type="submit">
                                <h5>Search</h5>
                            </Button>
                        </Form>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            {recipes.length > 0 ?(
                <section className="hero">
            <div className= "container">
                <div className="grid">
                    {recipes.map(recipe =>(
                        <RecipeBox
                        key = {recipe.recipe.calories}
                        title ={recipe.recipe.label}
                        image ={recipe.recipe.image}
                        calories ={recipe.recipe.calories}
                        ingredients ={recipe.recipe.ingredients}
                        link ={recipe.recipe.url}
                        ingredients={recipe.recipe.ingredients}
                        source={recipe.recipe.source}
                        healthLabels={recipe.recipe.healthLabels}
                        servings={recipe.recipe.yield}
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    <Button className="prev-btn" variant="secondary"  onClick={getRecipes}type="submit" >Previous</Button>
                    <Button className="next-btn" variant="secondary"  onClick={getRecipes} type="submit">Next</Button>
                </div>

            </div>

                </section>

            ):(
                    <h2>Sorry !! No Recipes Found</h2>
                )}
        </>
  );
}

export default App;
