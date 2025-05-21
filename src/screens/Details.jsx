import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function Details({ route }) {
  const { item_id, listing_id, current_owner_id, current_owner_type } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/XchangeDetails',
          {
            item_id,
            Listing_id: listing_id,
            current_owner_id,
            current_owner_type,
            token: "your_token_here", // 🔒 Replace with actual token from login
            user_type: "Xpert",
            version_number: "2.2.6"
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        setDetails(response.data);
      } catch (err) {
        setError('Failed to fetch item details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{details?.item_name || 'No Title'}</Text>
      {details?.item_image && (
        <Image
          source={{ uri: details.item_image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text>{details?.description || 'No description available.'}</Text>
      {/* Add more fields as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  image: { width: '100%', height: 200, marginBottom: 10 },
});
