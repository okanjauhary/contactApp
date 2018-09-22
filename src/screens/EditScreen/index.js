import React, {Component} from 'react'
import { Container, Content, Text, Button, Form, Input, Item, Label, Card } from 'native-base'
import {TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux';
import axios from 'axios';
import {fetchContact, getContact} from './../../actions/contactAct'

class EditScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    title: "Edit contact"
  })
  state = {
    name: this.props.navigation.state.params.name,
    phone: this.props.navigation.state.params.phone,
    avatar: this.props.navigation.state.params.avatar,
    isPressed: false
  }

  handleDelete = (data) => {
    Alert.alert(
      'Hapus kontak',
      `Apakah kamu yakin ingin menghapus ${data.name}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.__deleteContact(data.id) }
      ]
    )
  }

  __deleteContact = (id) => {
      axios.delete(`http://rest.learncode.academy/api/sulhan/contacts/${id}`)
            .then( res => {
              this.props.dispatch(fetchContact())
              this.props.navigation.navigate('Home')
            })
  }

  __editContact = (id) => {
    let data = {
      "name": this.state.name,
      "phone": this.state.phone,
      "avatar": (this.state.avatar == '') ? this.props.navigation.state.params.avatar : this.state.avatar
    }

    let contact = this.props.navigation.state.params

    this.setState({isPressed: true})

    setTimeout(() => {
      axios.put(`http://rest.learncode.academy/api/sulhan/contacts/${id}`, data)
           .then(res => {
               if(contact.sc == "Home"){
                 this.props.dispatch(fetchContact())
               }

               if(contact.sc == "Detail"){
                 this.props.dispatch(getContact(contact.id))
               }

               this.props.navigation.pop()
           })
    }, 1000);
  }

  render(){

    const contact = this.props.navigation.state.params

    return(
      <Container>
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
              <Label>Avatar (Optional)</Label>
              <Input
                value={this.state.avatar}
                onChangeText={(text) => this.setState({avatar: text})}
              />
            </Item>
          </Form>
          <Button
            success
            block
            style={{marginBottom: 10}}
            onPress={() => this.__editContact(contact.id)}
          >
            {
              this.state.isPressed ? <ActivityIndicator size="large" color="#ddd" /> :
              <Text>Save contact</Text>
            }
          </Button>
          <Button
            danger
            block
            onPress={() => this.handleDelete(contact)}
          >
            <Text>Delete contact</Text>
          </Button>
         </Card>
        </Content>
      </Container>
    )
  }
}

export default connect((state) => ({}))(EditScreen)
