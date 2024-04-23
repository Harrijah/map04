import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModal01 } from "../actions/modal01.action";
import { isEmpty } from "./Utils";

const Modal = () => {
  const isOkay = useSelector((state) => state.modal01Reducer.isOkay);
  const zones = useSelector((state) => state.zoneReducer.zone);
  const dispatch = useDispatch();

  const closemodal = () => {
    dispatch(getModal01(false));
  };

  return (
    <div className={isOkay ? "showmodal" : ""} id="mymodal">
      <div className="modal-content">
        {/* <!-- <span className="close span-right" id="close">&times;</span> --> */}
        <div className="modal-header">
          <div className="entete">
            <h3>Nouveau projet</h3>
          </div>
        </div>

        <div className="modal-body">
          <div className="bodycontainer">
            <div className="homeform">
              <form
                method="post"
                action="https://task.axel.mg/addnewproject"
                id="myform"
              >
                <div className="midtitle">A propos du projet : </div>

                <div className="inputtitle">Nom du projet : </div>
                <input type="text" name="nom" id="nom" className="longinput" />
                <br />

                <div className="inputtitle">Prestations principales: </div>
                <input
                  type="text"
                  name="typeprestations"
                  id="typeprestations"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Date de demande: </div>
                <input
                  type="date"
                  name="datedemande"
                  id="datedemande"
                  className="longinput"
                />

                <div className="inputtitle">Deadline réponse: </div>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  className="longinput"
                />

                <div className="inputtitle">Hauteur ou budget estimatif: </div>
                <input
                  type="number"
                  name="budgetestimatif"
                  id="budgetestimatif"
                  className="longinput"
                />

                <div className="inputtitle">Date de début prévisionnelle: </div>
                <input
                  type="date"
                  name="datedebutprevisionnelle"
                  id="datedebutprevisionnelle"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Durée prévisionnelle: </div>
                <input
                  type="text"
                  name="dureeprevisionnelle"
                  id="dureeprevisionnelle"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Date de fin prévisionnelle: </div>
                <input
                  type="date"
                  name="datefinprevisionnelle"
                  id="datefinprevisionnelle"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Description </div>
                <textarea
                  name="description"
                  id="description"
                  className="longinput"
                ></textarea>
                <br />

                <div className="inputtitle">Statut: </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="statut"
                      value="prospect"
                      defaultChecked
                    />
                    Prospect
                  </label>

                  <label>
                    <input type="radio" name="statut" value="En cours" />
                    En cours
                  </label>

                  <label>
                    <input type="radio" name="statut" value="Stand By" />
                    Stand By
                  </label>

                  <label>
                    <input type="radio" name="statut" value="Terminé" />
                    Terminé
                  </label>
                </div>

                <br />

                <div className="inputtitle">Responsable: </div>
                <input
                  type="text"
                  name="responsable"
                  id="responsable"
                  className="longinput"
                />
                <br />

                <div className="midtitle">A propos du client : </div>

                <div className="inputtitle">Société Client: </div>
                <input
                  type="text"
                  name="client"
                  id="client"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Interlocuteur: </div>
                <input
                  type="text"
                  name="interlocuteur"
                  id="interlocuteur"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Poste: </div>
                <input
                  type="text"
                  name="poste"
                  id="poste"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Mail: </div>
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Téléphone: </div>
                <input
                  type="text"
                  name="telephone"
                  id="telephone"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Ville : </div>
                <input
                  type="text"
                  name="ville"
                  id="ville"
                  className="longinput"
                />
                <br />

                <div className="inputtitle">Département: </div>
                <select
                  name="departement"
                  id="departement"
                  className="longinput"
                >
                  {!isEmpty(zones) &&
                    zones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.title}
                      </option>
                    ))}
                </select>
                <br />

                <button type="submit" id="validateform">
                  Envoyer
                </button>
                {/* <!-- <a href="javascript:void(0)" id="validateform">Envoyer</a> --> */}
              </form>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button id="closeme" onClick={() => closemodal()}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
