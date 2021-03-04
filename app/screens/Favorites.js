import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState(null);
  const [userLogged, setUserLogged] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;
        db.collection("favorites")
          .where("idUser", "==", idUser)
          .get()
          .then((response) => {
            const idRestaurantsArray = [];
            response.forEach((doc) => {
              idRestaurantsArray.push(doc.data().idRestaurant);
            });
            getDataRestaurant(idRestaurantsArray).then((response) => {
              const restaurants = [];
              response.forEach((doc) => {
                const restaurant = doc.data();
                restaurant.id = doc.id;
                restaurants.push(restaurant);
              });
              setRestaurants(restaurants);
            });
          });
      }
    }, [userLogged])
  );

  const getDataRestaurant = (idRestaurantsArray) => {
    const arrayRestaurants = [];
    idRestaurantsArray.forEach((idRestaurant) => {
      const result = db.collection("restaurants").doc(idRestaurant).get();
      arrayRestaurants.push(result);
    });
    return Promise.all(arrayRestaurants);
  };

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (restaurants?.length === 0) {
    return <NotFoundRestaurants />;
  }

  return (
    <View style={styles.viewBody}>
      {restaurants ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" color />
          <Text style={{ textAlign: "center" }}>Cargando restaurantes</Text>
        </View>
      )}
    </View>
  );
}

function NotFoundRestaurants() {
  return (
    <View style={styles.viewNotFoundRestaurants}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={styles.textNotFoundRestaurants}>
        No tienes restaurantes en tu lista
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { navigation } = props;
  return (
    <View style={styles.viewUserNoLogged}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={styles.textUserNoLogged}>
        Necesitas estar logeado para ver esta sección
      </Text>
      <Button
        title="Ir al login"
        containerStyle={styles.btnContainerButtonUserNoLogged}
        buttonStyle={styles.btnStyleButtonNoLogged}
        onPress={() => navigation.navigate("account", { screen: "login" })}
      />
    </View>
  );
}

function Restaurant(props) {
  const { restaurant } = props;
  const { name } = restaurant.item;

  return (
    <View>
      <Text>name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
  },
  viewNotFoundRestaurants: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textNotFoundRestaurants: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewUserNoLogged: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textUserNoLogged: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnContainerButtonUserNoLogged: {
    marginTop: 20,
    width: "80%",
  },
  btnStyleButtonNoLogged: {
    backgroundColor: "#00a680",
  },
});
