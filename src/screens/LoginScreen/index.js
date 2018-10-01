import React from 'react';
import { Container, Header, Content, Button, Text, Left, Right, Body, Title, Input, Form, Item, Label } from 'native-base'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import * as C from '../../assets/styles/colors';
import axios from 'axios';

class LoginScreen extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleButtonPress(){
    axios({
      method: 'POST',
      url: 'http://192.168.0.11:8000/api/login',
      data: this.state
    }).then(result => alert(JSON.stringify(result)))
  }

  render(){
    return (
      <Container>
          <Header
           style={{backgroundColor: C._BROWN}}
           androidStatusBarColor= {C._STATUSBAR}
          >
           <Left>
             <Button transparent onPress={() => this.props.navigation.pop()}>
                 <Icon name='arrow-left' size={26} style={{color: 'white'}}/>
             </Button>
           </Left>
           <Body>
             <Title>Login</Title>
           </Body>
           <Right>
             <Button transparent>
               <Icon name='search' size={26} style={{color: 'white'}}/>
             </Button>
           </Right>
         </Header>

         <Content>
           <Form>
             <Item fixedLabel>
               <Label>Username</Label>
               <Input onChangeText={user => this.setState({username: user})} />
             </Item>
             <Item fixedLabel last>
               <Label>Password</Label>
               <Input onChangeText={pass => this.setState({password: pass})} secureTextEntry={false}/>
             </Item>
           </Form>
           <Button success block large onPress={() => this.handleButtonPress()}>
              <Text>Login</Text>
           </Button>
         </Content>
      </Container>
    )
  }
}

export default withNavigation(LoginScreen)
