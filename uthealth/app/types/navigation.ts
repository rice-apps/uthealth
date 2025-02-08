import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
    Home: undefined
    WorkoutPage: { exerciseId: number }
}

export type WorkoutPageProps = NativeStackScreenProps<
    RootStackParamList,
    'WorkoutPage'
>
