import { StyleSheet } from 'react-native';

const HomepageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 'auto',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  filterText: {
    fontSize: 16,
    color: '#b39369',
    fontWeight: '600',
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterIcon: {
    marginLeft: 6,
  },
  listContainer: {
    paddingBottom: 80,
  },
  itemContainer: {
    width: '48%',
    marginBottom: 20,
    marginRight: '4%',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b39369',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sellerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  placeholderSellerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sellerInitial: {
    fontSize: 12,
    color: '#666',
  },
  sellerName: {
    fontSize: 12,
    color: '#666',
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffeeee',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 40,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 70, // Fixed height for proper alignment
    justifyContent: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#666',
  },
  activeNavText: {
    color: '#b39369',
    fontWeight: 'bold',
  },
  spacer: {
    width: 40,
  },
  floatingPostButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  postIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  postIconImage: {
    width: 32,
    height: 32,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  overlayTouchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000044',
  },

  sidebar: {
    width: '75%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  notificationWrapper: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#ceae7b',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b39369',
  },
  closeButton: {
    fontSize: 28,
    color: '#888',
    paddingHorizontal: 10,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 8,
  },
  sortOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  sortOptionActive: {
    backgroundColor: '#b39369',
  },
  sortOptionText: {
    color: '#333',
    fontSize: 14,
  },
  sortOptionTextActive: {
    color: '#fff',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 8,
  },
  categoryButton: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  categoryButtonActive: {
    backgroundColor: '#b39369',
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  rangeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 8,
  },
  rangeButton: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  rangeButtonText: {
    fontSize: 13,
    color: '#333',
  },
  rangeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rangeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  clearButtonText: {
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#b39369',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    
  },
  dropdownArrow: {
    fontSize: 18,
    color: '#555',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    textAlign: 'center',  
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default HomepageStyles;
