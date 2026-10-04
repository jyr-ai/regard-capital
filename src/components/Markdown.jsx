import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// react-markdown renders to React elements (no innerHTML), so synced docs cannot inject markup.
// Styling lives in styles.css under .md.
export default function Markdown({ children }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Tables scroll inside their own box instead of widening the drawer.
          table: props => (
            <div className="md-table">
              <table {...props} />
            </div>
          ),
          a: ({ href, ...rest }) => <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
