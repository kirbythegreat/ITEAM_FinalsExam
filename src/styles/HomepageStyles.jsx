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
    height: 40,
    borderWidth: 1,
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
    fontWeight: 600,
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
    paddingVertical: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    bottom: 40,
    alignSelf: 'center',
  },
  postIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postIconText: {
    color: '#b39369',
    fontSize: 16,
  },
});

export default HomepageStyles;