import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Col , Button} from 'react-bootstrap';

import { Redirect } from "react-router-dom";

import MyToast from './MyToast';

export default class Voituremodif extends Component{
	
  initialState = {
	marque:'',
	modele:'',
	couleur:'',
	prix:'',
	id:''
  }
  componentDidMount() {
	const { data } = this.props.location
	this.setState (
		{ marque:data.marque,
		modele:data.modele,
		couleur:data.couleur,
		prix:data.prix,
		id:data.id
		}
	  ) ;

  }
  constructor(props) {
	super(props);
	this.state=this.initialState;
	this.voitureChange = this.voitureChange.bind(this);
	this.submitVoiture = this.submitVoiture.bind(this);
  }
  submitVoiture(event) {
	event.preventDefault();
	
	const { data } = this.props.location
	
	const voiture={
  	marque:this.state.marque,
  	modele:this.state.modele,
  	couleur:this.state.couleur,
	prix:this.state.prix,
	}
	const id= data.id
	axios.put("http://localhost:8080/voitures/"+id, voiture)
	.then(response => {
  	if (response.data != null) {
		//this.setState(this.initialState);
		this.setState({"show":true});
		setTimeout(() => this.setState({"show":false}), 3000);
		//alert("Voiture modifier avec succès");
		return <Redirect to='/list' />
	  }
	  else {
		this.setState({"show":false});
	  }
	})
  }
  voitureChange(event) {
	this.setState (
  	{ [event.target.name]:event.target.value }
	) ;
  }
  render(){
	const { data } = this.props.location
	return(
		<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
            	<MyToast children = {{show:this.state.show, message:"Voiture modifie avec succès.", type:"danger"}}/>
          	</div>
  			<Card className={"border border-dark bg-dark text-white"}>
		  
        	<Card.Header>
           	Modifier une Voiture 
			   
          	</Card.Header>
        	<Form onSubmit={this.submitVoiture} id="VoitureFormId">
        	<Card.Body>
        	<Form.Row>
            	<Form.Group as={Col} controlId="formGridMarque">
            	<Form.Label> Marque </Form.Label>
            	<Form.Control name="marque" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.marque}  onChange = {this.voitureChange} placeholder= {data.marque}/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridModele">
            	<Form.Label> Modele </Form.Label>
            	<Form.Control name="modele" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.modele}  onChange = {this.voitureChange} placeholder= {data.modele}/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridCouleur">
            	<Form.Label> Couleur </Form.Label>
            	<Form.Control name="couleur" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.couleur}  onChange = {this.voitureChange} placeholder= {data.couleur}/>
            	</Form.Group>
            	<Form.Group as={Col} controlId="formGridImmatricule">
            	<Form.Label> Prix </Form.Label>
            	<Form.Control name="prix" autoComplete="off" required type="text" className={"bg-dark text-white"}
              	value = {this.state.prix} onChange = {this.voitureChange} placeholder= {data.prix}/>
            	</Form.Group>
        	</Form.Row>
        	</Card.Body>
        	<Card.Footer style={{"textAlign":"right"}}>
            	<Button size="sm" variant="success" type="submit">  Submit </Button>{' '}
            	<Button size="sm" variant="info" type="reset">  Reset </Button>
        	</Card.Footer>
        	</Form>
        	</Card>
			</div>
      	);
      	}
    	}
