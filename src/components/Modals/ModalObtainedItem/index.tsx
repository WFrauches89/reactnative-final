import React from 'react';
import {
  View,
  Modal,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from './styles';
import api from '../../../services/api/api';
import ItemComponentBuy from '../../ItemComponentBuy';
import ChestGif from '../../../../assets/bauWood.gif';
import ChestOpen from '../../../../assets/bauOpen.png';

interface ModalItemDetailsProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  obtainedItem: any;
}

export interface getItemDetailsResponse {
  nome: string;
  desc: string;
  rarity: number;
  urlImage: string;
  type: string;
  id: number;
}

export const ModalObtainedItem = ({
  isModalVisible,
  setIsModalVisible,
  obtainedItem,
}: ModalItemDetailsProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [item, setItem] = React.useState<getItemDetailsResponse>();
  const [finishedTimeout, setFinishedTimeout] = React.useState(false);

  React.useEffect(() => {
    const id = setTimeout(() => {
      setFinishedTimeout(true);
    }, 2000);

    return () => clearTimeout(id);
  }, []);

  React.useEffect(() => {
    if (obtainedItem != null) {
      writeMagicItemDetails(obtainedItem.idDoItem);
      setIsLoading(false);
    }
  }, []);

  function writeMagicItemDetails(index: string) {
    api
      .get(`/item/${index}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
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
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => setIsModalVisible(false)}
          >
            {isLoading ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <>
                <View style={styles.containerContent}>
                  {item && obtainedItem && (
                    <>
                      {finishedTimeout ? (
                        <>
                          <View>
                            <Text style={styles.titleItemName}>
                              {item.nome}
                            </Text>
                          </View>
                          <ItemComponentBuy
                            item={item}
                            rarity={obtainedItem.rarity}
                          />
                        </>
                      ) : (
                        <View style={styles.loadingItemContainer}></View>
                      )}
                      <View>
                        {finishedTimeout ? (
                          <Image style={styles.chestGif} source={ChestOpen} />
                        ) : (
                          <Image style={styles.chestGif} source={ChestGif} />
                        )}
                      </View>
                      {finishedTimeout && (
                        <Text style={styles.titleContinue}>
                          Toque para continuar
                        </Text>
                      )}
                    </>
                  )}
                </View>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
