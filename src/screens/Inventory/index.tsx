import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ItemComponent from '../../components/ItemComponent';
import api from '../../services/api/api';
import Foto from '../../../assets/favicon.png';
import { ModalItemDetails } from '../../components/Modals/ModalDetailsItem';
import { v4 as uuidv4 } from 'uuid';
import { getRandomBytes } from 'react-native-get-random-values';
import images from '../../../assets/images';
import { ModalChangeCharacters } from '../../components/Modals/ModalChangeCharacter';
import { useAuth } from '../../Context/Auth';

export default function Inventory() {
  const [isModalCharacterVisible, setIsModalCharacterVisible] =
    React.useState<boolean>(false);
  const openModal = () => {
    setIsModalCharacterVisible(true);
  };
  const { refreshPage, setRefreshPage } = useAuth();
  const [itensBd, setItensBd] = React.useState([]);
  const [itensUsingBd, setItensUsingBd] = React.useState([]);
  const [itensInventory, setItensInventory] = React.useState([]);
  const [itensEquipped, setItensEquipped] = React.useState([]);
  const [characters, setCharacters] = React.useState([]);
  const [characterUsing, setCharacterUsing] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isModalVisibleEquipped, setIsModalVisibleEquipped] =
    React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<string>('');
  const [selectedInventoryItem, setSelectedInventoryItem] =
    React.useState<string>('');

  const getItens = () => {
    api
      .get('/user/1')
      .then((res) => {
        setItensBd(res.data.itens);
      })
      .catch((error) => {
        console.log('4');
        console.log(error);
      })
      .finally(() => {});
  };

  const getItensUsingBd = () => {
    api
      .get('/user/1')
      .then((res) => {
        setItensUsingBd(res.data.itensEquipados);
      })
      .catch((error) => {
        console.log('3');
        console.log(error);
      })
      .finally(() => {});
  };
  const getCharacters = () => {
    api
      .get('/user/1')
      .then((res) => {
        setCharacters(res.data.personagens);
      })
      .catch((error) => {
        console.log('2');
        console.log(error);
      })
      .finally(() => {});
  };
  const getCharactersUsing = () => {
    api
      .get('/user/1')
      .then((res) => {
        setCharacterUsing(res.data.personagemEquipado);
      })
      .catch((error) => {
        console.log('1');
        console.log(error);
      })
      .finally(() => {});
  };

  React.useEffect(() => {
    getItens();
    getItensUsingBd();
    getCharacters();
    getCharactersUsing();
  }, [refreshPage]);

  React.useEffect(() => {
    getItensInventory();
  }, [itensBd]);

  React.useEffect(() => {
    getItensUsing();
  }, [itensUsingBd]);

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

  const firstCharacterChoice = (gender: number) => {
    const id = uuidv4({ random: getRandomBytes });
    let nomeCharacter: string;
    let urlImageCharacter: string;

    if (gender == 1) {
      nomeCharacter = 'Feiticeiro';
      urlImageCharacter = 'feiticeiro';
    } else {
      nomeCharacter = 'Bruxa';
      urlImageCharacter = 'bruxa';
    }

    const character = [
      {
        id: id,
        nome: nomeCharacter,
        força: 2000,
        defesa: 1000,
        urlImage: urlImageCharacter,
      },
    ];
    api.patch(`user/1`, { personagens: character });
    api.patch(`user/1`, { personagemEquipado: character });
    setRefreshPage((r) => !r);
  };

  const getItensUsing = () => {
    if (itensUsingBd != null && itensUsingBd.length >= 0) {
      const promises = itensUsingBd.map(async (i) => {
        return api.get(`/item/${i.idDoItem}`).then((r) => {
          return { ...r.data, idItemUser: i.id, rarity: i.rarity };
        });
      });
      Promise.all(promises).then((results) => {
        setItensEquipped(results);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSpaceB}>
        <View>
          <View style={styles.containerItem}>
            {itensEquipped.length >= 0 &&
              itensEquipped
                .filter((i) => {
                  return i.type == 'weapon';
                })
                .map((i) => (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={i.idItemUser}
                    item={i}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))
                .concat(
                  itensEquipped.some((i) => i.type === 'weapon') ? (
                    []
                  ) : (
                    <Image
                      key={'a'}
                      style={styles.imageItemDefault}
                      source={Foto}
                    />
                  ),
                )}
          </View>
          <View style={styles.containerItem}>
            {itensEquipped.length >= 0 &&
              itensEquipped
                .filter((i) => {
                  return i.type == 'ring';
                })
                .map((i) => (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={i.idItemUser}
                    item={i}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))
                .concat(
                  itensEquipped.some((i) => i.type === 'ring') ? (
                    []
                  ) : (
                    <Image
                      key={'b'}
                      style={styles.imageItemDefault}
                      source={Foto}
                    />
                  ),
                )}
          </View>
          <View style={styles.containerItem}>
            {itensEquipped.length >= 0 &&
              itensEquipped
                .filter((i) => {
                  return i.type == 'gloves';
                })
                .map((i) => (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={i.idItemUser}
                    item={i}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))
                .concat(
                  itensEquipped.some((i) => i.type === 'gloves') ? (
                    []
                  ) : (
                    <Image
                      key={'c'}
                      style={styles.imageItemDefault}
                      source={Foto}
                    />
                  ),
                )}
          </View>
        </View>
        <View>
          {characters && characters.length > 0 && characters[0] != null && (
            <View style={styles.containerCharacter}>
              {characters[0].urlImage && characterUsing[0]?.urlImage && (
                <Image
                  style={styles.characterImage}
                  source={images[characterUsing[0].urlImage]}
                />
              )}
              <TouchableOpacity onPress={openModal}>
                <View>
                  <Text>Open Modal</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {characters.length == 0 && (
            <View style={styles.containerCharactersChoice}>
              <Text style={styles.textChoiceTitle}>Escolha seu personagem</Text>
              <View style={styles.containerChoiceButtons}>
                <TouchableOpacity
                  onPress={() => {
                    firstCharacterChoice(1);
                  }}
                  style={styles.containerChoiceButton}
                >
                  <Text style={styles.textChoiceButton}>Masculino</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    firstCharacterChoice(2);
                  }}
                  style={styles.containerChoiceButton}
                >
                  <Text style={styles.textChoiceButton}>Feminino</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View>
          <View style={styles.containerItem}>
            {itensEquipped.length >= 0 &&
              itensEquipped
                .filter((i) => {
                  return i.type == 'helmet';
                })
                .map((i) => (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={i.idItemUser}
                    item={i}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))
                .concat(
                  itensEquipped.some((i) => i.type === 'helmet') ? (
                    []
                  ) : (
                    <Image
                      key={'d'}
                      style={styles.imageItemDefault}
                      source={Foto}
                    />
                  ),
                )}
          </View>
          <View style={styles.containerItem}>
            {itensEquipped.length >= 0 &&
              itensEquipped
                .filter((i) => {
                  return i.type == 'chestplate';
                })
                .map((i) => (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={i.idItemUser}
                    item={i}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))
                .concat(
                  itensEquipped.some((i) => i.type === 'chestplate') ? (
                    []
                  ) : (
                    <Image
                      key={'e'}
                      style={styles.imageItemDefault}
                      source={Foto}
                    />
                  ),
                )}
          </View>
          <View style={styles.containerItem}>
            {itensEquipped.length >= 0 &&
              itensEquipped
                .filter((i) => i.type == 'boots')
                .map((i) => (
                  <ItemComponent
                    setSelectedInventoryItem={setSelectedInventoryItem}
                    key={i.idItemUser}
                    item={i}
                    setIsModalVisible={setIsModalVisibleEquipped}
                    setSelectedIndex={setSelectedIndex}
                  />
                ))
                .concat(
                  itensEquipped.some((i) => i.type === 'boots') ? (
                    []
                  ) : (
                    <Image
                      key={'f'}
                      style={styles.imageItemDefault}
                      source={Foto}
                    />
                  ),
                )}
          </View>
        </View>
      </View>
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
            <ModalItemDetails
              selectedInventoryItem={selectedInventoryItem}
              index={selectedIndex}
              setRefresh={setRefreshPage}
              inventory={true}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          )}
          {isModalVisibleEquipped && (
            <ModalItemDetails
              setRefresh={setRefreshPage}
              selectedInventoryItem={selectedInventoryItem}
              index={selectedIndex}
              isModalVisible={isModalVisibleEquipped}
              setIsModalVisible={setIsModalVisibleEquipped}
            />
          )}
          {isModalCharacterVisible && (
            <ModalChangeCharacters
              setRefresh={setRefreshPage}
              isModalVisible={isModalCharacterVisible}
              setIsModalVisible={setIsModalCharacterVisible}
            />
          )}
        </View>
      </ScrollView>

      {/* <View style={styles.container3}>
        <TouchableOpacity
          onPress={() => signOut()}
          style={styles.containerFormAcess2}
        >
          <Text style={styles.containerFormAcessText}> Sair </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
    backgroundColor: '#c2c2c2',
  },
  containerSpaceB: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  containerItem: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    height: 60,
    width: 60,
  },
  containerCharactersChoice: {
    backgroundColor: 'black',
    flex: 1,
    width: 170,
    margin: 30,
    padding: 15,
  },
  containerCharacter: {
    flex: 1,
  },
  characterImage: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
  },
  textChoiceTitle: {
    color: 'white',
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  containerChoiceButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerChoiceButton: {
    backgroundColor: 'red',
    padding: 4,
  },
  textChoiceButton: {
    color: 'white',
  },
  containerScrollViewItens: {
    backgroundColor: '#523409',
    flex: 2,
    marginTop: 30,
    marginBottom: 10,
  },
  containerItensChest: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  imageItemDefault: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container2: {
    flex: 0.1,
    backgroundColor: '#0c8b1f',
    marginTop: 25,
  },
  container3: {
    flex: 0.1,
    backgroundColor: '#140c8b',
  },
  containerFormAcess: {
    position: 'absolute',
    backgroundColor: '#594875',
    borderRadius: 50,
    paddingVertical: 8,
    width: '100%',
    alignSelf: 'center',
    bottom: '25%',
    alignItems: 'center',
  },
  containerFormAcess2: {
    position: 'absolute',
    backgroundColor: '#594875',
    borderRadius: 50,
    paddingVertical: 8,
    width: '100%',
    alignSelf: 'center',
    bottom: '25%',
    alignItems: 'center',
  },
  containerFormAcessText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
