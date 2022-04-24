import { useRef } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import { Card, Button } from 'react-native-elements';


const Deck = ({ data }) => {

  const position = new Animated.ValueXY();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {},
    })
  ).current;


  return (
    <Animated.View style={position.getLayout()} {...panResponder.panHandlers}>
      {data.map((item) => (
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
      ))}
    </Animated.View>
  );};



export default Deck;
