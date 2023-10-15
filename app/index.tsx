import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import Movies from './movies';
const app = () => {
    return(
        <Movies />
    )

}
export default app