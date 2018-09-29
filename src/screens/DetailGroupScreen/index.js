import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Text, Button, Body, Left, Header, Right, Title, Card, CardItem, Item, Input, ListItem } from 'native-base';
import { StyleSheet, View, Image, Dimensions, ScrollView, Modal, ListView, FlatList } from 'react-native';
import CheckBox from 'react-native-checkbox';
import axios from 'axios';
import { Transition } from 'react-navigation-fluid-transitions';
import * as C from '../../assets/styles/colors';
import styles from './../../assets/styles/detailGroup';
import { getGroup } from './../../actions/groupAct';
import { fetchContact } from './../../actions/contactAct';
import Config from '../../../config/config';

class DetailGroupScreen extends Component{
  state = {
    isModalVisible: false,
    isChecked: false,
    dataContact: [],
    isBtnAddPressed: false
  }

  componentDidMount(){
    this.props.dispatch(fetchContact())
  }

  renderContactList = (item) => {
    let isContactNotExistInGroup = true
    let contactInGroup = this.props.group.group.contacts

    for(let i = 0; i < contactInGroup.length; i++){
      if(contactInGroup[i]._id == item._id){
        isContactNotExistInGroup = false
        break
      }
    }

    if(isContactNotExistInGroup){
      return(
        <ListItem>
          <CheckBox
            label={item.name}
            checked={this.isChecked}
            onChange={(check) => this.handleCheckBox(check, item._id)}
          />
        </ListItem>
      )
    }else{
      return false
    }
  }

  handleCheckBox = (check, id) => {
    let data = this.state.dataContact
    if(check){
      data.push(id)
    }else{
      data.splice(data.indexOf(id), 1)
    }
    this.setState({dataContact: data})
    this.setState({isChecked: !check})
  }

  handleAddGroup = () => {
    if(this.state.dataContact.length > 0){
      let data = {contacts: this.state.dataContact}
      axios.put(Config.getAPI('groups', this.props.group.group._id), data)
      .then(success => {
        this.props.dispatch(getGroup(this.props.group.group._id))
        this.setState({isModalVisible: false})
      })
    }
  }

  renderContact = ({item, index}) => (
    <View style={styles.renderContact}>
        <Text style={[styles.text, {fontSize: 20}]}>{item.name}</Text>
        <Button
          transparent
          onPress={() => this.removeContactFromGroup(this.props.group.group._id, item._id)}
          style={styles.btnRemoveContact}>
            <Icon name="minus-circle" style={styles.text} size={20}/>
        </Button>
    </View>
  )

  removeContactFromGroup = (groupId, contactId) => {
    axios.put(Config.getAPI('groups', `${groupId}/contact`), {contactId: contactId})
      .then(success => {
            this.props.dispatch(getGroup(this.props.group.group._id))
      })
  }

  countContact = (group) => {
    return 0
  }

  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const group = this.props.group.group
    return(
      <Container style={{backgroundColor: C._BROWN}}>
        <Header
           style={{backgroundColor: C._BROWN}}
           androidStatusBarColor= {C._STATUSBAR}
          >
           <Left>
             <Button transparent onPress={() => {
               this.props.navigation.pop()
             }}>
              <Transition shared="btn-left">
               <Icon name='arrow-left' size={26} style={{color: 'white'}}/>
              </Transition>
             </Button>
           </Left>
           <Body>
             <Title>Judul group</Title>
           </Body>
           <Right>
             <Button transparent>
               <Icon name='trash-2' size={26} style={{color: 'white'}}/>
             </Button>
             <Button transparent onPress={() => this.setState({isModalVisible: true})}>
               <Icon name='plus' size={26} style={{color: 'white'}}/>
             </Button>
           </Right>
         </Header>
        <Content>

          <View style={styles.body}>
              <View style={styles.titleGroup}>
                  <Text style={styles.titleGroupText}>{group.name}</Text>
              </View>

              <FlatList
                data={group.contacts}
                renderItem={this.renderContact}
                keyExtractor={(_, index) => `${index}`}
              />
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <Card transparent>
              <CardItem>
                <Body>
                  <Item>
                    <Input placeholder="search conrtact" />
                  </Item>
                </Body>
              </CardItem>
              <ListView
                  dataSource={ds.cloneWithRows(this.props.contact.data)}
                  renderRow={item => this.renderContactList(item)}
              />
            </Card>
          <View style={styles.buttonModal}>
            <Button
              warning
              style={styles.buttonModalItem}
              onPress={() => this.setState({isModalVisible: false})}>
              <Text>Cancel</Text>
            </Button>
            <Button
              success
              style={styles.buttonModalItem}
              onPress={() => this.handleAddGroup()}>
              {
                this.state.isBtnAddPressed ? <Text>Adding...</Text> : <Text>Add to group</Text>
              }
            </Button>
          </View>
        </Modal>
        </Content>
      </Container>
    )
  } // render
} // class

const mapStateToProps = (state) => ({
  group : state.group,
  contact: state.contact
})


export default connect(mapStateToProps)(DetailGroupScreen)
