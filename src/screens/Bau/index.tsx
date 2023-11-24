import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import api from '../../services/api/api';
import { v4 as uuidv4 } from 'uuid';
import { getRandomBytes } from 'react-native-get-random-values';
import { ModalObtainedItem } from '../../components/Modals/ModalObtainedItem';
import { useAuth } from '../../Context/Auth';
import images from '../../../assets/images';
import ChestCharacter from '../../../assets/characterChestImg.png';
import Chest1 from '../../../assets/bauClose1.png';
import Chest2 from '../../../assets/bauClose2.png';
import { styles } from './styles';

export default function Bau() {
  const { signOut, userLogado } = useAuth();

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const { setRefreshPage } = useAuth();
  const [obtainedItem, setObtainedItem] = React.useState<any>(null);
  const [bauType, setBauType] = React.useState(0);

  React.useEffect(() => {
    if (obtainedItem != null) abrirModal();
  }, [obtainedItem]);

  const openChest = (qnt: number) => {
    api.get(`/user/${userLogado.id}`).then((r) => {
      let recursosAtualizado = r.data.recursos;
      let itens = r.data.itens;
      const novoItemId = uuidv4({ random: getRandomBytes });
      const idItemAleatorio = Math.floor(Math.random() * 60) + 1;
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
        setBauType(1);
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
        setBauType(2);
      }

      if (recursosAtualizado.gema >= qnt) {
        recursosAtualizado.gema -= qnt;
        api
          .patch(`/user/${userLogado.id}`, { itens: novaListaDeItens })
          .then(() => {
            api.patch(`/user/${userLogado.id}`, {
              recursos: recursosAtualizado,
            });
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

  const openChestCharacter = async (qnt: number) => {
    try {
      const response = await api.get(`/user/${userLogado.id}`);
      let personagens = response.data.personagens;
      let recursos = response.data.recursos;
      if (recursos.gema >= qnt) {
        if (personagens.length < 11) {
          let personagensIds = [];
          personagens.forEach((p) => personagensIds.push(p.id));
          let newPersonagemId = getRandomExcluding(1, 11, personagensIds);
          const responsePersonagens = await api.get(
            `personagens?id=${newPersonagemId}`,
          );
          let personagensInGame = responsePersonagens.data;
          api.patch(`/user/${userLogado.id}`, {
            personagens: [...personagens, ...personagensInGame],
          });
          recursos.gema -= 100000;

          api.patch(`/user/${userLogado.id}`, {
            recursos: recursos,
          });
          alert('Você ganhou o personagem: ' + personagensInGame[0].nome);
          setRefreshPage((r) => !r);
        } else {
          alert('Você já possui todos os personagens');
        }
      } else {
        alert('Gemas Insuficientes!');
      }
    } catch (error) {
      console.error('Erro na chamada da API:', error);
    }
  };
  function getRandomExcluding(min, max, personagensIds) {
    let randomNum;

    do {
      randomNum = Math.floor(Math.random() * (max - min) + min);
    } while (personagensIds.includes(randomNum));

    return randomNum;
  }
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
    else if (num < 0.75) return 2;
    else if (num < 0.92) return 3;
    else if (num < 1) return 4;
    else return 5;
  }

  const buyGem = (qnt: number) => {
    api.get(`/user/${userLogado.id}`).then((r) => {
      let recursosAtualizado = r.data.recursos;
      recursosAtualizado.gema += qnt;

      api.patch(`/user/${userLogado.id}`, { recursos: recursosAtualizado });
      setRefreshPage((r) => !r);
    });
  };

  function abrirModal() {
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerSpaceB}>
          <View style={styles.containerChest}>
            <Image style={styles.imageChest} source={Chest1} />
            <Text style={styles.textTypeChest}>Baú comum</Text>
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
            <Image style={styles.imageChest} source={Chest2} />
            <Text style={styles.textTypeChest}>Baú raro</Text>
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
        <View style={styles.containerChestCharacter}>
          <Image style={styles.imageChestCharacter} source={ChestCharacter} />
          <Text style={styles.textTypeChest}>Baú de Personagem</Text>
          <TouchableOpacity
            onPress={() => {
              openChestCharacter(100000);
            }}
            style={styles.openChestCharacterButton}
          >
            <Text style={styles.openChestCharacterText}>100000 Gems</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBuyGems}>
          <TouchableOpacity
            onPress={() => {
              buyGem(3000);
            }}
            style={styles.containerBuyGemsCard}
          >
            <Image style={styles.imageGems} source={images.gems1} />
            <Text style={styles.buyGemText}>3000 Gems</Text>
            <Text style={styles.buyGemText}>R$ 10,00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buyGem(12000);
            }}
            style={styles.containerBuyGemsCard}
          >
            <Image style={styles.imageGems} source={images.gems2} />
            <Text style={styles.buyGemText}>12000 Gems</Text>
            <Text style={styles.buyGemText}>R$ 35,00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buyGem(20000);
            }}
            style={styles.containerBuyGemsCard}
          >
            <Image style={styles.imageGems} source={images.gems3} />
            <Text style={styles.buyGemText}>20000 Gems</Text>
            <Text style={styles.buyGemText}>R$ 54,00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buyGem(36000);
            }}
            style={styles.containerBuyGemsCard}
          >
            <Image style={styles.imageGems} source={images.gems4} />
            <Text style={styles.buyGemText}>36000 Gems</Text>
            <Text style={styles.buyGemText}>R$ 95,00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buyGem(60000);
            }}
            style={styles.containerBuyGemsCard}
          >
            <Image style={styles.imageGems} source={images.gems5} />
            <Text style={styles.buyGemText}>60000 Gems</Text>
            <Text style={styles.buyGemText}>R$ 155,00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              buyGem(120000);
            }}
            style={styles.containerBuyGemsCard}
          >
            <Image style={styles.imageGems} source={images.gems6} />
            <Text style={styles.buyGemText}>120000 Gems</Text>
            <Text style={styles.buyGemText}>R$ 300,00</Text>
          </TouchableOpacity>
        </View>
        {isModalVisible && (
          <ModalObtainedItem
            obtainedItem={obtainedItem}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            bauType={bauType}
          />
        )}
      </ScrollView>
    </View>
  );
}
