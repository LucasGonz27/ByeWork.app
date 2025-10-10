import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function Component() {
    return (
        <Footer container>
            <FooterLinkGroup>
                <FooterLink href="#"></FooterLink>
                <FooterLink href="#">Politique de confidentialité</FooterLink>
                <FooterLink href="#"></FooterLink>
                <FooterLink href="#">Mentions légales</FooterLink>
                <FooterLink href="#"></FooterLink>
            </FooterLinkGroup>
        </Footer>

    );
}