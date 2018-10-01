import React from 'react';
import { Container, Header, Content, Button, Text, Left, Right, Body, Title, Input, Form, Item, Label, Card, Toast } from 'native-base'
import { withNavigation } from 'react-navigation';
import { AsyncStorage, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as C from '../../assets/styles/colors';
import axios from 'axios';
import { cekLogin } from '../../helpers/auth';

class LoginScreen extends React.Component {
  constructor(){
      super()
      cekLogin()
        .then(res => this.setState({isLoggedIn: res}))
  }

  state = {
    username: '',
    password: '',
    isCorrectUser: true,
    isCorrectPass: true,
    errMessage: '',
    isLoggedIn: false
  }

  handleButtonPress(){
    if(this.state.username != '' && this.state.password != ''){
      let data = {username: this.state.username, password: this.state.password}
      axios.post('http://192.168.0.11:8000/api/login', data)
           .then(result => {
              if(!result.data.logged){
                  if(result.data.field == 'username'){
                    this.setState({
                      isCorrectUser: false,
                      isCorrectPass: true,
                    })
                  }else{
                    this.setState({
                      isCorrectUser: true,
                      isCorrectPass: false,
                    })
                  }
                  this.setState({errMessage: result.data.message})
              }else{
                  AsyncStorage.setItem('ACCESS_TOKEN', result.data.token)
                  this.props.navigation.navigate('App')
              }
           })
    }else{
      this.setState({
        isCorrectUser: false,
        isCorrectPass: false
      })
    }
  }

  render(){
    return (
      <Container>
          <Header
           style={{backgroundColor: C._BROWN}}
           androidStatusBarColor= {C._STATUSBAR}
          >
           <Left>
              {
                this.state.isLoggedIn ?
                   <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                       <Icon name='arrow-left' size={26} style={{color: 'white'}}/>
                   </Button>
                :
                <Text></Text>
              }
           </Left>
           <Body>
             <Title>{this.state.isLoggedIn ? '' : 'Login Screen'}</Title>
           </Body>
           <Right>
             <Button transparent>
               <Icon name='search' size={26} style={{color: 'white'}}/>
             </Button>
           </Right>
         </Header>

         <Content>
            {
              (this.state.isLoggedIn) ?
              <View>
                <Text>Anda sudah login</Text>
                <Button small warning onPress={() => {
                  AsyncStorage.removeItem('ACCESS_TOKEN')
                  this.setState({isLoggedIn: false})
                }}>
                  <Text>Logout</Text>
                </Button>
              </View>
              :
             <Card transparent style={{padding: 10}}>
               <Text>{this.state.errMessage}</Text>
               <Form style={{marginBottom: 20}}>
                 <Item fixedLabel style={{borderBottomColor: this.state.isCorrectUser ? '#ddd' : 'red'}}>
                   <Label style={{color: this.state.isCorrectUser ? '#555' : 'red'}}>Username</Label>
                   <Input onChangeText={user => this.setState({username: user})} />
                 </Item>
                 <Item fixedLabel style={{borderBottomColor: this.state.isCorrectPass ? '#ddd' : 'red'}}>
                   <Label style={{color: this.state.isCorrectPass ? '#555' : 'red'}}>Password</Label>
                   <Input onChangeText={pass => this.setState({password: pass})} secureTextEntry={false}/>
                 </Item>
               </Form>
               <Button success block large onPress={() => this.handleButtonPress()}>
                  <Text>Login</Text>
               </Button>
             </Card>
           }
         </Content>
      </Container>
    )
  }
}

export default withNavigation(LoginScreen)
