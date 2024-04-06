import React, { useState, useEffect, useRef } from "react";
import { isEmpty } from "./Utils";
import { useDispatch, useSelector, useStore } from "react-redux";
import { deleteTodo, editTodo, postTodo } from "../actions/todo.action";
import { deleteComment, postComment } from "../actions/comment.action";
import { getFiche } from "../actions/fiche.action";
import { editPrio } from "../actions/prio.action";
import { deleteLink, postLink } from "../actions/link.action";
import { setStatus } from "../actions/status.action";
import typeprestationsReducer from "../reducers/typeprestations.reducer";
import { addTypeprestations } from "../actions/typeprestations.action";
import { addItem } from "../actions/item.action";
import { addDescription } from "../actions/description.action";
import { addUnity } from "../actions/unity.action";
import { addUnitprice } from "../actions/addunitprice.action";


//-------------------------------------------------------------------------WYSIWYG
// import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



const Ficheprojet = () => {

  //-------------------------------------------------------------------------WYSIWYG
    // const [editorState, setEditorState] = useState('');
    // const handleEditorChange = (newEditorState) => {setEditorState(newEditorState);};
    const convertDraftToHtml = (rawContentState) => {
      const contentState = convertFromRaw(rawContentState);
      const editorState = EditorState.createWithContent(contentState);
      return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  
  const dispatch = useDispatch();
  const getfilestate = useSelector((state) => state.ficheReducer.show);

  const missions = useSelector((state) => state.missionReducer);
  const id = useSelector((state) => state.idReducer.id);
  const projects = useSelector((state) => state.projectReducer.projects);
  const todos = useSelector((state) => state.todoReducer.todos);

  const comments = useSelector((state) => state.commentReducer.comments);
  // console.log(comments);


    const mission =
    !isEmpty(missions) &&
    missions.find((mission) => Number(mission.id) === Number(id));
    // console.log(mission);


  const [currentDateTime, setCurrentDateTime] = useState("");
  useEffect(() => {
    // Fonction pour obtenir la date et l'heure actuelles
    const getCurrentDateTime = () => {
      const currentDate = new Date();
      const formattedDateTime = currentDate.toISOString(); // Format ISO pour inclure la date et l'heure
      setCurrentDateTime(formattedDateTime);
    };

    // Appeler la fonction pour la première fois
    getCurrentDateTime();

    // Mettre en place un intervalle pour mettre à jour la date et l'heure périodiquement (par exemple, toutes les secondes)
    const intervalId = setInterval(getCurrentDateTime, 1000);

    // Nettoyer l'intervalle lorsqu'un composant est démonté
    return () => clearInterval(intervalId);
  }, []); // Le tableau vide signifie que cet effet n'a lieu qu'une fois après le montage initial

  const closefile = () => {
    dispatch(getFiche(false));
    prioform.current.reset();
  };

  const project =
    !isEmpty(projects) &&
    projects.find((project) => Number(project.id) === Number(id));

  const projectprio = useSelector((state) => state.prioReducer.prio);
  const projectstatus = useSelector((state) => state.statusReducer.statut);

  const prioform = useRef();
  const setpriority = () => {
    const data = {
      id: prioform.current[0].value,
      priorite: prioform.current[1].value,
    };
    dispatch(editPrio(data));
  };

  const stateform = useRef();
  const setstatus = () => {
    const data = {
      id: stateform.current[0].value,
      statut: stateform.current[1].value,
    };
    dispatch(setStatus(data));
  };

  
  
    // ---------------------- Section TodoList
    const form = useRef();
    const handleform = async (e) => {
      e.preventDefault();
  
      const postdata = {
        project: form.current[0].value,
        mission: form.current[1].value,
        todo: form.current[2].value,
      };
      dispatch(postTodo(postdata));
      form.current.reset();
    };
  
    const checkme = (id) => {
      const currentTodo = todos.find((todo) => todo.id == id);
  
      if (currentTodo) {
        const modifydata = {
          id: id,
          checked: currentTodo.checked ? 0 : 1, // Inverse la valeur actuelle
        };
        dispatch(editTodo(modifydata));
      } else {
        console.error("ID non défini, impossible de mettre à jour.");
      }
    };
  
    const deleteme = (id) => {
      if (id) {
        dispatch(deleteTodo(id));
      } else {
        console.error("ID non défini, impossible de mettre à jour.");
      }
    };
  
    // ---------------------- Section links
    const links = useSelector((state) => state.linkReducer.links);
    const mylink = useRef();
  
    const linkform = (e) => {
      e.preventDefault();
      const data = {
        filename: mylink.current[0].value,
        filelink: mylink.current[1].value,
        projectid: mylink.current[2].value,
        missionid: mylink.current[3].value,
      };
      // alert(link.current[1].value);
      dispatch(postLink(data));
      mylink.current.reset();
    };
    const deletelink = (id) => {
      if (id) {
        dispatch(deleteLink(id));
      } else {
        console.error("ID non défini, impossible de mettre à jour.");
      }
    };
    const commentaire = useRef();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    
    const handleEditorChange = (newEditorState) => {
      setEditorState(newEditorState);
    };
    
    const commentform = (e) => {
      e.preventDefault();
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const data = {
        datecomment: commentaire.current[0].value,
        pidforcomment: commentaire.current[1].value,
        midforcomment: commentaire.current[2].value,
        commentaire: JSON.stringify(rawContentState), // Convert editor content to JSON
      };
      dispatch(postComment(data));
      setEditorState(EditorState.createEmpty()); // Reset editor state
    };
    const deletecomment = (id) => {
      if (id) {
        dispatch(deleteComment(id));
      } else {
        console.error("ID non défini, impossible de mettre à jour.");
      }
    };

  /* ----------------------------------------------------
                         Section Type prestations
    ----------------------------------------------------- */
  const prestationref = useRef();
  const addmyprestation = (e) => {
    e.preventDefault();
    const data = {
      typeprestations: prestationref.current[0].value,
    };
    prestationref.current.reset();
    dispatch(addTypeprestations(data));
  };
  const prestations = useSelector(
    (state) => state.typeprestationsReducer.typeprestations
  );

  /* ----------------------------------------------------
                         Section Items
    ----------------------------------------------------- */
  const itemref = useRef();
  const addmyitem = (e) => {
    e.preventDefault();
    const data = {
      item: itemref.current[0].value,
      typeprestationsid: itemref.current[1].value,
    };
    dispatch(addItem(data));
    itemref.current.reset();
  };
  const items = useSelector((state) => state.itemReducer.items);

  /* ----------------------------------------------------
                         Section Description
    ----------------------------------------------------- */
  const descriptionform = useRef();

  const addmydescription = (e) => {
    e.preventDefault();
    const data = {
      description: descriptionform.current[0].value,
      item: descriptionform.current[1].value,
    };
    dispatch(addDescription(data));
    descriptionform.current.reset();
  };
  const descriptions = useSelector(
    (state) => state.descriptionReducer.descriptions
  );

  // console.log(descriptions);

  /* ----------------------------------------------------
                         Section Unité
    ----------------------------------------------------- */
  const unityref = useRef();
  const addmyunity = (e) => {
    e.preventDefault();
    const data = {
      unite: unityref.current[0].value,
      description: unityref.current[1].value,
    };
    dispatch(addUnity(data));
    unityref.current.reset();
  };
  const unities = useSelector((state) => state.unityReducer.unities);

  /* ----------------------------------------------------
                         Use Filter 
    ----------------------------------------------------- */
  const [myprestation, setMyprestation] = useState(1);
  const [myitem, setMyitem] = useState(1);
  const [mydescription, setMydescription] = useState(1);

  const changeprestation = (e) => {
    setMyprestation(e.target.value);
    setMyitem(0);
    setMydescription(0);
  };
  const changeitem = (e) => {
    setMyitem(e.target.value);
    setMydescription(0);
  };
  const changedescription = (e) => {
    setMydescription(e.target.value);
  };

  /* ----------------------------------------------------
                         Add newprice unit
    ----------------------------------------------------- */
  const unitpriceform = useRef();
  const submitpriceunit = (e) => {
    e.preventDefault();
    const data = {
      prestation: unitpriceform.current[0].value,
      item: unitpriceform.current[1].value,
      description: unitpriceform.current[2].value,
      price: unitpriceform.current[3].value,
      unity: unitpriceform.current[4].value,
      date: unitpriceform.current[5].value,
      generic: unitpriceform.current[6].value,
      comment: unitpriceform.current[7].value,
      projectid: unitpriceform.current[8].value,
    };
    dispatch(addUnitprice(data));
    unitpriceform.current.reset();
  };

  /* ----------------------------------------------------
  *******************************************************
  *******************************************************
                         Add newprice unite
  *******************************************************
  *******************************************************
    ----------------------------------------------------- */

  return (
    <div
      className={getfilestate && getfilestate ? "showproject" : ""}
      id="modalcontainer"
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="entete">
            <div className="bigtitle">
              <h1>{!isEmpty(project) && project.nom}</h1>
              <h2>{!isEmpty(project) && project.client}</h2>
              <div className="myprojectpriority">
                <form ref={stateform} onChange={() => setstatus()}>
                  <p>
                    Statut : &nbsp;
                    <input
                      type="hidden"
                      name="prioid"
                      value={!isEmpty(project) && project.id}
                    />
                    <select name="projectstate" id="projectstate">
                      <option>{!isEmpty(project) && project.statut}</option>
                      <option value="prospect">Devis</option>
                      <option value="lost">Perdu</option>
                      <option value="left">Non répondu</option>
                      <option value="inprogress">En production</option>
                      <option value="standby">Stand by</option>
                      <option value="done">Terminé</option>
                    </select>
                  </p>
                </form>
                <form ref={prioform} onChange={() => setpriority()}>
                  <p>
                    Priorité : &nbsp;
                    <input
                      type="hidden"
                      name="prioid"
                      value={!isEmpty(project) && project.id}
                    />
                    <select name="projectprio" id="projectprio">
                      <option>{!isEmpty(project) && project.priorite}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="bodycontainer">
            <div className="projectcontent">
              <div className="projectsidebar">
                <div className="leftside">
                  <h3>A propos du projet</h3>
                  <div className="part1">
                    <span>
                      <b>Contact</b> :{" "}
                    </span>
                    <span>{!isEmpty(project) && project.interlocuteur}</span>
                  </div>
                  <div className="part2">
                    <span>
                      <b>Coordonnées</b> :{" "}
                    </span>
                    <span>
                      {!isEmpty(project) && project.mail} //{" "}
                      {!isEmpty(project) && project.telephone}{" "}
                    </span>
                  </div>
                  <div className="part3">
                    <span>
                      <b>Prestation(s) attendue(s)</b> :{" "}
                    </span>
                    <span style={{ color: "green" }}>
                      {!isEmpty(project) && project.typeprestations}
                    </span>
                  </div>
                  <div className="part4">
                    <span>
                      <b>Date demande</b> :{" "}
                    </span>
                    <span>{!isEmpty(project) && project.datedemande}</span>
                  </div>
                  <div className="part5">
                    <span>
                      <b>Deadline</b> :{" "}
                    </span>
                    <span>{!isEmpty(project) && project.deadline}</span>
                  </div>
                  <div className="part6">
                    <span>
                      <b>Budget estimatif</b> :{" "}
                    </span>
                    <span style={{ color: "red" }}>
                      {!isEmpty(project) && project.budgetestimatif}
                      {" €"}
                    </span>
                  </div>
                  <div className="part7">
                    <span>
                      <b>Date début prévue</b> :{" "}
                    </span>
                    <span>
                      {!isEmpty(project) && project.datedebutprevisionnelle}
                    </span>
                  </div>
                  <div className="part8">
                    <span>
                      <b>Durée du projet</b> :{" "}
                    </span>
                    <span>
                      {!isEmpty(project) && project.dureeprevisionnelle}
                    </span>
                  </div>
                  <div className="part9">
                    <span>
                      <b>Date de fin prévue</b> :{" "}
                    </span>
                    <span>
                      {!isEmpty(project) && project.datefinprevisionnelle}
                    </span>
                  </div>
                  <div className="part10">
                    <span>
                      <b>Statut</b> :{" "}
                    </span>
                    <span>{!isEmpty(project) && project.statut}</span>
                  </div>
                  <div className="part11">
                    <span>
                      <b>Ville</b> :{" "}
                    </span>
                    <span>{!isEmpty(project) && project.ville}</span>
                  </div>
                </div>
                <div className="leftpart">
                  <div className="container">
                    <h2>A faire</h2>
                    
                    <form
                          ref={form}
                          onSubmit={(e) => handleform(e)}
                          // onSubmit={(e) => e.preventDefault()}
                        >
                        <input type="hidden" name="project"
                          value={
                            !isEmpty(projects) &&
                            Number(!isEmpty(project) && project.id)
                          }
                          id="project"
                        />
                          <input type="hidden" name="mission"
                            value='0'
                            id="mission"
                          />

                          <input type="text" id="todo" name="todo"
                            placeholder="Renseignez les tâches à faire, ici"
                          />
                        </form>
                    <ul id="list">
                      {!isEmpty(todos) &&
                        todos
                          .filter((todo) => {
                            return (
                              !isEmpty(projects) &&
                              Number(todo.project) === Number(project.id)
                            );
                          })
                          .map((todo) => (
                            <li key={todo.id}>
                              <div className="leftli">
                                <span
                                  style={
                                    Number(todo.checked) === 1
                                      ? { textDecoration: "line-through" }
                                      : {}
                                  }
                                >
                                  {todo.todo}
                                </span>
                              </div>
                              <div className="rightli">
                                <button onClick={() => checkme(todo.id)}>
                                  Check{" "}
                                </button>
                                <button onClick={() => deleteme(todo.id)}>
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                    </ul>
                  </div>
                  <div className="container02">
                    <h2>Liens</h2>
                    <ul id="list">
                      {!isEmpty(links) &&
                        links
                          .filter((link) => {
                            return (
                              !isEmpty(projects) &&
                              Number(link.projectid) === Number(project.id)
                            );
                          })
                          .map((link) => (
                            <li key={link.id}>
                              <div className="leftli" key={link.id}>
                                <a
                                  key={link.id}
                                  href={link.filelink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    e.preventDefault(); // Empêche le comportement par défaut du lien
                                    window.open(link.filelink, "_blank");
                                  }}
                                >
                                  {link.filename}
                                </a>
                              </div>
                              <div className="rightli">
                                <button onClick={() => deletelink(link.id)}>
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                    </ul>
                        <form ref={mylink} onSubmit={(e) => linkform(e)}>
                          <h4>Ajouter un nouveau lien</h4>
                          <input type="text" name="filename" id="filename"
                            placeholder="Entrer le nom du fichier"
                            // defaultValue="Mon fichier"
                          />
                          <input id="filelink" name="filelink" rows="5"
                            placeholder="Coller le lien, ici"
                          />
                          <input type="hidden" name="projectid" id="projectid"
                            value={!isEmpty(projects) && Number(project.id)}
                          />
                          <input type="hidden" name="missionid" id="missionid"
                            value='0'
                          />
                          <input type="submit" value="Ajouter" />
                        </form>
                  </div>
                </div>
              </div>
              <div className="projectmaincontent">
                <div className="rightside">
                  <h3>Description</h3>
                  <p>{!isEmpty(project) && project.description}</p>
                </div>
                <div className="container">
                  <h2>Commentaires</h2>
                  <ul id="list">
                    {!isEmpty(comments) &&
                      comments
                        .filter((comment) => {
                          return (
                            !isEmpty(projects) &&
                            Number(comment.pidforcomment) === Number(project.id)
                          );
                        })
                        .map((comment) => (
                          <li key={comment.id}>
                            <div className="leftli">
                              <span>{comment.datecomment}</span>
                              <p>{comment.commentaire}</p>
                              {/* Utiliser convertDraftToHtml pour afficher le contenu Draft.js */}
                              {/* <div dangerouslySetInnerHTML={{ __html: convertDraftToHtml(JSON.parse(comment.commentaire)) }} /> */}
                              
                            </div>
                            <div className="rightli">
                              <button onClick={() => deletecomment(comment.id)}>
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                  </ul>
                      <form ref={commentaire} onSubmit={(e) => commentform(e)} style={{ backgroundColor: "#fff", padding: "10px" }}>
                        <input type="hidden" name="datecomment" id="datecomment" value={currentDateTime} />
                        <input type="hidden" name="pidforcomment" id="pidforcomment" value={!isEmpty(projects) && Number(project.id)} />
                        <input type="hidden" name="midforcomment" id="midforcomment" value='0' />
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={handleEditorChange}
                          // toolbar={{
                          //   options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                          // }}
                        />
                        <input type="submit" value="Commenter" />
                      </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="pricecontainer">
            <div className="formcontainer">
              <h3>Ajouter un nouveau tarif à la base de données</h3>

              {/* FORM N°01  ------------------------------------------------------------------------------------------- */}
              <form ref={unitpriceform} onSubmit={(e) => submitpriceunit(e)}>
                <div className="typrestations">
                  <label htmlFor="typrestations">Prestation</label>

                  <select
                    name="typrestations"
                    id="typrestations"
                    onChange={(e) => changeprestation(e)}
                  >
                    <option key={"0"} value={"0"}>
                      null
                    </option>
                    {!isEmpty(prestations) &&
                      prestations.map((prestation) => (
                        <option key={prestation.id} value={prestation.id}>
                          {prestation.typeprestations}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="items">
                  <label htmlFor="items">Item</label>
                  <select
                    name="items"
                    id="items"
                    onChange={(e) => changeitem(e)}
                  >
                    <option key={"0"} value={"0"}>
                      null
                    </option>
                    {!isEmpty(items) &&
                      items
                        .filter(
                          (item) => item.typeprestationsid === myprestation
                        )
                        .map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.item}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="description">
                  <label htmlFor="description">Description</label>
                  <select
                    name="description"
                    id="description"
                    onChange={(e) => changedescription(e)}
                  >
                    <option key={"0"} value={"0"}>
                      null
                    </option>
                    {!isEmpty(descriptions) &&
                      descriptions
                        .filter((description) => description.item === myitem)
                        .map((description) => (
                          <option key={description.id} value={description.id}>
                            {description.description}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="prixunitaire">
                  <label htmlFor="prixunitaire">PU en €</label>
                  <input type="text" min="0" defaultValue="0" />
                </div>
                <div className="uniteprix">
                  <label htmlFor="uniteprix">Unité</label>
                  <select name="uniteprix" id="uniteprix">
                    <option key={"0"} value={"0"}>
                      null
                    </option>
                    {!isEmpty(unities) &&
                      unities
                        .filter((unity) => unity.description === mydescription)
                        .map((unity) => (
                          <option key={unity.id} value={unity.unite}>
                            {unity.unite}
                          </option>
                        ))}
                  </select>
                </div>
                <input
                  type="date"
                  name="dateapplication"
                  id="dateapplication"
                  className="dateapplication"
                />
                <div className="checkbox01">
                  <label htmlFor="generique">Cocher si prix générique</label>
                  <input
                    type="checkbox"
                    className="generique"
                    name="generique"
                    id="generique"
                  />
                </div>
                {/* <div className="checkbox02">
                  <label htmlFor="envigueur">Cocher si tarif en vigueur</label>
                  <input
                    type="checkbox"
                    className="envigueur"
                    name="envigueur"
                    id="envigueur"
                  />
                </div> */}
                <input
                  type="text"
                  name="commentaire"
                  id="commentaire"
                  placeholder="Commentaire facultatif : 255 caractères max"
                  className="mypricecomment"
                />
                <div className="vide"></div>
                <input type="hidden" name="referenceprojet" value={id} />
                <input
                  className="validateprice"
                  type="submit"
                  value="Valider"
                />
              </form>
            </div>

            {/* FORM N°02  ------------------------------------------------------------------------------------------- */}
            <div className="addunit">
              <h3>Ajouter une nouvelle unité de tarification</h3>
              <div className="formcontainer02">
                <form ref={prestationref} onSubmit={(e) => addmyprestation(e)}>
                  <div className="newunit">
                    <label htmlFor="mynewunit">Nouvelle prestation</label>
                    <input type="text" name="mynewunit" id="mynewunit" />
                    <input type="submit" value="Enregistrer" />
                  </div>
                </form>
                <form ref={itemref} onSubmit={(e) => addmyitem(e)}>
                  <div className="newunit">
                    <label htmlFor="mynewunit">Nouvel Item</label>
                    <input
                      type="text"
                      name="mynewunit"
                      id="mynewunit"
                      placeholder="Entrez le nom, ici"
                    />
                    <label htmlFor="mynewunit">Prestation parent</label>
                    <select
                      name="unitparent"
                      id="unitparent"
                      onChange={(e) => changeprestation(e)}
                    >
                      {!isEmpty(prestations) &&
                        prestations.map((prestation) => (
                          <option key={prestation.id} value={prestation.id}>
                            {prestation.typeprestations}
                          </option>
                        ))}
                    </select>
                    <input type="submit" value="Enregistrer" />
                  </div>
                </form>
                <form
                  ref={descriptionform}
                  onSubmit={(e) => addmydescription(e)}
                >
                  <div className="newunit">
                    <label htmlFor="mynewunit">Nouvelle description</label>
                    <input
                      type="text"
                      name="mynewunit"
                      id="mynewunit"
                      placeholder="Entrez la description, ici"
                    />
                    <label htmlFor="mynewunit">Item parent</label>
                    <select
                      name="unitparent"
                      id="unitparent"
                      onChange={(e) => changeitem(e)}
                    >
                      {!isEmpty(items) &&
                        items
                          .filter(
                            (item) => item.typeprestationsid === myprestation
                          )
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.item}
                            </option>
                          ))}
                    </select>
                    <input type="submit" value="Enregistrer" />
                  </div>
                </form>

                <form ref={unityref} onSubmit={(e) => addmyunity(e)}>
                  <div className="newunit">
                    <label htmlFor="mynewunit">Nouvelle unité</label>
                    <input
                      type="text"
                      name="mynewunit"
                      id="mynewunit"
                      placeholder="Entrez le nom, ici"
                    />
                    <label htmlFor="mynewunit">Description parent</label>
                    <select
                      name="unitparent"
                      id="unitparent"
                      onChange={(e) => changedescription(e)}
                    >
                      {!isEmpty(descriptions) &&
                        descriptions
                          .filter((description) => description.item === myitem)
                          .map((description) => (
                            <option key={description.id} value={description.id}>
                              {description.description}
                            </option>
                          ))}
                    </select>
                    <input type="submit" value="Enregistrer" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button id="closeme" onClick={() => closefile()}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ficheprojet;
