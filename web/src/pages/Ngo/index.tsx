import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

interface NgoParams {
  id: string;
}

interface Ngo {
  [key: string]: string;
}

function NgoDetail() {
  const params = useParams<NgoParams>();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [ngo, setNgo] = useState<Ngo>({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    })
  }, []);

  useEffect(() => {
    NgoDetail();
  }, [])

  async function NgoDetail() {
    const response = await api.get(`/ngos/${params.id}`);
    setNgo(response.data);
  }

  return (
    <h1>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.google.com/maps/dir/?api=1&origin=${initialPosition[0]},
        ${initialPosition[1]}&destination=${ngo.latitude},${ngo.longitude}`}
      >
        Ver rotas no Google Maps
      </a>
    </h1>
  )
}

export default NgoDetail;