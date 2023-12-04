import React, {useEffect} from 'react';
import {Button, ButtonText, View, Text, Image} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import {RootState} from '../store/type/RootState';
import {useSelector} from 'react-redux';
import {useQuetion} from '../hooks/useQuetion';
import {Loading} from '../feature/loading/Loading';
import io from 'socket.io-client';
import LottieView from 'lottie-react-native';

export default function Task({navigation}: any) {
  const auth = useSelector((state: RootState) => state.auth);
  const {Questions} = useQuetion();
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [timePerQuestion, setTimePerQuestion] = React.useState(10);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(-1);
  const [userAnswers, setUserAnswers] = React.useState<any>('');
  const [answersUsers, setAnswersUsers] = React.useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://192.168.18.107:3000');
    // const socket = io('http://192.168.100.7:5000');

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      socket.emit('userData', {
        avatar: auth.avatar?.image,
        fullname: auth.fullname,
        answers: userAnswers,
        score: score,
      });
    });

    socket.on('playersData', (data: any) => {
      setAnswersUsers(data);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [auth, userAnswers]);

  useEffect(() => {
    if (Questions) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isLoading, Questions]);

  const quizData = Array.isArray(Questions) ? Questions : [];

  const handleAnswer = (selectedAnswer: string) => {
    const answer = quizData[currentQuestion].answer;
    setUserAnswers((prevAnswers: any) => {
      return {
        ...prevAnswers,
        [currentQuestion]: selectedAnswer,
      };
    });
    if (answer === selectedAnswer) {
      const timeLeftScore = timePerQuestion * 5;
      setScore(prevScore => prevScore + timeLeftScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setTimePerQuestion(10);
      }, 5000);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 5000);
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
        setTimeout(() => {
          setShowScore(true);
        }, 5000);
        setShowScore(false);
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

  const filteredData = answersUsers.filter(item => item.score !== -1);
  filteredData.sort((a, b) => b.score - a.score);

  return isLoading ? (
    <Loading />
  ) : (
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
          paddingTop={30}>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingHorizontal={20}>
            <LottieView
              source={require('../assets/lottie/astronot.json')}
              autoPlay
              loop
              style={{width: 80, height: 80}}
            />
            <View />
            <View />
          </View>
          <View
            backgroundColor="transparent"
            width={'100%'}
            height="75%"
            borderTopLeftRadius="$2xl"
            borderTopRightRadius="$2xl"
            alignItems="center">
            {showScore ? (
              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={-50}
                height={300}>
                <View marginBottom={-100}>
                  <LottieView
                    source={require('../assets/lottie/Animation - Congrats.json')}
                    autoPlay
                    loop
                    style={{width: 300, height: 350}}
                  />
                </View>

                {filteredData.map((item: any, index) => {
                  if (item.score !== -1) {
                    let champion = '';
                    let sizeWidth = 0;
                    let sizeHeight = 0;
                    if (index === 0) {
                      champion = require('../assets/images/champion/first-place-medal.png');
                    } else if (index === 1) {
                      champion = require('../assets/images/champion/second-place-medal.png');
                    }

                    if (index === 0) {
                      sizeWidth = 95;
                      sizeHeight = 95;
                    } else if (index === 1) {
                      sizeWidth = 80;
                      sizeHeight = 80;
                    }
                    return (
                      <View
                        key={index}
                        display="flex"
                        flexDirection="row"
                        gap={10}
                        marginBottom={20}
                        justifyContent="center"
                        alignItems="center">
                        <View position="absolute">
                          <LottieView
                            source={require('../assets/lottie/Animation - Champion.json')}
                            autoPlay
                            duration={10000}
                            loop={false}
                            style={{width: 500, height: 800}}
                          />
                        </View>
                        <View
                          backgroundColor="transparent"
                          width={'80%'}
                          borderColor="white"
                          borderWidth={1}
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          height={70}
                          paddingLeft={10}
                          borderRadius="$full">
                          <View
                            display="flex"
                            flexDirection="row"
                            gap={10}
                            alignItems="center">
                            <Image
                              source={{uri: item.avatar}}
                              alt="avatar"
                              rounded="$full"
                              width={50}
                              height={50}
                            />
                            <View
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start">
                              <Text
                                color="white"
                                textAlign="center"
                                fontWeight="bold"
                                fontSize={16}>
                                {item.fullname}
                              </Text>
                              <Text
                                color="white"
                                textAlign="center"
                                fontSize={10}>
                                {item.score} points
                              </Text>
                            </View>
                          </View>
                          {champion && (
                            <Image
                              marginLeft={-10}
                              marginRight={-40}
                              source={champion}
                              alt="champion"
                              width={sizeWidth}
                              height={sizeHeight}
                            />
                          )}
                        </View>
                      </View>
                    );
                  }
                })}
                <Button
                  backgroundColor="transparent"
                  borderColor="white"
                  borderWidth={1}
                  $active-borderColor="#12486B"
                  borderRadius="$3xl"
                  marginTop={100}
                  onPress={() => navigation.navigate('StartGame')}>
                  <Text color="white">Back To Home</Text>
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
                <View
                  display="flex"
                  flexDirection="row"
                  gap={10}
                  justifyContent="center"
                  alignItems="center">
                  <View
                    backgroundColor="transparent"
                    width={50}
                    borderColor="white"
                    borderWidth={1}
                    display="flex"
                    height={50}
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="$3xl">
                    <Text color="white" textAlign="center" fontWeight="bold">
                      00
                    </Text>
                  </View>
                  <Text color="white" textAlign="center" fontWeight="bold">
                    :
                  </Text>
                  <View
                    backgroundColor="transparent"
                    width={50}
                    borderColor="white"
                    borderWidth={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    height={50}
                    alignItems="center"
                    borderRadius="$3xl">
                    <Text color="white" textAlign="center" fontWeight="bold">
                      {timePerQuestion}
                    </Text>
                  </View>
                </View>
                <Text marginTop={20} color="white">
                  question :
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize={20}
                  marginBottom={50}
                  color="white">
                  {quizData[currentQuestion].question}
                </Text>
                {quizData[currentQuestion].options.map(
                  (option: string, index: number) => (
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
                        $active-bgColor="#F5F5F5"
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
                        <ButtonText position="absolute">{option}</ButtonText>
                        {answersUsers.map((data, dataIndex) => {
                          const userAnswer =
                            data.answers[currentQuestion.toString()];
                          if (userAnswer === option) {
                            return (
                              <View
                                left={100}
                                borderColor="white"
                                gap={10}
                                width={40}
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center">
                                <AvatarAnswer
                                  key={dataIndex}
                                  avatar={data.avatar}
                                />
                              </View>
                            );
                          }
                          return null;
                        })}
                      </Button>
                    </View>
                  ),
                )}

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
                    {quizData[currentQuestion].id - 1}/{quizData.length}
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

function AvatarAnswer(props: {avatar: any}) {
  return (
    <Image
      borderWidth={5}
      width={35}
      height={35}
      borderRadius={100}
      borderColor="white"
      source={{uri: props.avatar}}
      alt="avatar"
      backgroundColor="red"
    />
  );
}
