import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';
import images from '../../../assets/images';

const ItemComponentBuy = ({ item, rarity }) => {
  return (
    <>
      {rarity == 1 && (
        <View style={[styles.container, styles.bgRariry1]}>
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </View>
      )}
      {rarity == 2 && (
        <View style={[styles.container, styles.bgRariry2]}>
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </View>
      )}
      {rarity == 3 && (
        <View style={[styles.container, styles.bgRariry3]}>
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </View>
      )}
      {rarity == 4 && (
        <View style={[styles.container, styles.bgRariry4]}>
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </View>
      )}
      {rarity == 5 && (
        <View style={[styles.container, styles.bgRariry5]}>
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </View>
      )}
    </>
  );
};

export default ItemComponentBuy;
