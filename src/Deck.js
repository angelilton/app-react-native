import { useRef } from 'react';
import { View, Text, PanResponder, Animated, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Deck = ({ data }) => {

  const position = new Animated.ValueXY();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {},
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {
        //when the finger is leave
      },
    })
  ).current;

  function getLayout() {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{rotate}]
    }
  }


  return (
    <View>
      {data.map((item, index) => {
        if (index === 0) {
          return (
            <Animated.View
              key={item.id}
              style={getLayout()}
              {...panResponder.panHandlers}
            >
              <Card key={item.id}>
                <Card.Title>{item.text}</Card.Title>
                <Card.Image source={{ uri: item.uri }} />
                <Text style={{ marginBottom: 10 }}>
                  I can customize the Card further.
                </Text>
                <Button
                  icon={{ name: 'code' }}
                  backgroundColor='#03a9f3'
                  title={' View Now!'}
                />
              </Card>
            </Animated.View>
          );
        }

        return (
          <Card key={item.id}>
          <Card.Title>{item.text}</Card.Title>
          <Card.Image source={{ uri: item.uri }} />
          <Text style={{ marginBottom: 10 }}>
            I can customize the Card further.
          </Text>
          <Button
            icon={{ name: 'code' }}
            backgroundColor='#03a9f3'
            title={' View Now!'}
          />
        </Card>
        )
      })}
    </View>
  );};



export default Deck;
