import { useEffect, useState } from 'react';
import { Alert, Image, Pressable } from 'react-native';
import { supabase } from '../../../lib/supabase';
import Box from '../Box/Box';
import Text from '../Text/Text';

export interface ImageCardProps {
  bucket: string;
  path: string;
  imageName?: string;
  caption: string;
  onPress: () => void;
}

export default function ImageCard({
  bucket,
  path,
  imageName,
  caption,
  onPress,
}: ImageCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    loadImage(bucket, path, imageName);
  }, [bucket, path, imageName]);

  const loadImage = async (bucket: string, path: string, imageName: string) => {
    let keyImageName = '';
    if (!!imageName) {
      keyImageName = imageName;
    } else {
      const { data } = await supabase.storage.from(bucket).list(path);
      if (!!data) {
        keyImageName = data[0].name;
      }
    }

    try {
      await supabase.storage
        .from(bucket)
        .download(`${path}/${keyImageName}`)
        .then(({ data }) => {
          const fr = new FileReader();
          fr.readAsDataURL(data!);
          fr.onload = () => {
            setImageUrl(fr.result as string);
          };
        });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }

      setImageUrl(null);
    }
  };

  return (
    <Pressable onPress={() => onPress()}>
      <Box flexDirection='column' height='100%' width='100%'>
        <Box
          backgroundColor='backgroundSurface'
          borderColor='shadowColor'
          borderWidth={4}
          borderRadius={24}
          shadowColor='shadowColor'
          shadowOffset={{ width: 0, height: 8 }}
          shadowOpacity={0.8}
          shadowRadius={16}
        >
          <Box overflow='hidden'>
            {!!imageUrl && (
              <Image
                style={{ height: '100%', width: '100%' }}
                resizeMode='cover'
                source={{ uri: imageUrl }}
              />
            )}
          </Box>
        </Box>
        <Text variant='label'>{caption}</Text>
      </Box>
    </Pressable>
  );
}
