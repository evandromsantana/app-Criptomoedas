import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useWebSocket  from 'react-use-websocket';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements';
import { Feather as Icon } from '@expo/vector-icons';

export default function App() {

  const [data, setData] = useState({});
  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if(lastJsonMessage){
        setData(lastJsonMessage);
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true,
    reconnectInterval: 3000
  })

  const searchButton = <Icon.Button 
  name="search" 
  size={24}
  color="#1ed760" 
  backgroundColor="transparent"
  onPress={evt => setSymbol(text.toLocaleLowerCase())}
  />

  return (
    <View style={styles.container}>
      <Text h1>CryptoSantana</Text>
      <Input 
        autoCapitalize='characters' 
        leftIcon={<Icon name="dollar-sign" size={24} color="#1ed760" />}      
        rightIcon={searchButton} 
        value={text} 
        onChangeText={setText} />

      <View style={styles.linha}>
          <Text style={styles.rotulo}>Símbolo:</Text>
          <Text style={styles.conteudo}>{data.s}</Text>
      </View> 

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Preço Atual:</Text>
        <Text style={styles.conteudo}>{data.c}</Text>
      </View>       

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Variação:</Text>
        <Text style={styles.conteudo}>{data.P}%</Text>
      </View>  
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Volume:</Text>
        <Text style={styles.conteudo}>{data.v}</Text>
      </View>      
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
     flexDirection: 'column',
     marginTop: 40,
     margin: 20,
     alignContent: 'center',     
  },  
  rotulo: {
    fontWeight: 'bold',
    color: "#00b228",
    fontSize: 18,
    marginTop: 20    
  },
  conteudo: {
    fontSize: 18,
    color: "#ff7a00",
    marginTop: 20,
    marginLeft: 10
  },
  linha: {
    flexDirection: 'row',
    width: '100%'
  }
});
