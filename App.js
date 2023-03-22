import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, createStackNavigator } from 'react-navigation';

export default function App() {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);


  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=a914f6db85534d6694561c436ea763cf')
      .then((response) => response.json())
      .then((data) => setNews(data.articles))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedArticle(item)}>
      <Image style={styles.image} source={{ uri: item.urlToImage }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.readMoreButton} onPress={() => setSelectedArticle(item)}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderDetail = () => (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedArticle(null)}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image style={styles.selectedImage} source={{ uri: selectedArticle.urlToImage }} />
      <Text style={styles.selectedTitle}>{selectedArticle.title}</Text>
      <Text style={styles.selectedDescription}>{selectedArticle.description}</Text>
      <Text style={styles.selectedContent}>{selectedArticle.content}</Text>
      <Text style={styles.selectedAuthor}>{selectedArticle.author}</Text>
      <Text style={styles.selectedPublishedAt}>{selectedArticle.publishedAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="User profile"
        onPress={() => this.props.navigation.navigate('Settings')
      }
      />
      {selectedArticle ? (
        renderDetail()
      ) : (
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
        />
      )}
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9c2ff',
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  readMoreButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});