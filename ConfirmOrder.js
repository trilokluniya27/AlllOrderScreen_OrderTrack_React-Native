import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// const {width} = Dimensions.get('window');

const OrderData = [
  {
    id: '1',
    name: 'FoodOil',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://img.freepik.com/premium-vector/bottle-cooking-oil-clipart_251822-481.jpg',
    status: 'Return',
  },
  {
    id: '2',
    name: 'Tava',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://tuffwareindia.com/wp-content/uploads/2015/08/44-thickbox_default-Flat-Tawa.jpg',
    status: 'Shipping',
  },
  {
    id: '3',
    name: 'Cooker',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://www.theindusvalley.in/cdn/shop/files/1st_Image.jpg?v=1733225570&width=1946',
    status: 'Canceled',
  },
  {
    id: '4',
    name: 'Bottel',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://www.rasoishop.com/cdn/shop/files/8906119475918_3.jpg?v=1716442702',
    status: 'Shipping',
  },
  {
    id: '5',
    name: 'Fruits',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1A-FsvqrAcOIskq-YGXlUjQcoR0ln3w6omw&s',
    status: 'Canceled',
  },
  {
    id: '5',
    name: 'Glass',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://images.unsplash.com/photo-1514651029128-173d2e6ea851?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhc3N8ZW58MHx8MHx8fDA%3D',
    status: 'Canceled',
  },
  {
    id: '6',
    name: 'Vegetables',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg',
    status: 'Shipping',
  },
  {
    id: '7',
    name: 'Freezer',
    cost: '100',
    date: 'Jan 1, 2025',
    image: 'https://www.sathya.store/img/category/YSR5reFe4jPMZvX6.jpg',
    status: 'Delivered',
  },
  {
    id: '8',
    name: 'Electric Burner',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://image.made-in-china.com/202f0j00WwelBdjcwKuQ/Superior-Quality-Factory-Wholesale-Infrared-Cooker-Hob-Single-Burner-Electric-Cooktops-Home-Appliances.webp',
    status: 'Canceled',
  },
  {
    id: '9',
    name: 'Electric Oven',
    cost: '100',
    date: 'Jan 1, 2025',
    image: 'https://img.archiexpo.com/images_ae/photo-mg/661-15474980.jpg',
    status: 'Shipping',
  },
  {
    id: '10',
    name: 'Cup',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-edt05awdK7Ga8-fM67YrTvaVMSOxq2R1A&s',
    status: 'Delivered',
  },
  {
    id: '11',
    name: 'Glass',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://images.unsplash.com/photo-1514651029128-173d2e6ea851?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhc3N8ZW58MHx8MHx8fDA%3D',
    status: 'Return',
  },
  {
    id: '12',
    name: 'Pickel',
    cost: '100',
    date: 'Jan 1, 2025',
    image:
      'https://priyafoods.com/cdn/shop/products/MangoAvakayaWG300g.jpg?v=1689145579',
    status: 'Ordered',
  },
  {
    id: '13',
    name: 'Freezer',
    cost: '300',
    date: 'Jan 1, 2025',
    image: 'https://www.sathya.store/img/category/YSR5reFe4jPMZvX6.jpg',
    status: 'Return',
  },
  {
    id: '14',
    name: 'Mixer',
    cost: '200',
    date: 'Jan 1, 2025',
    image:
      'https://shop.bajajelectricals.com/cdn/shop/files/410185-NEWTORNADO550WATTSMIXERGRINDER.jpg?v=1727081759',
    status: 'Exchange',
  },
  {
    id: '15',
    name: 'Fan',
    cost: '500',
    date: 'Jan 1, 2025',
    image:
      'https://shop.bajajelectricals.com/cdn/shop/files/252108-TURBO400mmFijiBlueTableFan.jpg?v=1727153266',
    status: 'Ordered',
  },
  {
    id: '16',
    name: 'AC',
    cost: '1000',
    date: 'Jan 1, 2025',
    image:
  'https://static.vecteezy.com/system/resources/thumbnails/025/739/597/small/close-up-shot-of-newly-installed-white-air-conditioner-working-ac-hanging-on-the-pastel-color-wall-with-a-lot-of-copy-space-for-text-background-generative-ai-free-photo.jpg',
    status: 'Delivered',
  },
];

