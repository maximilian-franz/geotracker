import React, {useEffect, useState} from 'react';
import Mapbox, {Camera, MapView} from '@rnmapbox/maps';
import {SafeAreaView} from 'react-native';
import {Appearance} from 'react-native';
import MarkerWithLine from './components/MarkerWithLine';
import catJson from './cats.json';

Mapbox.setAccessToken('YOUR MAPBOX TOKEN');

function App(): React.JSX.Element {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  useEffect(() => {
    const getLocationPermission = async () => {
      if (!hasLocationPermission) {
        const hasPermission = await Mapbox.requestAndroidLocationPermissions();
        setHasLocationPermission(hasPermission);
      }
    };
    getLocationPermission();
  }, [hasLocationPermission]);

  const style = {flex: 1};
  const styleURL =
    Appearance.getColorScheme() === 'light'
      ? Mapbox.StyleURL.Light
      : Mapbox.StyleURL.Dark;

  return (
    <SafeAreaView style={style}>
      <MapView
        styleURL={styleURL}
        style={style}
        testID={'show-map'}
        logoEnabled={false}
        attributionEnabled={false}>
        {catJson.map((cat, i) => (
          <MarkerWithLine
            title={`cat ${i}`}
            coordinates={cat.coordinates}
            iconUrl={cat.icon}
            key={`cat-${i}`}
          />
        ))}
        <Camera zoomLevel={12} />
      </MapView>
    </SafeAreaView>
  );
}

export default App;
