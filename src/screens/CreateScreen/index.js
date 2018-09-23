import React, {Component} from 'react'
import { Container, Content, Text, Button, Form, Input, Item, Label, Card, Icon } from 'native-base'
import axios from 'axios'
import {connect} from 'react-redux';
import {TouchableOpacity, ActivityIndicator, View, Clipboard} from 'react-native'
import {fetchContact} from './../../actions/contactAct'

class CreateScreen extends Component{
  state = {
    name: '',
    phone: '',
    avatar: '',
    isPressed: false,
    isInvalid: false
  }

  __AddContact = () => {
    let data = {
      "name": this.state.name,
      "phone": this.state.phone,
      "avatar": (this.state.avatar == '') ? null : this.state.avatar
    }
    this.setState({isPressed: true})
    setTimeout(() => {
      if(data.name != '' && data.phone != '' && data.avatar != ''){
        this.setState({isInvalid: false})
        axios.post('http://192.168.0.6:3000/api/contacts/', data)
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
              <Label>Avatar (Optional)</Label>
              <Input
                onChangeText={(text) => this.setState({avatar: text})}
              />
              <View style={{ position: 'absolute', right: 10}}>
                <Icon name="link" style={{fontSize: 30, color: '#555'}}
                  onPress={() => this.setState({avatar: Clipboard.getString()})}
                />
              </View>
            </Item>
          </Form>
          <Button
            success
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
          <Button
            warning
            block
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>Cancel</Text>
          </Button>
         </Card>
        </Content>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(CreateScreen)
