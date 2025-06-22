'use client';

import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getFeedsApi } from '@/features/feeds/api';

export const Feeds = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getFeedsApi();
      setData(response.data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Feed de Publicaciones
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        data.map(({ url, title, description, createdAt, bankId }) => (
          <Card key={url} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="body1">{description}</Typography>
              <Typography variant="body1">{bankId}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};
