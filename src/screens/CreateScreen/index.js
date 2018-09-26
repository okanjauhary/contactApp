import React, {Component} from 'react'
import { Container, Content, Text, Button, Form, Input, Item, Label, Card, Header, Right, Left, Title, Body } from 'native-base'
import axios from 'axios'
import {connect} from 'react-redux';
import { ActivityIndicator, View, Clipboard} from 'react-native'
import {fetchContact} from './../../actions/contactAct'
import * as C from '../../assets/styles/colors';
import {Transition} from 'react-navigation-fluid-transitions';
import Icon from 'react-native-vector-icons/Feather';

class CreateScreen extends Component{
  state = {
    name: '',
    phone: '',
    avatar: '',
    email: '',
    address: '',
    isPressed: false,
    isInvalid: false
  }

  __AddContact = () => {
    let data = {
      "name": this.state.name,
      "phone": this.state.phone,
      "email": (this.state.email == '') ? null : this.state.email,
      "avatar": (this.state.address == '') ? null : this.state.address,
      "avatar": (this.state.avatar == '') ? null : this.state.avatar
    }
    this.setState({isPressed: true})
    setTimeout(() => {
      if(data.name != '' && data.phone != ''){
        this.setState({isInvalid: false})
        axios.post('http://192.168.0.11:3000/api/contacts/', data)
            .then(res => {
              this.props.dispatch(fetchContact())
              this.props.navigation.navigate('Home')
            })
      }else{
        this.setState({isPressed: false})
        this.setState({isInvalid: true})
      }
    }, 1000);

  }

  render(){

    const {isInvalid, name, phone} = this.state;

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
              <Title>Create contact</Title>
           </Body>
           <Right>
             <Button transparent onPress={() => this.props.navigation.pop()}>
               <Text style={{color: '#fff', fontWeight: 'bold'}}>Batal</Text>
             </Button>
           </Right>
         </Header>


        <Content style={{padding: 10}}>
         <Card transparent>

           <Form style={{marginBottom: 20}}>
            <Item stackedLabel
              style={{borderBottomColor: (isInvalid && name == '') ? '#a72626' : '#ccc'}}
            >
              <Label style={{color: (isInvalid && name == '') ? '#ac3f3f' : '#555'}}>Name</Label>
              <Input
                onChangeText={(text) => this.setState({name: text})}
              />
            </Item>
            <Item stackedLabel
              style={{borderBottomColor: (isInvalid && phone == '') ? '#a72626' : '#ccc'}}
            >
              <Label style={{color: (isInvalid && phone == '') ? '#ac3f3f' : '#555'}}>Phone</Label>
              <Input
                onChangeText={(text) => this.setState({phone: text})}
                keyboardType='phone-pad'
              />
            </Item>
            <Item stackedLabel>
              <Label>Email (Optional)</Label>
              <Input
                onChangeText={(text) => this.setState({email: text})}
                keyboardType='email-address'
              />
            </Item>

            <Item stackedLabel>
              <Label>Address (Optional)</Label>
              <Input
                onChangeText={(text) => this.setState({address: text})}
              />
            </Item>

            <Item stackedLabel>
              <Label>Avatar (Optional)</Label>
              <Input
                onChangeText={(text) => this.setState({avatar: text})}
              />
              <View style={{ position: 'absolute',top: 10, right: 10}}>
                <Icon name="clipboard" size={25} style={{color: '#555'}}
                  onPress={() => this.setState({avatar: Clipboard.getString()})}
                />
              </View>
            </Item>

          </Form>

          <Transition shared="tab-to-btn">
            <Button
              warning
              block
              style={{marginBottom: 10}}
              onPress = {this.__AddContact}
              disabled={this.state.isPressed}
            >
              {
                this.state.isPressed ? <ActivityIndicator size="large" color="#ddd" /> :
                <Text>Add Contact </Text>
              }
            </Button>
          </Transition>
         </Card>
        </Content>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CreateScreen)
