import React, {Component} from 'react'
import { Container, Content, Text, Button, Form, Input, Item, Label, Card, Icon, Grid, Col, Row, List, ListItem, Body, Left, Header, Right, Title} from 'native-base'
import {TouchableOpacity, StyleSheet, View, Image, ActivityIndicator} from 'react-native'
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import styles from './../../assets/styles/detail'
import {getContact} from './../../actions/contactAct'

class DetailContactScreen extends Component{

  state = {
    imageY : 0,
    isImageGone: false,
  }

  componentDidMount(){
    this.props.dispatch(getContact(this.props.navigation.state.params._id))
  }

  __imageParallax = e => {
    let y = Number(e.nativeEvent.contentOffset.y)
    this.setState({imageY: y/5})
    if(y > 235){
      this.setState({isImageGone: true})
    }else{
      this.setState({isImageGone: false})
    }
  }

  render(){
    const contact = this.props.contact.member
    const stylingHeader = {
      backgroundColor: (this.state.isImageGone)? 'white': 'transparent',
      elevation: this.state.isImageGone ? 5 : 0
    }

    if(this.props.contact.fetching){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <ActivityIndicator size="large" color="#4e4e4e" />
        </View>
      )
    }

    return(
      <Container>
        <View style={[styles.header, stylingHeader]}>
          <Button transparent style={{height: 60}}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrow-back" style={{color: this.state.isImageGone ? '#000' : '#fff'}} />
          </Button>
          <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <Text>{this.state.isImageGone ? contact.name : ''}</Text>
          </View>
          <Button transparent style={{height: 60, position: 'absolute', right:0}}>
            <Icon name="more" style={{color: this.state.isImageGone ? '#000' : '#fff'}} />
          </Button>
        </View>

        <Content
          onScroll={this.__imageParallax}
        >
         <View style={{position: 'relative'}}>
          <Image source={{uri: (contact.avatar == null) ? 'https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png' : contact.avatar}} style={ {
            width: `100%`,
            height: 350,
            position: 'relative',
            top: this.state.imageY
          }} />
          <View style={styles.name}>
            <Text style={{color: 'white', fontSize: 35}}>{contact.name}</Text>
          </View>
         </View>
         <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.contentLabel}>Phone number</Text>
            <Text style={{fontSize: 20}}>{contact.phone}</Text>
          </View>
          <View style={styles.content}>
            <Grid>
              <Col>
                <TouchableOpacity style={{alignItems:'center'}}>
                  <Icon name="call" style={{marginBottom: 10, color:'#3e9dc3'}}/>
                  <Text style={{color: '#a5cddd'}}>Call</Text>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity style={{alignItems:'center'}}>
                  <Icon name="chatboxes" style={{marginBottom: 10, color:'#3e9dc3'}}/>
                  <Text style={{color: '#a5cddd'}}>Message</Text>
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity style={{alignItems:'center'}}>
                  <Icon name="videocam" style={{marginBottom: 10, color:'#3e9dc3'}}/>
                  <Text style={{color: '#a5cddd'}}>Video Call</Text>
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>

          <View style={styles.content}>
            <Text style={styles.contentLabel}>About {contact.name}</Text>
            <List>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="mail" />
                  </Button>
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <Text>{contact.name}@gmail.com</Text>
                </Body>
              </ListItem>
            </List>
          </View>

          <View style={styles.content}>
            <Text style={styles.contentLabel}>History</Text>
            <Text note style={{fontSize: 18}}>No History</Text>
          </View>

         </View>
         <View style={{height: 100}}></View>
        </Content>
        <Button
            success
            rounded
            style={styles.buttonEdit}
            onPress={ () => this.props.navigation.push('Edit', {...contact, sc: "Detail"})}
        >
            <Icon name="create" style={{fontSize: 35, fontWeight: 'bold'}}/>
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  contact : state.contact
})

export default connect(mapStateToProps)(withNavigation(DetailContactScreen))
