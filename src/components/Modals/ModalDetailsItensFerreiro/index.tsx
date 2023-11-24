import React from 'react';
import {
  View,
  Modal,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './styles';
import Gt from '../../../../assets/favicon.png';
import api from '../../../services/api/api';
import { Button } from '../../Button';
import { useAuth } from '../../../Context/Auth';

interface ModalItemDetailsFerreiroProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  index: string;
  inventory?: boolean;
  selectedInventoryItem: any;
  setItensUnindo: any;
}

export interface getItemDetailsResponse {
  nome: string;
  desc: string;
  rarity: number;
  urlImage: string;
  type: string;
  id: number;
}

export const ModalItemDetailsFerreiro = ({
  isModalVisible,
  setIsModalVisible,
  index,
  setRefresh,
  inventory,
  selectedInventoryItem,
}: ModalItemDetailsFerreiroProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [item, setItem] = React.useState<getItemDetailsResponse>();
  const { userLogado } = useAuth();

  React.useEffect(() => {
    getItemDetails(index);
  }, []);

  const equipaItemUnindo = async () => {
    if (selectedInventoryItem != null) {
      const response = await api.get(`/user/${userLogado.id}`);
      const itensUnindo = response.data.itensUnindo;

      if (itensUnindo.length < 3) {
        api.patch(`/user/${userLogado.id}`, {
          itensUnindo: [...itensUnindo, selectedInventoryItem],
        });
      }
    }
  };

  const unEquipItem = async () => {};

  async function handleButton() {
    if (inventory) {
      await equipaItemUnindo();
      setRefresh((e) => !e);
      setIsModalVisible(false);
    } else {
      await unEquipItem();
      setRefresh((e) => !e);
      setIsModalVisible(false);
    }
  }

  function getItemDetails(index: string) {
    api
      .get(`/item/${index}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
      }}
    >
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          {isLoading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.nome}</Text>
                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Image source={Gt} style={styles.closeIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.firstStatsContainer}>
                  <View style={styles.firstStats}>
                    <Text style={styles.textTitle}>Rarity:</Text>
                    <Text style={styles.textTitle}>
                      {selectedInventoryItem.rarity}
                    </Text>
                  </View>
                  <View style={styles.firstStats}>
                    <Text style={styles.textTitle}>Type: </Text>
                    <Text style={styles.textTitle}>{item.type}</Text>
                  </View>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.textTitle}>Descrição:</Text>
                  <Text style={styles.text}>{item.desc}</Text>
                </View>
              </ScrollView>
              <Button
                title={inventory ? 'Unir' : 'Retirar'}
                onPress={handleButton}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
