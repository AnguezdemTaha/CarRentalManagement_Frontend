import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

import {Link} from 'react-router-dom';

import MyToast from './MyToast';

export default class CarList extends Component {
	constructor(props) {
    	super(props);
		//this.state = { voitures: [] };
		
		this.state = { voitures: [],
		};
		
	}
	componentDidMount() {
		console.log("we are here");
    	fetch('http://localhost:8080/voitures')
        	.then((response) => response.json())
        	.then((responseData) => {
				console.log("we are here");
				this.setState({
					
					voitures: responseData
					//voitures: [{"id":4,"marque":"test","modele":"testm","couleur":"testc","prix":"testp"}]
            	});
        	})
        	.catch(err => console.error(err));
	}
	/*deleteVoiture = (voitureId) => {
		axios.delete("http://localhost:8080/voitures/"+voitureId)
		  .then(response => {
			if(response.data != null){
			  alert("Voiture supprimée avec succès.");
			} else {
			  alert("pas de suppression.");
			}
		  });
	};*/
	deleteVoiture = (voitureId) => {
		axios.delete("http://localhost:8080/voitures/"+voitureId)
		  .then(response => {
			/*if(response.data != null){
			  this.setState({"show":true});
			  this.setState({
				voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
			  });*/
			if(response.data != null){
				this.setState({"show":true});
				setTimeout(() => this.setState({"show":false}), 3000);
				this.setState({
				  voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
			});
	  
			}else {
			  this.setState({"show":false});
			}
		  });
	  };



	  
	  
		
	
  
	render() {
    	return (
			
			<div>
			<div style={{"display":this.state.show ? "block" : "none"}}>
            	<MyToast children = {{show:this.state.show, message:"Voiture supprimée avec succès.", type:"danger"}}/>
          	</div>
	
        	<Card className={"border border-dark bg-dark text-white"}>
        	<Card.Header><FontAwesomeIcon icon={faList} /> Liste des Voitures</Card.Header>
        	<Card.Body>
        	<Table bordered hover striped variant="dark"><thead>
            	<tr>
                	<th>Marque</th>
                	<th>Modele </th>
                	<th>Couleur</th>
                	<th>Prix</th></tr>
        	</thead>
        	<tbody>
        	{	this.state.voitures.length ===0 ?
              	<tr align="center">
                  	<td colSpan="6">
                   	Aucune Voiture disponible.</td>
                  	</tr> :
                	this.state.voitures.map((voiture) => (
                  	<tr key={voiture.id}>
                  	<td>{voiture.marque}</td>
                  	<td>{voiture.modele}</td>
                  	<td>{voiture.couleur}</td>
                  	<td>{voiture.prix}</td>
                  	<td>
				    <ButtonGroup>
					
                	<Link to={{pathname: "/put", data: voiture }}>
                	
					<Button size="sm" variant="outline-primary" >
                      		<FontAwesomeIcon icon={faEdit} />

                      	</Button>
            	</Link>
					
					
					
						{' '}
					
                		<Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this,voiture.id)}>
                      		<FontAwesomeIcon icon={faTrash} />
                      	</Button>
					</ButtonGroup>

                  	</td>
                  	</tr>
                	))
              	}
                	</tbody>
                	</Table>
          	</Card.Body>
          	</Card>
        	</div>
    	);
	}
}
