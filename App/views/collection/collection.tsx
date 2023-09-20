import { useTheme } from '@shopify/restyle';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { Button } from 'react-native';

export default function Collection({ navigation }) {
  const theme = useTheme();

  return (
    <Box
      backgroundColor='backgroundSurface'
      height='100%'
      padding='s20'
    >
      <Text variant='h1'>Collection</Text>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginVertical: theme.spacing.s10,
        }}
      >
        <Box style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          <Box
            backgroundColor='backgroundSurface'
            borderColor='backgroundSurfaceBorder'
            borderTopWidth={1}
            borderLeftWidth={1}
            borderRightWidth={1}
            shadowColor='shadowColor'
            shadowOffset={{ width: 0, height: 8 }}
            shadowOpacity={0.8}
            shadowRadius={16}
            borderRadius={24}
            flexGrow={1}
            justifyContent='center'
            alignItems='center'
            height={128}
          >
            <Text variant='label'>Entry</Text>
          </Box>
          <Box
            backgroundColor='cardSurface'
            borderColor='cardSurfaceBorder'
            borderTopWidth={1}
            borderLeftWidth={1}
            borderRightWidth={1}
            shadowColor='shadowColor'
            shadowOffset={{ width: 0, height: 8 }}
            shadowOpacity={0.8}
            shadowRadius={16}
            borderRadius={24}
            flexGrow={1}
            justifyContent='center'
            alignItems='center'
            height={128}
          >
            <Text variant='label'>Entry</Text>
          </Box>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          <Box
            backgroundColor='primarySurface'
            borderColor='primarySurfaceBorder'
            borderTopWidth={1}
            borderLeftWidth={1}
            borderRightWidth={1}
            shadowColor='shadowColor'
            shadowOffset={{ width: 0, height: 8 }}
            shadowOpacity={0.8}
            shadowRadius={16}
            borderRadius={24}
            flexGrow={1}
            justifyContent='center'
            alignItems='center'
            height={128}
          >
            <Text variant='label'>Entry</Text>
          </Box>
          <Box
            backgroundColor='panelSurface'
            borderColor='panelSurfaceBorder'
            borderTopWidth={1}
            borderLeftWidth={1}
            borderRightWidth={1}
            shadowColor='shadowColor'
            shadowOffset={{ width: 0, height: 8 }}
            shadowOpacity={0.8}
            shadowRadius={16}
            borderRadius={24}
            flexGrow={1}
            justifyContent='center'
            alignItems='center'
            height={128}
          >
            <Text variant='label'>Entry</Text>
          </Box>
        </Box>
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
      >
        <Button
          title='Home'
          onPress={() => navigation.navigate('Home')}
          color={theme.colors.primary}
        />
      </Box>
    </Box>
  );
}
