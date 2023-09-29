import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../pages/c.module.css';

export default function DatasetTable() {
    /***************************/
    const [loading, setLoading] = useState(true);

    /***************** */
    
    
    const [dataset, setDataset] = useState([{}]);
    const [newId, setNewId] = useState('');
    const [newImageName, setNewImageName] = useState('');
    const [newSexe, setNewSexe] = useState('');
    const [newLocalisation, setNewLocalisation] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newBordure, setNewBordure] = useState('');
    const [newDiametre, setNewDiametre] = useState('');
    const [newSymetrie, setNewSymetrie] = useState('');
    const [newContrast, setNewContrast] = useState('');
    const [newHomogeneity, setNewHomogeneity] = useState('');
    const [newEnergy, setNewEnergy] = useState('');
    const [newCorrelation, setNewCorrelation] = useState('');
    const [newPourcentageMalin, setNewPourcentageMalin] = useState('');
    const [newPourcentageBenin, setNewPourcentageBenin] = useState('');

    const [patientData, setPatientData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Effectuer une requête GET pour récupérer les données existantes du patient depuis le backend
        axios.get('https://wooded-classic-manchego.glitch.me/patient')
            .then(response => {
                setDataset(response.data); // Mettre à jour l'état avec les données reçues
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    if (newId && newImageName && newSexe && newLocalisation && newAge && newBordure && newDiametre && newSymetrie && newContrast && newHomogeneity && newEnergy && newCorrelation && newPourcentageMalin && newPourcentageBenin) {
        const newPatient = {
            id: newId,
            image_name: newImageName,
            sexe: newSexe,
            localisation: newLocalisation,
            age: newAge,
            bordure: newBordure,
            diametre: newDiametre,
            symetrie: newSymetrie,
            contrast: newContrast,
            homogeneity: newHomogeneity,
            energy: newEnergy,
            correlation: newCorrelation,
            pourcentage_malin: newPourcentageMalin,
            pourcentage_benin: newPourcentageBenin,

        };

        // Effectuer une requête POST pour envoyer les nouvelles données du patient au backend
        axios.post('https://wooded-classic-manchego.glitch.me/patient', newPatient)
            .then(response => {
                setDataset([...dataset, newPatient]); // Mettre à jour l'état avec les nouvelles données ajoutées
            })
            .catch(error => {
                console.error(error);
            });

        // Réinitialiser les valeurs des champs de saisie
        setNewId('');
        setNewImageName('');
        setNewSexe('');
        setNewLocalisation('');
        setNewAge('');
        setNewBordure('');
        setNewDiametre('');
        setNewSymetrie('');
        setNewContrast('');
        setNewHomogeneity('');
        setNewEnergy('');
        setNewCorrelation('');
        setNewPourcentageMalin('');
        setNewPourcentageBenin('');
    }
    const handleEmptyPatient = () => {
        axios.delete('https://wooded-classic-manchego.glitch.me/patient')
          .then(response => {
            setMessage(response.data);
            setPatientData([]); // Vider les données du patient affichées
            window.location.reload()
          })
          .catch(error => {
            console.error(error);
          });
      };
    

    if (loading)  {return(<div><h1>chargement</h1></div>)} else return(
        <div className={styles.tablecontainer}>

            <h2>Dataset </h2>
            <table className={styles.datasettable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Id Patient</th>
                        <th>Image Name</th>
                        <th>Sexe</th>
                        <th>Localisation</th>
                        <th>Âge</th>
                        <th>Bordure</th>
                        <th>Diamètre</th>
                        <th>Symétrie</th>
                        <th>Contrast</th>
                        <th>Homogeneity</th>
                        <th>Energy</th>
                        <th>Correlation</th>
                        <th>Pourcentage Malin</th>
                        <th>Pourcentage Benin</th>
                        <th>Diagnostic du dermatologue</th>

                    </tr>
                </thead>
                <tbody>
                    {dataset.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.Id_patient}</td>
                            <td>{data.image_name}</td>
                            <td>{data.sexe}</td>
                            <td>{data.localisation}</td>
                            <td>{data.age}</td>
                            <td>{data.bordure}</td>
                            <td>{data.diametre}</td>
                            <td>{data.symetrie}</td>
                            <td>{data.contrast}</td>
                            <td>{data.homogeneity}</td>
                            <td>{data.energy}</td>
                            <td>{data.correlation}</td>
                            <td>{data.pourcentage_malin}</td>
                            <td>{data.pourcentage_benin}</td>
                            <td>{data.target}</td>


                        </tr>
                    ))}
                </tbody>
            </table>
            {dataset.length === 0 ? <p>Aucun patient trouvé.</p>:<div>
          <button onClick={handleEmptyPatient}>Vider les données des pateints </button>
          <p>{message}</p>
        </div>}
        
        </div>
    );
}
