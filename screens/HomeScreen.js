import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  updateItemFavorite,
} from "../redux/favoritesSlice";
import { toggleFavorite } from "../redux/sushiSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  navigation = useNavigation();
  const sushi = useSelector((state) => state.sushi.sushi);
  const [category, setCategory] = useState([
    {
      key: "1",
      name: "Makizushi",
      id: "makizushi",
      img: require("../icons/makizushi.png"),
      status: true,
    },
    {
      key: "2",
      name: "Nigirizushi",
      id: "nigirizushi",
      img: require("../icons/nigirizushi.png"),
      status: false,
    },
    {
      key: "3",
      name: "Onigiri",
      id: "onigiri",
      img: require("../icons/onigiri.png"),
      status: false,
    },
  ]);

  const [currentCategory, setCurrentCategory] = useState("makizushi");

  const updateList = (item, index) => () => {
    let newArr = [...category];
    for (let i = 0; i < newArr.length; i++) {
      index === i ? (newArr[i].status = true) : (newArr[i].status = false);
    }
    if (item.id === "makizushi") {
      setCurrentCategory("makizushi");
    }
    if (item.id === "nigirizushi") {
      setCurrentCategory("nigirizushi");
    }
    if (item.id === "onigiri") {
      setCurrentCategory("onigiri");
    }
    setCategory(newArr);
  };

  const randomPopular = sushi[3];

  const handleFavorite = (item) => {
    dispatch(toggleFavorite(item.key));
    if (item.favorites) {
      dispatch(removeFavorite(item.key));
    } else {
      dispatch(addFavorite(item));
    }
    dispatch(updateItemFavorite(item.key));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View
          onTouchEnd={() => navigation.navigate("Welcome", { start: "start" })}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: 40,
            height: 20,
          }}
        >
          <Image
            source={require("../icons/geo.jpg")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.text}>Kyiv</Text>
        </View>
      ),
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

  return (
    <SafeAreaView style={{ backgroundColor: "#F2F2F2", flex: 1 }}>
      <View
        style={{
          height: 100,
          backgroundColor: "#B0464A",
          margin: 25,
          marginTop: 0,
          borderRadius: 25,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginLeft: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Promo 10%</Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Here your promo",
                `"GLORYTOUKRAINE"  - 10% on first order`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Get",
                  },
                ],
                { cancelable: false }
              );
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#C66566",
              height: 40,
              width: "80%",
              alignText: "center",
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Get promo</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: 150,
            height: 150,
            tintColor: "white",
            objectFit: "cover",
          }}
          source={require("../icons/dragon.png")}
        ></Image>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
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
          style={{ fontSize: 20, opacity: 0.6, height: 40 }}
          placeholder={"Search"}
        />
      </TouchableOpacity>

      <FlatList
        style={styles.categoryDiv}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={category}
        renderItem={({ item, index }) => {
          return (
            <View
              onTouchEnd={updateList(item, index)}
              key={item.key}
              style={[
                styles.category,
                item.status ? styles.category__true : styles.category__false,
              ]}
            >
              <Image style={styles.category__img} source={item.img}></Image>

              <Text style={styles.category__title}>{item.name}</Text>
            </View>
          );
        }}
      ></FlatList>

      <FlatList
        key={currentCategory}
        style={{
          marginTop: 25,
          marginLeft: 25,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sushi.filter((item) => item.id === currentCategory)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Item", { item })}
            >
              <View
                key={item.key}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: 10,
                  height: 280,
                  width: 225,
                  backgroundColor: "#FFFFFF",
                  marginTop: 0,
                  marginRight: 10,
                  borderRadius: 20,
                  paddingTop: 0,
                  paddingLeft: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    width: "100%",
                    paddingRight: 8,
                    paddingTop: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handleFavorite(item);
                    }}
                  >
                    <View>
                      <Image
                        source={
                          item.favorites
                            ? require("../icons/favoritesTrue.png")
                            : require("../icons/favoritesFalse.png")
                        }
                        style={{
                          width: 25,
                          height: 25,
                          objectFit: "contain",
                          opacity: 0.3,
                        }}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image
                    source={item.img}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />
                  <Text style={{ fontSize: 20, marginTop: 10 }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginRight: 10,
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{item.price + " $"}</Text>
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
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.key}
      ></FlatList>
      <View
        data={randomPopular}
        style={{
          gap: 10,
          marginTop: 20,
          marginLeft: 25,
          marginBottom: "20%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            opacity: 0.7,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Popular food
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Item", { randomPopular })}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 2,
            padding: 10,
            height: 100,
            marginRight: 25,
            backgroundColor: "#FFFFFF",
            marginTop: 0,
            borderRadius: 20,
          }}
        >
          <View>
            <Image
              style={{ width: 70, height: 70 }}
              source={randomPopular.img}
            ></Image>
          </View>
          <View>
            <Text style={{ fontSize: 18 }}>{randomPopular.title}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {randomPopular.price + " $"}
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
                <Text style={{ fontSize: 20 }}>{randomPopular.rating}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              randomPopular.favorites
                ? dispatch(removeFavorite(randomPopular.key))
                : dispatch(addFavorite(randomPopular));
              dispatch(toggleFavorite(randomPopular.key));
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
                source={
                  randomPopular.favorites
                    ? require("../icons/favoritesTrue.png")
                    : require("../icons/favoritesFalse.png")
                }
              ></Image>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  div: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    color: "#2f354b",
    textAlign: "center",
    height: 25,
  },
  categoryDiv: {
    marginLeft: 25,
  },
  category: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    height: 50,
    width: 150,
    backgroundColor: "#FFFFFF",
    marginTop: 0,
    borderRadius: 20,
    marginRight: 10,
  },
  category__true: {
    backgroundColor: "#FFFFFF",
  },
  category__false: {
    backgroundColor: "#F8F8F8",
  },
  category__title: {
    fontSize: 16,
  },
  category__img: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
