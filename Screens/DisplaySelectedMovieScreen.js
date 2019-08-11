/** 
* Name : Low Zi Jian
*Reg . No . : 16UEB03295
*/


import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Database from './database';
import * as theme from './theme'

const db = new Database();


export default class DisplaySelectedMovieScreen extends Component {



        static navigationOptions = ({navigation}) => {
          return {
                    title: navigation.getParam('movieName')
          }
        }
     
         constructor(props) {
    
            super(props);
            this._listSelectedMovie = this._listSelectedMovie.bind(this);
            this.state = {
                    selectedMovie:{},
                    movieID: this.props.navigation.getParam('movieID')
                    
            };
        }

        componentDidMount(){
            this._listSelectedMovie(this.state.movieID);
        }
    
        //get Selected Movie
       _listSelectedMovie(movieID) {
            db.listOneMovie(movieID).then((data) => {
                movie = data;
              this.setState({
                selectedMovie:movie,
              })
            }).catch((err) => {
            console.log(err);
            this.setState = {
            }
          })
        }

  render() {

    return (
      <View>
      <View style={theme.styles.container}>
        <Text style = {theme.styles.h2}>Movie Title</Text>
        <Text style = {theme.styles.h3}>{this.state.selectedMovie.title}</Text>
      </View>

      <View style={theme.styles.container}>
        <Text style = {theme.styles.h2}>Movie language</Text>
        <Text style = {theme.styles.h3}>{this.state.selectedMovie.language}</Text>
      </View>

      <View style={theme.styles.container}>
        <Text style = {theme.styles.h2}>Movie release date</Text>
        <Text style = {theme.styles.h3}>{new Date(this.state.selectedMovie.release_date*1000).toDateString()}</Text>
      </View>

</View>
    );
  }
}
