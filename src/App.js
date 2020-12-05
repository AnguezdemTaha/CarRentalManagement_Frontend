import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import Bienvenue from './Components/Bienvenue';
import CarList from './Components/Voitureliste';
import Voiture from './Components/Voiture';

import Voituremodif from './Components/Voituremodif';



class App extends Component {
  render(){
  const marginTop = { marginTop:"20px"}
  return (
	<Router>
  	<Navigationbar/>
 	<Container>
   	<Row>
     	<Col lg={12} style={marginTop}>
     	<Switch>
       		<Route path="/" exact component={Bienvenue}/>
         	<Route path="/add" exact component={Voiture}/>
        	<Route path="/list" exact component={CarList}/>
			<Route path="/put" exact component={Voituremodif}/>
     	</Switch>
     	</Col>
   	</Row>
 	</Container>
	</Router>
	);
  }
}
export default App;
