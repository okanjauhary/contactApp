import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Text, Button, Body, Left, Header, Right, Title, Card, CardItem } from 'native-base';
import { StyleSheet, View, Image, Dimensions, Modal } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import * as C from '../../assets/styles/colors';
import styles from './../../assets/styles/detail';
import { fetchContact } from './../../actions/contactAct';

class DetailContactScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      isModalVisible : false
    }
  }

  renderEmailCard = (email) => {
    if(email == null){
        return false
    }

    return (
      <Transition appear="left" disappear="bottom" >
        <Card>
            <CardItem style={styles.cardHeader}>
              <Icon name="mail" size={18}/>
              <Text note style={{marginLeft: 10}}>Email</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {email}
                </Text>
              </Body>
            </CardItem>
         </Card>
        </Transition>
    )
  } // renderEmailCard

  render(){
    const contact = this.props.contact.member
    return(
      <Container>

        <Header
           style={{backgroundColor: C._BROWN}}
           androidStatusBarColor= {C._STATUSBAR}
          >
           <Left>
             <Button transparent onPress={() => {
               this.props.dispatch(fetchContact())
               this.props.navigation.pop()
             }}>
              <Transition shared="btn-left">
               <Icon name='arrow-left' size={26} style={{color: 'white'}}/>
              </Transition>
             </Button>
           </Left>
           <Body>
             <Title>{contact.name}</Title>
           </Body>
           <Right>
             <Button transparent>
               <FontAwesome name='star-o' size={26} style={{color: "#eee"}}/>
             </Button>
             <Button transparent onPress={() => this.setState({isModalVisible: true})}>
               <Icon name='more-vertical' size={26} style={{color: 'white'}}/>
             </Button>
           </Right>
         </Header>

         <Modal
            visible={this.state.isModalVisible}
            transparent={true}
            animationType='fade'
            onRequestClose={() => alert("modal closed")}>
            <View style={styles.modalParent}>
              <View style={styles.modalBackground}></View>
              <View style={styles.modalContent}>
                <Text style={{fontWeight: 'bold', marginBottom: 15}}>Tambah group</Text>
                <Button onPress={() => this.setState({isModalVisible: false})}>
                  <Text>hide</Text>
                </Button>
              </View>
            </View>
          </Modal>

        <Content>
          <View style={{position: 'relative'}}>
            <Image
              source={{uri: contact.avatar || 'https://cdn.pixabay.com/photo/2017/08/05/12/05/wet-2583009_960_720.jpg'}}
              style={{width: '100%', height: Dimensions.get('window').height/2, opacity: .8}}
              resizeMode='cover'
              blurRadius={10}
            />

            <View style={styles.imageHeader}>
              <Transition shared={`image${this.props.navigation.state.params.index}`}>
                <View>
                  <Image
                    style={styles.imageRounded}
                    source={{uri: contact.avatar || 'https://startupsclub.com/image/user-default.png'}}/>
                </View>
              </Transition>

              <Transition appear='scale' >
                <View style={styles.contactName}>
                  <Text style={{color: '#000', fontSize: 30}}>{contact.name}</Text>
                  <Text style={{fontSize: 20, color: '#eee'}}>{contact.address || 'Unknown'}</Text>
                </View>
              </Transition>

            </View>
          </View>

          <View style={styles.body}>

            <Transition appear="left" disappear="bottom" >
               <Card>
                   <CardItem style={styles.cardHeader}>
                     <Icon name="phone" size={18}/>
                     <Text note style={{marginLeft: 10}}>Phone</Text>
                   </CardItem>
                   <CardItem>
                     <Body>
                       <Text>
                         {contact.phone}
                       </Text>
                     </Body>
                   </CardItem>
                </Card>
            </Transition>

              {
                this.renderEmailCard(contact.email)
              }

            <Transition appear="left" disappear="bottom" >
              <Card>
                <CardItem style={styles.cardHeader}>
                  <Icon name="user" size={18}/>
                  <Text note style={{marginLeft: 10}}>About {contact.name}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text note>
                      No data
                    </Text>
                  </Body>
                </CardItem>
             </Card>
            </Transition>

            <Transition appear="left" disappear="bottom">
             <Card>
               <CardItem style={styles.cardHeader}>
                 <Icon name="clock" size={18}/>
                 <Text note style={{marginLeft: 10}}>History</Text>
               </CardItem>
               <CardItem>
                 <Body>
                   <Text note>
                     No data
                   </Text>
                 </Body>
               </CardItem>
              </Card>
            </Transition>

          </View>
        </Content>

        <Button
            rounded
            style={styles.buttonEdit}
            onPress={ () => this.props.navigation.push('Edit', {...contact, sc: "Detail"})}
        >
            <Icon name="edit-2" style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}/>
        </Button>

      </Container>
    )
  } // render
} // class

const mapStateToProps = (state) => ({
  contact : state.contact
})


export default connect(mapStateToProps)(DetailContactScreen)
