import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

export default function Details({ route, navigation }) {
  const { item_id, listing_id, current_owner_id, current_owner_type, token } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    specification: true,
    description: true,
    provenance: true
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/XchangeDetails',
          {
            item_id,
            listing_id,
            current_owner_id,
            current_owner_type,
            token,
            user_type: "Xpert",
            version_number: "2.2.6"
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        setDetails(response.data);
      } catch (err) {
        setError('Failed to fetch item details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No details found.</Text>
      </View>
    );
  }

  const itemDetails = details.item_details?.[0] || {};
  const itemImageUrl = details?.item_images?.[0]?.image_url || details?.item_images?.[0]?.image;
  const descriptionText = details.description?.[0]?.description || 'No description available';
  const price = details.price?.[0]?.price || 'Price not available';
  const listerDetails = details.lister_details || {};
  const listerName = listerDetails.username || 'Unknown';
  const listerLocation = listerDetails.location || 'Location not available';
  const joinedDate = listerDetails.joined_date || 'Joined date not available';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {itemImageUrl ? (
          <Image 
            source={{ uri: itemImageUrl }} 
            style={styles.image} 
            resizeMode="contain" 
          />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {itemDetails.item_name || 'No Title'} {itemDetails.category && `(${itemDetails.category})`}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.price}>HKD {price}</Text>
          </View>

          <View style={styles.listerContainer}>
            <View style={styles.listerHeader}>
              <Text style={styles.listerHeaderText}>Seller Information</Text>
            </View>
            <View style={styles.listerContent}>
              <Image 
                source={{ uri: listerDetails.profile_image || 'https://via.placeholder.com/60' }} 
                style={styles.avatar} 
              />
              <View style={styles.listerInfo}>
                <Text style={styles.listerName}>{listerName}</Text>
                <Text style={styles.listerId}>AC-{current_owner_id}</Text>
                <Text style={styles.listerLocation}>{listerLocation}</Text>
                <Text style={styles.listerJoined}>Joined: {joinedDate}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('specification')}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionHeaderText}>Specification</Text>
            <Text style={styles.sectionToggle}>
              {expandedSections.specification ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSections.specification && (
            <View style={styles.sectionContent}>
              {details.specification?.length > 0 ? (
                details.specification.map((spec, idx) => (
                  <View key={idx} style={styles.specRow}>
                    <Text style={styles.specName}>{spec.specification_name || spec.name || 'N/A'}:</Text>
                    <Text style={styles.specValue}>{spec.specification_value || spec.value || 'N/A'}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No specifications available</Text>
              )}
            </View>
          )}

          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('description')}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionHeaderText}>Description</Text>
            <Text style={styles.sectionToggle}>
              {expandedSections.description ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSections.description && (
            <View style={styles.sectionContent}>
              <Text style={styles.description}>{descriptionText}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('provenance')}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionHeaderText}>Provenance</Text>
            <Text style={styles.sectionToggle}>
              {expandedSections.provenance ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSections.provenance && (
            <View style={styles.sectionContent}>
              {details.provenance?.length > 0 ? (
                details.provenance.map((p, idx) => (
                  <View key={idx} style={styles.provenanceItem}>
                    <Text style={styles.provenanceText}>{p.detail || p.description || 'No detail provided'}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No provenance information available</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    width: 30,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  listerContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  listerHeader: {
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  listerHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listerContent: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#e1e1e1',
  },
  listerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  listerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  listerId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  listerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  listerJoined: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionToggle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  sectionContent: {
    paddingVertical: 15,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  specName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  provenanceItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  provenanceText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  contactButton: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});