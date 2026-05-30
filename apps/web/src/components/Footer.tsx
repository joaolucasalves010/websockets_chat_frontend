import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-zinc-300 text-sm gap-3">
      <p className="text-zinc-500">Feito por <strong className="text-zinc-800">João Lucas</strong></p>
      <div className="flex items-center gap-3">
        <a href="https://instagram.com/joaolucasalves010" className="hover:scale-110 duration-300 rounded-full p-1" target="_blank">
          <FontAwesomeIcon className="text-xl sm:text-2xl" icon={faInstagram} style={{ color: "rgb(128, 128, 128)" }} />
        </a>
        <a href="https://github.com/joaolucasalves010" className="hover:scale-110 duration-300 rounded-full p-1" target="_blank">
          <FontAwesomeIcon className="text-xl sm:text-2xl" icon={faGithub} style={{ color: "rgb(128, 128, 128)" }} />
        </a>
        <a href="https://www.linkedin.com/in/jo%C3%A3o-lucas-lima-alves-4b8004298/" className="hover:scale-110 duration-300 rounded-full p-1" target="_blank">
          <FontAwesomeIcon className="text-xl sm:text-2xl" icon={faLinkedin} style={{ color: "rgb(128, 128, 128)" }} />
        </a>
      </div>
    </footer>
  )
}

export default Footer