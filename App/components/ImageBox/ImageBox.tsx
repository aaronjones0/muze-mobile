import { FileObject } from '@supabase/storage-js';
import { Image, TouchableOpacity } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Box from '../Box/Box';
import Text from '../Text/Text';

// Image item component that displays the image from Supabase Storage and a delte button
const ImageBox = ({
  item,
  // userId,
  onRemoveImage,
  bucket,
  path,
}: {
  // url: string | null;
  item: FileObject;
  // userId: string;
  onRemoveImage: () => void;
  bucket: string;
  path: string;
}) => {
  const [image, setImage] = useState<string>('');

  supabase.storage
    .from(bucket)
    .download(`${path}/${item.name}`)
    // .download(`${userId}/${item.name}`)
    .then(({ data }) => {
      const fr = new FileReader();
      fr.readAsDataURL(data!);
      fr.onload = () => {
        setImage(fr.result as string);
      };
    });

  return (
    <Box flex={1} flexDirection='column' alignItems='center' margin='s8'>
      {!!image ? (
        <Image
          style={{ width: 150, height: 150, borderRadius: 8, margin: 4 }}
          source={{ uri: image }}
        />
      ) : (
        <Box style={{ width: 160, height: 160, backgroundColor: '#1A1A1A' }} />
      )}
      <Box flex={1} flexDirection='row' justifyContent='space-between' gap='s4'>
        <Text>{item.name}</Text>
        {/* Delete image button */}
        <TouchableOpacity onPress={onRemoveImage}>
          <Ionicons name='trash-outline' size={20} color={'#fff'} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ImageBox;
