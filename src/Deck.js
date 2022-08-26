import { useRef, useEffect, useState } from 'react';
import { View, Text, PanResponder, Animated, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

const initial = () => {}

const Deck = ({ data, onSwipeRight = initial, onSwipeLeft = initial }) => {
  const [itemIndex, setItemIndex] = useState(0);

  const position = new Animated.ValueXY();

  function resetPosition() {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  function onSwipeComplete(direction) {
    // direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });

    direction === 'right'
      ? setItemIndex((i) => i + 1)
      : setItemIndex((i) => i - 1);
    
  }

  // do the card swipe animation when is 45°
  function forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x: x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        //when the finger is leave
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left: ');
        } else resetPosition();
      },
    })
  ).current;

  
  console.log('itemIndex', itemIndex);

    console.log('panResponder', panResponder);

  function getLayout() {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  }

  if (itemIndex >= data.length) {
    return <NoMoreCards />;
  }


  return (
    <View>
      {data.map((item, index) => {
        if (index < itemIndex) return null;

        if (index === itemIndex) {
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
        );

      })}
    </View>
  );
};



export default Deck;


function NoMoreCards() {
  return (
    <Card title="All Done!">
      <Text style={{marginBottom: 10}}>there are no more cards</Text>
      <Button title= "Get More!" backgroundColor="#03a9f4"/>
    </Card>
  )
}
