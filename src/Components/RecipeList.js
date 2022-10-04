import React from 'react';
import axios from 'axios';

export default class RecipeList extends React.Component {
    state = {
        results: []
    }

    componentDidMount() {
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then(res => {
                const results = res.data;
                this.setState({ results });
            })
    }

    render() {
        return (
            <ul>
                {
                    this.state.results
                        .map(results =>
                            <li key={results.id}>{person.name}</li>
                        )
                }
            </ul>
        )
    }
}








const APP_ID = "2d320d45";
const APP_KEY = "07015b8fb7809a5ee4afdbe546b5d4b7";
const [recipes, setRecipes] = useState ([]);
const [next, setNext] = useState ([]);
const [nextRecipes, setNextRecipes] = useState ([]);
const [search,setSearch] = useState('');
const [query, setQuery] = useState("chicken")
const [url,setUrl] = useState(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
