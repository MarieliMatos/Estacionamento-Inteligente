import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import api from '../../services/api';

export default function Park() {
  const [park, setPark] = useState([]);

  async function loadData() {
    const response = await api.get('/park');

    setPark(response.data);
  }

  useEffect(() => {
    // auto refresh
    setInterval(() => {
      loadData();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Slots.</Text>
      </View>

      <FlatList
        data={park}
        style={styles.park}
        numColumns={4}
        keyExtractor={(data) => data.vaga}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: data }) => (
          <View style={styles.slots}>
            <Text style={styles.slotsText}>{data.vaga}</Text>
            <Text style={styles.slotsStatus}>{data.placa}</Text>
          </View>
        )}
      />
    </View>
  );
}
