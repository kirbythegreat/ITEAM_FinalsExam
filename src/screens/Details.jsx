import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import DetailsStyles from '../styles/DetailsStyles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Details({ route, navigation }) {
  const {
    product: initialProduct,
    item_id,
    listing_id,
    current_owner_code,
    current_owner_type,
    token
  } = route.params;

  const [product] = useState(initialProduct);
  const [apiDetails, setApiDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    specification: true,
    description: true,
    provenance: true
  });

  const formatJoinDate = (dateStr) => {
    if (!dateStr) return 'Joined date not available';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Joined date not available';
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  const getFormattedLocation = (lister) => {
    const city = lister?.city || '';
    const country = lister?.country || '';
    const state = lister?.state || '';
    
    const locationParts = [];
    if (city) locationParts.push(city);
    if (country) locationParts.push(country);
    
    return locationParts.join(', ') || 'Location not available';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date provided';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'No date provided';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDetails = () => {
    if (!apiDetails) {
      return {
        item_details: [{
          item_name: product.model,
          category: product.category,
          brand: product.brand,
          model: product.model,
          selling_price: product.selling_price,
          currency: product.currency,
          condition: product.condition
        }],
        price: [{
          price: product.selling_price
        }],
        item_images: product.item_image ? [{ image_link: product.item_image }] : [],
        lister_details: {
          username: product.lister_name,
          image_link: product.lister_image,
          city: product.city,
          country: product.country,
          state: product.state,
          date_created: product.date_created,
          account_holder_name: product.lister_name,
          xpert_code: current_owner_code
        },
        specification: [
          { label: 'Brand', value: product.brand },
          { label: 'Model', value: product.model },
          { label: 'Category', value: product.category },
          { label: 'Appraised Value', value: product.selling_price }
        ],
        description: product.description ? [{ description: product.description }] : [],
        provenance: product.provenance || []
      };
    }

    const filteredSpecification = (apiDetails.specification || []).filter(
      spec => spec.label !== 'Currency'
    );

    return {
      ...apiDetails,
      item_details: apiDetails.item_details || [{
        item_name: product.model,
        category: product.category,
        brand: product.brand,
        model: product.model,
        selling_price: product.selling_price,
        currency: product.currency,
        condition: product.condition
      }],
      price: apiDetails.price || [{
        price: product.selling_price
      }],
      item_images: apiDetails.item_images || 
        (product.item_image ? [{ image_link: product.item_image }] : []),
      lister_details: {
        ...apiDetails.lister_details,
        image_link: apiDetails.lister_details?.image_link || product.lister_image,
        username: apiDetails.lister_details?.username || product.lister_name,
        account_holder_name: apiDetails.lister_details?.account_holder_name || product.lister_name,
        xpert_code: apiDetails.lister_details?.xpert_code || current_owner_code
      },
      specification: filteredSpecification.length > 0 ? filteredSpecification : [
        { label: 'Brand', value: product.brand },
        { label: 'Model', value: product.model },
        { label: 'Category', value: product.category },
        { label: 'Appraised Value', value: product.selling_price }
      ]
    };
  };

  const details = getDetails();
  const itemDetail = details.item_details?.[0] || {};
  const listerDetail = details.lister_details || {};

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/XchangeDetails',
        {
          item_id,
          listing_id,
          current_owner_code,
          current_owner_type,
          token,
          user_type: "Xpert",
          version_number: "2.2.6"
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setApiDetails(response.data);
    } catch (err) {
      console.error('Error fetching details:', err);
      setError('Failed to fetch additional item details');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDetails();
    } catch (err) {
      setError('Failed to refresh item details');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={DetailsStyles.container}>
        <SkeletonPlaceholder>
          <View style={DetailsStyles.header}>
            <View style={{ width: 30, height: 30 }} />
            <View style={{ width: 120, height: 20 }} />
            <View />
          </View>

          <View style={{ width: '100%', height: 300, marginBottom: 20 }} />

          <View style={DetailsStyles.contentContainer}>
            <View style={{ width: '70%', height: 28, marginBottom: 15 }} />
            <View style={{ width: '40%', height: 24, marginBottom: 20 }} />

            <View style={{ width: '50%', height: 20, marginBottom: 20 }} />

            <View style={DetailsStyles.listerContainer}>
              <View style={DetailsStyles.listerHeader}>
                <View style={{ width: '50%', height: 16 }} />
              </View>
              <View style={DetailsStyles.listerContent}>
                <View style={[DetailsStyles.avatar, { width: 60, height: 60, borderRadius: 30 }]} />
                <View style={DetailsStyles.listerInfo}>
                  <View style={{ width: '60%', height: 18, marginBottom: 6 }} />
                  <View style={{ width: '40%', height: 16, marginBottom: 6 }} />
                  <View style={{ width: '80%', height: 16, marginBottom: 6 }} />
                  <View style={{ width: '60%', height: 16, marginBottom: 6 }} />
                </View>
              </View>
            </View>

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
      </View>
    );
  }

  if (error && !product) {
    return (
      <View style={DetailsStyles.centered}>
        <Text style={DetailsStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={DetailsStyles.container}>
      <View style={DetailsStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={DetailsStyles.backButton}>
          <View style={DetailsStyles.backButtonCircle}>
            <Icon name="arrow-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={DetailsStyles.headerTitle}>Item Details</Text>
        <View style={DetailsStyles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={DetailsStyles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={!!apiDetails || !!error}
          />
        }
      >
        {refreshing && (
          <ActivityIndicator style={DetailsStyles.refreshIndicator} size="small" />
        )}

        {details.item_images?.[0]?.image_link ? (
          <Image
            source={{ uri: details.item_images[0].image_link }}
            style={DetailsStyles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[DetailsStyles.image, DetailsStyles.placeholderImage]}>
            <Text style={DetailsStyles.placeholderText}>No Image Available</Text>
          </View>
        )}

        {details.item_images?.length > 1 && (
          <ScrollView horizontal style={DetailsStyles.additionalImagesContainer}>
            {details.item_images.slice(1).map((img, index) => (
              <Image
                key={index}
                source={{ uri: img.image_link }}
                style={DetailsStyles.additionalImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        )}

        <View style={DetailsStyles.InfoContainer}>
          <Text style={DetailsStyles.title}>
            {itemDetail.item_name || itemDetail.model}
            {itemDetail.category && ` (${itemDetail.category})`}
          </Text>
          <View style={DetailsStyles.detailContailer}>
            <Text style={DetailsStyles.brand}>
              {itemDetail.brand}
            </Text>
          </View>
          <View style={DetailsStyles.priceContainer}>
            <Text style={DetailsStyles.price}>
              {itemDetail.currency || 'HKD'} {itemDetail.selling_price || itemDetail.price?.[0]?.price}
            </Text>
          </View>

          <View style={DetailsStyles.listerContainer}>
            <View style={DetailsStyles.listerContent}>
              <Image
                source={{
                  uri: listerDetail.image_link ||
                    'https://via.placeholder.com/60'
                }}
                style={DetailsStyles.avatar}
              />
              <View style={DetailsStyles.listerInfo}>
                <Text style={DetailsStyles.listerName}>
                  {listerDetail.account_holder_name || listerDetail.username}
                </Text>
                <Text style={DetailsStyles.listerLocation}> {listerDetail.xpert_code || current_owner_code}</Text>
                <Text style={DetailsStyles.listerLocation}>
                  {getFormattedLocation(listerDetail)}
                </Text>
                <Text style={DetailsStyles.listerJoined}>
                  Joined: {formatJoinDate(listerDetail.date_created)}
                </Text>
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
            <View style={DetailsStyles.specCard}>
              <View style={DetailsStyles.specRow}>
                <Text style={DetailsStyles.specName}>Category</Text>
                <Text style={DetailsStyles.specValue}>{itemDetail.category || 'N/A'}</Text>
              </View>
              <View style={DetailsStyles.specDivider} />
              <View style={DetailsStyles.specRow}>
                <Text style={DetailsStyles.specName}>Brand</Text>
                <Text style={DetailsStyles.specValue}>{itemDetail.brand || 'N/A'}</Text>
              </View>
              <View style={DetailsStyles.specDivider} />
              <View style={DetailsStyles.specRow}>
                <Text style={DetailsStyles.specName}>Model</Text>
                <Text style={DetailsStyles.specValue}>{itemDetail.model || 'N/A'}</Text>
              </View>
              <View style={DetailsStyles.specDivider} />
              <View style={DetailsStyles.specRow}>
                <Text style={DetailsStyles.specName}>Appraised Value</Text>
                <Text style={DetailsStyles.specValue}>
                  {itemDetail.currency || 'HKD'} {itemDetail.selling_price || itemDetail.price?.[0]?.price || 'N/A'}
                </Text>
              </View>
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
          <View style={DetailsStyles.descCard}>
            <Text style={DetailsStyles.descTitle}>Description</Text>
            <View style={DetailsStyles.descDivider} />
            <Text style={DetailsStyles.description}>
              {details.description?.[0]?.description || 'No description available'}
            </Text>
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
            <View style={DetailsStyles.provenanceContainer}>
              {details.provenance?.length > 0 ? (
                <>
                  <View style={DetailsStyles.provenanceCard}>
                    <Text style={DetailsStyles.provenanceHeader}>Registration</Text>
                    <View style={DetailsStyles.provenanceDivider} />
                    
                    <View style={DetailsStyles.provenanceRow}>
                      <Text style={DetailsStyles.provenanceLabel}>Date</Text>
                      <Text style={DetailsStyles.provenanceValue}>
                        {formatDate(details.provenance[0].date_created)}
                      </Text>
                    </View>
                    <View style={DetailsStyles.provenanceRow}>
                      <Text style={DetailsStyles.provenanceLabel}>Registered by</Text>
                      <Text style={DetailsStyles.provenanceValue}>
                        {details.provenance[0].created_by_name || 'Unknown'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={DetailsStyles.provenanceCard}>
                    <Text style={DetailsStyles.provenanceHeader}>Certification</Text>
                    <View style={DetailsStyles.provenanceDivider} />
                    
                    <View style={DetailsStyles.provenanceRow}>
                      <Text style={DetailsStyles.provenanceLabel}>Date</Text>
                      <Text style={DetailsStyles.provenanceValue}>
                        {formatDate(details.provenance[1]?.date_created)}
                      </Text>
                    </View>
                    <View style={DetailsStyles.provenanceRow}>
                      <Text style={DetailsStyles.provenanceLabel}>Type</Text>
                      <Text style={DetailsStyles.provenanceValue}>
                        {details.provenance[1]?.provenance_type || 'N/A'}
                      </Text>
                    </View>
                    <View style={DetailsStyles.provenanceRow}>
                      <Text style={DetailsStyles.provenanceLabel}>Certified by</Text>
                      <Text style={DetailsStyles.provenanceValue}>
                        {details.provenance[1]?.created_by_name || 'Unknown'}
                      </Text>
                    </View>
                    <View style={DetailsStyles.provenanceRow}>
                      <Text style={DetailsStyles.provenanceLabel}>Control Number</Text>
                      <Text style={DetailsStyles.provenanceValue}>
                        {details.provenance[1]?.control_number || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <View style={DetailsStyles.provenanceCard}>
                  <Text style={DetailsStyles.noDataText}>
                    No provenance information available
                  </Text>
                </View>
              )}
            </View>
          )}

          {error && (
            <View style={DetailsStyles.apiErrorContainer}>
              <Text style={DetailsStyles.apiErrorText}>
                {error} (showing basic product information)
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}