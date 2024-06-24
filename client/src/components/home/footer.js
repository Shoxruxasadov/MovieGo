export default function Footer() {
  return (
    <footer>
      <div className="container">
        <hr />
        <div className="rights">
          {/* <p>«Marvel Studios» Barcha materiallar axborot maqsadida taqdim etilgan, barcha huquqlar marvelga tegishli.</p> */}
          {/* <p>«Marvel Studios» Все материалы предоставлены исключительно в информационных целях, все права принадлежат Marvel.</p> */}
          <p>«Marvel Studios» All material provided for informational purposes only, all rights reserved by marvel.</p>
          <p><span>&copy; MovieGo {new Date().getFullYear()} | </span><a href="https://shoxrux.site" target="_blank">Powered by</a></p>
        </div>
      </div>
    </footer>
  )
}
