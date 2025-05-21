import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image, RefreshControl, Animated, Dimensions, ScrollView} from 'react-native';
import HomepageStyles from '../styles/HomepageStyles';
import { getListings } from '../../api';
import Modal from 'react-native-modal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


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

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

const screenWidth = Dimensions.get('window').width;
const slideAnim = useRef(new Animated.Value(screenWidth)).current; 

const openFilterSidebar = () => {
  setFilterVisible(true);
  Animated.timing(slideAnim, {
    toValue: screenWidth * 0.25, // Sidebar will occupy the right 75%
    duration: 300,
    useNativeDriver: false,
  }).start();
};

const closeFilterSidebar = () => {
  Animated.timing(slideAnim, {
    toValue: screenWidth, // Slide it off-screen again
    duration: 300,
    useNativeDriver: false,
  }).start(() => setFilterVisible(false));
};



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

const renderSkeletonItem = (_, index) => (
  <View key={index} style={HomepageStyles.itemContainer}>
    <View style={[HomepageStyles.itemImage, { backgroundColor: '#ccc' }]} />
    <View style={{ height: 20, backgroundColor: '#ddd', marginVertical: 5, borderRadius: 4 }} />
    <View style={{ height: 16, backgroundColor: '#eee', marginBottom: 4, borderRadius: 4 }} />
    <View style={{ height: 16, backgroundColor: '#eee', borderRadius: 4 }} />
    <View style={[HomepageStyles.sellerContainer, { marginTop: 10 }]}>
      <View style={[HomepageStyles.sellerImage, { backgroundColor: '#ccc' }]} />
      <View style={{ width: 60, height: 12, backgroundColor: '#ddd', marginLeft: 8, borderRadius: 4 }} />
    </View>
  </View>
);

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

 if (loading || refreshing) {
  return (
<ScrollView
  style={HomepageStyles.container}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
>
  <SkeletonPlaceholder borderRadius={4}>
    {/* Header Title */}
    <View style={{ width: '100%', height: 50, justifyContent: 'center', paddingHorizontal: 20 }}>
      <View style={{ width: 120, height: 24 }} />
    </View>

    {/* Search Bar */}
    <View style={{ width: '90%', height: 40, borderRadius: 8, marginHorizontal: '5%', marginBottom: 20 }} />

    {/* Daily Discovery + Filter Text */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 }}>
      <View style={{ width: 150, height: 20 }} />
      <View style={{ width: 60, height: 20 }} />
    </View>

    {/* Grid Items */}
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 }}>
      {[...Array(4)].map((_, index) => (
        <View key={index} style={{ width: '47%', marginBottom: 20 }}>
          <View style={{ width: '100%', height: 120, borderRadius: 8 }} />
          <View style={{ width: '60%', height: 16, marginTop: 8 }} />
          <View style={{ width: '90%', height: 14, marginTop: 4 }} />
          <View style={{ width: '50%', height: 14, marginTop: 4 }} />

          {/* Seller row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 15 }} />
            <View style={{ width: 60, height: 12, marginLeft: 8 }} />
          </View>
        </View>
      ))}
    </View>

    {/* Footer */}
{/* Footer Navigation Skeleton */}
<View style={{ paddingTop: 20, height: 80, justifyContent: 'center' }}>
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20
  }}>
    {/* Left two nav texts */}
    <View style={{ width: 50, height: 12 }} />
    <View style={{ width: 50, height: 12 }} />

    {/* Spacer for center button */}
    <View style={{ width: 50 }} />

    {/* Right two nav texts */}
    <View style={{ width: 50, height: 12 }} />
    <View style={{ width: 50, height: 12 }} />
  </View>

  {/* Floating Circular Button (centered) */}
  <View style={{
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: 40,
    height: 40,
    borderRadius: 30
  }} />
</View>

  </SkeletonPlaceholder>
</ScrollView>


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
          <TouchableOpacity onPress={openFilterSidebar}>
            <Text style={HomepageStyles.filterText}>Filter</Text>
          </TouchableOpacity>
      </View>

      {filterVisible && (
            
        <View style={HomepageStyles.overlay}>
          
          <TouchableOpacity
            style={HomepageStyles.overlayTouchable}
            onPress={closeFilterSidebar}
            activeOpacity={1}
          />
          <Animated.View style={[HomepageStyles.sidebar, { left: slideAnim, height: '100%', position: 'absolute', top: 0 }]}>
            <ScrollView>
            <View style={HomepageStyles.filterSection}>
              <Text style={HomepageStyles.filterSubtitle}>Sort</Text>
              <View style={HomepageStyles.sortOptions}>
                <TouchableOpacity
                  style={[
                    HomepageStyles.sortOption,
                    sortOrder === 'ASC' && HomepageStyles.sortOptionActive
                  ]}
                  onPress={() => setSortOrder('ASC')}
                >
                  <Text style={[
                    HomepageStyles.sortOptionText,
                    sortOrder === 'ASC' && HomepageStyles.sortOptionTextActive
                  ]}>
                    ASC
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    HomepageStyles.sortOption,
                    sortOrder === 'DESC' && HomepageStyles.sortOptionActive
                  ]}
                  onPress={() => setSortOrder('DESC')}
                >
                  <Text style={[
                    HomepageStyles.sortOptionText,
                    sortOrder === 'DESC' && HomepageStyles.sortOptionTextActive
                  ]}>
                    DESC
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={HomepageStyles.filterSection}>
              <Text style={HomepageStyles.filterSubtitle}>Category</Text>
              <View style={HomepageStyles.categoryGrid}>
                {[
                  'Bags', 'Shoes', 'Jewelry', 'Toys', 
                  'Watches', 'Automotive and Perks', 'Electronics and Gadgets', 'Clothing',
                  'Eyewear', 'Musical Instrument', 'Trading Cards', 'Artworks',
                  'Race Cone', 'Books and Comic Books', 'Stamps', 'Antiques',
                  'Music', 'Movie', 'Sports', 'Others'
                ].map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      HomepageStyles.categoryButton,
                      selectedCategories.includes(category) && HomepageStyles.categoryButtonActive
                    ]}
                    onPress={() => {
                      setSelectedCategories(prev =>
                        prev.includes(category)
                          ? prev.filter(c => c !== category)
                          : [...prev, category]
                      );
                    }}
                  >
                    <Text style={[
                      HomepageStyles.categoryButtonText,
                      selectedCategories.includes(category) && HomepageStyles.categoryButtonTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={HomepageStyles.filterSection}>
              <Text style={HomepageStyles.filterSubtitle}>Value Range</Text>
              <View style={HomepageStyles.rangeGrid}>
                {['1 - 5k', '5k - 10k', '10k - 50k', '50k -'].map(range => (
                  <TouchableOpacity
                    key={range}
                    style={HomepageStyles.rangeButton}
                    onPress={() => {
                      // Parse the range and set min/max values
                      const [min, max] = range.split(' - ');
                      setMinValue(min.replace('k', '000'));
                      setMaxValue(max === '-' ? '' : max.replace('k', '000'));
                    }}
                  >
                    <Text style={HomepageStyles.rangeButtonText}>{range}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={HomepageStyles.filterActions}>
              <TouchableOpacity 
                style={HomepageStyles.clearButton}
                onPress={() => {
                  setSelectedCategories([]);
                  setMinValue('');
                  setMaxValue('');
                  setSortOrder('ASC');
                }}
              >
                <Text style={HomepageStyles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={HomepageStyles.applyButton}
                onPress={() => {
                  closeFilterSidebar();
                  fetchData(true);
                }}
              >
                <Text style={HomepageStyles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </Animated.View>
        </View>
       
      )}

      
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