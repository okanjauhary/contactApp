import React, { Component } from 'react';
import {
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  List,
  Button,
  Icon
} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';
import { TouchableOpacity, ListView, View, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import {fetchContact, deleteContact} from './../../../actions/contactAct';

class ContactLists extends Component {

  handleDelete = (data) => {
    Alert.alert(
      'Hapus kontak',
      `Apakah kamu yakin ingin menghapus ${data.name}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.__deleteContact(data.id)}
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

  render() {
    const data = this.props.data
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    return (
      <View>
        <List
              leftOpenValue={75}
              rightOpenValue={-75}
              dataSource={ds.cloneWithRows(data)}
              renderRow={rowData =>(
                <TouchableOpacity>
                    <ListItem
                      avatar
                      onPress={() => this.props.navigation.navigate('Detail', rowData)}
                      style={{paddingLeft: 10}}
                    >
                      <Left>
                        <Thumbnail source={{uri: rowData.avatar}} />
                      </Left>
                      <Body>
                        <Text>{rowData.name}</Text>
                        <Text note>{rowData.phone}</Text>
                      </Body>
                    </ListItem>
                </TouchableOpacity>
              )}
              renderLeftHiddenRow={rowData =>
                <Button success full onPress={() => this.props.navigation.push('Edit', {...rowData, sc: "Home"})}>
                  <Icon active name="create" />
                </Button>}
              renderRightHiddenRow={(rowData, secId, rowId, rowMap) =>
                <Button full danger onPress={ () => this.handleDelete(rowData)}>
                  <Icon active name="trash" />
                </Button>}
          />
        </View>
    );
  }
}

export default connect((state) => ({}))(withNavigation(ContactLists))
