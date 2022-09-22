import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';
import RecipeBox from './RecipeBox';
import React, {useEffect, useState} from 'react';
import ReactLoading from "react-loading";
import LoadingScreen from "./LoadingScreen";
//  function Loading() {
//     return (
//         <div>
//             <h2>Loading in ReactJs - GeeksforGeeks</h2>
//             <ReactLoading type="balls" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading type="bars" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading type="bubbles" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading type="cubes" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading type="cylon" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading type="spin" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading type="spokes" color="#0000FF"
//                           height={100} width={50} />
//             <ReactLoading
//                 type="spinningBubbles"
//                 color="#0000FF"
//                 height={100}
//                 width={50}
//             />
//         </div>
//     );
// }
const AppIcon = styled.img`
display: flex;
flex-direction: row;
align-items: center;
height: 75px;
width: 75px;
`;

// $(window).load(function () {
//     setTimeout(function () {
//         $('.preloader').fadeOut('slow');
//     }, 3000);
// });
const App =()=> {

    const APP_ID = "2d320d45";
    const APP_KEY = "07015b8fb7809a5ee4afdbe546b5d4b7";
    const [recipes, setRecipes] = useState ([]);
    const [search,setSearch] = useState('');
    const [query, setQuery] = useState("chicken")

    useEffect(() => {
        getRecipes()
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    };

    const updateSearch = e =>{
        setSearch(e.target.value)
    };

    const getSearch = e => {
    e.preventDefault();
    setQuery(search)
        setSearch('');
    };
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 6000)
    }, [])
    return (
        <>
            {/*{loading === false ? (*/}
            <Navbar bg="black" expand="lg" variant="dark">
                <Container fluid>
                    <AppIcon src='/RecipeLogo.svg'/>
                    <Navbar.Brand href="/home">Recipes for the Ages</Navbar.Brand>
                    {/*<Navbar.Brand href="/home">Trending</Navbar.Brand>*/}
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
            <div className= "container">
                <div className="grid">
                    {recipes.map(recipe =>(
                        <RecipeBox
                        key = {recipe.recipe.label}
                        title ={recipe.recipe.label}
                        image ={recipe.recipe.image}
                        calories ={recipe.recipe.calories}
                        ingredients ={recipe.recipe.ingredients}
                        link ={recipe.recipe.url}
                        />
                    ))}
                </div>
            </div>
                {/*) : (*/}
                {/*<LoadingScreen />*/}
                {/*)}*/}
        </>
  );
}

export default App;
