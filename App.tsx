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
    <View style={[styles.screen, {backgroundColor: "#000"}]}>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10, color: ArrayPersonagems[selecao].cor }}>
          Feito por Pedro MiguelF e Lorenzo
        </Text>
        <Text style={{ fontSize: 20, marginBottom: 10, color: ArrayPersonagems[selecao].cor}}>
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
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#000" }}>
        <Text style={{ fontSize: 20, margin: 20, backgroundColor: "#000", color: ArrayPersonagems[selecao].cor }}>
          {ArrayPersonagems[selecao].cliks}
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 35, backgroundColor: "#000" }}>
          <TouchableOpacity style={{ backgroundColor: "#000", padding: 10, borderColor: ArrayPersonagems[(selecao + 1) % 3].cor, borderWidth: 1, borderRadius: 5}} onPress={() => setSelecao((selecao + 1) % 3)}>
            <Text style={{color: ArrayPersonagems[(selecao + 1) % 3].cor}}>{ArrayPersonagems[(selecao + 1) % 3].nome}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#000", borderColor: ArrayPersonagems[selecao].cor, borderWidth: 1, padding: 10, borderRadius: 5 }} onPress={() => {
            if (selecao === 0) {
              setMikuClicks(mikuClicks - 1);
            } else if (selecao === 1) {
              setNeruClicks(neruClicks - 1);
            } else if (selecao === 2) {
              setTetoClicks(tetoClicks - 1);
            }
          }}>
            <Text style={{color: ArrayPersonagems[selecao].cor}}>-1 Cliks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#000", borderColor: "#fff", borderWidth: 1, padding: 10, borderRadius: 5}} onPress={() => {
            if (selecao === 0) {
              setMikuClicks(0);
            } else if (selecao === 1) {
              setNeruClicks(0);
            } else if (selecao === 2) {
              setTetoClicks(0);
            }
          }}>
            <Text style={{color: "#fff"}}>Resetar</Text>
          </TouchableOpacity>
        </View>
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