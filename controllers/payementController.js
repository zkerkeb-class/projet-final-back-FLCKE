import handleRequest from '../utils/handleRequest.js';
import payementModel from "../models/payementModel.js"
import propertiesModel from '../models/propertiesModel.js';


export async function addPayement(req, res) {

    const { amount, user, property } = req.body;
    try {
        const payement = await payementModel.create({ amount, user, property });
        payement.save();
        return res.status(201).send(payement);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}
export async function getAllPayement(req, res) {

    try {
        const payements = await payementModel.find();
        handleRequest.verifyDataNotFound(payements, res);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}
export async function getAllPayementByUser(req, res) {
    const { id, limit } = req.params;
    try {
        if (limit) {
            const payements = await payementModel.find({ user: id })
                .sort({ createdAt: -1 }) // tri décroissant par date de création
                .limit(limit)
                .populate("user")
                .populate("property");
            return handleRequest.verifyDataNotFound(payements, res);

        }
        const payements = await payementModel.find({ user: id }).populate("user").populate("property");
        handleRequest.verifyDataNotFound(payements, res);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}
export async function getAllPayementByOwner(req, res) {
    const { id, limit } = req.params;
    try {
        const properties = await propertiesModel.find({ owner_id: id });
        const propertyIds = properties.map(p => p._id);
        // if (limit) {
        //     const payements = await payementModel.find({ user: id })
        //         .sort({ createdAt: -1 }) // tri décroissant par date de création
        //         .limit(limit)
        //         .populate("user")
        //         .populate("property");
        //     return handleRequest.verifyDataNotFound(payements, res);

        // }

        const payements = await payementModel.find({ property: { $in: propertyIds } }).populate("user").populate("property");
        handleRequest.verifyDataNotFound(payements, res);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}

export async function updatePayement(req, res) {
    const payementId = req.params.id;
    try {
        const payements = await payementModel.updateOne({ _id: payementId }, req.body);
        handleRequest.verifyDataNotFound(payements, res);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}
