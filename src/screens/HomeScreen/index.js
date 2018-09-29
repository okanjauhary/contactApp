import React, { Component } from 'react';
import { View, FlatList, Dimensions, Modal } from 'react-native'
import { Container, Header, Content, ListItem, Button, Thumbnail, Text, Left, Right, Body, Title, Tabs, Tab, TabHeading, Input, Form, Item } from 'native-base'
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux'
import { Transition } from 'react-navigation-fluid-transitions';
import axios from 'axios';
import * as C from '../../assets/styles/colors';
import { styles } from '../../assets/styles/home';
import Config from '../../../config/config';
import { fetchContact, getContact } from './../../actions/contactAct'
import { fetchGroup, getGroup } from './../../actions/groupAct'


class HomeScreen extends Component {
  state = {
      isModalVisible: false,
      inpGroup: ''
  }

  componentDidMount(){
    this.props.dispatch(fetchContact())
    this.props.dispatch(fetchGroup())
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

  renderGroupList = ({item, index}) => (
    <ListItem onPress={() => {
      this.props.dispatch(getGroup(item._id))
      this.props.navigation.push('DetailGroup')
    }}>
        <Text>{item.name}</Text>
    </ListItem>
  )

  handleAddGroup = () => {
    if(this.state.inpGroup != ''){
      axios.post(Config.getAPI('groups'), {name: this.state.inpGroup})
        .then(res => {
            this.props.dispatch(fetchGroup())
            this.setState({isModalVisible: false})
        })
    }else{
        this.setState({isModalVisible: false})
    }
  }

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

            <View style={{minHeight: Dimensions.get('screen').height - 180}}>
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

                <Button
                    rounded
                    style={styles.buttonAdd}
                    onPress={() => this.props.navigation.push('Create')}
                  >
                    <Icon name="user-plus" style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}/>
                </Button>
              </View>

            </Tab>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: C._ORANGE}}>
                   <Text style={{color: '#fff'}}>Groups</Text>
                 </TabHeading>
               }>

               <View style={{minHeight: Dimensions.get('screen').height - 180}}>
                 {
                   (this.props.group.groups.length > 0) ?
                     <FlatList
                       data={this.props.group.groups}
                       renderItem={this.renderGroupList}
                       keyExtractor={(_, index) => `${index}`}
                     /> :

                     <View style={styles.noData}>
                        <Icon name='user' size={60} style={styles.iconNoData} />
                        <Text style={{fontSize: 25, color: '#ddd'}}>No groups</Text>
                        <Button
                         small style={styles.btnAddNoData}
                         onPress={() => this.props.navigation.push('Create')}
                        >
                           <Text>Add new group</Text>
                        </Button>
                     </View>
                 }
                 <Button
                     rounded
                     style={styles.buttonAdd}
                     onPress={() => this.setState({isModalVisible: true})}
                   >
                     <Icon name="plus" style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}/>
                 </Button>
              </View>
              <Modal
                 visible={this.state.isModalVisible}
                 transparent={true}
                 animationType='fade'
                 onRequestClose={() => alert("modal closed")}>
                 <View style={styles.modalParent}>
                   <View style={styles.modalBackground}></View>
                   <View style={styles.modalContent}>
                     <Form style={{marginBottom: 10}}>
                        <Item>
                          <Input
                            placeholder="add new group"
                            onChangeText={(text) => this.setState({inpGroup: text})}/>
                        </Item>
                     </Form>
                     <View style={styles.modalButton}>
                       <Button
                          small
                          style={styles.btnModalCancel}
                          onPress={() => this.setState({isModalVisible: false})}>
                          <Text>Cancel</Text>
                       </Button>
                       <Button
                          small
                          style={styles.btnModalAdd}
                          onPress={this.handleAddGroup}>
                          <Text>Add</Text>
                       </Button>
                     </View>
                   </View>
                 </View>
               </Modal>
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

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    contact: state.contact,
    group: state.group
  }
}

export default connect(mapStateToProps)(HomeScreen)
