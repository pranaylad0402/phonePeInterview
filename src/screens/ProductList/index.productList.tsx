import React, {FC, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useProductList} from '../../hooks/useProductList';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';
export const ProductList: FC<{}> = () => {
  const {productListData, getNextSetOfData, isLoading} = useProductList();
  console.log(productListData.length, isLoading);

  const navigation = useNavigation();
  const opListItem = title => {
    console.log('this is called', title);
    navigation.navigate('ProductDetails', {title});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={productListData}
        keyExtractor={item => item.id}
        onEndReached={getNextSetOfData}
        renderItem={({item}) => {
          return <ListItemComponent data={item} opListItem={opListItem} />;
        }}
        ListFooterComponent={<ListFooterComponent isLoading={isLoading} />}
      />
    </View>
  );
};

const ListFooterComponent = ({isLoading = false}) => {
  if (isLoading) {
    return <Text>Data is loading</Text>;
  }
  return null;
};

const ListItemComponent = ({data = {}, opListItem = () => {}}) => {
  const {
    title = '',
    thumbnail = '',
    rating = 0,
    stock = 0,
    category = '',
    discountPercentage = 0,
    price = 0,
  } = data || {};

  const originalPrice = price - price * (discountPercentage / 100);

  return (
    <TouchableOpacity
      onPress={() => {
        opListItem(title);
      }}
      style={styles.itemContainer}>
      <View>
        <Image source={{uri: thumbnail}} style={styles.imgContainer} />
      </View>
      <View style={styles.itemBodyContainer}>
        <View style={{flex: 1}}>
          <Text>{title}</Text>
        </View>

        <View style={styles.row}>
          <StarRatingDisplay
            rating={rating}
            color="green"
            starSize={16}
            style={{marginTop: 4}}
          />
          <Text>{`(${stock})`}</Text>
        </View>
        <View style={[styles.row, {alignItems: 'center'}]}>
          <Text
            style={
              styles.discountPercentage
            }>{`${discountPercentage}% Off`}</Text>
          <Text style={{textDecorationLine: 'line-through', marginLeft: 4}}>
            {`Rs.${price}`}
          </Text>
          <Text style={{marginLeft: 4}}>{`Rs.${originalPrice.toFixed(
            2,
          )}`}</Text>
        </View>
        <Text>{`${price} With bank offer`}</Text>
        <Text style={{color: 'red'}}>{`Only few lefts`}</Text>
        <Text>{`Free Delivery`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  imgContainer: {height: 100, width: 100},
  itemBodyContainer: {paddingLeft: 8},
  row: {flexDirection: 'row'},
  discountPercentage: {
    fontSize: 18,
    color: 'green',
    marginVertical: 4,
  },
});
