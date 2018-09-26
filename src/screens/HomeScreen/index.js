import React, { Component } from 'react';
import { View, FlatList} from 'react-native'
import { Container, Header, Content, ListItem, Button, Thumbnail, Text, Left, Right, Body, Title, Tabs, Tab, TabHeading } from 'native-base'
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux'
import {Transition} from 'react-navigation-fluid-transitions';

import * as C from '../../assets/styles/colors';
import {styles} from '../../assets/styles/home';

import {fetchContact, getContact} from './../../actions/contactAct'


class HomeScreen extends Component {
  componentDidMount(){
    this.props.dispatch(fetchContact())
  }

  renderContactList = ({item, index}) => (
    <ListItem avatar onPress={() => {
        this.props.dispatch(getContact(item._id))
        this.props.navigation.push('Detail', {index})
    }}>
      <Left>
        <Transition shared={`image${index}`}>
          <Thumbnail source={{ uri: item.avatar || 'https://startupsclub.com/image/user-default.png'}} />
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

            {
              (this.props.contact.data.length > 0) ?
                <FlatList
                  data={this.props.contact.data}
                  renderItem={this.renderContactList}
                  keyExtractor={(_, index) => `${index}`}
                /> :

                <View style={styles.noData}>
                   <Icon name='user' size={60} style={styles.iconNoData} />
                   <Text style={{fontSize: 25, color: '#ddd'}}>No contact</Text>
                   <Button
                    small style={styles.btnAddNoData}
                    onPress={() => this.props.navigation.push('Create')}
                   >
                      <Text>Add new contact</Text>
                   </Button>
                </View>
            }

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

export default connect(mapStateToProps)(HomeScreen)
