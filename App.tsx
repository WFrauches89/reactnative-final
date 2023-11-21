import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ItemComponent from './src/components/ItemComponent';
import api from './src/services/api/api';
import Foto from './assets/favicon.png';
import Feiticeiro from './assets/feiticeiro.png';
import Bruxa from './assets/bruxa.png';
import { ModalItemDetails } from './src/components/Modals/ModalDetailsItem';
import { v4 as uuidv4 } from 'uuid';
import { getRandomBytes } from 'react-native-get-random-values';
import images from './assets/images';

export default function App() {
  const [itensBd, setItensBd] = React.useState([]);
  const [itensUsingBd, setItensUsingBd] = React.useState([]);
  const [itensInventory, setItensInventory] = React.useState([]);
  const [itensEquipped, setItensEquipped] = React.useState([]);
  const [characters, setCharacters] = React.useState([]);
  const [characterUsing, setCharacterUsing] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isModalVisibleEquipped, setIsModalVisibleEquipped] =
    React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
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
        console.log(error);
      })
      .finally(() => {});
  };
  const getCharactersUsing = () => {
    api
      .get('/user/1')
      .then((res) => {
        console.log(res.data.personagemEquipado);
        setCharacterUsing(res.data.personagemEquipado);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  React.useEffect(() => {
    getItens();
    getItensUsingBd();
    getCharacters();
    getCharactersUsing();
  }, [refresh]);

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
                    <Image source={Foto} />
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
                    <Image source={Foto} />
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
                    <Image source={Foto} />
                  ),
                )}
          </View>
        </View>
        <View>
          {characters.length > 0 && (
            <View style={styles.containerCharacter}>
              {characterUsing && (
                <Image
                  style={styles.characterImage}
                  source={images[characterUsing.urlImage]}
                />
              )}
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
                    <Image source={Foto} />
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
                    <Image source={Foto} />
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
                    <Image source={Foto} />
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
              setRefresh={setRefresh}
              inventory={true}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          )}
          {isModalVisibleEquipped && (
            <ModalItemDetails
              setRefresh={setRefresh}
              selectedInventoryItem={selectedInventoryItem}
              index={selectedIndex}
              isModalVisible={isModalVisibleEquipped}
              setIsModalVisible={setIsModalVisibleEquipped}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 7,
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
    flex: 1,
    marginVertical: 30,
  },
  containerItensChest: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
});
