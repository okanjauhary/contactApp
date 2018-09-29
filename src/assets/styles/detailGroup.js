import {StyleSheet, Dimensions} from 'react-native'
import * as C from '../../assets/styles/colors'

const styles = StyleSheet.create({
  text: {
    color: C._DIRTYWHITE
  },
  body: {
    padding: 20
  },
  titleGroup: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#9c564b',
    borderStyle: 'dotted'
  },
  titleGroupText: {
    fontSize: 40,
    color: C._DIRTYWHITE
  },
  titleGroupMember: {
    fontSize: 16,
    color: C._DIRTYWHITE,
    opacity: .5
  },
  buttonModal: {
    position: 'absolute',
    zIndex: 9999,
    bottom: 0,
    flexDirection: 'row'
  },
  buttonModalItem: {
    width: Dimensions.get('screen').width/2,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  renderContact: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9c564b',
    flexDirection: 'row'
  },
  btnRemoveContact: {
    position: 'absolute',
    right: 0,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
