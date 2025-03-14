import React from 'react';
import {Image, View} from 'react-native';

const imageStyle = {flex: 1, width: '100%', height: '100%'};

export default function LoaderRoot() {
  const imageList = [
    require('./assets/image/loader1.jpg'),
    require('./assets/image/loader2.jpg'),
  ];

  const [imageID, setImageID] = React.useState(0);
  const renderImage = id => <Image source={imageList[id]} style={imageStyle} />;

  setTimeout(() => {
    setImageID(1);
  }, 1000);

  return <View style={imageStyle}>{renderImage(imageID)}</View>;
}
