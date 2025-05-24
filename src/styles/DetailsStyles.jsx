import { StyleSheet } from 'react-native';

const DetailsStyles = StyleSheet.create({
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
    padding: 2,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'stretch',
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
    backgroundColor: '#fff',
  },
  InfoContainer: {
    padding: 20,
    backgroundColor: '#fff'
  },
  detailContainer: {
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#818181',
    textAlign: 'left',
  },
  brand: {
    fontSize: 24,
    fontWeight: '400',
    color: '#333',
    textAlign: 'left',
  },
  priceContainer: {
    marginBottom: 20,
    alignItems: 'left',
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

    overflow: 'hidden',
  },
  listerHeader: {
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  listerContent: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#e1e1e1',
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
  appraisedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  appraisedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  appraisedValue: {
    fontSize: 16,
    color: '#333',
  },
  listerCode: {
    color: '#666',
    fontSize: 14,
  },
  provenanceItem: {
    marginBottom: 20,
  },
  provenanceHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  provenanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  provenanceLabel: {
    fontSize: 14,
    color: '#666',
  },
  provenanceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  provenanceDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});

export default DetailsStyles;