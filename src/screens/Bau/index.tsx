import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from "../../services/api/api";
import { v4 as uuidv4 } from "uuid";
import { getRandomBytes } from "react-native-get-random-values";
import { ModalObtainedItem } from "../../components/Modals/ModalObtainedItem";
import { useAuth } from "../../Context/Auth";
import images from "../../../assets/images";
import Chest from "../../../assets/favicon.png";
import Chest1 from "../../../assets/bauClose1.png";
import Chest2 from "../../../assets/bauClose2.png";

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
        api.patch(`/user/${userLogado.id}`, { itens: novaListaDeItens }).then(() => {
          api.patch(`/user/${userLogado.id}`, { recursos: recursosAtualizado });
        });
        setObtainedItem({
          id: novoItemId,
          idDoItem: idItemAleatorio,
          rarity: rarityWithProbability,
        });
        setRefreshPage((r) => !r);
      } else {
        alert("Gemas Insuficientes!");
      }
    });
  };

  const openChestCharacter = async (qnt: number) => {
    // console.log("Entrou na função");
    // try {
    //   const response = await api.get(`/user/${userLogado.id}`);
    //   let personagens = response.data.personagens;
    //   console.log("Quantidade de personagens:", personagens.length);
    //   let gema = response.data.recursos.gema;
    //   console.log("Quantidade de gemas:", gema);
    //   if (gema >= qnt) {
    //     console.log("Possui gemas suficientes");
    //     if (personagens.length >= 11) {
    //       let personagensIds = [];
    //       personagens.forEach((p) => personagensIds.push(p.id));
    //       let newPersonagemId = getRandomExcluding(1, 11, personagensIds);
    //       const responsePersonagens = await api.get(
    //         `personagens?id=${newPersonagemId}`
    //       );
    //       let personagensInGame = responsePersonagens.data;
    //       api.patch(`/user/${userLogado.id}`, {
    //         personagens: [...personagens, ...personagensInGame],
    //       });
    //     } else {
    //       console.log("x");
    //       alert("Você já possui todos os personagens");
    //     }
    //   } else {
    //     console.log("Gemas insuficientes");
    //     alert("Gemas Insuficientes!");
    //   }
    // } catch (error) {
    //   console.error("Erro na chamada da API:", error);
    // }
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
      <View style={styles.containerSpaceB}>
        <View style={styles.containerChest}>
          <Image style={styles.imageChest} source={Chest1} />
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
        <Image style={styles.imageChestCharacter} source={Chest} />
        <Text>Baú de Personagem</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("x");
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
            openChest(120000);
          }}
          style={styles.containerBuyGemsCard}
        >
          <Image style={styles.imageGems} source={images.gems6} />
          <Text style={styles.buyGemText}>120000 Gems</Text>
          <Text style={styles.buyGemText}>R$ 300,00</Text>
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
          bauType={bauType}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3d2424e0",
  },
  containerSpaceB: {
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 50,
  },
  containerBuyGems: {
    marginTop: 50,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  containerChest: {
    backgroundColor: "#202020",
    borderWidth: 2,
    borderColor: "#848484",
    alignItems: "center",
    paddingTop: 10,
    gap: 10,
    borderRadius: 5,
    padding: 6,
  },
  containerBuyGemsCard: {
    backgroundColor: "#202020",
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#848484",
    alignItems: "center",
    gap: 2,
    borderRadius: 5,
    padding: 3,
    paddingVertical: 10,
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
    borderWidth: 2,
    borderColor: "#848484",
    borderRadius: 5,
    paddingVertical: 6,
    backgroundColor: "#727272",
  },
  openChestText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  buyGemText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#848484",
  },
  containerFormAcess2: {
    position: "absolute",
    backgroundColor: "#594875",
    borderRadius: 50,
    paddingVertical: 8,
    width: "100%",
    alignSelf: "center",
    bottom: "25%",
    alignItems: "center",
  },
  containerFormAcessText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  container2: {
    marginTop: 350,
    flex: 0.2,
    backgroundColor: "#0c8b1f",
  },
  container3: {
    marginTop: 40,
    flex: 0.2,
    backgroundColor: "#140c8b",
  },
  containerFormAcess: {
    position: "absolute",
    backgroundColor: "#594875",
    borderRadius: 50,
    paddingVertical: 8,
    width: "100%",
    alignSelf: "center",
    bottom: "25%",
    alignItems: "center",
  },
  containerChestCharacter: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#202020",
    borderWidth: 2,
    borderColor: "#848484",
    alignItems: "center",
    paddingTop: 10,
    gap: 10,
    borderRadius: 5,
    padding: 6,
  },
  imageChestCharacter: {
    width: 120,
    height: 120,
  },
  openChestCharacterButton: {
    width: 140,
    borderWidth: 1,
    borderColor: "#848484",
    borderRadius: 5,
    paddingVertical: 6,
  },
  openChestCharacterText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#848484",
  },
});
