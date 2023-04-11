import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";

const WelcomePage = ({ navigation }) => {
  navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#B0464A",
          width: "100%",
          height: "100%",
        }}
      >
        <Text
          style={{
            marginTop: moderateScale(10),
            fontSize: scale(40),
            color: "white",
            fontWeight: "bold",
            height: verticalScale(40),
            marginLeft: moderateScale(20),
          }}
        >
          JAPFOOD
        </Text>
        <Image
          source={require("../icons/main.png")}
          style={{
            width: scale(380),
            height: verticalScale(380),
          }}
        />
        <Text
          style={{
            fontSize: scale(40),
            color: "white",
            height: verticalScale(100),
            marginLeft: moderateScale(20),
          }}
        >
          THE TASTE OF JAPANESE FOOD
        </Text>
        <Text
          style={{
            marginTop: moderateScale(10),
            fontSize: scale(15),
            color: "white",
            height: verticalScale(40),
            marginLeft: moderateScale(20),
            marginBottom: moderateScale(20),
            opacity: 0.7,
            marginRight: moderateScale(10),
          }}
        >
          Feel the taste of most populars Japanese foods from anywhere and
          anytime
        </Text>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#C66566",
            height: verticalScale(40),
            margin: moderateScale(30),
            marginTop: moderateScale(0),
            alignText: "center",
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate("SideBar")}
        >
          <Text style={{ fontSize: scale(15), color: "white" }}>
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
