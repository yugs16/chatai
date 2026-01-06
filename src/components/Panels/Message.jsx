import { Box } from '@mui/material';
import ReactMarkdown from '../ReactMarkdown.jsx';
import TimeStampDetails from './TimeStampDetails.jsx';

export default function Message({ text, isUser, timestamp, i }) {
	return (
		<Box
			key={i}
			sx={{
				mb: 2,
				textAlign: isUser ? 'right' : 'left',
			}}
		>
			<Box
				sx={{
					display: 'inline-block',
					p: 1.5,
					borderRadius: 2,
					maxWidth: '75%',
					transition: 'background-color 0.2s ease',

					bgcolor: isUser ? 'primary.main' : 'grey.300',
					color: isUser ? 'white' : 'black',

					'&:hover': {
						bgcolor: isUser ? 'primary.dark' : 'grey.400',
					},
				}}
			>
				{isUser ? text : <ReactMarkdown>{text}</ReactMarkdown>}
				<TimeStampDetails timestamp={timestamp} isUser={isUser} />
			</Box>
		</Box>
	);
}
