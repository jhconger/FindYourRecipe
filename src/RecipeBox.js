import {Modal, show, Button} from 'react-bootstrap';
import React, {useState} from 'react';

const RecipeBox = ({title, image, calories, ingredients, link, source, healthLabels, servings,next}) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)

    return (
        <div className="card text-center bg-secondary mb-3">
            <div className="card-body d-flex flex-column">
                <img className="card-img-top" src={image}/>
                <h5>{title}</h5>
                <div className="card-body d-flex flex-column mt-auto h-80">
                    <button type="button" className="btn btn-dark mt-auto" onClick={handleShow}>View More</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="card-img-top" style={{width: '99.5%'}} src={image}/>
                            <h3>{title}</h3>
                            <h6>Ingredients: {ingredients.map(ingredient=>(
                                <li>{ingredient.text}</li>
                            ))}
                            </h6>
                            <h6>Calories: {Math.round(calories)} </h6>
                            <h6>Source: {source}</h6>
                            <h6>Servings: {servings}</h6>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between">
                            <a href={link}>
                                <Button className="recipe-btn" variant="secondary">Full Recipe</Button>
                            </a>
                            <Button className="recipe-btn" variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default RecipeBox;
