import cron from "node-cron";
import Lease from "../models/leasesModel.js";
import Payment from "../models/payementModel.js";
import Property from "../models/propertiesModel.js";

export const startMonthlyPaymentCron = () => {
    // Exécuté tous les jours à minuit
    cron.schedule("0 0 * * *", async () => {
        const today = new Date();
        const currentDay = today.getDate();

        try {
            const leases = await Lease.find({ status: "actif" });

            for (const lease of leases) {
                if (lease.rent_date === currentDay) {
                    const property = await Property.findById(lease.property_id);
                    if (!property) continue;

                    await Payment.create({
                        user: lease.tenant_id,
                        property: lease.property_id,
                        amount: property.rent_amount,
                        status: "pending",
                        createdAt: new Date(),
                    });

                    console.log(`⏰ Paiement pending créé pour le bail ${lease._id}`);
                }
            }
        } catch (err) {
            console.error("❌ Erreur lors du cron de paiement :", err);
        }
    });

    console.log("✅ Cron mensuel des paiements démarré !");
}