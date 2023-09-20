import { Button } from 'react-native';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { useTheme } from '@shopify/restyle';

export default function Home({ navigation }) {
  const theme = useTheme();

  return (
    <Box
      backgroundColor='primarySurface'
      height='100%'
      paddingVertical='s40'
      paddingHorizontal='s20'
    >
      <Text variant='h1'>Home</Text>
      <Box style={{display: 'flex', flexDirection: 'row', width: '100%', gap: 16}}>
        <Box
          backgroundColor='primary'
          borderRadius={24}
          shadowColor='shadowColor'
          shadowOffset={{ width: 0, height: 4 }}
          shadowRadius={8}
          shadowOpacity={0.2}
          flexGrow={1}
        >
          <Button
            title='Collection'
            onPress={() => navigation.navigate('Collection')}
            color={theme.colors.text2}
          />
        </Box>
        <Box
          backgroundColor='primary'
          borderRadius={24}
          shadowColor='shadowColor'
          shadowOffset={{ width: 0, height: 4 }}
          shadowRadius={8}
          shadowOpacity={0.2}
          flexGrow={1}
        >
          <Button
            title='Account'
            onPress={() => navigation.navigate('Account')}
            color={theme.colors.text2}
          />
        </Box>
      </Box>
    </Box>
  );
}
