import React from 'react';
import axios from 'axios';

class Addbondecommande extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DocAnnee: '',
            DocType: '',
            DocRef: '',
            DocDate: '',
            DocTiers: '',
            DocDateEcheance: '',
            DocRefExt: '',
            DocNumDoc: '',
            DocCommentaire: '',
            DocLancement: '',
            DocCloture: ''
        };
    }

    Addbondecommande = () => {
        const payload = {
            DocAnnee: this.state.DocAnnee,
            DocType: this.state.DocType,
            DocRef: this.state.DocRef,
            DocDate: this.state.DocDate,
            DocTiers: this.state.DocTiers,
            DocDateEcheance: this.state.DocDateEcheance,
            DocRefExt: this.state.DocRefExt,
            DocNumDoc: this.state.DocNumDoc,
            DocCommentaire: this.state.DocCommentaire,
            DocLancement: this.state.DocLancement,
            DocCloture: this.state.DocCloture
        };

        console.log('Payload:', payload);

        axios.post('https://localhost:7029/api/DocumentBonCommandes', payload)
            .then(json => {
                if (json.data.Status === 'Success') {
                    alert("Data Saved Successfully");
                    this.props.history.push('/home');
                } else {
                    alert('Data not Saved');
                    console.log('Response:', json);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.Addbondecommande();
    };

    render() {
        return (
            <div className="container">
                {/* First card containing the form */}
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Document Bon de Commande</h5>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Num Document:</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            name="DocNumDoc"
                                            value={this.state.DocNumDoc}
                                            onChange={this.handleChange}
                                            placeholder="Num Doc"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Annee:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="DocAnnee"
                                            value={this.state.DocAnnee}
                                            onChange={this.handleChange}
                                            placeholder="Annee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date Lancement:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="DocLancement"
                                            value={this.state.DocLancement}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date Cloture:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="DocCloture"
                                            value={this.state.DocCloture}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tiers:</label>
                                <select
                                    className="form-control"
                                    name="DocTiers"
                                    value={this.state.DocTiers}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Client">Client</option>
                                    <option value="Fournisseur">Fournisseur</option>
                                    <option value="Represantant">Represantant</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Ref:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="DocRef"
                                            value={this.state.DocRef}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Ref Ext:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="DocRefExt"
                                            value={this.state.DocRefExt}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date Début:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="DocDate"
                                            value={this.state.DocDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date Echeance:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="DocDateEcheance"
                                            value={this.state.DocDateEcheance}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Doc Type:</label>
                                <select
                                    className="form-control"
                                    name="DocType"
                                    value={this.state.DocType}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Select Type Document</option>
                                    <option value="Bon De Commande">Bon De Commande</option>
                                    <option value="Bon de livraison">Bon de livraison</option>
                                    <option value="Bon d'entrée">Bon d'entrée</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Doc Commentaire:</label>
                                <textarea
                                    className="form-control"
                                    name="DocCommentaire"
                                    value={this.state.DocCommentaire}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

                {/* Second card below the form card */}
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Additional Information</h5>
                        <p>Content for the second card goes here.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addbondecommande;
