import {StyleSheet, Dimensions} from 'react-native';
import * as C from './colors';

export const styles = StyleSheet.create({
  buttonAdd: {
    width: 55,
    height: 55,
    backgroundColor: C._ORANGE,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    bottom: 40,
    elevation: 4
  },
  noData: {
    height: Dimensions.get('window').height/2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconNoData: {
    color: '#fff',
    backgroundColor: '#eee',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  btnAddNoData: {
    backgroundColor: C._ORANGE,
    alignSelf: 'center',
    marginTop: 15
  },
  modalParent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
    borderColor: '#eee',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000',
    opacity: .8
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  btnModalCancel: {
    marginRight: 10,
    backgroundColor: C._ORANGE
  },
  btnModalAdd: {
    backgroundColor: C._BROWN
  }
})
