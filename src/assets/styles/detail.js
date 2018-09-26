import {StyleSheet} from 'react-native'
import * as C from '../../assets/styles/colors'

const styles = StyleSheet.create({
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageRounded: {
    height: 120,
    width: 120,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 60,
  },
  contactName: {
    alignItems: 'center',
    marginTop: 15
  },
  body: {
    position: 'relative',
    backgroundColor: C._DIRTYWHITE,
    padding: 10
  },
  cardHeader: {
    flexDirection: 'row'
  },
  buttonEdit: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999,
    right: 30,
    bottom: 40,
    elevation: 4,
    backgroundColor: C._ORANGE
  }
})

export default styles
