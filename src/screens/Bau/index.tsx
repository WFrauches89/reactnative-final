import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import api from '../../services/api/api';
import { v4 as uuidv4 } from 'uuid';
import { getRandomBytes } from 'react-native-get-random-values';
import { ModalObtainedItem } from '../../components/Modals/ModalObtainedItem';
import { useAuth } from '../../Context/Auth';
import Chest from '../../../assets/favicon.png';

export default function Bau() {
  const { signOut } = useAuth();

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const { setRefreshPage } = useAuth();
  const [obtainedItem, setObtainedItem] = React.useState<any>(null);

  React.useEffect(() => {
    if (obtainedItem != null) abrirModal();
  }, [obtainedItem]);

  const openChest = (qnt: number) => {
    api.get(`user/1`).then((r) => {
      let recursosAtualizado = r.data.recursos;
      let itens = r.data.itens;
      const novoItemId = uuidv4({ random: getRandomBytes });
      const idItemAleatorio = Math.floor(Math.random() * 12) + 1;
      let novaListaDeItens: any;
      let rarityWithProbability: any;

      if (qnt == 800) {
        rarityWithProbability = getRandomChestCommon();
        novaListaDeItens = [
          ...itens,
          {
            id: novoItemId,
            idDoItem: idItemAleatorio,
            rarity: rarityWithProbability,
          },
        ];
      } else if (qnt == 2100) {
        rarityWithProbability = getRandomChestRare();
        novaListaDeItens = [
          ...itens,
          {
            id: novoItemId,
            idDoItem: idItemAleatorio,
            rarity: rarityWithProbability,
          },
        ];
      }

      if (recursosAtualizado.gema >= qnt) {
        recursosAtualizado.gema -= qnt;
        api.patch(`user/1`, { itens: novaListaDeItens }).then(() => {
          api.patch(`user/1`, { recursos: recursosAtualizado });
        });
        setObtainedItem({
          id: novoItemId,
          idDoItem: idItemAleatorio,
          rarity: rarityWithProbability,
        });
        setRefreshPage((r) => !r);
      } else {
        alert('Gemas Insuficientes!');
      }
    });
  };
  function getRandomChestCommon() {
    var num = Math.random();
    if (num < 0.4) return 1;
    else if (num < 0.8) return 2;
    else if (num < 0.97) return 3;
    else if (num < 1) return 4;
    else return 5;
  }
  function getRandomChestRare() {
    var num = Math.random();
    if (num < 0.35) return 1;
    else if (num < 0.7) return 2;
    else if (num < 0.9) return 3;
    else if (num < 1) return 4;
    else return 5;
  }

  const buyGem = (qnt: number) => {
    api.get(`user/1`).then((r) => {
      let recursosAtualizado = r.data.recursos;
      recursosAtualizado.gema += qnt;

      api.patch(`user/1`, { recursos: recursosAtualizado });
    });
  };

  function abrirModal() {
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSpaceB}>
        <View style={styles.containerChest}>
          <Image style={styles.imageChest} source={Chest} />
          <TouchableOpacity
            onPress={() => {
              openChest(800);
            }}
            style={styles.openChestButton}
          >
            <Text style={styles.openChestText}>800 Gems</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerChest}>
          <Image style={styles.imageChest} source={Chest} />
          <TouchableOpacity
            onPress={() => {
              openChest(2100);
            }}
            style={styles.openChestButton}
          >
            <Text style={styles.openChestText}>2100 Gems</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerBuyGems}>
        <TouchableOpacity
          onPress={() => {
            buyGem(3000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={Chest} />
          <Text style={styles.openChestText}>3000 Gems</Text>
          <Text style={styles.openChestText}>R$ 10,00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            buyGem(12000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={Chest} />
          <Text style={styles.openChestText}>12000 Gems</Text>
          <Text style={styles.openChestText}>R$ 35,00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            buyGem(20000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={Chest} />
          <Text style={styles.openChestText}>20000 Gems</Text>
          <Text style={styles.openChestText}>R$ 54,00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            buyGem(36000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={Chest} />
          <Text style={styles.openChestText}>36000 Gems</Text>
          <Text style={styles.openChestText}>R$ 95,00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            buyGem(60000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={Chest} />
          <Text style={styles.openChestText}>60000 Gems</Text>
          <Text style={styles.openChestText}>R$ 155,00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openChest(120000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={Chest} />
          <Text style={styles.openChestText}>120000 Gems</Text>
          <Text style={styles.openChestText}>R$ 300,00</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container3}>
        <TouchableOpacity
          onPress={() => signOut()}
          style={styles.containerFormAcess2}
        >
          <Text style={styles.containerFormAcessText}> Sair </Text>
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <ModalObtainedItem
          obtainedItem={obtainedItem}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2c2c2',
  },
  containerSpaceB: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 50,
  },
  containerBuyGems: {
    marginTop: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  containerChest: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    paddingTop: 10,
    gap: 10,
    borderRadius: 5,
    padding: 3,
  },
  containerBuyGemsCard: {
    minWidth: 100,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    gap: 2,
    borderRadius: 5,
    padding: 3,
  },
  imageChest: {
    width: 70,
    height: 70,
  },
  imageGems: {
    width: 40,
    height: 40,
  },
  openChestButton: {
    width: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 6,
  },
  openChestText: {
    textAlign: 'center',
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
  container2: {
    marginTop: 350,
    flex: 0.2,
    backgroundColor: '#0c8b1f',
  },
  container3: {
    marginTop: 40,
    flex: 0.2,
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
});
