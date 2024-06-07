import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput,Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setQuestions, addScore } from '../../redux/quizSlice';
import { generateRandomQuestions } from '../../utils/randomize';
import { Question } from '../../types/quizType';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../types/navigationType';

const QuizScreen = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [modalVisible, setModalVisible] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  useEffect(() => {
    const randomQuestions = generateRandomQuestions();
    dispatch(setQuestions(randomQuestions));
  }, [dispatch]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const calculatedScore = questions.reduce((total, question, index) => {
      if (question.answers[selectedAnswers[index]] === question.correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);

    setScore(calculatedScore);
    setModalVisible(true);
  };

  const handleSaveScore = () => {
    if (playerName.trim()) {
      dispatch(addScore({ name: playerName, score }));
      setModalVisible(false);
      setPlayerName('');
      navigation.navigate('Leaderboard'); 
    } else {
      Alert.alert('Please enter your name.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {questions.map((question, questionIndex) => (
          <View key={questionIndex} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.answers.map((answer, answerIndex) => (
              <TouchableOpacity
                key={answerIndex}
                style={[
                  styles.answerButton,
                  selectedAnswers[questionIndex] === answerIndex && styles.selectedAnswerButton,
                ]}
                onPress={() => handleAnswerSelect(questionIndex, answerIndex)}
              >
                <Text style={styles.answerText}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <View style={styles.submitButton}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Your Score: {score}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={playerName}
              onChangeText={setPlayerName}
            />
            <Button title="Save Score" onPress={handleSaveScore} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 12,
  },
  answerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedAnswerButton: {
    backgroundColor: '#cce',
  },
  answerText: {
    fontSize: 16,
  },
  submitButton: {
    marginBottom: 120,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 12,
  },
});

export default QuizScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

