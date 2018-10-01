import { AsyncStorage } from 'react-native';

export function cekLogin(){
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('ACCESS_TOKEN', (err, token) => {
      if(err) reject(err)
      if(token){
        resolve(true)
      }else{
        resolve(false)
      }
    })
  })
}
