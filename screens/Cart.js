import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, updateItemCart, clearCart } from "../redux/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);

  const totalSum = cartList.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.total;
  }, 0);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      {cartList.length === 0 ? (
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
        <View style={{ height: "75%" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              marginLeft: 25,
              marginRight: 25,
            }}
            data={cartList}
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
                        flexDirection: "row",
                        marginTop: 10,
                        gap: 3,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
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
                            backgroundColor: "#E4E4E4",
                            alignText: "center",
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                          }}
                          onPress={() => {
                            if (item.quantity !== 1) {
                              const newQuantity = item.quantity - 1;
                              setQuantity(newQuantity),
                                dispatch(
                                  updateItemCart({
                                    item,
                                    quantity: newQuantity,
                                  })
                                );
                            }
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "black",
                              opacity: 0.4,
                            }}
                          >
                            -
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 22,
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#E4E4E4",
                            alignText: "center",
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                          }}
                          onPress={() => {
                            const newQuantity = item.quantity + 1;
                            setQuantity(newQuantity),
                              dispatch(
                                updateItemCart({ item, quantity: newQuantity })
                              );
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "black",
                              opacity: 0.4,
                            }}
                          >
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                          {item.total + " $"}
                        </Text>
                        {/* <Image
                        style={{ width: 15, height: 15 }}
                        source={require("../icons/ratings.png")}
                      ></Image> */}
                        {/* <Text style={{ fontSize: 20 }}>{item.rating}</Text> */}
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
                      dispatch(removeFromCart(item.key));
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
                        source={require("../icons/delete.png")}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
      )}

      <View
        style={{
          padding: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: "#B0464A",
          position: "absolute",
          height: "25%",
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
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 23, color: "white", opacity: 0.8 }}>
              {"Total price:"}
            </Text>
            <Text style={{ fontSize: 30, color: "white" }}>
              {totalSum + " $"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearCart());
            Alert.alert(
              "Thank you for your order <3",
              `Your order has been placed. We will contact you soon to confirm and clarify the details.`,
              [
                {
                  text: "Okay",
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
            height: 50,
            alignText: "center",
            borderRadius: 50,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Make purchase</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
