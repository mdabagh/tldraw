import { Canvas, TldrawEditor, TldrawEditorConfig, useApp } from '@tldraw/tldraw'
import '@tldraw/tldraw/editor.css'
import { useEffect } from 'react'
import { track } from 'signia-react'
import './custom-ui.css'

const config = new TldrawEditorConfig()

export default function Example() {
	return (
		<div className="tldraw__editor">
			<TldrawEditor config={config} autoFocus>
				<Canvas />
				<CustomUi />
			</TldrawEditor>
		</div>
	)
}

const CustomUi = track(() => {
	const app = useApp()

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Delete':
				case 'Backspace': {
					app.deleteShapes()
				}
			}
		}

		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keyup', handleKeyUp)
		}
	})

	return (
		<div className="custom-layout">
			<div className="custom-toolbar">
				<button
					className="custom-button"
					data-isactive={app.currentToolId === 'select'}
					onClick={() => app.setSelectedTool('select')}
				>
					Select
				</button>
				<button
					className="custom-button"
					data-isactive={app.currentToolId === 'draw'}
					onClick={() => app.setSelectedTool('draw')}
				>
					Pencil
				</button>
				<button
					className="custom-button"
					data-isactive={app.currentToolId === 'eraser'}
					onClick={() => app.setSelectedTool('eraser')}
				>
					Eraser
				</button>
			</div>
		</div>
	)
})
