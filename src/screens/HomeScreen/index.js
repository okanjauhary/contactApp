import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions, StatusBar} from 'react-native'
import { Container, Header, Content, List, ListItem, Button, Icon, Text, SwipeRow } from 'native-base'

import {connect} from 'react-redux'
import axios from 'axios'

import ContactLists from './components/ContactLists'

import {fetchContact} from './../../actions/contactAct'

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    headerRight: (
        <View style={{flexDirection: 'row', marginRight: 20}}>
          <Icon name="search" style={{marginRight: 20}}/>
          <Icon name="more"/>
        </View>
    )
  })

  componentDidMount(){
    this.props.dispatch(fetchContact())
  }

  render(){
    if(this.props.contact.fetching){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <ActivityIndicator size="large" color="#4e4e4e" />
        </View>
      )
    }

    return(
      <Container>
        <StatusBar
           backgroundColor="#1f4f32"
           barStyle="light-content"
         />
        <Content>
          {
            (this.props.contact.data.length > 0) ?
              <ContactLists data={this.props.contact.data} /> :
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: (Dimensions.get('screen').height)/2}}>
                <Icon name="contact" style={{color: '#ddd', fontSize: 70}}/>
                <Text style={{fontSize: 30, color: '#ddd'}}>No contacts</Text>
              </View>
          }
        </Content>
        <Button
            success
            rounded
            style={styles.buttonAdd}
            onPress={() => this.props.navigation.push('Create')}
          >
            <Icon name="add" style={{fontSize: 35, fontWeight: 'bold'}}/>
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    contact: state.contact
  }
}

const styles = StyleSheet.create({
  buttonAdd: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    bottom: 40,
    elevation: 4
  }
})

export default connect(mapStateToProps)(HomeScreen)
