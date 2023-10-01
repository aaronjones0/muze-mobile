import { Button } from 'react-native';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { useTheme } from '@shopify/restyle';
import CollectionTile from '../../components/CollectionTile/CollectionTile';

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
      justifyContent='flex-end'
      gap='s8'
    >
      <CollectionTile
        name={`TV Series'`}
        onPress={() => navigation.navigate(`TV Series'`)}
      />
      <CollectionTile name={`Movies`} onPress={() => {}} />
      <CollectionTile name={`Video Games`} onPress={() => {}} />
      <CollectionTile name={`Books`} onPress={() => {}} />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: 16,
        }}
      >
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
