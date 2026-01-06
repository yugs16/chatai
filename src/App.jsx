import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBot from './components/ChatBot';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Space Mono', monospace !important",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
			<CssBaseline/>

      <ChatBot />
    </ThemeProvider>
  );
}