const getStatusStyle = status => {
  switch (status) {
    case 'Delivered':
      return styles.deliverd;
    case 'Canceled':
      return styles.canceled;
    case 'Shipping':
      return styles.shiping;
    case 'Exchange':
      return styles.exchange;
    case 'Return':
      return styles.return;
    case 'Ordered':
      return styles.ordered;
    default:
      return {};
  }
};

// (selectedFilter ==='All' ||  OrderData :OrderData.filter(Order=>Order.status===selectedFilter);
const ConfirmOrder = () => {
  const navigation = useNavigation();

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filterOrders = OrderData.filter(
    order =>
      (selectedFilter === 'All' || order.status === selectedFilter) &&
      (order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.date.includes(searchQuery)),
  );
  // Order Item Card
  const OrderItem = ({item}) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() =>
        navigation.navigate('OrderDetail', {
          orderId: item.id,
          name: item.name,
          image: item.image,
          cost: item.cost,
          status: item.status, 
        })
      }
      >
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.orderDetails}>
        <Text
          style={[
            styles.orderText,
            {fontSize: 25, fontWeight: 'bold', color: ''},
          ]}>
          {item.name}
        </Text>
        <Text style={[styles.orderText, {fontWeight: 'bold'}]}>
        ₹ {item.cost}
        </Text>
        <Text
          style={[styles.orderText, {color: '#123524', fontWeight: 'bold'}]}>
          {item.date}
        </Text>
        <Text style={[styles.statusText, getStatusStyle(item.status)]}>
          {item.status}{' '}
        </Text>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Cancel Order</Text>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView>
    <View style={styles.CardContainer}>
      <Text style={styles.header}> All Orders</Text>
      <TextInput
        placeholder=" Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBox}
      />
      <View style={styles.filterContainer}>
        {[
          'All',
          'Ordered',
          'Shipping',
          'Delivered',
          'Canceled',
          'Return',
          'Exchange',
        ].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filterOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <OrderItem item={item} />}
      />
    </View>
    // </SafeAreaView>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  CardContainer: {
    // marginTop: 6,
    // height: 150,
    // width: width,
    // backgroundColor: '#F1EFEC',
    // borderRadius: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 10,
    // borderWidth:3,
    backgroundColor: '#fff',
  },
  image: {
    width: '30%',
    height: '100%',
    marginRight: 10,
    borderRadius: 5,
    // backgroundColor:'#FBF5DD'
  },
  orderDetails: {
    flex: 1,
    marginTop: 10,
  },
  orderText: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'Georgia',
    marginBottom: 5,
  },

  //   imageContainer: {
  //     width: '35%',
  //     height: '90%',
  //     borderTopLeftRadius: 10,
  //     borderBottomLeftRadius: 10,
  //   },
  //   textContainer: {
  //     flex:1,
  //     fontSize: 20,
  //     alignSelf: 'center',
  //     marginLeft: 200,
  //     marginTop: -150,
  //   },
  //   textData: {
  //     fontSize: 20,
  //     fontFamily: 'Georgia',
  //     fontWeight: 800,
  //   },
  //   button: {
  //     marginTop: 2,
  //     marginLeft: 20,
  //     height: 50,
  //     width: 150,
  //     borderRadius: 10,
  //     backgroundColor: 'tomato',
  //   },
  //   btnText: {
  //     textAlign: 'center',
  //     fontSize: 20,
  //     padding: 10,
  //     fontWeight: 500,
  //     color: 'white',
  //   },
  //   filter: {},
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  deliverd: {
    color: 'green',
    textAlign: 'right',
    marginTop: -20,
  },
  canceled: {
    color: 'tomato',
    textAlign: 'right',
    marginTop: -20,
  },
  shiping: {
    color: 'blue',
    textAlign: 'right',
    marginTop: -20,
  },
  exchange: {
    color: 'black',
    textAlign: 'right',
    marginTop: -20,
  },
  return: {
    color: 'blue',
    textAlign: 'right',
    marginTop: -20,
  },
  ordered: {
    color: 'green',
    textAlign: 'right',
    marginTop: -20,
  },
  searchBox: {
    borderWidth: 1.5,
    backgroundColor: '#fff',
    borderColor: 'black',
    padding: 8,
    height: 50,
    fontSize: 25,
    borderRadius: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    margin: 3,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  filterText: {
    fontSize: 14,
  },
  activeFilter: {
    backgroundColor: '#ccc',
  },
});
