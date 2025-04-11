import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchScreen = () => {
  const [placeholder, setPlaceholder] = useState('');
  const suggestions = ['Search "Grocery"', 'Search "bread"', 'Search "butter"', 'Search "cold drinks"'];
  const suggestionIndex = useRef(0);

  // Infinite typing animation logic

  useEffect(() => {
    let typingInterval = null;
    let charIndex = 0;
    let currentText = '';

    const typeText = () => {
      const currentSuggestion = suggestions[suggestionIndex.current];
      charIndex = 0;
      currentText = '';
      setPlaceholder('');

      typingInterval = setInterval(() => {
        if (charIndex < currentSuggestion.length) {
          currentText += currentSuggestion[charIndex];
          setPlaceholder(currentText);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            suggestionIndex.current = (suggestionIndex.current + 1) % suggestions.length;
            typeText(); // call next suggestion
          },4000); // wait 1.5 seconds after complete
        }
      }, 100); // typing speed
    };

    typeText(); // start loop

    return () => clearInterval(typingInterval);
  }, []);

  // UI Animations

  const searchAnim = useRef(new Animated.Value(-50)).current;
  const searchOpacity = useRef(new Animated.Value(0)).current;
  const bannerScale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(searchAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(searchOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(bannerScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.blinkitText}>Baazar Market</Text>
          <TouchableOpacity>
            <FontAwesome5 name="user" size={22} color="#444" style={styles.ProfileLogo} />
          </TouchableOpacity>
          <Text style={styles.timeText}>Delivered in 10 minutes</Text>
          <Text style={styles.locationText}>
            Home - 101, Vikas Nagar Dewas <Icon name="keyboard-arrow-down" size={18} color={'black'} />
          </Text>
        </View>

        {/* Animated Search Bar */}

        <Animated.View style={[styles.searchContainer, {
          transform: [{ translateY: searchAnim }],
          opacity: searchOpacity,
        }]}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor="#888"
          />
          <TouchableOpacity>
            <Icon name="keyboard-voice" size={24} color="#888" />
          </TouchableOpacity>
        </Animated.View>

        {/* Horizontal Category Tabs */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabs}>
          <TouchableOpacity>
            <View style={styles.categoryItem}>
              <FontAwesome5 name="th-large" size={18} color="#444" />
              <Text style={styles.categoryText}>All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.categoryItem}>
              <FontAwesome5 name="utensils" size={18} color="#444" />
              <Text style={styles.categoryText}>Utensils</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.categoryItem}>
              <AntDesign name="medicinebox" size={18} color="#444" />
              <Text style={styles.categoryText}>Medicines</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.categoryItem}>
              <FontAwesome5 name="spa" size={18} color="#444" />
              <Text style={styles.categoryText}>Grocery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.categoryItem}>
              <MaterialCommunityIcons name="fruit-grapes" size={18} color="#444" />
              <Text style={styles.categoryText}>Fruits</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Welcome Banner */}

        <Animated.View style={[styles.welcomeBanner, { transform: [{ scale: bannerScale }] }]}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSub}>Order now to avail exciting offers!</Text>

          <View style={styles.offerBox}>
            <View style={styles.offerItem}>
              <Text style={styles.offerMain}>₹ Flat 50 OFF</Text>
              <Text style={styles.offerDesc}>on your first order{'\n'}above ₹299</Text>
            </View>
            <View style={styles.offerDivider}><Text style={styles.plusSign}>+</Text></View>
            <View style={styles.offerItem}>
              <Text style={styles.offerMain}>Free Delivery</Text>
              <Text style={styles.offerDesc}>on first 10 orders</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5C945', 
    padding: 16,
  },
  header: {
    marginBottom: 10,
  },
  blinkitText: {
    fontSize: 14,
    color: '#444',
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  locationText: {
    fontSize: 15,
    color: '#333',
    marginTop: 4,
  },
  ProfileLogo: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
    elevation: 3,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  categoryTabs: {
    marginTop: 20,
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 12,
    color: '#444',
  },
  welcomeBanner: {
    marginTop: 30,
    backgroundColor: '#fff7d1',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#754c00',
  },
  welcomeSub: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
    marginBottom: 20,
  },
  offerBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 2,
  },
  offerItem: {
    flex: 1,
    alignItems: 'center',
  },
  offerMain: {
    fontWeight: 'bold',
    color: '#d32f2f',
    fontSize: 16,
  },
  offerDesc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    marginTop: 4,
  },
  offerDivider: {
    paddingHorizontal: 10,
  },
  plusSign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
});
