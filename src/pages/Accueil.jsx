import React, { useState, useEffect } from "react";
import styles from "../pages/Accueil.module.css";
import styles1 from "../components/model.module.css";
//import image from "../images/OIP.jpg";
import image from "../images/img.png";
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
const DefaultImageSrc = image;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    //bgcolor: 'background.paper',
    border: '2px solid #000',
    bgcolor: '#063806',
    boxShadow: 24,
    p: 2,
    color: "white"
};

export default function Accueil() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [idparient, setIdpatient] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [localisation, setLocalisation] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([image]);
    const [predictions, setPredictions] = useState([]);
    const [predictions1, setPredictions1] = useState([]);
    //const [predictions2, setPredictions2] = useState([]);
    const [newContrast, setNewContrast] = useState('');
    const [newHomogeneity, setNewHomogeneity] = useState('');
    const [newEnergy, setNewEnergy] = useState('');
    const [newCorrelation, setNewCorrelation] = useState('');
    // const [newImageName, setNewImageName] = useState('');
    //const [newSexe, setNewSexe] = useState('');
    //const [newLocalisation, setNewLocalisation] = useState('');
    // const [newAge, setNewAge] = useState('');
    const [newBordure, setNewBordure] = useState('');
    const [newDiametre, setNewDiametre] = useState('');
    const [newSymetrie, setNewSymetrie] = useState('');
    const [dataset, setDataset] = useState([{}]);
    // const [newId, setNewId] = useState('');
    const [newPourcentageMalin, setNewPourcentageMalin] = useState('');
    const [newPourcentageBenin, setNewPourcentageBenin] = useState('');
    const [mask, setMask] = useState('');
    const [chemin, setChemin] = useState('');
    /***************************************************** */

    /*  const handleClick = () => {
         if (imageFiles.length !== 0) {
             alert("Modele en cours de construction...")
             /* const formData = new FormData();
             formData.append('image', imageFiles[0]);
 
             axios.post('http://127.0.0.1:5001/predict', formData, {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 }
             })
                 .then((response) => {
                     console.log(response)
                     const image_data = response.data.image;
                     // Decode the base64 encoded image
                     const imageUrl = `data:image/jpeg;base64,${image_data}`;
 
                     setMask(imageUrl)
                     setPredictions(response.data.features[0]);
                     setPredictions1(response.data.features[1]);
                     setPredictions2(response.data.diagnostic[0]);
 
                     setNewCorrelation(response.data.features[0].correlation.toFixed(2));
                     setNewHomogeneity(response.data.features[0].homogeneity.toFixed(2));
                     setNewEnergy(response.data.features[0].energy.toFixed(2));
                     setNewContrast(response.data.features[0].contrast.toFixed(2));
                     setNewDiametre(response.data.features[1].diameter.toFixed(2));
                     setNewSymetrie(response.data.features[1].asymmetry.toFixed(2))
                     setNewBordure(response.data.features[1].border_length.toFixed(2))
                     setNewPourcentageMalin(response.data.diagnostic[0][1].toFixed(2) * 100)
                     setNewPourcentageBenin(response.data.diagnostic[0][0].toFixed(2) * 100)
                     console.log(response)
                 })
                 .catch((error) => {
                     console.error(error);
                 });
         } else {
             console.log('No image selected.');
             alert("pas d'image selectionnée ")
         }
     };
  */

    const handleClick = () => {
        if (imageFiles.length !== 0) {
            const continueProcessing = window.confirm(
                "Le modèle est en cours de construction. Voulez-vous continuer ?"
            );

            if (continueProcessing) {
                // Continuer avec le traitement de l'image
                alert("Modele en cours de construction...");

                /* Mettez ici votre code pour l'appel Axios ou toute autre opération nécessaire */

                const formData = new FormData();
                formData.append('image', imageFiles[0]);

                axios.post('http://127.0.0.1:5001/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        console.log(response)
                        const image_data = response.data.image;
                        // Decode the base64 encoded image
                        const imageUrl = `data:image/jpeg;base64,${image_data}`;

                        setMask(imageUrl)
                        setPredictions(response.data.features[0]);
                        setPredictions1(response.data.features[1]);
                        //setPredictions2(response.data.diagnostic[0]);

                        setNewCorrelation(response.data.features[0].correlation.toFixed(2));
                        setNewHomogeneity(response.data.features[0].homogeneity.toFixed(2));
                        setNewEnergy(response.data.features[0].energy.toFixed(2));
                        setNewContrast(response.data.features[0].contrast.toFixed(2));
                        setNewDiametre(response.data.features[1].diameter.toFixed(2));
                        setNewSymetrie(response.data.features[1].asymmetry.toFixed(2))
                        setNewBordure(response.data.features[1].border_length.toFixed(2))
                        setNewPourcentageMalin(response.data.diagnostic[0][1].toFixed(2) * 100)
                        setNewPourcentageBenin(response.data.diagnostic[0][0].toFixed(2) * 100)
                        console.log(response)
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            } else {
                alert("Annulation de l'opération de traitement.");
            }
        } else {
            console.log('No image selected.');
            alert("Pas d'image sélectionnée.");
        }
    };

    /******************************************************************************** */
    useEffect(() => {
        const images = [];
        const fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result);
                        console.log("resu", images)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }

                    //console.log("KKKK",fileReader.result)
                    console.log("KKKK", images)
                };

                fileReader.readAsDataURL(file);

                const filePath = URL.createObjectURL(file);
                setChemin(filePath);
            });
        }
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort();
                }
            });
        };
    }, [imageFiles]);

    /************************************************************************ */

    //const [imageUrls, setImageUrls] = useState([]);

    const imageTypeRegex = /^image\//;

    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        const validImageUrls = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
                validImageUrls.push(URL.createObjectURL(file));
                console.log("hggggggg", validImageUrls)
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            //setImageUrls(validImageUrls);
        } else {
            alert("Selected images are not of valid type!");
        };
    }
    /************************************************************ */

    const handleAddData = () => {
        const newPatient = {
            id: 4,
            chemin: chemin,
            Id_patient: idparient,
            image_name: imageFiles[0].name,
            sexe: sex,
            localisation: localisation,
            age: age,
            bordure: newBordure,
            diametre: newDiametre,
            symetrie: newSymetrie,
            contrast: newContrast,
            homogeneity: newHomogeneity,
            energy: newEnergy,
            correlation: newCorrelation,
            pourcentage_malin: newPourcentageMalin,
            pourcentage_benin: newPourcentageBenin,
            target: clickedButton
        };

        axios.post('https://wooded-classic-manchego.glitch.me/patient', newPatient)
            .then(response => {
                setDataset([...dataset, newPatient]);
            })
            .catch(error => {
                console.error(error);
            });

        //setNewId('');
        //setNewImageName('');
        //setNewSexe('');
        //setNewLocalisation('');
        //setNewAge('');
        setNewBordure('');
        setNewDiametre('');
        setNewSymetrie('');
        setNewContrast('');
        setNewHomogeneity('');
        setNewEnergy('');
        setNewCorrelation('');
        handleClose()


    };
    /******************************************************* */
    const [buttonContainerVisible, setButtonContainerVisible] = useState(false);
    const [clickedButton, setClickedButton] = useState(null);
    const toggleButtonsDisplay = () => {
        setButtonContainerVisible(!buttonContainerVisible);
    };

    const handleButtonClick = (value) => {
        setClickedButton(value);

        /***************************************************** */


    };
    return (
        <body>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form>
                        <p> <span>V</span>euillez compléter les informations du patient</p>
                        <label>Id Patient :
                            <input type="text" value={idparient} onChange={(e) => setIdpatient(e.target.value)} /><br />
                        </label>
                        <label>Age :
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} /><br />
                        </label>
                        <label htmlFor="sexe">Sexe :
                            <select
                                type="text"
                                id="sexe"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <label htmlFor="localisation">Localisation:
                            <select
                                type="text"
                                id="localisation"
                                value={localisation}
                                onChange={(e) => setLocalisation(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="upper extremity">Upper Extremity</option>
                                <option value="torso">Torso</option>
                                <option value="lower extremity">Lower Extremity</option>
                                <option value="head/neck">Head/Neck</option>
                            </select>
                        </label>

                    </form>
                    <div className={styles1.conteneur}>
                        <button onClick={handleAddData}>Archiver</button>
                    </div>
                </Box>
            </Modal>

            <div className={styles.conteneurAccueil1}>


                <h1><span>D</span>étection de mélanome basée sur une analyse d’images de la Peau</h1>
                <div className={styles.conteneurPartie}>

                    <div className={styles.ConteneurdiagnosInfo}>
                        <label htmlFor="upload-image" className={styles.button}>
                            Sélectionner une image
                        </label>
                        <input
                            type="file"
                            id="upload-image"
                            accept="image/*"
                            onChange={changeHandler}
                            style={{ display: 'none' }}
                        />

                        <button type="button" className={styles.button} onClick={handleClick}>
                            Faire une prédiction
                        </button>
                    </div>





                    <div className={styles.gridContainerImages}>

                        <div className={styles.itemImg}>
                            {images ? (
                                <img src={images} alt="imageinserer" />
                            ) : (
                                <img src={DefaultImageSrc} alt="imagepardéfaut" />
                            )}

                        </div>


                        <div className={styles.itemMask}>
                            {mask ? (
                                <img src={mask} alt="imageinserer" />
                            ) : (
                                <img src={DefaultImageSrc} alt="imagepardéfaut" />
                            )}
                        </div>
                    </div>

                </div>


                <div className={styles.conteneurPartie}>
                    <h2><span>P</span>rédiction à partir de l'image</h2>
                    <div className={styles.resultat}>

                    <div className={styles.beninMalin}>


                        
                            <div className={styles.beninR}>
                                <p >{newPourcentageBenin} /100 Bénin   </p>

                            </div>
                        
                        
                            <div className={styles.malinR}>
                                <p >{newPourcentageMalin} /100 Malin  </p>

                            </div>
                        
                        </div>


                        <div className={styles.item5}>

                            <div className={styles.column}>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Asymétrie:</p>
                                    <p className={styles.start}>
                                        {predictions1.asymmetry ? predictions1.asymmetry.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Bordure:</p>
                                    <p className={styles.start}>
                                        {predictions1.border_length ? predictions1.border_length.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Diamètre:</p>
                                    <p className={styles.start}>
                                        {predictions1.diameter ? predictions1.diameter.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Évolution:</p>
                                    <p className={styles.start}>Non traitée</p>
                                </div>
                            </div>

                            <div className={styles.column}>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Corrélation:</p>
                                    <p className={styles.start}>
                                        {predictions.correlation ? predictions.correlation.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Homogénéité:</p>
                                    <p className={styles.start}>
                                        {predictions.homogeneity ? predictions.homogeneity.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Énergie:</p>
                                    <p className={styles.start}>
                                        {predictions.energy ? predictions.energy.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div className={styles.resultPreduc}>
                                    <p className={styles.start}>Contraste:</p>
                                    <p className={styles.start}>
                                        {predictions.contrast ? predictions.contrast.toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <div className={styles.conteneurPartie}>
                    <h2><span>D</span>iagnostic et <span>I</span>nformation du patient</h2>


                    <div className={styles.ConteneurdiagnosInfo}>
                        <div className={styles.Conteneurdiagnos}>
                            <button onClick={toggleButtonsDisplay}>Diagnostic du dermatologue</button>
                            {buttonContainerVisible && (

                                <div className={styles.ligne}>
                                    <button className={`${styles.benin} ${clickedButton === 0 ? styles.active : ''}`}
                                        onClick={() => handleButtonClick(0)}
                                    >
                                        Benin
                                    </button>
                                    <button
                                        className={`${styles.malin} ${clickedButton === 1 ? styles.active : ''}`}
                                        onClick={() => handleButtonClick(1)}
                                    >
                                        Malin
                                    </button>
                                    <button
                                        className={`${styles.incertain} ${clickedButton === 0.5 ? styles.active : ''}`}
                                        onClick={() => handleButtonClick(0.5)}
                                    >
                                        Incertain
                                    </button>
                                    {clickedButton}

                                </div>)}
                        </div>
                        <div className={styles.ConteneurInfo}>
                            <button type="button" class="button-41" onClick={handleOpen}>Compléter les  autres informations du patient</button>

                        </div>

                    </div>
                </div>

            </div >
        </body >
    );
}
