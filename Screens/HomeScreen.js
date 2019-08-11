/** 
* Name : Low Zi Jian
*Reg . No . : 16UEB03295
*/

import React, { Component } from 'react';
import { Text, View , FlatList , TouchableOpacity,ScrollView} from 'react-native';
import * as theme from './theme'
import { Button,Card } from 'react-native-paper';
import Database from './database';

const db = new Database();

export default class HomeScreen extends Component {
    //hide the header
    static navigationOptions = {
                header: null
            }
 
     constructor(props) {

        super(props);
        this._getAllMovies = this._getAllMovies.bind(this);
        this.state = {
                movies:[]
        };
    }

    componentDidMount(){
        this._getAllMovies();
    }

    //getAllMovies
    _getAllMovies() {
        db.getAllMovie().then((data) => {
          allMovies = data;
          this.setState({
            movies:allMovies
          })
        }).catch((err) => {
        console.log(err);
        this.setState = {
        }
      })
    }

 

    render() {

    return (
    <View style={{flex:1}}>
      <View style={[theme.styles.container]}>
        <Text style = {theme.styles.h1}>Movies</Text>
      </View>

     <View style={[theme.styles.container]}>
        <Button icon="add-circle" mode="contained" color = "#1A1A4E" 
          onPress={() => { this.props.navigation.navigate('Add' , { refresh: this._getAllMovies })} }>  
          Create a new movie
        </Button>
     </View>

     <ScrollView style={{marginBottom:10,marginHorizontal:15,}}   showsVerticalScrollIndicator={false}>
     <FlatList 
        data={this.state.movies}   
        extraData={this.state} 
        renderItem={({ item }) => ( 
         <TouchableOpacity  activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Movie', { movieID:item.id , movieName:item.title} )}> 
            <Card style = {theme.styles.cardContainer}>
            <Card.Title title={item.title} subtitle= {item.language}/>
            </Card>
        </TouchableOpacity> 

        )}          
            keyExtractor={item => String(item.id)}               
        />
        </ScrollView> 
    </View>
    );
  }
}
  
