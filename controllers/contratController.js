// controllers/pdfController.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import leasesModel from '../models/leasesModel.js';

async function generateLeasePdf(req, res) {
    const lease_id = req.params.id;
    const lease = await leasesModel
        .findById(lease_id)
        .populate({
            path: 'property_id',
            populate: {
                path: 'owner_id',
                model: 'User', // ou 'Users' selon ton modèle
            },
        })
        .populate('tenant_id');

    if (!lease) {
        return res.status(404).json({ message: 'Bail non trouvé' });
    }


    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;

    // Titre
    page.drawText('Contrat de Bail de Location', {
        x: 180, y, size: 20, font, color: rgb(0, 0, 0)
    });
    y -= 15;
    page.drawText(`N°: ${lease_id}`, {
        x: 230, y, size: 10, font, color: rgb(0, 0, 0)
    });
    y -= 40;

    // Parties
    page.drawText('Entre les soussignés :', { x: 50, y, size: 12, font });
    y -= 25;

    // Bailleur
    page.drawText('Le Bailleur :', { x: 60, y, size: 12, font, color: rgb(0.1, 0.5, 0.1) });
    page.drawText('Et le Locataire :', { x: 400, y, size: 12, font, color: rgb(0.1, 0.5, 0.1) });
    y -= 18;
    page.drawText(`Nom : ${lease.property_id.owner_id.fullName}`, { x: 60, y, size: 11, font });
    page.drawText(`Nom : ${lease.tenant_id.fullName}`, { x: 400, y, size: 11, font });
    y -= 15;
    page.drawText(`Email : ${lease.property_id.owner_id.email}`, { x: 60, y, size: 11, font });
    page.drawText(`Email : ${lease.tenant_id.email}`, { x: 400, y, size: 11, font });
    y -= 15;
    page.drawText(`Téléphone : ${lease.property_id.owner_id.phone}`, { x: 60, y, size: 11, font });
    page.drawText(`Téléphone : ${lease.tenant_id.phone}`, { x: 400, y, size: 11, font });
    y -= 25;


    // Article 1
    page.drawText('Article 1 : Objet du contrat', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText('Le bailleur donne en location au locataire, qui accepte, un logement vide à usage d’habitation principale.', { x: 60, y, size: 10, font });
    y -= 25;

    // Article 2
    page.drawText('Article 2 : Durée du bail', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText(`Du ${lease.start_date.toLocaleDateString()} au ${lease.end_date.toLocaleDateString()}. Renouvelable par tacite reconduction.`, { x: 60, y, size: 10, font });
    y -= 25;

    // Article 3
    page.drawText('Article 3 : Loyer et charges', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText(`Loyer mensuel : ${lease.property_id.rent_price} $`, { x: 60, y, size: 10, font });
    y -= 15;
    page.drawText('Charges locatives mensuelles sont à la charge du locataire', { x: 60, y, size: 10, font });
    y -= 15;
    page.drawText(`Montant total mensuel : ${lease.property_id.rent_price} $`, { x: 60, y, size: 10, font });
    y -= 15;
    page.drawText(`Le loyer sera recupérer tout les  : ${lease.rent_date} du mois`, { x: 60, y, size: 10, font });
    y -= 25;

    // Article 4
    page.drawText('Article 4 : Dépôt de garantie', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText(`Un dépôt de garantie de ${lease.property_id.rent_price}$ est versé à la signature du contrat.`, { x: 60, y, size: 10, font });
    y -= 25;

    // Article 5
    page.drawText('Article 5 : Utilisation des lieux', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText('Le locataire s’engage à occuper les lieux en bon père de famille et', { x: 60, y, size: 10, font });
    y -= 10;
    page.drawText('à ne pas sous-louer sans autorisation écrite du bailleur.', { x: 60, y, size: 10, font });
    y -= 25;

    // Article 6
    page.drawText('Article 6 : État des lieux', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText('Un état des lieux d’entrée sera établi à la remise des clés. Un état des lieux de sortie sera effectué à la fin du contrat.', { x: 60, y, size: 10, font });
    y -= 25;

    // Article 7
    page.drawText('Article 7 : Résiliation', { x: 50, y, size: 12, font, color: rgb(0, 0, 0.5) });
    y -= 18;
    page.drawText('Chaque partie peut résilier le contrat avec un préavis d’un (1) mois notifié par écrit.', { x: 60, y, size: 10, font });
    y -= 35;

    // Signatures
    page.drawText(`Fait à Paris, le ${new Date(Date.now()).toLocaleDateString('fr-FR')}`, { x: 50, y, size: 11, font });
    y -= 30;
    page.drawText('Signature du Bailleur :', { x: 50, y, size: 11, font });
    page.drawText('Signature du Locataire :', { x: 400, y, size: 11, font });

    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=contrat.pdf');
    res.send(Buffer.from(pdfBytes));
}

export default {
    generateLeasePdf,
};