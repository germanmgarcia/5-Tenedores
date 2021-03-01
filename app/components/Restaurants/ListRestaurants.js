import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";

export default function ListRestaurants(props) {
  const { restaurants = [] } = props;

  return (
    <View>
      {size(restaurants) > 0 ? (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" color />
          <Text>Cargando Restaurantes</Text>
        </View>
      )}
    </View>
  );
}

function Restaurant(props) {
  const { restaurant } = props;
  return (
    <View>
      <Text>Restaurante</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
