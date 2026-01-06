import { Box } from '@mui/material';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula  as cTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ReactMarkdown({ children: content }) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			children={content}
			components={{
				code(props) {
					const { children, className, node, ...rest } = props;
					const match = /language-(\w+)/.exec(className || '');
					return match ? (
						<SyntaxHighlighter
							{...rest}
							PreTag="div"
							children={String(children).replace(/\n$/, '')}
							language={match[1]}
							style={cTheme}
              showLineNumbers
              customStyle={{
                margin: 0
              }}
						/>
					) : (
						<Box component="code" {...rest} className={className} sx={{m:0}}>
							{children}
						</Box>
					);
				},
			}}
		/>
	);
}
