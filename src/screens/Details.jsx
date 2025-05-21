import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity, RefreshControl
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import DetailsStyles from '../styles/DetailsStyles';
import axios from 'axios';

export default function Details({ route, navigation }) {
  const { item_id, listing_id, current_owner_id, current_owner_type, token } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SkeletonPlaceholder borderRadius={4}>
          {/* Header Skeleton */}
          <View style={DetailsStyles.header}>
            <View style={{ width: 30, height: 30 }} />
            <View style={{ width: 120, height: 20 }} />
            <View />
          </View>

          {/* Image Skeleton */}
          <View style={{ width: '100%', height: 300 }} />

          {/* Content Skeleton */}
          <View style={DetailsStyles.contentContainer}>
            {/* Title and Price */}
            <View style={{ width: '70%', height: 28, marginBottom: 15 }} />
            <View style={{ width: '40%', height: 24, marginBottom: 20 }} />

            {/* Seller Info */}
            <View style={DetailsStyles.listerContainer}>
              <View style={DetailsStyles.listerHeader}>
                <View style={{ width: '50%', height: 16 }} />
              </View>
              <View style={DetailsStyles.listerContent}>
                <View style={[DetailsStyles.avatar, { backgroundColor: '#e1e1e1' }]} />
                <View style={DetailsStyles.listerInfo}>
                  <View style={{ width: '50%', height: 16, marginBottom: 6 }} />
                  <View style={{ width: '40%', height: 16, marginBottom: 6 }} />
                  <View style={{ width: '60%', height: 16, marginBottom: 6 }} />
                </View>
              </View>
            </View>

            {/* Sections */}
            {['Specification', 'Description', 'Provenance'].map((section) => (
              <React.Fragment key={section}>
                <View style={DetailsStyles.sectionHeader}>
                  <View style={{ width: '40%', height: 16 }} />
                  <View style={{ width: 20, height: 20 }} />
                </View>
                <View style={DetailsStyles.sectionContent}>
                  <View style={{ width: '100%', height: 16, marginBottom: 8 }} />
                  <View style={{ width: '90%', height: 16, marginBottom: 8 }} />
                  <View style={{ width: '80%', height: 16, marginBottom: 8 }} />
                </View>
              </React.Fragment>
            ))}
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
  );
}


const onRefresh = async () => {
  setRefreshing(true);
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
    setError('Failed to refresh item details');
  } finally {
    setRefreshing(false);
  }
};



  if (error) {
    return (
      <View style={DetailsStyles.centered}>
        <Text style={DetailsStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={DetailsStyles.centered}>
        <Text style={DetailsStyles.errorText}>No details found.</Text>
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
    <View style={DetailsStyles.container}>
      <View style={DetailsStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={DetailsStyles.backButton}>
          <Text style={DetailsStyles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={DetailsStyles.headerTitle}>Item Details</Text>
        <View style={DetailsStyles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={DetailsStyles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {itemImageUrl ? (
          <Image 
            source={{ uri: itemImageUrl }} 
            style={DetailsStyles.image} 
            resizeMode="contain" 
          />
        ) : (
          <View style={[DetailsStyles.image, DetailsStyles.placeholderImage]}>
            <Text style={DetailsStyles.placeholderText}>No Image Available</Text>
          </View>
        )}

        <View style={DetailsStyles.contentContainer}>
          <Text style={DetailsStyles.title}>
            {itemDetails.item_name || 'No Title'} {itemDetails.category && `(${itemDetails.category})`}
          </Text>

          <View style={DetailsStyles.priceContainer}>
            <Text style={DetailsStyles.priceLabel}>Price:</Text>
            <Text style={DetailsStyles.price}>HKD {price}</Text>
          </View>

          <View style={DetailsStyles.listerContainer}>
            <View style={DetailsStyles.listerHeader}>
              <Text style={DetailsStyles.listerHeaderText}>Seller Information</Text>
            </View>
            <View style={DetailsStyles.listerContent}>
              <Image 
                source={{ uri: listerDetails.profile_image || 'https://via.placeholder.com/60' }} 
                style={DetailsStyles.avatar} 
              />
              <View style={DetailsStyles.listerInfo}>
                <Text style={DetailsStyles.listerName}>{listerName}</Text>
                <Text style={DetailsStyles.listerId}>AC-{current_owner_id}</Text>
                <Text style={DetailsStyles.listerLocation}>{listerLocation}</Text>
                <Text style={DetailsStyles.listerJoined}>Joined: {joinedDate}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={DetailsStyles.sectionHeader}
            onPress={() => toggleSection('specification')}
            activeOpacity={0.8}
          >
            <Text style={DetailsStyles.sectionHeaderText}>Specification</Text>
            <Text style={DetailsStyles.sectionToggle}>
              {expandedSections.specification ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSections.specification && (
            <View style={DetailsStyles.sectionContent}>
              {details.specification?.length > 0 ? (
                details.specification.map((spec, idx) => (
                  <View key={idx} style={DetailsStyles.specRow}>
                    <Text style={DetailsStyles.specName}>{spec.specification_name || spec.name || 'N/A'}:</Text>
                    <Text style={DetailsStyles.specValue}>{spec.specification_value || spec.value || 'N/A'}</Text>
                  </View>
                ))
              ) : (
                <Text style={DetailsStyles.noDataText}>No specifications available</Text>
              )}
            </View>
          )}

          <TouchableOpacity 
            style={DetailsStyles.sectionHeader}
            onPress={() => toggleSection('description')}
            activeOpacity={0.8}
          >
            <Text style={DetailsStyles.sectionHeaderText}>Description</Text>
            <Text style={DetailsStyles.sectionToggle}>
              {expandedSections.description ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSections.description && (
            <View style={DetailsStyles.sectionContent}>
              <Text style={DetailsStyles.description}>{descriptionText}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={DetailsStyles.sectionHeader}
            onPress={() => toggleSection('provenance')}
            activeOpacity={0.8}
          >
            <Text style={DetailsStyles.sectionHeaderText}>Provenance</Text>
            <Text style={DetailsStyles.sectionToggle}>
              {expandedSections.provenance ? '−' : '+'}
            </Text>
          </TouchableOpacity>
          {expandedSections.provenance && (
            <View style={DetailsStyles.sectionContent}>
              {details.provenance?.length > 0 ? (
                details.provenance.map((p, idx) => (
                  <View key={idx} style={DetailsStyles.provenanceItem}>
                    <Text style={DetailsStyles.provenanceText}>{p.detail || p.description || 'No detail provided'}</Text>
                  </View>
                ))
              ) : (
                <Text style={DetailsStyles.noDataText}>No provenance information available</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};