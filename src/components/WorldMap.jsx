import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/WorldMap.css';

function WorldMap({ countries }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const map = L.map('world-map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 6,
      worldCopyJump: true  
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '$copy; OpenStreetMap contributors'  
    }).addTo(map);

    if (countries) {
      countries.forEach(country => {
        const name = country.name.common;
        const flag = country.flags.svg;

        const icon = L.divIcon({
          className: '',
          html: `<img src="${flag}" style="width:24px;height:16px;border-radius:2px;border:1px solid #ccc;" />`,
          iconSize: [24, 16],
          iconAnchor: [12, 8]
        });

        if (country.latlng) {
          L.marker(country.latlng, { icon })
            .addTo(map)
            .bindTooltip(name)
            .on('click', () => navigate(`/country/${name}`));
        }
      });
    }

    return () => map.remove();
  }, [countries]);

  return <div id="world-map" className="world-map" />;
}

export default WorldMap;