import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import images from '../../../assets/images';
import ItemComponent from '../../components/ItemComponent';
import { useAuth } from '../../Context/Auth';
import api from '../../services/api/api';
import { ModalItemDetailsFerreiro } from '../../components/Modals/ModalDetailsItensFerreiro';
import { v4 as uuidv4 } from 'uuid';
import { getRandomBytes } from 'react-native-get-random-values';
import FerreiroPerson from '../../../assets/ferreiroPerson.png';

const Ferreiro = () => {
  const [itensBd, setItensBd] = React.useState([]);
  const { refreshPage, userLogado, setRefreshPage } = useAuth();
  const [itensInventory, setItensInventory] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState<string>('');
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [selectedInventoryItem, setSelectedInventoryItem] =
    React.useState<string>('');
  const [itensUnindo, setItensUnindo] = React.useState([]);
  const [isModalVisibleEquipped, setIsModalVisibleEquipped] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    getItens();
  }, [refreshPage]);

  React.useEffect(() => {
    getItensInventory();
  }, [itensBd]);

  const getItens = () => {
    api
      .get(`/user/${userLogado.id}`)
      .then((res) => {
        setItensBd(res.data.itens);
        setItensUnindo(res.data.itensUnindo);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  const unir = () => {
    if (itensUnindo.length == 3) {
      if (
        itensUnindo[0].idDoItem === itensUnindo[1].idDoItem &&
        itensUnindo[1].idDoItem === itensUnindo[2].idDoItem &&
        itensUnindo[0].rarity === itensUnindo[1].rarity &&
        itensUnindo[1].rarity === itensUnindo[2].rarity
      ) {
        let idsItensUnindo = [];

        idsItensUnindo.push(itensUnindo[0].idItemUser);
        idsItensUnindo.push(itensUnindo[1].idItemUser);
        idsItensUnindo.push(itensUnindo[2].idItemUser);

        console.log(idsItensUnindo);
        const arrayFiltrado = itensBd.filter(
          (i) => !idsItensUnindo.includes(i.id),
        );

        let itemNewRarity = itensUnindo[0];
        itemNewRarity.rarity += 1;
        const novoIdGerado = uuidv4({ random: getRandomBytes });
        const objetoNovo = {
          type: itemNewRarity.type,
          id: novoIdGerado,
          idDoItem: itemNewRarity.id,
          rarity: itemNewRarity.rarity,
        };

        const newArray = [...arrayFiltrado, objetoNovo];

        api.patch(`/user/${userLogado.id}`, {
          itens: newArray,
        });
        api.patch(`/user/${userLogado.id}`, {
          itensUnindo: [],
        });
        setRefreshPage((r) => !r);
      } else {
        console.log('Os IDs não são iguais.');
      }
    }
  };

  const getItensInventory = () => {
    if (itensBd != null && itensBd.length >= 0) {
      const promises = itensBd.map(async (i) => {
        return api.get(`/item/${i.idDoItem}`).then((r) => {
          return { ...r.data, idItemUser: i.id, rarity: i.rarity };
        });
      });

      Promise.all(promises).then((results) => {
        setItensInventory(results);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSpaceB}>
        <View>
          {[...itensUnindo, ...Array(3 - itensUnindo.length).fill(null)].map(
            (item, idx) => (
              <View key={idx} style={styles.containerItem}>
                {item ? (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={item.id}
                    item={item}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ) : (
                  <Image
                    key={'a'}
                    style={styles.imageItemDefault}
                    source={images.weapon_default}
                  />
                )}
              </View>
            ),
          )}
        </View>
        <View>
          <Image style={styles.ferreiroImg} source={FerreiroPerson}></Image>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          unir();
        }}
        style={styles.containerButtonFuse}
      >
        <Text style={styles.textButtonFuse}>Unir</Text>
      </TouchableOpacity>
      <View style={styles.containerInventoryItens}>
        <ScrollView style={styles.containerScrollViewItens}>
          <View style={styles.containerItensChest}>
            {itensInventory.length >= 0 &&
              itensInventory.map((i) => (
                <ItemComponent
                  setSelectedInventoryItem={setSelectedInventoryItem}
                  key={i.idItemUser}
                  item={i}
                  setIsModalVisible={setIsModalVisible}
                  setSelectedIndex={setSelectedIndex}
                />
              ))}
            {isModalVisible && (
              <ModalItemDetailsFerreiro
                setItensUnindo={setItensUnindo}
                selectedInventoryItem={selectedInventoryItem}
                index={selectedIndex}
                setRefresh={setRefreshPage}
                inventory={true}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Ferreiro;
