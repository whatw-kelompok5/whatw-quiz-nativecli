import React, {useEffect, useRef} from 'react';
import {
  Button,
  ButtonText,
  View,
  Text,
  ButtonIcon,
  Image,
} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Diamond from '../components/Diamond';
import WaterWave from '../feature/background/WaterWave';
import ReversedWaterWave from '../feature/background/ReversedWaterWave';
import {RootState} from '../store/type/RootState';
import {useSelector} from 'react-redux';

export default function Task({navigation}: any) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [timePerQuestion, setTimePerQuestion] = React.useState(10);
  const [timerKey, setTimerKey] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(-1);

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
      const timeLeftScore = timePerQuestion * 5;
      setScore(prevScore => prevScore + timeLeftScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setTimePerQuestion(10);
      }, 1000);
    } else {
      setShowScore(true);
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startCountdown = () => {
      interval = setInterval(() => {
        setTimePerQuestion(prevTime => {
          if (prevTime === 0) {
            clearInterval(interval!);
            handleTimeUp();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    };

    const handleTimeUp = () => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setTimePerQuestion(10);
      } else {
        setShowScore(true);
      }
    };

    if (!showScore && timePerQuestion > 0) {
      startCountdown();
    } else if (!showScore && timePerQuestion === 0) {
      handleTimeUp();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentQuestion, showScore, quizData.length, timePerQuestion]);

  useEffect(() => {
    setSelectedOptionIndex(-1);
  }, [currentQuestion]);
  return (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
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
            <View />
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
            height="85%"
            borderTopLeftRadius="$2xl"
            borderTopRightRadius="$2xl"
            alignItems="center">
            {/* <WaterWave />
            <ReversedWaterWave /> */}
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
              <CountDown
                key={timerKey}
                until={timePerQuestion}
                size={20}
                onFinish={() => setTimePerQuestion(0)}
                digitStyle={{backgroundColor: 'white'}}
                digitTxtStyle={{color: '#12486B'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: '', s: ''}}
                showSeparator
              />
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
                <Button onPress={() => navigation.navigate('StartGame')}>
                  <Text color="white">Continue</Text>
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
                <Text marginTop={20}>question :</Text>
                <Text fontWeight="bold" fontSize={20} marginBottom={20}>
                  {quizData[currentQuestion].question}
                </Text>
                {quizData[currentQuestion].options.map((option, index) => (
                  <View key={index}>
                    <Button
                      key={index}
                      size="md"
                      height={60}
                      variant="solid"
                      backgroundColor={
                        selectedOption === option
                          ? option === quizData[currentQuestion].answer
                            ? 'green'
                            : 'red'
                          : '#12486B'
                      }
                      action="primary"
                      isDisabled={false}
                      isFocusVisible={false}
                      rounded="$full"
                      width={300}
                      marginTop={10}
                      onPress={() => {
                        setSelectedOptionIndex(index);
                        setSelectedOption(option);
                        handleAnswer(option);
                      }}>
                      <ButtonText>{option}</ButtonText>
                      {selectedOptionIndex === index && (
                        <View
                          style={{position: 'absolute', top: -15, right: -15}}>
                          <AvatarAnswer />
                        </View>
                      )}
                    </Button>
                  </View>
                ))}

                <View
                  backgroundColor="#12486B"
                  width={100}
                  height={60}
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

function AvatarAnswer() {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <View>
      <Image
        borderWidth={5}
        width={50}
        height={50}
        borderRadius={100}
        borderColor="white"
        source={auth?.avatar?.image}
        alt="avatar"
        backgroundColor="red"
        justifyContent="center"
        alignItems="center"
        position="relative"
      />
    </View>
  );
}
