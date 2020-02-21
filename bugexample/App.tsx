/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, ReactNode} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Markdown from 'react-native-markdown-display';

const copy = `
I've investigated this; this is caused because when shouldComponentUpdate was removed, the shallow comparison of incoming props was removed. Consequently, if you use <Markdown {...} /> within a ScrollView, it will unnecessarily re-render the markdown each time the scroll position changes. if an image is being fetched from a url, the constant re-rendering leads to the glitch -- because FitImage needs time to figure out it's height and width. (it defaults to height 0 if the info is unavailable)

I've investigated this; this is caused because when shouldComponentUpdate was removed, the shallow comparison of incoming props was removed. Consequently, if you use <Markdown {...} /> within a ScrollView, it will unnecessarily re-render the markdown each time the scroll position changes. if an image is being fetched from a url, the constant re-rendering leads to the glitch -- because FitImage needs time to figure out it's height and width. (it defaults to height 0 if the info is unavailable)

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png)

I've investigated this; this is caused because when shouldComponentUpdate was removed, the shallow comparison of incoming props was removed. Consequently, if you use <Markdown {...} /> within a ScrollView, it will unnecessarily re-render the markdown each time the scroll position changes. if an image is being fetched from a url, the constant re-rendering leads to the glitch -- because FitImage needs time to figure out it's height and width. (it defaults to height 0 if the info is unavailable)

I've investigated this; this is caused because when shouldComponentUpdate was removed, the shallow comparison of incoming props was removed. Consequently, if you use <Markdown {...} /> within a ScrollView, it will unnecessarily re-render the markdown each time the scroll position changes. if an image is being fetched from a url, the constant re-rendering leads to the glitch -- because FitImage needs time to figure out it's height and width. (it defaults to height 0 if the info is unavailable)

`;

// use this instead if you want it to work
const FixedMarkdown = React.memo(props => <Markdown {...props} />);

const App: () => ReactNode = () => {
  const [titleAlpha, setTitleAlpha] = useState(1);

  const handleScroll = (event: any) => {
    const alpha = 1 - Math.min(event.nativeEvent.contentOffset.y, 100) / 100;
    setTitleAlpha(alpha);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={{...styles.title, opacity: titleAlpha}}>Title</Text>
        <ScrollView
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <Markdown>{copy}</Markdown>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  title: {
    backgroundColor: Colors.black,
    color: Colors.white,
    fontSize: 48,
  },
});

export default App;
