import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const predefinedQuestions = [
  'How to place an order?',
  'Where is my order?',
  'Cancel my order',
  'How to return a product?',
  'Payment not working',
];

const autoReplies = {
  'How to place an order?': 'To place an order, go to Products → Add to Cart → Checkout.',
  'Where is my order?': 'You can track your order from the Order History page.',
  'Cancel my order': 'To cancel, go to Orders → Select Order → Cancel.',
  'How to return a product?': 'To return, go to Orders → Select → Request Return.',
  'Payment not working': 'Please try another card or check your internet connection.',
};

const HelpCenterChatScreen = () => {
  const [chat, setChat] = useState([
    { id: 'start', text: 'Hi! How can I help you today?', sender: 'support' },
  ]);

  const handleQuestion = (question) => {
    const userMsg = { id: Date.now().toString(), text: question, sender: 'user' };
    const botMsg = {
      id: (Date.now() + 1).toString(),
      text: autoReplies[question] || "Sorry, I didn't understand that.",
      sender: 'support',
    };

    setChat((prev) => [...prev, userMsg, botMsg]);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubbleNew : styles.supportBubble,
      ]}
    >
      <Text style={item.sender === 'user' ? styles.userText : styles.supportText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Help Center</Text>
      </View> */}

      <FlatList
        data={chat}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.optionsContainer}>
        <Text style={styles.chooseText}>Ask a question 👇</Text>
        <View style={styles.optionBox}>
          {predefinedQuestions.map((q) => (
            <TouchableOpacity
              key={q}
              onPress={() => handleQuestion(q)}
              style={styles.optionButtonBox}
            >
              <Text style={styles.optionText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenterChatScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f2' },

  header: {
    backgroundColor: '#007bff',
    padding: 16,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  chatContainer: {
    padding: 10,
    paddingBottom: 100,
  },

  messageBubble: {
    padding: 12,
    marginVertical: 4,
    maxWidth: '80%',
  },

  userBubbleNew: {
    alignSelf: 'flex-end',
    backgroundColor: '#4e8cff',
    padding: 14,
    borderRadius: 24,
    marginVertical: 4,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  supportBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5eb',
    borderRadius: 50,
    marginHorizontal: 8,
    padding: 14,
  },

  userText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },

  supportText: {
    color: 'black',
    fontSize: 15,
    fontWeight:'900'
  },

  optionsContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },

  chooseText: {
    fontWeight: '900',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    textAlign:'center'
  },

  optionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  optionButtonBox: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginVertical: 6,
  },

  optionText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight:'900'
  },
});
