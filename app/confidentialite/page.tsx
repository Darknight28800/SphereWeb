import { Section } from '@/components/Section';
import { LegalDoc, Placeholder } from '@/components/LegalDoc';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Politique de confidentialité',
  description:
    'Comment sont traitées les données personnelles collectées sur sphere-web.com, conformément au RGPD.',
  path: '/confidentialite',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <Section>
      <LegalDoc title="Politique de confidentialité" updated="Août 2026">
        <p>
          Cette politique décrit comment {site.legalName} («&nbsp;{site.name}&nbsp;») traite les
          données personnelles collectées sur {site.url}, conformément au Règlement général sur la
          protection des données (RGPD) et à la loi «&nbsp;Informatique et Libertés&nbsp;».
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          {site.legalName} — {site.status} — {site.location}. Contact :{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>2. Données collectées via le formulaire de contact</h2>
        <ul>
          <li>Nom</li>
          <li>Adresse e-mail</li>
          <li>Type de projet et contenu du message</li>
          <li>Date et heure d&apos;envoi</li>
        </ul>
        <p>
          <strong>Finalité :</strong> répondre à votre demande et, le cas échéant, établir un devis.
          <br />
          <strong>Base légale :</strong> votre consentement (case à cocher) et l&apos;intérêt légitime
          à répondre à une sollicitation commerciale.
          <br />
          <strong>Durée de conservation :</strong> les messages sont conservés{' '}
          <Placeholder>durée retenue, ex. 3 ans après le dernier contact</Placeholder>, puis
          supprimés.
        </p>

        <h2>3. Destinataires</h2>
        <p>
          Les données sont adressées uniquement à {site.legalName}. Elles transitent par le service
          d&apos;envoi d&apos;e-mails et l&apos;hébergement fournis par IONOS (Union européenne).
          Aucune donnée n&apos;est vendue ni transmise à des fins publicitaires.
        </p>

        <h2>4. Mesure d&apos;audience</h2>
        <p>
          Aucun outil de mesure d&apos;audience n&apos;est activé sans votre consentement, recueilli
          via le bandeau affiché lors de votre première visite. En cas de refus, aucun traceur de
          mesure n&apos;est déposé. L&apos;outil éventuellement utilisé sera{' '}
          <Placeholder>nom de l&apos;outil, ex. Matomo / Plausible</Placeholder>, configuré pour
          anonymiser les adresses IP.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Le site dépose uniquement un indicateur technique enregistrant votre choix concernant la
          mesure d&apos;audience (stockage local du navigateur). Il ne permet aucun suivi
          publicitaire.
        </p>

        <h2>6. Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation et d&apos;opposition, ainsi que du droit de retirer votre consentement à tout
          moment. Pour les exercer, écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL —{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            www.cnil.fr
          </a>
          .
        </p>

        <h2>7. Sécurité</h2>
        <p>
          Les échanges avec le site sont chiffrés (HTTPS). L&apos;accès aux messages reçus est
          protégé par authentification.
        </p>
      </LegalDoc>
    </Section>
  );
}
