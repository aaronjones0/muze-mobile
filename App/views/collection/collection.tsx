import { useTheme } from '@shopify/restyle';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { Button } from 'react-native';

export default function Collection({ navigation }) {
  const theme = useTheme();

  return (
    <Box
      backgroundColor='primarySurface'
      height='100%'
      paddingVertical='s40'
      paddingHorizontal='s20'
    >
      <Text variant='h1'>Collection</Text>
      <Box
        backgroundColor='primary'
        borderRadius={24}
        shadowColor='shadowColor'
        shadowOffset={{ width: 0, height: 4 }}
        shadowRadius={8}
        shadowOpacity={0.2}
      >
        <Button
          title='Home'
          onPress={() => navigation.navigate('Home')}
          color={theme.colors.text2}
        />
      </Box>
    </Box>
  );
}
