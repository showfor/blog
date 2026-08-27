import { NotionProvider } from './context/NotionContext.jsx'
import { hobbies } from './data/hobbies.js'
import NotionHeader from './components/NotionHeader.jsx'
import HobbySection from './components/HobbySection.jsx'
import NotionFooter from './components/NotionFooter.jsx'

export default function App() {
  return (
    <NotionProvider>
      <main className="notion-page">
        <NotionHeader />

        {hobbies.map((cat) => (
          <HobbySection key={cat.key} category={cat} />
        ))}

        <NotionFooter />
      </main>
    </NotionProvider>
  )
}
