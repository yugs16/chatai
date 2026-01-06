import {
	Box,
	Button,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 280;

export const LeftPanel = ({
	chats,
	activeChatId,
	setActiveChatId,
	createChat,
}) => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: 'border-box',
					p: 2,
				},
			}}
		>
			<Button
				fullWidth
				variant="contained"
				onClick={createChat}
				startIcon={<AddIcon />}
				sx={{
					justifyContent: 'flex-start',
					borderRadius: 2,
					textTransform: 'none',
					px: 2,
					py: 1.25,
					mt: 1,
				}}
			>
				New Chat
			</Button>

			<Typography variant="h6" align="left" sx={{ mt: 2 }}>
				Your Chats
			</Typography>
			<List>
				{chats.map((chat) => (
					<Box
						key={chat.id}
						sx={{
							position: 'relative',

							'&::before': {
								content: '""',
								position: 'absolute',
								left: 0,
								top: 8,
								bottom: 8,
								width: 4,
								borderRadius: 2,
								backgroundColor: 'primary.main',
								opacity: chat.id === activeChatId ? 1 : 0,
								transition: 'opacity 0.2s ease',
							},

							'&:hover::before': {
								opacity: 0.5,
							},
						}}
					>
						<ListItemButton
							selected={chat.id === activeChatId}
							onClick={() => setActiveChatId(chat.id)}
							sx={{
								borderRadius: 2,

								'&.Mui-selected': {
									backgroundColor: 'primary.main',
									color: 'primary.contrastText',
									ml: '12px',
								},

								'&.Mui-selected:hover': {
									backgroundColor: 'primary.dark',
								},
							}}
						>
							<ListItemText
								primary={chat.title}
								primaryTypographyProps={{
									noWrap: true,
								}}
							/>
						</ListItemButton>
					</Box>
				))}
			</List>
		</Drawer>
	);
};
