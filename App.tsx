import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

export default function MikuButton() {

  const scale = useRef(new Animated.Value(1)).current;
  const imgs = {
    miku: require('./src/miku.png'),
    neru: require('./src/neru.png'),
    teto: require('./src/teto.png'),
  };

  const [mikuClicks, setMikuClicks] = useState(0);
  const [neruClicks, setNeruClicks] = useState(0);
  const [tetoClicks, setTetoClicks] = useState(0);

  const [mensagem, setMensagem] = useState("Clique na Miku!");

  function mudarMensagem(num: number) {
    setMensagem("Você clicou " + num + " vezes!");
  }

  const cores = {
    miku: "#0df",
    neru: "#fd0",
    teto: "#f00",
  };

  const [selecao, setSelecao] = useState(0);
  const ArrayPersonagems = [
    { nome: "Miku", img: imgs.miku, cor: cores.miku, cliks: mikuClicks },
    { nome: "Neru", img: imgs.neru, cor: cores.neru, cliks: neruClicks },
    { nome: "Teto", img: imgs.teto, cor: cores.teto, cliks: tetoClicks },
  ] 

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      speed: 100,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 100,
      bounciness: 0,
      useNativeDriver: true,
    }).start();

    if (selecao === 0) {
      setMikuClicks(mikuClicks + 1);
    } else if (selecao === 1) {
      setNeruClicks(neruClicks + 1);
    } else if (selecao === 2) {
      setTetoClicks(tetoClicks + 1);
    }
  };

  return (
    <View style={styles.screen}>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10 }}>
          Feito por Pedro MiguelF
        </Text>
        <Text style={{ fontSize: 20, marginBottom: 10}}>
          {ArrayPersonagems[selecao].nome}
        </Text>
      </View>
      <Pressable
        style={[styles.screen, { backgroundColor: ArrayPersonagems[selecao].cor }]}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        <Animated.Image
          source={ArrayPersonagems[selecao].img}
          style={{
            width: 250,
            height: 250,
            transform: [{ scale }],
          }}
        />
      </Pressable>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, margin: 20, backgroundColor: ArrayPersonagems[selecao].cor }}>
          {ArrayPersonagems[selecao].cliks}
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={{ backgroundColor: ArrayPersonagems[(selecao + 1) % 3].cor, padding: 10, borderRadius: 5 }} onPress={() => setSelecao((selecao + 1) % 3)}>
            <Text>{ArrayPersonagems[(selecao + 1) % 3].nome}</Text>
          </TouchableOpacity>
          <Button title="Mensagem!" onPress={() => mudarMensagem(ArrayPersonagems[selecao].cliks)} />

        </View>
        
        <Text style={{ fontSize: 20, margin: 15 }}>
          {mensagem}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});