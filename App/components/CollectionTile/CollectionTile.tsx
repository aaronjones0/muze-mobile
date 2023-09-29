import Box from '../Box/Box';
import Text from '../Text/Text';
import { Pressable } from 'react-native';

export interface CollectionTileProps {
  name: string;
  onPress: () => void;
}

export default function CollectionTile({ name, onPress }: CollectionTileProps) {
  return (
    <Pressable onPress={() => onPress()}>
      <Box
        backgroundColor='backgroundSurface'
        borderColor='backgroundSurfaceBorder'
        borderTopWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        justifyContent='center'
        alignItems='center'
        padding='s10'
        borderRadius={24}
        shadowColor='shadowColor'
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.8}
        shadowRadius={16}
      >
        <Text variant='h2'>{name}</Text>
      </Box>
    </Pressable>
  );
}
