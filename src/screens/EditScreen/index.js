import React, { Component } from 'react'
import { Container, Content, Text, Button, Form, Input, Item, Label, Card, Header, Left, Right, Title, Body } from 'native-base'
import { Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { Transition } from 'react-navigation-fluid-transitions';
import axios from 'axios';
import { fetchContact, getContact, updateContact, deleteContact } from './../../actions/contactAct'
import * as C from '../../assets/styles/colors';
import Config from './../../../config/config';

class EditScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    title: "Edit contact"
  })
  state = {
    name: this.props.navigation.state.params.name,
    phone: this.props.navigation.state.params.phone,
    avatar: this.props.navigation.state.params.avatar,
    email: this.props.navigation.state.params.email,
    address: this.props.navigation.state.params.address,
    isPressed: false
  }

  handleDelete = (data) => {
    Alert.alert(
      'Hapus kontak',
      `Apakah kamu yakin ingin menghapus ${data.name}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.__deleteContact(data._id) }
      ]
    )
  }

  __deleteContact = (id) => {
    this.props.dispatch(deleteContact(id))
    this.props.navigation.navigate('Home')
  }

  __editContact = (id) => {
    let data = {
      "name": this.state.name,
      "phone": this.state.phone,
      "avatar": this.state.avatar == '' ? null : this.state.avatar,
      "email" : this.state.email == '' ? null : this.state.email,
      "address" : this.state.address == '' ? null : this.state.address
    }
    this.setState({isPressed: true})
    this.props.dispatch(updateContact(id, data))
    setTimeout(() => {
      this.props.navigation.pop()
    }, 1000);
  }

  render(){

    const contact = this.props.navigation.state.params

    return(
      <Container>

        <Header
           style={{backgroundColor: C._BROWN}}
           androidStatusBarColor= {C._STATUSBAR}
          >
           <Left>
             <Button transparent onPress={() => this.props.navigation.pop()}>
              <Transition shared="btn-left">
               <Icon name='arrow-left' size={26} style={{color: 'white'}}/>
              </Transition>
             </Button>
           </Left>
           <Body>
             <Title>{contact.name}</Title>
           </Body>
           <Right>
             <Button transparent onPress={() => this.handleDelete(contact)}>
               <Icon name='trash-2' size={26} style={{color: 'white'}}/>
             </Button>
           </Right>
         </Header>

        <Content style={{padding: 10}}>
         <Card transparent>
           <Form style={{marginBottom: 20}}>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input
               value={this.state.name}
               onChangeText={(text) => this.setState({name: text})}
              />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <Input
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone: text})}
                keyboardType='phone-pad'
              />
            </Item>
            <Item stackedLabel>
              <Label>Email (Optional)</Label>
              <Input
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
              />
            </Item>

            <Item stackedLabel>
              <Label>Address (Optional)</Label>
              <Input
                value={this.state.address}
                onChangeText={(text) => this.setState({address: text})}
              />
            </Item>

            <Item stackedLabel>
              <Label>Avatar (Optional)</Label>
              <Input
                value={this.state.avatar}
                onChangeText={(text) => this.setState({avatar: text})}
              />
            </Item>

          </Form>
          <Button
            danger
            block
            style={{marginBottom: 10}}
            onPress={() => this.__editContact(contact._id)}
          >
            {
              this.state.isPressed ? <ActivityIndicator size="large" color="#ddd" /> :
              <Text>Save contact</Text>
            }
          </Button>

         </Card>
        </Content>
      </Container>
    )
  }
}

export default connect((state) => ({}))(EditScreen)
