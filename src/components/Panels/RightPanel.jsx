import React, { useLayoutEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import TypingIndicator from '../TypingIndicator.jsx';
import Message from './Message.jsx';
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone';

const RightPanel = ({ activeChat, input, setInput, sendMessage, loading }) => {
	const bottomRef = React.useRef(null);

	useLayoutEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [activeChat?.messages, loading]);

	return (
		<Box
			sx={{
				flexGrow: 1,
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				p: 3,
			}}
		>
			<Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
				{!activeChat?.messages.length && (
					<Stack gap={1} direction="row" alignItems="center" justifyContent={'center'} sx={{mt:4}}>
						<Typography
							sx={{ color: 'text.secondary', textAlign: 'center'}}
						>
							Start a conversation
						</Typography>
						<WavingHandTwoToneIcon
							color="success"
							sx={{
								transform: 'scaleX(-1)',
								mb: 0.5
							}}
						/>
					</Stack>
				)}

				{activeChat?.messages.map((m, i) => {
					const isUser = m.role === 'user';

					return (
						<Message
							text={m.text}
							isUser={isUser}
							timestamp={m.timestamp}
							i={i}
						/>
					);
				})}

				{loading && (
					<Box
						sx={{
							display: 'inline-block',
							p: 1.5,
							mb: 2,
							borderRadius: 2,
							bgcolor: 'grey.300',
						}}
					>
						<TypingIndicator />
					</Box>
				)}
				<Box ref={bottomRef} />
			</Box>

			{/* Input */}
			<Box sx={{ display: 'flex', gap: 1 }}>
				<TextField
					fullWidth
					autoFocus
					value={input}
					placeholder="Type your message..."
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: 2,
						},
					}}
				/>
				<Button
					variant="contained"
					sx={{
						borderRadius: 2,
						px: 3,
					}}
					onClick={() => sendMessage()}
				>
					Send
				</Button>
			</Box>
		</Box>
	);
};

export { RightPanel };
