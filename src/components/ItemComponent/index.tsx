import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import images from '../../../assets/images';

const ItemComponent = ({
  item,
  setSelectedIndex,
  setIsModalVisible,
  setSelectedInventoryItem,
}) => {
  function abrirModal() {
    setSelectedInventoryItem(item);
    setSelectedIndex(item.id);
    setIsModalVisible(true);
  }

  return (
    <>
      {item.rarity == 1 && (
        <TouchableOpacity
          onPress={abrirModal}
          style={[styles.container, styles.bgRariry1]}
        >
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </TouchableOpacity>
      )}
      {item.rarity == 2 && (
        <TouchableOpacity
          onPress={abrirModal}
          style={[styles.container, styles.bgRariry2]}
        >
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </TouchableOpacity>
      )}
      {item.rarity == 3 && (
        <TouchableOpacity
          onPress={abrirModal}
          style={[styles.container, styles.bgRariry3]}
        >
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </TouchableOpacity>
      )}
      {item.rarity == 4 && (
        <TouchableOpacity
          onPress={abrirModal}
          style={[styles.container, styles.bgRariry4]}
        >
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </TouchableOpacity>
      )}
      {item.rarity == 5 && (
        <TouchableOpacity
          onPress={abrirModal}
          style={[styles.container, styles.bgRariry5]}
        >
          <Image
            style={styles.imageItem}
            source={images[item.urlImage]}
          ></Image>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ItemComponent;
