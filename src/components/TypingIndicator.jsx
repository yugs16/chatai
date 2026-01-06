import { Box } from '@mui/material';

const TypingIndicator = () => (
  <Box
    sx={{
      display: 'flex',
      gap: 0.5,
      my: 0.5,
      mx: 1,
      '& div': {
        width: 8,
        height: 8,
        bgcolor: 'grey.500',
        borderRadius: '50%',
        animation: 'bounce 1.4s infinite ease-in-out both',
      },
      '& div:nth-of-type(1)': { animationDelay: '0s' },
      '& div:nth-of-type(2)': { animationDelay: '0.2s' },
      '& div:nth-of-type(3)': { animationDelay: '0.4s' },

      '@keyframes bounce': {
        '0%, 80%, 100%': { transform: 'scale(0)' },
        '40%': { transform: 'scale(1)' },
      },
    }}
  >
    <div />
    <div />
    <div />
  </Box>
);
export default TypingIndicator;
