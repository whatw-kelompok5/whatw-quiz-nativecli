/* eslint-disable react-native/no-inline-styles */
import {ButtonIcon, ButtonText, View} from '@gluestack-ui/themed';
import React from 'react';
import WaterWave from '../feature/background/WaterWave';
import Diamond from '../components/Diamond';
import {Button} from '@gluestack-ui/themed';
import {ArrowLeftIcon} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import ReversedWaterWave from '../feature/background/ReversedWaterWave';

export default function Task({navigation}: any) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  const quizData = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      id: 2,
      question: 'What is the largest country in the world?',
      options: ['Russia', 'Canada', 'China', 'USA'],
      answer: 'Russia',
    },
    {
      id: 3,
      question: 'What is the smallest country in the world?',
      options: ['Vatican City', 'Monaco', 'San Marino', 'Malta'],
      answer: 'Vatican City',
    },
    {
      id: 4,
      question: 'What is the currency of Japan?',
      options: ['Yen', 'Dollar', 'Euro', 'Pound'],
      answer: 'Yen',
    },
    {
      id: 5,
      question: 'What is the largest river in the world?',
      options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
      answer: 'Nile',
    },
  ];

  const handleAnswer = (selectedAnswer: string) => {
    const answer = quizData[currentQuestion].answer;
    if (answer === selectedAnswer) {
      setScore(prevScore => prevScore + 20);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <ReversedWaterWave />
        <WaterWave />
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor="transparent"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={60}>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingHorizontal={30}>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              rounded="$full"
              width={10}
              onPress={() => navigation.goBack()}>
              <ButtonIcon as={ArrowLeftIcon} />
            </Button>
            <View />
            <View position="absolute" right={10}>
              <View
                backgroundColor="white"
                height={42}
                borderRadius={100}
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="row"
                gap={10}>
                <Diamond />
              </View>
            </View>
          </View>
          <View
            backgroundColor="white"
            width={'100%'}
            height={600}
            borderTopLeftRadius="$2xl"
            borderTopRightRadius="$2xl"
            alignItems="center">
            <View
              borderWidth={10}
              width={300}
              height={80}
              borderRadius={20}
              borderColor="#12486B"
              marginTop={-40}
              backgroundColor="white"
              justifyContent="center"
              alignItems="center">
              <Text fontWeight="bold" fontSize={20}>
                18:00
              </Text>
            </View>
            {showScore ? (
              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={50}
                height={300}>
                <Text>Congrats, you got</Text>
                <Text
                  color="black"
                  fontSize={20}
                  fontWeight="bold"
                  marginTop={10}
                  marginBottom={60}>
                  {score}
                </Text>
                <Button onPress={() => navigation.navigate('Winner')}>
                  <ButtonText>Continue</ButtonText>
                </Button>
              </View>
            ) : (
              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height={'100%'}
                marginTop={-40}>
                <Text>question :</Text>
                <Text fontWeight="bold" fontSize={20} marginBottom={20}>
                  {quizData[currentQuestion].question}
                </Text>
                {quizData[currentQuestion].options.map((option, index) => (
                  <View>
                    <Button
                      key={index}
                      size="md"
                      height={60}
                      variant="solid"
                      action="primary"
                      isDisabled={false}
                      isFocusVisible={false}
                      rounded="$full"
                      width={300}
                      marginTop={10}
                      onPress={() => handleAnswer(option)}>
                      <ButtonText>{option}</ButtonText>
                    </Button>
                  </View>
                ))}
                <View
                  backgroundColor="#12486B"
                  width={100}
                  height={80}
                  borderRadius={20}
                  borderColor="#12486B"
                  marginTop={30}
                  justifyContent="center"
                  alignItems="center">
                  <Text color="white" fontSize={20}>
                    {quizData[currentQuestion].id}/5
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
