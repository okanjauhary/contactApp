import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    flexDirection: 'row',
  },
  body: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'relative',
    zIndex: 9,
    top: -20
  },
  name: {
    position: 'absolute',
    bottom: 40,
    left: 20
  },
  content: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  contentLabel: {
    color: '#bbb',
    fontSize: 15,
    marginBottom: 15
  },
  buttonEdit: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999,
    right: 30,
    bottom: 40,
    elevation: 4
  },
})

export default styles
