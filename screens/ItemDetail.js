import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { toggleFavorite } from "../redux/sushiSlice";
import { addToCart, updateItemCart } from "../redux/cartSlice";
import VerticalText from "react-native-vertical-text";

const ItemDetail = (globalItem) => {
  const dispatch = useDispatch();
  const item =
    globalItem.route.params.item ?? globalItem.route.params.randomPopular;
  console.log(item.favorites);
  const cart = useSelector((state) => state.cart);

  const foundItem = cart.some(
    (cartItem) => cartItem.key === item.key && cartItem.cart
  );
  console.log(cart);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(item.favorites);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: 100 }}>
        <View style={{ marginLeft: 25, marginTop: 20 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                top: 20,
                right: -30,
              }}
            >
              <VerticalText
                style={{
                  fontSize: 100,
                  fontWeight: "bold",
                  opacity: 0.8,
                }}
                text={item.origin}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  onTouchEnd={() => navigation.goBack({ key: "value" })}
                  source={require("../icons/back.png")}
                  style={{
                    width: 26,
                    height: 20,
                  }}
                />
                <Image
                  style={{
                    width: 28,
                    height: 28,
                    marginRight: 20,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{ marginRight: 20, width: 30, height: 30 }}
                onPress={() => {
                  item.favorites
                    ? dispatch(removeFavorite(item.key))
                    : dispatch(addFavorite(item));
                  dispatch(toggleFavorite(item.key));
                  setFavorite(!item.favorites);
                }}
              >
                <Image
                  source={
                    favorite
                      ? require("../icons/favoritesTrue.png")
                      : require("../icons/favoritesFalse.png")
                  }
                  style={{
                    width: 30,
                    height: 30,
                    objectFit: "contain",
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 30,
                }}
              >
                <Image
                  source={item.img}
                  style={{
                    width: 250,
                    height: 250,
                  }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  source={require("../icons/ratings.png")}
                ></Image>
                <Text style={{ fontSize: 20 }}>{item.rating}</Text>
              </View>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {item.title}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
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
              Ingredients
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item.ingredients}
              renderItem={({ item }) => {
                return (
                  <View
                    key={item.key}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 10,
                      backgroundColor: "#E4E4E4",
                      height: 50,
                      width: 140,
                      borderRadius: 25,
                      padding: 10,
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{
                        width: 35,
                        height: 35,
                      }}
                    />
                    <Text style={{ fontSize: 17 }}>{item.title}</Text>
                  </View>
                );
              }}
            ></FlatList>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 20,
                opacity: 0.7,
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: 17,
                marginTop: 10,
                marginRight: 25,
                textAlign: "justify",
              }}
            >
              {item.description}
            </Text>
            <View style={{ height: 200, width: "100%" }}></View>
          </View>
        </View>
      </ScrollView>

      {foundItem ? (
        <View
          style={{
            padding: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#B0464A",
            position: "absolute",
            height: 110,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#C66566",
              height: 50,
              alignText: "center",
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("Cart", { from: "Item" })}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Open Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            padding: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#B0464A",
            position: "absolute",
            height: 180,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 30, color: "white" }}>
              {item.price * quantity + " $"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#C66566",
                  height: 50,
                  alignText: "center",
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                }}
                onPress={() =>
                  setQuantity(quantity === 1 ? quantity : quantity - 1)
                }
              >
                <Text style={{ fontSize: 25, color: "white" }}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  marginRight: 15,
                  marginLeft: 15,
                }}
              >
                {quantity}
              </Text>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#C66566",
                  height: 50,
                  alignText: "center",
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                }}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={{ fontSize: 25, color: "white" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#C66566",
              height: 50,
              alignText: "center",
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              dispatch(addToCart(item)),
                dispatch(updateItemCart({ item, quantity }));
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Buy now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ItemDetail;
