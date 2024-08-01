import React, { useState, useEffect, useCallback } from 'react';


const DetailBonCommande = ({ initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);


    const calculateTotals = useCallback(() => {
        const { docQte, docRemise, docTxTva, docPunit } = formData;

        const remise = (docPunit * docRemise) / 100;
        const totalHt = (docPunit - remise) * docQte;
        const totalTva = (totalHt * docTxTva) / 100;
        const totalTtc = totalHt + totalTva;
        const remiseTotale = remise * docQte;

        setFormData(prevState => ({
            ...prevState,
            docTotalHt: totalHt,
            docTotalTva: totalTva,
            docTotalTtc: totalTtc,
            docRemiseTotale: remiseTotale, // Mettre à jour la remise totale
        }));
    }, [formData]);

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await onSave(formData); // Utiliser le callback onSave pour enregistrer les données
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error!');
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Détails du Bon de Commande</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label>Quantité:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="docQte"
                                value={formData.docQte}
                                onChange={e => setFormData({ ...formData, docQte: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Remise %:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="docRemise"
                                value={formData.docRemise}
                                onChange={e => setFormData({ ...formData, docRemise: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Prix Unitaire:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="docPunit"
                                value={formData.docPunit}
                                onChange={e => setFormData({ ...formData, docPunit: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>TxTVA </label>
                            <input
                                type="number"
                                className="form-control"
                                name="docTxTva"
                                value={formData.docTxTva}
                                onChange={e => setFormData({ ...formData, docTxTva: Number(e.target.value) })}
                            />
                        </div>
                        <div className="form-group col-md-2 align-self-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Quantité</th>
                            <th>Remise Totale</th>
                            <th>Total HT</th>
                            <th>Total TVA</th>
                            <th>Total TTC</th>
                            <th>Prix Net à Payer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formData.docQte}</td>
                            <td>{formData.docRemiseTotale.toFixed(2)} dt</td>
                            <td>{formData.docTotalHt.toFixed(2)} dt</td>
                            <td>{formData.docTotalTva.toFixed(2)} dt</td>
                            <td>{formData.docTotalTtc.toFixed(2)} dt</td>
                            <td>{formData.docTotalTtc.toFixed(2)} dt</td> {/* Prix Net à Payer = Total TTC */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailBonCommande;
