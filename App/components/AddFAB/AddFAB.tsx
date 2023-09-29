import { Pressable } from 'react-native';
import Box from '../Box/Box';
import { useTheme } from '@shopify/restyle';
import { Ionicons } from '@expo/vector-icons';
import Text from '../Text/Text';

export default function AddFAB({ onPress }: { onPress: () => void }) {
  const theme = useTheme();
  const size = 72;

  return (
    <Box
      paddingVertical='s4'
      paddingHorizontal='s8'
      borderRadius={9999}
      backgroundColor='backgroundSurface'
      alignContent='center'
      justifyContent='center'
      borderColor='backgroundSurfaceBorder'
      borderTopWidth={1}
      borderLeftWidth={1}
      borderRightWidth={1}
      shadowColor='shadowColor'
      shadowOffset={{ width: 0, height: 12 }}
      shadowOpacity={0.8}
      shadowRadius={16}
    >
      <Pressable onPress={() => onPress()} style={{ alignItems: 'center' }}>
        {/* <Ionicons name='add' size={size} color={theme.colors.text1} /> */}
        <Text variant='h2'>Add</Text>
      </Pressable>
    </Box>
  );
}
