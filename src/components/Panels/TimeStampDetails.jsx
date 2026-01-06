import { Stack, Typography } from '@mui/material';

export default function TimeStampDetails({ timestamp, isUser }) {

	return (
		<Stack
			gap={0.5}
			direction="row"
			justifyContent="flex-end"
			alignItems={'flex-end'}
		>
			<Typography
				variant="caption"
				sx={{
					display: 'block',
					mt: 0.5,
					opacity: 0.7,
					textAlign: 'right',
				}}
			>
				{isUser ? 'You' : 'ChatBot'}
			</Typography>
			<Typography variant="caption" sx={{ opacity: 0.7 }}>
				|
			</Typography>

			<Typography
				variant="caption"
				sx={{
					display: 'block',
					mt: 0.5,
					opacity: 0.7,
					textAlign: 'right',
				}}
			>
				{new Date(timestamp ?? Date.now()).toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</Typography>
		</Stack>
	);
}
