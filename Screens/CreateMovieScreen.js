/** 
* Name : Low Zi Jian
*Reg . No . : 16UEB03295
*/

import React, { Component } from 'react';
import { Text, View,DatePickerAndroid,Picker } from 'react-native';
import { Button,TextInput} from 'react-native-paper';
import * as theme from './theme'
import Database from './database';

const db = new Database();

Date.prototype.formatted = function() {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
}

export default class CreateMovieScreen extends Component {

      //hide the header
      static navigationOptions = {
        header: null
    }

    constructor(props) {
   
      super(props);
      this._addMovie = this._addMovie.bind(this);
      this.state = {
        //by default language is English
              language: 'English',
              title:'',
              release_date: new Date(),
              release_dateText:'',
             
           
      };
  }

     //addMovie
     _addMovie() {
      let newMovie = {
        title: this.state.title,
        language: this.state.language,
        release_date: Math.round((new Date(this.state.release_date)).getTime() / 1000)
      }
      db.addMovie(newMovie)
  
      this.props.navigation.getParam('refresh')();
      this.props.navigation.goBack();
    }
  
  openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.release_date,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2099, 11, 31),
        mode: 'calendar', // try also with `spinner`
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let selectedDate = new Date(year, month, day);

        this.setState({
          release_date: selectedDate,
          release_dateText: selectedDate.formatted(),
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  
  render() {
    let languages = [
      {
          key: 'English',
          value: 'English',
      },
      {
          key: 'Malay',
          value: 'Malay',
      },
      {
          key: 'Mandarin',
          value: 'Mandarin',
      },
      {
          key: 'Cantonese',
          value: 'Cantonese',
      },
      {
        key: 'Japanese',
        value: 'Japanese',
    },
    {
      key: 'Korean',
      value: 'Korean',
  },
    ];

    return (
      <View>
        <View style = {theme.styles.container}>
         <Text style ={theme.styles.h1} >Create a New Movie</Text>
        </View>

        <View style = {theme.styles.container}>
          <Text style = {theme.styles.h2}>Title</Text>
          <TextInput
             label='Movie Title'
             mode='outlined'
             value={this.state.title}
             onChangeText={title => this.setState({ title })}
          />
        </View>

        <View style = {theme.styles.container}>
          <Text style = {theme.styles.h2}> Language</Text>
            <View>
            <Picker
              mode={'dropdown'}                     
              prompt={'Select Language'}
              selectedValue={this.state.language}
              onValueChange={
                (itemValue, itemIndex) => this.setState({language: itemValue})
              }>
              {languages.map((item, index) => {
                return(<Picker.Item label={item.value} value={item.key}
                key={item.key}  />)
              })}
                
            </Picker>
           </View>
        </View>

        <View style = {theme.styles.container}>
          <Text style = {theme.styles.h2}> Release Date</Text>
          <Button  mode = "outlined" onPress={ this.openDatePicker }
          color = "#1A1A4E" style={{borderRadius:25,marginHorizontal:25,padding:5}}>{this.state.release_dateText == ''? <Text>Select Release Date </Text>:  this.state.release_dateText} </Button>  
        </View>

        <View style = {theme.styles.container}>
        <Button icon="add-circle" mode="contained" onPress={ this._addMovie}
         color = "#1A1A4E" style={{borderRadius:25,marginHorizontal:25}}
         disabled = {this.state.title == '' || this.state.language == '' || this.state.release_dateText == ''}
         >  
          Create
        </Button>
        </View>

      </View>
    );
  }
}
