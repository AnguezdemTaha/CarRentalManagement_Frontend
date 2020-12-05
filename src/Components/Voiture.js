import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Col , Button} from 'react-bootstrap';
export default class Voiture extends Component{
  initialState = {
	marque:'',
	modele:'',
	couleur:'',
	prix:''
  }
  constructor(props) {
	super(props);
	this.state=this.initialState;
	this.voitureChange = this.voitureChange.bind(this);
	this.submitVoiture = this.submitVoiture.bind(this);
  }
  submitVoiture(event) {
	event.preventDefault();
	const voiture={
  	marque:this.state.marque,
  	modele:this.state.modele,
  	couleur:this.state.couleur,
  	prix:this.state.prix
	}
	axios.post("http://localhost:8080/voitures", voiture)
	.then(response => {
  	if (response.data != null) {
    	this.setState(this.initialState);
    	alert("Voiture enregistrée avec succès");
  	}
	})
  }
  voitureChange(event) {
	this.setState (
  	{ [event.target.name]:event.target.value }
	) ;
  }
  render(){
	return(
  	<Card className={"border border-dark bg-dark text-white"}>
        	<Card.Header>
           	Ajouter une Voiture
          	</Card.Header>
        	<Form onSubmit={this.submitVoiture} id="VoitureFormId">
        	<Card.Body>
        	<Form.Row>
            	<Form.Group as={Col} controlId="formGridMarque">
            	<Form.Label> Marque </Form.Label>
            	<Form.Control name="marque" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.marque}  onChange = {this.voitureChange} placeholder= "Entrez Marque Voiture"/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridModele">
            	<Form.Label> Modele </Form.Label>
            	<Form.Control name="modele" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.modele}  onChange = {this.voitureChange} placeholder= "Entrez Modele Voiture"/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridCouleur">
            	<Form.Label> Couleur </Form.Label>
            	<Form.Control name="couleur" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.couleur}  onChange = {this.voitureChange} placeholder= "Entrez Couleur Voiture"/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridImmatricule">
            	<Form.Label> Prix </Form.Label>
            	<Form.Control name="prix" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.prix} onChange = {this.voitureChange} placeholder= "Entrez Prix Voiture"/>
            	</Form.Group>
        	</Form.Row>
        	</Card.Body>
        	<Card.Footer style={{"textAlign":"right"}}>
            	<Button size="sm" variant="success" type="submit">  Submit </Button>{' '}
            	<Button size="sm" variant="info" type="reset">  Reset </Button>
        	</Card.Footer>
        	</Form>
        	</Card>
      	);
      	}
    	}
