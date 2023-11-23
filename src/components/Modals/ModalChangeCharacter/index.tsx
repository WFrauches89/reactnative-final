import React from 'react';
import {
  View,
  Modal,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { styles } from './style';
import api from '../../../services/api/api';
import { Button } from '../../Button';
import images from '../../../../assets/images';

interface ModalItemDetailsProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface getItemDetailsResponse {
  id: string;
  nome: string;
  força: number;
  defesa: number;
  urlImage: string;
}

export const ModalChangeCharacters = ({
  isModalVisible,
  setIsModalVisible,
  setRefresh,
}: ModalItemDetailsProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<getItemDetailsResponse[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user/1`);
        const responseItems = response.data.personagens;

        setItems(responseItems);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const equipItem = async (index) => {
    try {
      if (index && index.id) {
        await api.patch(`/user/1`, { personagemEquipado: [index] });
      } else {
      }
    } catch (error) {
      console.error('Erro ao equipar o personagem:', error);
    }
  };

  async function handleButton(index) {
    equipItem(index);
    setRefresh((e) => !e);
    setIsModalVisible(false);
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
              <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                // horizontal={true}
                renderItem={({ item }) => (
                  <View style={styles.viewcharacter}>
                    <Image
                      style={styles.characterimg}
                      source={images[item.urlImage]}
                    />
                    <View style={styles.viewinfo}>
                      <View>
                        <Text style={styles.characterinfo}>Class</Text>
                        <Text style={styles.characterinfo}>{item.nome}</Text>
                      </View>
                      <View>
                        <Text style={styles.characterinfo}>Ataque</Text>
                        <Text style={styles.characterinfo}>{item.força}</Text>
                      </View>
                      <View>
                        <Text style={styles.characterinfo}>Defesa</Text>
                        <Text style={styles.characterinfo}>{item.defesa}</Text>
                      </View>
                    </View>
                    <Button
                      title="Equip"
                      onPress={() => {
                        handleButton(item);
                      }}
                    />
                  </View>
                )}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
