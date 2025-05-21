import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import HomepageStyles from '../styles/HomepageStyles';
import { getListings } from '../../api';

const Homepage = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastListingId, setLastListingId] = useState('');
  const [lastRowValue, setLastRowValue] = useState('');
  const debounceTimeout = useRef(null);

  const API_PARAMS = {
    categories: [],
    max: "",
    min: "",
    search: "",
    sort: "",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk",
    user_type: "Xpert",
    version_number: "2.2.6"
  };

  const fetchData = useCallback(async (isRefreshing = false) => {
    if (loadingMore || (!hasMore && !isRefreshing)) return;

    try {
      setError(null);
      if (isRefreshing) {
        setRefreshing(true);
        setLastListingId('');
        setLastRowValue('');
      } else {
        setLoadingMore(true);
      }

      const params = {
        ...API_PARAMS,
        min: "0",
        max: "9999",
        search: searchQuery,
        last_listing_id: isRefreshing ? '' : lastListingId,
        last_row_value: isRefreshing ? '' : lastRowValue,
      };

      const response = await getListings(params);
      const newItems = response?.xchange || [];

      if (isRefreshing) {
        setItems(newItems);
      } else {
        const uniqueNewItems = newItems.filter(newItem => 
          !items.some(existingItem => existingItem.listing_id === newItem.listing_id)
        );
        setItems(prev => [...prev, ...uniqueNewItems]);
      }
      if (newItems.length > 0) {
        const lastItem = newItems[newItems.length - 1];
        setLastListingId(lastItem.listing_id);
        setLastRowValue(lastItem.listing_date || lastItem.selling_price?.toString() || '');
      }

      setHasMore(newItems.length > 0);
    } catch (error) {
      console.error('API Error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load listings');
      setItems([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [lastListingId, lastRowValue, searchQuery, loadingMore, hasMore, items]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchData();
    }
  };

const handleSearch = (text) => {
  setSearchQuery(text);

  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }

  debounceTimeout.current = setTimeout(() => {
    if (text.length === 0 || text.length > 2) {
      fetchData(true);
    }
  }, 500);
};


  useEffect(() => {
    fetchData(true);
  }, []);

  const renderItem = ({ item }) => (
  <TouchableOpacity
    style={HomepageStyles.itemContainer}
    testID={`item-${item.listing_id}`}
    onPress={() => navigation.navigate('Details', {
      item_id: item.item_id,
      listing_id: item.listing_id,
      current_owner_id: item.owner_id,
      current_owner_type: item.owner_type,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk", // ✅ pass token here
    })}


  >
    {item.item_image ? (
      <Image 
        source={{ uri: item.item_image }} 
        style={HomepageStyles.itemImage}
        resizeMode="cover"
      />
    ) : (
      <View style={[HomepageStyles.itemImage, HomepageStyles.placeholderImage]}>
        <Text>No Image</Text>
      </View>
    )}

    <Text style={HomepageStyles.price}>{item.currency} {item.selling_price}</Text>
    <Text style={HomepageStyles.category} numberOfLines={1} ellipsizeMode="tail">
      {item.brand} ({item.category})
    </Text>
    <Text style={HomepageStyles.category} numberOfLines={1} ellipsizeMode="tail">
      {item.model}
    </Text>
    <View style={HomepageStyles.sellerContainer}>
      {item.lister_image ? (
        <Image 
          source={{ uri: item.lister_image }} 
          style={HomepageStyles.sellerImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[HomepageStyles.sellerImage, HomepageStyles.placeholderSellerImage]}>
          <Text style={HomepageStyles.sellerInitial}>
            {item.lister_name ? item.lister_name.charAt(0) : '?'}
          </Text>
        </View>
      )}
      <Text style={HomepageStyles.sellerName} numberOfLines={1} ellipsizeMode="tail">
        {item.lister_name}
      </Text>
    </View>
  </TouchableOpacity>
);


  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={HomepageStyles.footerContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={HomepageStyles.footerText}>Loading more items...</Text>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={HomepageStyles.loadingContainer}>
        <Text style={HomepageStyles.loadingText}>Loading Products...</Text>
      </View>
    );
  }

  return (
    <View style={HomepageStyles.container} testID="homepage">
      <View style={HomepageStyles.header}>
        <Text style={HomepageStyles.headerTitle}>The Xchange</Text>
      </View>

      <View style={HomepageStyles.searchContainer}>
        <TextInput
          style={HomepageStyles.searchInput}
          placeholder="Tell us what you're looking for.."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
          testID="search-input"
        />
      </View>

      {error && (
        <View style={HomepageStyles.errorContainer}>
          <Text style={HomepageStyles.errorText}>{error}</Text>
        </View>
      )}

      <View style={HomepageStyles.sectionHeader}>
        <Text style={HomepageStyles.sectionTitle}>Daily Discovery</Text>
        <TouchableOpacity 
          onPress={() => console.log('Filter pressed')}
          testID="filter-button"
        >
          <Text style={HomepageStyles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => `${item.listing_id}-${item.listing_date || Date.now()}`}
        contentContainerStyle={HomepageStyles.listContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && (
            <Text style={HomepageStyles.emptyText} testID="empty-message">
              {searchQuery ? 'No matching items found' : 'No items available'}
            </Text>
          )
        }
        testID="items-list"
      />

      <View style={HomepageStyles.bottomNavContainer}>
        <View style={HomepageStyles.bottomNav}>
          {['Xhibit', 'Xchange', '', 'Records', 'Profile'].map((label, index) => {
            if (label === '') {
              return (
                <View key="spacer" style={HomepageStyles.spacer} />
              );
            }
            return (
              <TouchableOpacity
                key={label}
                style={HomepageStyles.navButton}
                onPress={() => console.log(`${label} pressed`)}
                testID={`${label.toLowerCase()}-button`}
              >
                <Text style={[
                  HomepageStyles.navText,
                  label === 'Xchange' && HomepageStyles.activeNavText
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={HomepageStyles.floatingPostButton}
          onPress={() => console.log('Post pressed')}
          testID="post-button"
        >
          <View style={HomepageStyles.postIconCircle}>
            <Text style={HomepageStyles.postIconText}>XURE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homepage;