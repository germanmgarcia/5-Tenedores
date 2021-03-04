import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, View, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");

  return (
    <View>
      <SearchBar
        placeholder="Busca tu restaurante..."
        onChangeText={(e) => setSearch(e)}
        containerStyle={styles.searchBar}
        value={search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 0,
  },
});
