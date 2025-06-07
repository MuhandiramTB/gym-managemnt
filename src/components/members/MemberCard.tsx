import React from 'react';
import QRCode from 'qrcode.react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface MemberCardProps {
  memberId: string;
  name: string;
  membershipType: string;
  expiryDate: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  memberId,
  name,
  membershipType,
  expiryDate,
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography color="text.secondary">
              {membershipType}
            </Typography>
            <Typography variant="body2">
              Expires: {new Date(expiryDate).toLocaleDateString()}
            </Typography>
          </Box>
          <QRCode
            value={memberId}
            size={100}
            level="H"
            includeMargin={true}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemberCard; 