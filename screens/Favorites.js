import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/sushiSlice";
import { removeFavorite } from "../redux/favoritesSlice";
const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerStyle: {
        backgroundColor: "#F2F2F2",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center",
      },
      headerTitleAlign: "center",
    });
  }, []);
  {
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      <View style={{ marginLeft: 25, marginTop: 20 }}></View>
      {favorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30%",
          }}
        >
          <Text style={{ fontSize: 25, opacity: 0.5 }}>Nothing here</Text>
        </View>
      ) : (
        <FlatList
          vertically
          style={{
            marginTop: 25,
            marginLeft: 25,
            marginRight: 25,
          }}
          data={favorites}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Item", { item })}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: 2,
                  padding: 10,
                  height: 100,
                  width: "100%",
                  marginRight: 25,
                  backgroundColor: "#FFFFFF",
                  marginTop: 0,
                  marginBottom: 15,
                  borderRadius: 20,
                }}
              >
                <View style={{ height: "100%", width: "25%" }}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={item.img}
                  ></Image>
                </View>
                <View style={{ height: "100%", width: "50%" }}>
                  <Text style={{ fontSize: 18 }}>{item.title}</Text>
                  <View
                    style={{
                      display: "flex",
                      marginTop: 10,
                      flexDirection: "row",
                      gap: 3,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.price + " $"}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../icons/ratings.png")}
                      ></Image>
                      <Text style={{ fontSize: 20 }}>{item.rating}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: "20%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 10,
                  }}
                  onPress={() => {
                    dispatch(removeFavorite(item.key)),
                      dispatch(toggleFavorite(item.key));
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        objectFit: "contain",
                        opacity: 0.3,
                      }}
                      source={require("../icons/favoritesTrue.png")}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

export default Favorites;
