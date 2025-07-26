import { Image, ImageSourcePropType } from 'react-native';


type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  className?: string; 
};

export default function ImageViewer({ imgSource, selectedImage, className }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} className={className}/>;
}
