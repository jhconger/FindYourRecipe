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

    useEffect(() => {
        getPrevUrl()
    }, []);

    useEffect(() => {
        getNextUrl()
    }, []);

useEffect(() => {
    getRecipes()
}, [query]);

    const getRecipes = async () => {
        try {
            const result = await axios.get(url);
            // setPrevUrl(result.config.url);
            setRecipes(result.data.hits);
            console.log(result);
            setNextUrl(result.data._links.next.href);
            // setPrevUrl(result.config.url);
        } catch (e) {
            console.log("There has been an error!")
        }
    };

    const getNextUrl = async () => {
        try {
            const result = await axios.get(nextUrl);
            console.log(result);
            setUrl(result.data._links.next.href);
            // console.log(prevUrl)
            // setUrl(nextUrl);
            setRecipes(result.data.hits);
            setPrevUrl(result.config.url);
            // console.log(prevUrl)
            console.log(result.data.hits);
            getRecipes();
            // console.log(prevUrl)
        } catch (e) {
            console.log("There has been an error!")
        }
    };

    const getPrevUrl = async () => {
        try {
            const result = await axios.get(prevUrl);
            console.log(result);
            setRecipes(result.data.hits);
            // setNextUrl(result.data._links.next.href);
        } catch (e) {
            console.log("There has been an error!")
        }
    };

    const updateSearch = e => {
        setSearch(e.target.value);
    };

    const updateUrl = e => {
        setUrl(e.target.value);
    };

    const updateRecipes = e => {
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
                            <Button className="prev-btn" variant="secondary" onClick={getPrevUrl}
                                    type="submit">Previous</Button>
                            <Button className="next-btn" variant="secondary" onClick={getNextUrl}
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
