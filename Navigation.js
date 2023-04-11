import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Favorites from "./screens/Favorites";
import SearchScreen from "./screens/SearchScreen";
import Cart from "./screens/Cart";
import WelcomePage from "./screens/WelcomePage";
import ItemDetail from "./screens/ItemDetail";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginLeft: 10, marginTop: 50 }}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: 25,
            objectFit: "contain",
          }}
          source={require("./icons/profile.png")}
        ></Image>
        <View
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>Your Name</Text>
          <Text style={{ fontSize: 16, opacity: 0.7 }}>test@gmail.com</Text>
          <Text style={{ fontSize: 16, opacity: 0.7 }}>+380999999999</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{ marginLeft: -16, fontSize: 16 }}
          label="Help"
          icon={() => (
            <Image
              style={{
                height: 22,
                width: 22,
                opacity: 0.9,
              }}
              source={require("./icons/support.png")}
            />
          )}
          onPress={() => {
            Alert.alert(
              "Contact with us",
              "To do this, you can call us by phone +380487057762, and also contact us in Telegram at the same number.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const SideBar = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#B0464A",
        drawerActiveTintColor: "#fff",
        // https://reactnavigation.org/docs/drawer-navigator
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{
                height: 22,
                width: 22,
                opacity: 0.9,
                tintColor: focused ? "white" : "black",
              }}
              source={require("./icons/home.png")}
            />
          ),
          drawerLabelStyle: {
            marginLeft: -16,
            fontSize: 16,
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{
                height: 22,
                width: 22,
                opacity: 0.9,
                tintColor: focused ? "white" : "black",
              }}
              source={require("./icons/cart.png")}
            />
          ),
          drawerLabelStyle: {
            marginLeft: -16,
            fontSize: 16,
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{
                height: 22,
                width: 22,
                opacity: 0.9,
                tintColor: focused ? "white" : "black",
              }}
              source={
                focused
                  ? require("./icons/favoritesTrue.png")
                  : require("./icons/favoritesFalse.png")
              }
            />
          ),
          drawerLabelStyle: {
            marginLeft: -16,
            fontSize: 16,
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{
                objectFit: "contain",
                height: 23,
                width: 23,
                opacity: 0.78,
                tintColor: focused ? "white" : "black",
              }}
              source={require("./icons/find.png")}
            />
          ),
          drawerLabelStyle: {
            marginLeft: -16,
            fontSize: 16,
          },
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

function Navigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen
          name="SideBar"
          component={SideBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Item" component={ItemDetail} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Navigation;
