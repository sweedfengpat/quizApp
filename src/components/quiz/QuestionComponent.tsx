import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Question } from '../../data/quiz';
import { shuffleArray } from '../../utils/shuffle';

interface QuestionComponentProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswer }) => {
  const shuffledAnswers = shuffleArray(question.answers);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {shuffledAnswers.map((answer, index) => (
        <Button key={index} title={answer} onPress={() => onAnswer(answer)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  question: { fontSize: 20, marginBottom: 10 },
});

export default QuestionComponent;
