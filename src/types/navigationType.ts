

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Quiz: undefined;
    Leaderboard: undefined;
  };

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;
type LeaderboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Leaderboard'>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
type LeaderboardScreenRouteProp = RouteProp<RootStackParamList, 'Leaderboard'>;

export type { HomeScreenNavigationProp, QuizScreenNavigationProp, LeaderboardScreenNavigationProp, HomeScreenRouteProp, QuizScreenRouteProp, LeaderboardScreenRouteProp };