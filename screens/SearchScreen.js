import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const SearchScreen = () => {
  const sushi = useSelector((state) => state.sushi.sushi);
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("");
  const textInputRef = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#F2F2F2",
      },
      headerTitle: "",
    });
    textInputRef.current.focus();
  }, []);

  // Фільтруємо масив суші за назвою відповідно до введеного тексту користувачем, сортуємо за ціною або рейтингом
  const filteredSushi = sushi
    .filter((item) => item.title.toLowerCase().includes(input.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  // Обробник події для сортування за ціною
  const handleSortByPrice = () => {
    sortBy === "price" ? setSortBy("") : setSortBy("price");
  };
  // Обробник події для сортування за рейтингом
  const handleSortByRating = () => {
    sortBy === "rating" ? setSortBy("") : setSortBy("rating");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      <View style={{ marginLeft: 25, marginTop: 0 }}></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: 20,
          height: 60,
          backgroundColor: "#FFFFFF",
          marginTop: 0,
          margin: 25,
          borderRadius: 25,
        }}
      >
        <Image
          source={require("../icons/find.png")}
          style={{ width: 20, height: 20, opacity: 0.6, objectFit: "contain" }}
        />
        <TextInput
          ref={textInputRef}
          value={input}
          onChangeText={(text) => setInput(text)}
          style={{ fontSize: 20, opacity: 0.6, height: 40 }}
          placeholder={"Search"}
        />
      </View>

      <View style={{ marginLeft: 25 }}>
        <Text
          style={{
            fontSize: 20,
            opacity: 0.7,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Sort by
        </Text>
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 30 }}
        >
          <TouchableOpacity
            onPress={handleSortByPrice}
            key={"price"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: sortBy === "price" ? "#FFFFFF" : "#E4E4E4",
              height: 50,
              width: 140,
              borderRadius: 25,
              padding: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>$</Text>
            <Text style={{ fontSize: 17 }}>{"Price"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSortByRating}
            key={"rating"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: sortBy === "rating" ? "#FFFFFF" : "#E4E4E4",
              height: 50,
              width: 140,
              borderRadius: 25,
              padding: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../icons/ratings.png")}
              style={{
                width: 20,
                height: 20,
                objectFit: "contain",
                opacity: 0.8,
              }}
            />
            <Text style={{ fontSize: 17 }}>{"Rating"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {filteredSushi.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginBottom: "30%",
          }}
        >
          <Text style={{ fontSize: 20, opacity: 0.5 }}>Nothing found</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: 25,
            marginRight: 25,
          }}
          data={filteredSushi}
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
                <View style={{ height: "100%", width: "25%", paddingTop: 5 }}>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={item.img}
                  ></Image>
                </View>
                <View style={{ height: "100%", width: "50%", paddingTop: 10 }}>
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
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
