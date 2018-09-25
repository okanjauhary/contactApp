import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions, FlatList} from 'react-native'
import { Container, Header, Content, List, ListItem, Button, Thumbnail, Text, Left, Right, Body, Title, Tabs, Tab, TabHeading } from 'native-base'
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux'
import axios from 'axios'
import {Transition} from 'react-navigation-fluid-transitions';

import * as C from '../../assets/styles/colors';

import {fetchContact, getContact} from './../../actions/contactAct'

class HomeScreen extends Component {

  componentDidMount(){
    this.props.dispatch(fetchContact())
  }

  renderContact = ({item, index}) => (
    <ListItem avatar onPress={() => {
        this.props.dispatch(getContact(item._id))
        this.props.navigation.push('Detail', {index})
    }}>
      <Left>
        <Transition shared={`image${index}`}>
          <Thumbnail source={{ uri: item.avatar == null ? 'https://startupsclub.com/image/user-default.png' : item.avatar }} />
        </Transition>
      </Left>
      <Body>
        <Text>{item.name}</Text>
        <Text note>{item.phone}</Text>
      </Body>
    </ListItem>
  )

  render(){
    return(
      <Container>
         <Header
          style={{backgroundColor: C._BROWN}}
          androidStatusBarColor= {C._STATUSBAR}
         >
          <Left>
            <Button transparent>
              <Transition shared="btn-left">
                <Icon name='grid' size={26} style={{color: 'white'}}/>
              </Transition>
            </Button>
          </Left>
          <Body>
            <Title>Contact list</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' size={26} style={{color: 'white'}}/>
            </Button>
          </Right>
        </Header>
        <Content>

        <Transition shared="tab-to-btn">
          <Tabs tabBarUnderlineStyle={{backgroundColor: C._DIRTYWHITE}} locked={true}>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: C._ORANGE}}>
                   <Text style={{color: '#fff'}}>All</Text>
                 </TabHeading>
               }
            >
              <FlatList
                data={this.props.contact.data}
                renderItem={this.renderContact}
                keyExtractor={(_, index) => `${index}`}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: C._ORANGE}}>
                   <Text style={{color: '#fff'}}>Groups</Text>
                 </TabHeading>
               }
            >
              <View>
                <Text>Tab 2</Text>
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: C._ORANGE}}>
                   <Text style={{color: '#fff'}}>Favorites</Text>
                 </TabHeading>
               }
            >
              <View>
                <Text>Tab 3</Text>
              </View>
            </Tab>
          </Tabs>
        </Transition>

        </Content>

        <Button
            rounded
            style={styles.buttonAdd}
            onPress={() => this.props.navigation.push('Create')}
          >
            <Icon name="user-plus" style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}/>
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
    width: 55,
    height: 55,
    backgroundColor: C._ORANGE,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    bottom: 40,
    elevation: 4
  }
})

export default connect(mapStateToProps)(HomeScreen)
