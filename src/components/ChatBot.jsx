import { useEffect, useMemo, useState } from 'react';
import { Box, CssBaseline, Stack } from '@mui/material';
import { GoogleGenAI } from '@google/genai';

import { LeftPanel } from './Panels/LeftPanel.jsx';
import { RightPanel } from './Panels/RightPanel.jsx';

/**
 * Gemini ai object from, gemini library/
 */
const ai = new GoogleGenAI({
	apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const MODEL = 'gemini-2.5-flash';
const STORAGE_KEY = 'gemini_chats_v1';

const toGeminiContents = (messages) =>
	messages.map((m) => ({
		role: m.role === 'user' ? 'user' : 'model',
		parts: [{ text: m.text }],
	}));

/* ---------------- App ---------------- */
export default function ChatBot() {
	const [chats, setChats] = useState([]);
	const [activeChatId, setActiveChatId] = useState(null);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);

	const activeChat = useMemo(
		() => chats.find((c) => c.id === activeChatId),
		[chats, activeChatId]
	);

	useEffect(() => {
		// useEffect to restore data from localstorage
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				setChats(parsed);
			}
		}
	}, []);

	useEffect(() => {
		// whenever there is a change in chats, we store the update the local store
		if (chats.length === 0) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
	}, [chats]);

	const createChat = () => {
		// create active chat
		setActiveChatId(null);
	};

	const callGemini = async (chatId, messages) => {
		const contents = toGeminiContents(messages);

		const response = await ai.models.generateContent({
			model: MODEL,
			contents,
		});

		const modelReply = {
			role: 'model',
			text: response.text ?? 'No response',
			timestamp: Date.now(),
		};

		setChats((prev) =>
			prev.map((chat) =>
				chat.id === chatId
					? { ...chat, messages: [...chat.messages, modelReply] }
					: chat
			)
		);
	};


	const sendMessage = async () => {
		if (!input.trim()) return; // run only when there is input

		const userMessage = {
			role: 'user',
			text: input,
			timestamp: Date.now(),
		};

		setInput('');

		setLoading(true);

		try {
			if (!activeChatId) {
				// first message case
				const chatId = crypto.randomUUID();
				const newChat = {
					id: chatId,
					title: userMessage.text.slice(0, 30),
					messages: [userMessage],
				};
				setChats((prev) => [newChat, ...prev]);
				setActiveChatId(chatId);

				await callGemini(chatId, [userMessage]);
			} else {
				setChats((prev) =>
					prev.map((chat) =>
						chat.id === activeChatId
							? { ...chat, messages: [...chat.messages, userMessage] }
							: chat
					)
				);

				await callGemini(activeChatId, [...activeChat.messages, userMessage]);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stack direction={'row'}>
			<LeftPanel
				chats={chats}
				activeChatId={activeChatId}
				setActiveChatId={setActiveChatId}
				createChat={createChat}
			/>

			<RightPanel
				activeChat={activeChat}
				input={input}
				setInput={setInput}
				sendMessage={sendMessage}
				loading={loading}
			/>
		</Stack>
	);
}
