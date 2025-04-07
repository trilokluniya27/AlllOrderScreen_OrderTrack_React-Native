import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';

const OrderTrack = () => {
  // Safe destructuring with defaults
  const {
    orderId = 'N/A',
    name = 'Unknown Product',
    image = '',
    cost = '0',
    status = 'Unknown',
  } = useRoute().params || {};

  // this is the main code for order status logic

  const getTimeline = () => {
    const normalized = status.toLowerCase().replace('shiping', 'shipping');

    const baseStages = [
      'Order Confirmed',
      'Order Packed',
      'Shipped',
      'Out For Delivery',
      'Delivered',
    ];

    const completedIndexMap = {
      ordered: 0,
      confirmed: 0,
      packed: 1,
      shipping: 2,
      shipped: 2,
      'out for delivery': 3,
      delivered: 4,
    };

    const completedIndex = completedIndexMap[normalized] ?? -1;

    // Custom logic for Return
    if (normalized === 'return') {
      return [
        {stage: 'Order Confirmed', date: 'Jan 1, 2025', completed: true},
        {stage: 'Delivered', date: 'Jan 5, 2025', completed: true},
        {
          stage: 'Order Returned',
          date: 'Jan 6, 2025',
          completed: false,
          canceled: true,
        },
      ];
    }

    // Custom logic for Canceled
    if (normalized === 'canceled') {
      return [
        {stage: 'Order Confirmed', date: 'Jan 1, 2025', completed: true},
        {
          stage: 'Order Canceled',
          date: 'Jan 2, 2025',
          completed: false,
          canceled: true,
        },
      ];
    }

    //  Default flow for all others
    return baseStages.map((stage, index) => ({
      stage,
      date: `Jan ${index + 1}, 2025`,
      completed: index <= completedIndex,
    }));
  };

  // order status code will end here

  const statusData = getTimeline();

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.timelineContainer}>
        <View style={styles.timeline}>
          {index !== 0 && <View style={styles.line} />}
          <Icon
            name={
              item.canceled
                ? 'cancel'
                : item.completed
                ? 'check-circle'
                : 'radio-button-unchecked'
            }
            size={24}
            color={item.canceled ? 'red' : item.completed ? 'green' : 'gray'}
          />
          {index !== statusData.length - 1 && <View style={styles.line2} />}
        </View>

        <View
          style={[
            styles.statusBox,
            item.completed && styles.itemComplete,
            item.canceled && styles.itemCanceled,
          ]}>
          <Text style={styles.status}>{item.stage}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  const renderStatusCard = () => {
    let label = '';
    let bgColor = '';
    const normalizedStatus =
      typeof status === 'string' ? status.toLowerCase() : 'unknown';

    switch (normalizedStatus) {
      case 'Delivered':
        label = 'Delivered';
        bgColor = '#D6F6D6';
        break;
      case 'Canceled':
        label = 'ORDER CANCELED';
        bgColor = '#FDD';
        break;
      case 'Shipping':
        label = 'ORDER IN SHIPPING';
        bgColor = '#DDEEFF';
        break;
      case 'Return':
        label = 'ORDER RETURNED';
        bgColor = '#FFF3CD';
        break;
      case 'Exchange':
        label = 'ORDER EXCHANGED';
        bgColor = '#E0E0FF';
        break;
      default:
        label = `ORDER STATUS: ${normalizedStatus.toUpperCase()}`;
        bgColor = '#EEE';
    }

    return (
      <View style={[styles.statusCard, {backgroundColor: bgColor}]}>
        <Text style={styles.statusCardText}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderStatusCard()}

      <View style={styles.textContainer}>
        <Image
          source={{
            uri:
              image || 'https://via.placeholder.com/100x100.png?text=No+Image',
          }}
          style={styles.img}
        />
        <View style={styles.TextData}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>₹ {cost}</Text>
          <Text style={styles.orderId}>Order ID - {orderId}</Text>
          <Text style={styles.seller}>Seller: ShopEasy</Text>
        </View>
      </View>

      <FlatList
        data={statusData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {status !== 'Canceled' && (
        <TouchableOpacity>
          <Text style={styles.supportImg}>Help Center...</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  textContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    height: 150,
    borderColor: '#ddd',
    borderWidth: 5,
    flexDirection: 'row',
  },
  TextData: {
    marginLeft: 20,
    marginTop: 10,
    flex: 1,
  },
  orderId: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 5,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  price: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 2,
  },
  seller: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '800',
    marginTop: 2,
  },
  supportImg: {
    height: 40,
    width: 112,
    alignSelf: 'flex-end',
    marginTop: -60,
    fontSize: 15,
    fontWeight: '900',
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 8,
    textAlign: 'center',
  },
  img: {
    width: 100,
    height: '100%',
    borderRadius: 5,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  timeline: {
    alignItems: 'center',
    width: 30,
    marginTop: -15,
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: 'green',
    marginTop: -20,
  },
  line2: {
    width: 2,
    height: 50,
    backgroundColor: 'green',
    marginTop: -2,
    marginBottom: -10,
  },
  statusBox: {
    padding: 10,
    marginTop: -12,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: -1,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  itemComplete: {
    backgroundColor: '#C0EBA6',
  },
  itemCanceled: {
    backgroundColor: '#FDD',
  },
  statusCard: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  statusCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default OrderTrack;


