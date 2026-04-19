import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="flex items-center justify-between p-6 border-t-zinc-300 border text-sm gap-2">
      <p>Feito por <strong>João Lucas</strong></p>
      <div className="flex items-center gap-2">
        <a href="https://instagram.com/joaolucasalves010" className="hover:scale-110 duration-300 rounded-full p-1" target="_blank"><FontAwesomeIcon className="md:text-2xl lg:text-2xl" icon={faInstagram} style={{color: "rgb(128, 128, 128)",}} /></a>
        <a href="https://github.com/joaolucasalves010" className="hover:scale-110 duration-300 rounded-full p-1" target="_blank"><FontAwesomeIcon className="md:text-2xl lg:text-2xl" icon={faGithub} style={{color: "rgb(128, 128, 128)",}} /></a>
        <a href="https://www.linkedin.com/in/jo%C3%A3o-lucas-lima-alves-4b8004298/" className="hover:scale-110 duration-300 rounded-full p-1" target="_blank"><FontAwesomeIcon className="md:text-2xl lg:text-2xl" icon={faLinkedin} style={{color: "rgb(128, 128, 128)",}} /></a>
      </div>
    </footer>
  )
}

export default Footer