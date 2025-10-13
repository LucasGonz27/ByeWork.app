import { Footer as FlowbiteFooter, FooterLink } from "flowbite-react";
import styles from "./Footer.module.css";
import Logo from "../assets/LogoByeWork.png";
import {
    FaUsers,
    FaBullseye,
    FaBriefcase,
    FaBalanceScale,
    FaFileContract,
    FaGavel,
    FaLinkedin,
    FaTwitter,
    FaGithub,
    FaEnvelope,
    FaComments,
} from "react-icons/fa";

function Footer() {
    return (
        <FlowbiteFooter container className={styles.Footer}>
            <div className={styles.footerContent}>
                <div className={styles.logoContainer}>
                    <img src={Logo} alt="Logo ByeWork" />
                    <h2>ByeWork</h2>
                </div>

                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h3>À PROPOS</h3>
                        <FooterLink href="#">
                            <FaUsers /> Notre équipe
                        </FooterLink>
                        <FooterLink href="#">
                            <FaBullseye /> Mission
                        </FooterLink>
                        <FooterLink href="#">
                            <FaBriefcase /> Carrières
                        </FooterLink>
                    </div>

                    <div className={styles.column}>
                        <h3>LÉGAL</h3>
                        <FooterLink href="#">
                            <FaBalanceScale /> Politique de confidentialité
                        </FooterLink>
                        <FooterLink href="#">
                            <FaFileContract /> Conditions d'utilisation
                        </FooterLink>
                        <FooterLink href="#">
                            <FaGavel /> Mentions légales
                        </FooterLink>
                    </div>

                    <div className={styles.column}>
                        <h3>RÉSEAUX</h3>
                        <FooterLink href="#">
                            <FaLinkedin /> LinkedIn
                        </FooterLink>
                        <FooterLink href="#">
                            <FaTwitter /> Twitter
                        </FooterLink>
                        <FooterLink href="#">
                            <FaGithub /> Github
                        </FooterLink>
                    </div>

                    <div className={styles.column}>
                        <h3>CONTACT</h3>
                        <div className={styles.columnBtn}>
                            <button className={styles.contactBtn}>
                                <FaEnvelope className={styles.icon} /> Envoyer un mail
                            </button>
                            <button className={styles.contactBtnSecondary}>
                                <FaComments className={styles.icon} /> Nous contacter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <span className={styles.copyright}>
                © 2025 <a href="#" className="hover:underline">ByeWork™</a>. Tous droits réservés.
            </span>
        </FlowbiteFooter>
    );
}
