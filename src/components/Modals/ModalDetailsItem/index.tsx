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

interface ModalItemDetailsProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  index: string;
  inventory?: boolean;
  selectedInventoryItem: any;
}

export interface getItemDetailsResponse {
  nome: string;
  desc: string;
  rarity: number;
  urlImage: string;
  type: string;
  id: number;
}

export const ModalItemDetails = ({
  isModalVisible,
  setIsModalVisible,
  index,
  setRefresh,
  inventory,
  selectedInventoryItem,
}: ModalItemDetailsProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [item, setItem] = React.useState<getItemDetailsResponse>();

  React.useEffect(() => {
    writeMagicItemDetails(index);
  }, []);

  const equipItem = async () => {
    try {
      if (selectedInventoryItem != null) {
        console.log(selectedInventoryItem);
        const response = await api.get(`/user/1`);
        const itensInventory = response.data.itens;
        const itens = response.data.itensEquipados;

        const itensFiltrados = itens.filter(
          (i: any) => i.type !== selectedInventoryItem.type,
        );
        const itensInventoryFiltrados = itensInventory.filter(
          (i: any) => i.id !== selectedInventoryItem.idItemUser,
        );
        const newItemEquipped = {
          type: selectedInventoryItem.type,
          id: selectedInventoryItem.idItemUser,
          idDoItem: selectedInventoryItem.id,
          rarity: selectedInventoryItem.rarity,
        };

        itensFiltrados.push(newItemEquipped);

        await api.patch(`user/1`, { itensEquipados: itensFiltrados });

        await api.patch(`user/1`, { itens: itensInventoryFiltrados });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unEquipItem = async () => {
    try {
      if (selectedInventoryItem != null) {
        const response = await api.get(`/user/1`);
        const itensInventory = response.data.itens;
        const itens = response.data.itensEquipados;

        const itensFiltrados = itens.filter(
          (i: any) => i.type !== selectedInventoryItem.type,
        );

        let itemUnequipping = {
          id: selectedInventoryItem.idItemUser,
          idDoItem: selectedInventoryItem.id,
          rarity: selectedInventoryItem.rarity,
        };

        itensInventory.push(itemUnequipping);

        await api.patch(`user/1`, { itensEquipados: itensFiltrados });

        await api.patch(`user/1`, { itens: itensInventory });
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleButton() {
    if (inventory) {
      await equipItem();
      setRefresh((e) => !e);
      setIsModalVisible(false);
    } else {
      await unEquipItem();
      setRefresh((e) => !e);
      setIsModalVisible(false);
    }
  }

  function writeMagicItemDetails(index: string) {
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
                    <Text style={styles.textTitle}>Rarity: </Text>
                    <Text style={styles.textTitle}>{item.rarity}</Text>
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
                title={inventory ? 'Equip' : 'UnEquip'}
                onPress={handleButton}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
