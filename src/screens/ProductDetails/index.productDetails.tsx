import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export const ProductDetails: FC<{}> = ({route}) => {
  console.log(route.params.title);
  return (
    <View style={styles.container}>
      <Text>This is Details Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
});
