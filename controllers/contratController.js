// controllers/pdfController.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import leasesModel from '../models/leasesModel.js';

export const generateLeasePdf = async (req, res) => {
    try {
        const lease_id = req.params.id;

        const lease = await leasesModel
            .findById(lease_id)
            .populate({
                path: 'property_id',
                populate: {
                    path: 'owner_id',
                    model: 'User',
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

        const drawText = (text, options) => {
            page.drawText(text, { font, size: 10, color: rgb(0, 0, 0), ...options });
        };

        // Titre
        drawText('Contrat de Bail de Location', { x: 180, y, size: 20 });
        y -= 15;
        drawText(`N°: ${lease_id}`, { x: 230, y, size: 10 });
        y -= 40;

        drawText('Entre les soussignés :', { x: 50, y, size: 12 });
        y -= 25;

        drawText('Le Bailleur :', { x: 60, y, size: 12, color: rgb(0.1, 0.5, 0.1) });
        drawText('Et le Locataire :', { x: 400, y, size: 12, color: rgb(0.1, 0.5, 0.1) });
        y -= 18;

        drawText(`Nom : ${lease.property_id.owner_id.fullName}`, { x: 60, y });
        drawText(`Nom : ${lease.tenant_id.fullName}`, { x: 400, y });
        y -= 15;

        drawText(`Email : ${lease.property_id.owner_id.email}`, { x: 60, y });
        drawText(`Email : ${lease.tenant_id.email}`, { x: 400, y });
        y -= 15;

        drawText(`Téléphone : ${lease.property_id.owner_id.phone}`, { x: 60, y });
        drawText(`Téléphone : ${lease.tenant_id.phone}`, { x: 400, y });
        y -= 25;

        const drawArticle = (title, contentLines) => {
            drawText(title, { x: 50, y, size: 12, color: rgb(0, 0, 0.5) });
            y -= 18;
            contentLines.forEach(line => {
                drawText(line, { x: 60, y });
                y -= 15;
            });
            y -= 10;
        };

        drawArticle('Article 1 : Objet du contrat', [
            'Le bailleur donne en location au locataire, qui accepte, un logement vide à usage d’habitation principale.'
        ]);

        drawArticle('Article 2 : Durée du bail', [
            `Du ${lease.start_date.toLocaleDateString()} au ${lease.end_date.toLocaleDateString()}.`,
            'Renouvelable par tacite reconduction.'
        ]);

        drawArticle('Article 3 : Loyer et charges', [
            `Loyer mensuel : ${lease.property_id.rent_price} $`,
            'Charges locatives mensuelles sont à la charge du locataire',
            `Montant total mensuel : ${lease.property_id.rent_price} $`,
            `Le loyer sera recupéré tous les : ${lease.rent_date} du mois`
        ]);

        drawArticle('Article 4 : Dépôt de garantie', [
            `Un dépôt de garantie de ${lease.property_id.rent_price}$ est versé à la signature du contrat.`
        ]);

        drawArticle('Article 5 : Utilisation des lieux', [
            'Le locataire s’engage à occuper les lieux en bon père de famille et',
            'à ne pas sous-louer sans autorisation écrite du bailleur.'
        ]);

        drawArticle('Article 6 : État des lieux', [
            'Un état des lieux d’entrée sera établi à la remise des clés.',
            'Un état des lieux de sortie sera effectué à la fin du contrat.'
        ]);

        drawArticle('Article 7 : Résiliation', [
            'Chaque partie peut résilier le contrat avec un préavis d’un (1) mois notifié par écrit.'
        ]);

        drawText(`Fait à Paris, le ${new Date().toLocaleDateString('fr-FR')}`, { x: 50, y, size: 11 });
        y -= 30;

        drawText('Signature du Bailleur :', { x: 50, y, size: 11 });
        drawText('Signature du Locataire :', { x: 400, y, size: 11 });

        const pdfBytes = await pdfDoc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=contrat.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (err) {
        console.error('Erreur lors de la génération du PDF :', err);
        res.status(500).json({ message: 'Erreur serveur lors de la génération du PDF.' });
    }
};

