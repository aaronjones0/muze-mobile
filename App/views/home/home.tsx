import { Button } from 'react-native';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { useTheme } from '@shopify/restyle';

export default function Home({ navigation }) {
  const theme = useTheme();

  return (
    <Box
      backgroundColor='backgroundSurface'
      height='100%'
      paddingHorizontal='s20'
      paddingTop='s20'
      paddingBottom='s40'
      flex={1}
      flexDirection='column'
      justifyContent='space-between'
    >
      <Text variant='h1'>Home</Text>
      <Box style={{display: 'flex', flexDirection: 'row', width: '100%', gap: 16}}>
        <Box
          backgroundColor='backgroundSurface'
          borderColor='backgroundSurfaceBorder'
          borderLeftWidth={1}
          borderTopWidth={1}
          borderRightWidth={1}
          borderRadius={24}
          shadowColor='shadowColor'
          shadowOffset={{ width: 0, height: 4 }}
          shadowRadius={8}
          shadowOpacity={0.8}
          flexGrow={1}
        >
          <Button
            title='Collection'
            onPress={() => navigation.navigate('Collection')}
            color={theme.colors.primary}
          />
        </Box>
        <Box
          backgroundColor='backgroundSurface'
          borderColor='backgroundSurfaceBorder'
          borderLeftWidth={1}
          borderTopWidth={1}
          borderRightWidth={1}
          borderRadius={24}
          shadowColor='shadowColor'
          shadowOffset={{ width: 0, height: 4 }}
          shadowRadius={8}
          shadowOpacity={0.8}
          flexGrow={1}
        >
          <Button
            title='Profile'
            onPress={() => navigation.navigate('Profile')}
            color={theme.colors.primary}
          />
        </Box>
      </Box>
    </Box>
  );
}
