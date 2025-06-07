import handleRequest from '../utils/handleRequest.js';
import payementModel from "../models/payementModel.js"


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
    const user=req.params.id;
    try {
        const payements = await payementModel.find({user:user}).populate("user").populate("property");
        handleRequest.verifyDataNotFound(payements, res);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}
export async function updatePayement(req, res) {
    const payementId=req.params.id;
    try {
        const payements = await payementModel.updateOne({_id:payementId}, req.body);
        handleRequest.verifyDataNotFound(payements, res);
    } catch (err) {
        console.log("Error", err)

        return res.status(500).send(err);
    }

}
