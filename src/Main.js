import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { deleteTodo, editTodo, postTodo } from "./actions/todo.action";
import { deleteComment, postComment } from "./actions/comment.action";
import { deleteLink, postLink } from "./actions/link.action";
import { isEmpty } from "./assets/Utils";
import Modal from "./assets/Modal";
import { getModal01 } from "./actions/modal01.action";
import Ficheprojet from "./assets/Ficheprojet";
import { getID } from "./actions/id.action";
import { getFiche } from "./actions/fiche.action";

// ---------------------------------------------------------------------- A changer
import { editMissionprio } from "./actions/missionprio.action";
import { setMissionstatus } from "./actions/missionstatus.action";

//-------------------------------------------------------------------------WYSIWYG
// import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Main() {
  //-------------------------------------------------------------------------WYSIWYG
  // const [editorState, setEditorState] = useState('');
  // const handleEditorChange = (newEditorState) => {setEditorState(newEditorState);};
  const convertDraftToHtml = (rawContentState) => {
    const contentState = convertFromRaw(rawContentState);
    const editorState = EditorState.createWithContent(contentState);
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };


  const [lastprojectmodalbis, setLastprojectmodalbis] = useState(false);
  const [showallprices, setShowallprices] = useState(false);


  const zones = useSelector((state) => state.zoneReducer.zone);

  const projects = useSelector((state) => state.projectReducer.projects);
  const missions = useSelector((state) => state.missionReducer);
  const comments = useSelector((state) => state.commentReducer.comments);

  const [dept, setDept] = useState(null);
  const [selectedstatus, setSelectedstatus] = useState("inprogress");
  const [parprojet, setParprojet] = useState(true);
  const [selectedprojectid, setSelectedprojectid] = useState(null);
  const [selectedmissionid, setSelectedmissionid] = useState(null);
  const dispatch = useDispatch();
  const [mytitle, setMytitle] = useState(
    "Cliquez sur la carte pour afficher les projets par zone"
  );
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const [mysearch, setMysearch] = useState(null);
  const lookatme = (data) => {
    setMysearch(data);
    console.log(data);
  };

  const lightmapfill = "#333399";
  const mapfill = "#FFCC00";
  const orange = "#FFA500";
  const red = "#FF0000";
  const mapoff = "#dddddd";
  const aurexus = "#000066";
  const maphover_fill = "#7ABBEF";
  const mapstroke = "#EEEEEE";
  const mapstroke_width = 0.8;
  const mapWidth = 750;
  const mapHeight = 750;
  const grey = "#cfcfc4";

  const [isHovered, setIsHovered] = useState(false);
  const [colorvary, setColorvary] = useState(mapfill);

  const zonestyle = (id) => {
    const project =
      !isEmpty(projects) &&
      projects.find((project) => project.departement === id);

    let fill;

    if (!isEmpty(project) && project.departement === id) {
      if (project.priorite <= 2) {
        fill = lightmapfill;
      } else if (project.priorite <= 4) {
        fill = mapfill;
      } else if (project.priorite <= 7) {
        fill = orange;
      } else if (project.priorite <= 10) {
        fill = red;
      } else {
        fill = aurexus;
      }
    } else {
      fill = grey;
    }

    return {
      fill,
    };
  };

  const deptinfo = (zone, title) => {
    setMytitle(title);
    setDept(zone);
  };
  const reinitialize = () => {
    setMytitle(
      "Cliquez sur la carte pour afficher les projets par zone"
    );
    setDept(null);
  };
  const showmodal = () => {
    dispatch(getModal01(true));
  };

  // const showproject = (id) => {
  //   alert(id);
  // };

  const selectedproject = (id) => {
    dispatch(getID(id));
    dispatch(getFiche(true));
    setLastprojectmodalbis(false);
  };
  const selectedmission = (id) => {
    // dispatch(getID(id));
    setMissionid(id);
    setFichemission(true);
    setLastprojectmodalbis(false);
    // dispatch(getFiche(true));
  };

  const [myfilter, setMyfilter] = useState("projet");
  const filtermethod = (selectedValue) => {
    setMyfilter(selectedValue);
  };

  /* ----------------------------------------------------
                         Price DataBase Section
    ----------------------------------------------------- */
  const prices = useSelector((state) => state.unitpriceReducer.unitprices);
  const [showpricelist, setShowpricelist] = useState(false);
  const listdisplaytoggle = () => {
    setShowpricelist(!showpricelist);
    setShowallprices(true);
  };

  /* ----------------------------------------------------
                         JOIN REDUCERS
    ----------------------------------------------------- */
  const prestations = useSelector(
    (state) => state.typeprestationsReducer.typeprestations
  );
  const items = useSelector((state) => state.itemReducer.items);
  const descriptions = useSelector(
    (state) => state.descriptionReducer.descriptions
  );
  const unities = useSelector((state) => state.unityReducer.unities);

  /* ----------------------------------------------------
                         Toogle Map Display
    ----------------------------------------------------- */

  const mapstyle = {
    opacity: 1,
    color: "#000000",
    fill: "#fff3e3",
    fillOpacity: 1,
    fillRule: "evenodd",
    stroke: "#5d5d5d",
    strokeWidth: 0.5,
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    marker: "none",
    markerStart: "none",
    markerMid: "none",
    markerEnd: "none",
    strokeMiterlimit: 4,
    strokeDasharray: "none",
    strokeDashoffset: 0,
    strokeOpacity: 0.51459853,
    visibility: "visible",
    display: "inline",
    overflow: "visible",
  };



  /* ----------------------------------------------------
                         Little projects liprojectslistst modal
    ----------------------------------------------------- */
  const [blockX, setBlockX] = useState(null);
  const [blockY, setBlockY] = useState(null);
  const [iconpath, setIconpath] = useState(
    // "M256,0c-85.7,0-155.2,68.2-155.2,152.2C100.8,236.3,256,512,256,512s155.2-275.7,155.2-359.8C411.2,68.2,341.7,0,256,0z"
    "M 256 0 c -85.7 0 -155.2 68.2 -155.2 152.2 C 100.8 236.3 256 512 256 512 s 155.2 -275.7 155.2 -359.8 C 411.2 68.2 341.7 0 256 0 z"
  );
  const [iconpath02, setIconpath02] = useState(
    "M15,16.469c-2.856,0-5.172,2.272-5.172,5.072c0,2.803,5.172,11.99,5.172,11.99s5.172-9.188,5.172-11.99 C20.172,18.742,17.856,16.469,15,16.469z"
  );

 


  /* ----------------------------------------------------
                         Toggle Missions/Devis
    ----------------------------------------------------- */
  const [devis, setDevis] = useState(false);
  const [showmodal02, setShowmodal02] = useState(false);

  // const closemodal02 = () => {
  //   setShowmodal02(false);
  // }

  /* Fiche mission Modal */
  const [fichemission, setFichemission] = useState(false);

  const id = useSelector((state) => state.idReducer.id);

  const todos = useSelector((state) => state.todoReducer.todos);

  // console.log(comments);

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

  /* ----------------------------------------------------
                        Missions
  ----------------------------------------------------- */
  const closefile = () => {
    setShowmodal02(false);
    dispatch(getFiche(false));
    prioform.current.reset();
  };

  const [missionid, setMissionid] = useState(Number(40));

  const mission =
    !isEmpty(missions) &&
    missions.find((mission) => Number(mission.id) === Number(missionid));
  // console.log(mission);

  const projectprio = useSelector((state) => state.prioReducer.prio);
  const projectstatus = useSelector((state) => state.statusReducer.statut);

  // -----------------------------------------------------//
  //         Priorité et statut de la mission             //
  // -----------------------------------------------------//

  // ---------------------------------------------------------------------- A changer
  // ---------------------- Section Priority
  const prioform = useRef();
  const setpriority = () => {
    const data = {
      id: prioform.current[0].value,
      priorite: prioform.current[1].value,
    };
    dispatch(editMissionprio(data));
  };

  // ---------------------------------------------------------------------- A changer
  // ---------------------- Section Status du projet
  const stateform = useRef();
  const setstatus = () => {
    const data = {
      id: stateform.current[0].value,
      statut: stateform.current[1].value,
    };
    dispatch(setMissionstatus(data));
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
              Toggle status (Devis ou Missions)
    ----------------------------------------------------- */
  const devisbutton = () => {
    setSelectedstatus("prospect");
    setDevis(true);
  };

  const missionbutton = () => {
    setSelectedstatus("inprogress");
    setDevis(false);
  };

  /* ----------------------------------------------------
     ----------------------------------------------------
     ----------------------------------------------------
     ----------------------------------------------------
     |                        JSX                       |
     ----------------------------------------------------
     ----------------------------------------------------
    ----------------------------------------------------- */
  return (
    <div id="mainpage">
      <div id="mainpagecontainer">
        <div id="allcontainer">
          <div id="principalcontainer">
            <div
              className={
                lastprojectmodalbis
                  ? "lastprojectmodalbis"
                  : "lastprojectsmodal"
              }
              id="lastprojectsmodal"
              onClick={() => setLastprojectmodalbis(false)}
            >
              <div className="lastprojects">
                <h3>Les derniers projets mis à jour</h3>

                <ul className="selectlist">
                  {!isEmpty(projects) &&
                    comments && // Check if comments is not null
                    projects
                      .filter((project) => project.statut === selectedstatus)
                      .sort((a, b) => {
                        // Find the latest comment for each project
                        const latestCommentA = comments
                          .filter((comment) => comment.pidforcomment === a.id)
                          .sort((x, y) =>
                            y.datecomment.localeCompare(x.datecomment)
                          )[0];
                        const latestCommentB = comments
                          .filter((comment) => comment.pidforcomment === b.id)
                          .sort((x, y) =>
                            y.datecomment.localeCompare(x.datecomment)
                          )[0];

                        // Handle cases where there might not be any comments
                        if (!latestCommentA) return 1;
                        if (!latestCommentB) return -1;

                        // Compare projects based on the date of the latest comment
                        return latestCommentB.datecomment.localeCompare(
                          latestCommentA.datecomment
                        );
                      })
                      .map((project) => {
                        // Find the latest comment for the current project
                        const latestComment = comments
                          .filter(
                            (comment) => comment.pidforcomment === project.id
                          )
                          .sort((x, y) =>
                            y.datecomment.localeCompare(x.datecomment)
                          )[0];

                        return (
                          <li key={project.id}>
                            <a onClick={() => selectedproject(project.id)}>
                              {project.nom} -{" "}
                              {latestComment
                                ? latestComment.datecomment
                                : "No comments"}
                            </a>
                          </li>
                        );
                      })}
                </ul>

                <div>
                  <button onClick={() => setLastprojectmodalbis(false)}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>

            {showpricelist == false ? (
              ""
            ) : (
              <div
                id="listedeprix"
                // className={ showallprices ? "lastprojectmodalbis" : "lastprojectsmodal"
                className={"lastprojectmodalbis"}
              >
                <div className="lastprojects">
                  <h3>Liste de prix</h3>
                  <div className="selectlist03">
                    <table>
                      {/* <thead>
                      <tr>
                        <td>Prestation</td>
                        <td>Item</td>
                        <td>Description</td>
                        <td>Prix</td>
                        <td>Date</td>
                      </tr>
                    </thead> */}
                      {!isEmpty(prices) &&
                        prices
                          // .filter((price) => {
                          //   const matchingprestations = prestations.filter(
                          //     (prestation) =>
                          //       mysearch
                          //         ? removeAccents(
                          //             prestation.typeprestations.toLowerCase()
                          //           ).includes(
                          //             removeAccents(mysearch.toLowerCase())
                          //           ) && price.prestation == prestation.id
                          //         : true
                          //   );

                          //   const matchingitems =
                          //     !isEmpty(items) &&
                          //     items.filter((item) =>
                          //       mysearch
                          //         ? removeAccents(
                          //             item.item.toLowerCase()
                          //           ).includes(
                          //             removeAccents(mysearch.toLowerCase())
                          //           ) && price.item == item.id
                          //         : true
                          //     );
                          //   return (
                          //     matchingprestations.length > 0 ||
                          //     matchingitems.length > 0
                          //   );
                          // })
                          // .filter((price) => {
                          //   const matchingProjects = projects.filter(
                          //     (project) =>
                          //       project.id === price.projectid &&
                          //       project.statut === selectedstatus
                          //   );
                          //   return matchingProjects.length > 0; // Vérifier s'il y a des projets correspondants
                          // })
                          .map((price) => (
                            <tr key={price.id}>
                              <a
                                onClick={() => selectedproject(price.projectid)}
                                className="gridme"
                              >
                                <td className="price02">
                                  {(() => {
                                    const matchingPrestation = prestations.find(
                                      (prestation) =>
                                        prestation.id === price.prestation
                                    );

                                    return (
                                      <span key={price.id}>
                                        {matchingPrestation &&
                                          matchingPrestation.typeprestations}
                                      </span>
                                    );
                                  })()}
                                </td>

                                <td className="price03">
                                  {(() => {
                                    const matchingPrestation =
                                      !isEmpty(items) &&
                                      items.find(
                                        (item) => item.id === price.item
                                      );

                                    return (
                                      <span key={price.id}>
                                        {matchingPrestation &&
                                          matchingPrestation.item}
                                      </span>
                                    );
                                  })()}
                                </td>

                                <td className="price04">
                                  {(() => {
                                    const matchingPrestation =
                                      !isEmpty(descriptions) &&
                                      descriptions.find(
                                        (description) =>
                                          description.id === price.description
                                      );

                                    return (
                                      <span key={price.id}>
                                        {matchingPrestation &&
                                          matchingPrestation.description}
                                      </span>
                                    );
                                  })()}
                                </td>

                                <td className="price05">
                                  {price.price} € / {price.unity}
                                </td>

                                <td className="price06">
                                  {(() => {
                                    const matchingPrestation =
                                      !isEmpty(projects) &&
                                      projects.find(
                                        (project) =>
                                          project.id === price.projectid
                                      );

                                    return (
                                      <span key={price.id}>
                                        {matchingPrestation &&
                                          matchingPrestation.client}
                                      </span>
                                    );
                                  })()}
                                </td>

                                <td className="price08">
                                  {(() => {
                                    const matchingPrestation =
                                      !isEmpty(projects) &&
                                      projects.find(
                                        (project) =>
                                          project.id === price.projectid
                                      );

                                    return (
                                      <span key={price.id}>
                                        {matchingPrestation &&
                                          matchingPrestation.statut}
                                      </span>
                                    );
                                  })()}
                                </td>

                                <td className="price01">{price.date}</td>

                                <td className="price07">{price.comment}</td>
                              </a>
                            </tr>
                          ))}
                    </table>
                  </div>
                  <div>
                    <button onClick={() => listdisplaytoggle()}>Fermer</button>
                  </div>
                </div>
              </div>
            )}

            <div id="insidecontainer">
              <div id="leftpart" style={{ display :  devis ? "" : 'none' }}>
                <div id="togglemap">
                  <button>
                    Carte interactive
                  </button>
                </div>

                <div className="svgcontainer">
                  <svg
                    className={ devis ? "" : "hideme"}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width={mapWidth}
                    height={mapHeight}
                    viewBox="0 0 310 310"
                    overflow="scroll"
                    style={{ marginTop: "3%" }}
                  >
                    {!isEmpty(zones) &&
                      zones.map((zone) => (
                        <a
                          key={zone.title}
                          onClick={() => deptinfo(zone.id, zone.title)}
                          // href={zone.url}
                        >
                          <path
                            id={zone.title}
                            title={zone.title}
                            d={zone.path}
                            stroke={mapstroke}
                            strokeWidth={"mapstroke_width"}
                            style={zonestyle(zone.id)} // Use the object directly
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="path"
                          />
                        </a>
                      ))}
                  </svg>
                </div>
              </div>

              <div id="rightpart">
                <div id="rightbox">
                  <div className="projectbox">
                    <div className="morebuttons">
                      <button
                        onClick={() => devisbutton()}
                        style={{
                          background: devis ? "#000066" : "whitesmoke",
                          color: devis ? "whitesmoke" : "#000066",
                          // width: "100px"
                        }}
                      >
                        Devis
                      </button>
                      <button
                        onClick={() => missionbutton()}
                        style={{
                          background: !devis ? "#000066" : "whitesmoke",
                          color: !devis ? "whitesmoke" : "#000066",
                          // width: "100px"
                        }}
                      >
                        Tasks
                      </button>
                      <button>Liste clients & projets</button>
                      <button
                        onClick={() => listdisplaytoggle()}
                        style={{
                          background: showpricelist ? "#000066" : "whitesmoke",
                          color: showpricelist ? "whitesmoke" : "#000066",
                          width: "100px",
                        }}
                      >
                        BDD tarifs
                      </button>
                    </div>

                    {devis ? (
                      // ---------------------- Section Devis
                      <div className="projectdetails">
                        <div className="headbox">
                          <div>
                            <h1>{mytitle}</h1>
                          </div>
                          <div className="projectbutton">
                            <button
                              style={
                                dept === null
                                  ? {
                                      color: "#fff",
                                      backgroundColor: "#000066",
                                    }
                                  : {
                                      backgroundColor: "whitesmoke",
                                      color: "#000066",
                                    }
                              }
                              id="btn00"
                              onClick={() => reinitialize()}
                            >
                              Toutes les zones
                            </button>
                            <button
                              onClick={() => setLastprojectmodalbis(true)}
                            >
                              Dernières MAJ de devis
                            </button>
                          </div>
                        </div>

                        <h2>Liste des devis</h2>

                        <button
                          className={
                            selectedstatus == "prospect" ? "active" : ""
                          }
                          onClick={() => setSelectedstatus("prospect")}
                          id="btn01"
                        >
                          Devis en cours
                        </button>
                        <button
                          className={selectedstatus == "lost" ? "active" : ""}
                          onClick={() => setSelectedstatus("lost")}
                          id="btn02"
                        >
                          Non remporté
                        </button>
                        <button
                          className={selectedstatus == "left" ? "active" : ""}
                          onClick={() => setSelectedstatus("left")}
                          id="btn03"
                        >
                          Non répondu
                        </button>
                        <button
                          className={
                            selectedstatus == "inprogress" ? "active" : ""
                          }
                          onClick={() => setSelectedstatus("inprogress")}
                          id="btn04"
                        >
                          En prod
                        </button>
                        <button
                          className={
                            selectedstatus == "standby" ? "active" : ""
                          }
                          onClick={() => setSelectedstatus("standby")}
                          id="btn05"
                        >
                          Stand by
                        </button>
                        <button
                          className={selectedstatus == "done" ? "active" : ""}
                          onClick={() => setSelectedstatus("done")}
                          id="btn06"
                        >
                          Terminé
                        </button>
                        <button className="addnew" onClick={() => showmodal()}>
                          Ajouter un nouveau projet
                        </button>
                        <div className="affichage">
                          <input
                            type="text"
                            id="mysearchbox"
                            placeholder="Recherche par mot-clé"
                            onChange={(e) => lookatme(e.target.value)}
                          />
                        </div>

                        <select
                          name="selectspecs"
                          id="selectspecs"
                          onChange={(e) => filtermethod(e.target.value)}
                        >
                          <option value="projet"> afficher par projet</option>
                          <option value="client">
                            afficher par nom client
                          </option>
                          <option value="datedemande">
                            afficher par date de demande
                          </option>
                          <option value="deadline">
                            afficher par deadline
                          </option>
                          <option value="datedebutprevisionnelle">
                            afficher par date de début
                          </option>
                          <option value="budgetestimatif">
                            par budget estimatif
                          </option>
                        </select>

                        <ul className="selectlist">
                          {!isEmpty(projects) &&
                            projects
                              .filter((project) =>
                                dept ? project.departement === dept : true
                              )
                              .filter((project) =>
                                mysearch
                                  ? removeAccents(
                                      project.nom.toLowerCase()
                                    ).includes(
                                      removeAccents(mysearch.toLowerCase())
                                    ) ||
                                    removeAccents(
                                      project.typeprestations.toLowerCase()
                                    ).includes(
                                      removeAccents(mysearch.toLowerCase())
                                    ) ||
                                    removeAccents(
                                      project.description.toLowerCase()
                                    ).includes(
                                      removeAccents(mysearch.toLowerCase())
                                    )
                                  : true
                              )
                              .filter(
                                (project) => project.statut === selectedstatus
                              )
                              .sort((a, b) => {
                                const orderBy = (key, descending = false) => {
                                  const order = descending ? -1 : 1;
                                  return (a, b) =>
                                    a[key] > b[key]
                                      ? order
                                      : a[key] < b[key]
                                      ? -order
                                      : 0;
                                };

                                const criteria = [
                                  "projet",
                                  "client",
                                  "datedemande",
                                  "deadline",
                                  "datedebutprevisionnelle",
                                  "budgetestimatif",
                                  "listeprix",
                                ];

                                for (const criterion of criteria) {
                                  const comparison = orderBy(criterion, true);
                                  const result = comparison(a, b);
                                  if (result !== 0) return result;
                                }

                                return 0;
                              })
                              .map((project) => (
                                <li key={project.id}>
                                  <a
                                    onClick={() => selectedproject(project.id)}
                                  >
                                    {myfilter === "projet" && (
                                      <>
                                        {project.nom}
                                        <span className="projectpriority">
                                          Priorité : {project.priorite}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "client" && (
                                      <>
                                        {project.client}
                                        <span className="projectstate">
                                          {project.statut}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "datedemande" && (
                                      <>
                                        {project.nom}
                                        <span className="projectstate">
                                          {project.datedemande}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "deadline" && (
                                      <>
                                        {project.nom}
                                        <span className="projectstate">
                                          {project.deadline}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "datedebutprevisionnelle" && (
                                      <>
                                        {project.nom}
                                        <span className="projectstate">
                                          {project.datedebutprevisionnelle}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "budgetestimatif" && (
                                      <>
                                        {project.nom}
                                        <span className="projectstate">
                                          {project.budgetestimatif}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "listeprix" && (
                                      <>
                                        {/* {project.nom} */}
                                        Liste de prix
                                        <span className="projectstate">
                                          prix
                                        </span>
                                      </>
                                    )}
                                  </a>
                                </li>
                              ))}
                        </ul>
                      </div>
                    ) : (
                      // ---------------------- Section Missions
                      <div className="missiondetails">
                        <h2>Missions</h2>

                        <button
                          className={
                            selectedstatus == "inprogress" ? "active" : ""
                          }
                          onClick={() => setSelectedstatus("inprogress")}
                          id="btn01"
                        >
                          En cours
                        </button>
                        <button
                          className={selectedstatus == "lost" ? "active" : ""}
                          onClick={() => setSelectedstatus("lost")}
                          id="btn02"
                        >
                          Annulé
                        </button>
                        <button
                          className={
                            selectedstatus == "standby" ? "active" : ""
                          }
                          onClick={() => setSelectedstatus("standby")}
                          id="btn03"
                        >
                          Stand By
                        </button>
                        <button
                          className={selectedstatus == "done" ? "active" : ""}
                          onClick={() => setSelectedstatus("done")}
                          id="btn04"
                        >
                          Terminé
                        </button>
                        <button
                          className="addnew"
                          onClick={() => setShowmodal02(true)}
                        >
                          Ajouter une nouvelle mission
                        </button>
                        <div className="affichage">
                          <input
                            type="text"
                            id="mysearchbox"
                            placeholder="Recherche par mot-clé"
                            onChange={(e) => lookatme(e.target.value)}
                          />
                        </div>

                        <select
                          name="selectspecs"
                          id="selectspecs"
                          onChange={(e) => filtermethod(e.target.value)}
                        >
                          <option value="projet"> afficher par mission</option>
                          <option value="datedemande">
                            afficher par date de demande
                          </option>
                          <option value="deadline">
                            afficher par deadline
                          </option>
                        </select>

                        <ul className="selectlist">
                          {!isEmpty(missions) &&
                            missions
                              .filter((mission) =>
                                mysearch
                                  ? removeAccents(
                                      mission.nom.toLowerCase()
                                    ).includes(
                                      removeAccents(mysearch.toLowerCase())
                                    ) ||
                                    removeAccents(
                                      mission.typeprestations.toLowerCase()
                                    ).includes(
                                      removeAccents(mysearch.toLowerCase())
                                    ) ||
                                    removeAccents(
                                      mission.description.toLowerCase()
                                    ).includes(
                                      removeAccents(mysearch.toLowerCase())
                                    )
                                  : true
                              )
                              .filter(
                                (mission) => mission.statut === selectedstatus
                              )
                              .sort((a, b) => {
                                const orderBy = (key, descending = false) => {
                                  const order = descending ? -1 : 1;
                                  return (a, b) =>
                                    a[key] > b[key]
                                      ? order
                                      : a[key] < b[key]
                                      ? -order
                                      : 0;
                                };

                                const criteria = [
                                  "projet",
                                  "client",
                                  "datedemande",
                                  "deadline",
                                  "datedebutprevisionnelle",
                                  "budgetestimatif",
                                  "listeprix",
                                ];

                                for (const criterion of criteria) {
                                  const comparison = orderBy(criterion, true);
                                  const result = comparison(a, b);
                                  if (result !== 0) return result;
                                }

                                return 0;
                              })
                              .map((mission) => (
                                <li key={mission.id}>
                                  <a
                                    onClick={() => selectedmission(mission.id)}
                                  >
                                    {myfilter === "projet" && (
                                      <>
                                        {mission.nom}
                                        <span className="projectpriority">
                                          Priorité : {mission.priorite}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "datedemande" && (
                                      <>
                                        {mission.nom}
                                        <span className="projectstate">
                                          {mission.datedemande}
                                        </span>
                                      </>
                                    )}
                                    {myfilter === "deadline" && (
                                      <>
                                        {mission.nom}
                                        <span className="projectstate">
                                          {mission.deadline}
                                        </span>
                                      </>
                                    )}
                                  </a>
                                </li>
                              ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal />

        {/* // ---------------------- Section Ajout Mission */}
        <div className={showmodal02 ? "showmodal" : ""} id="mymodal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="entete">
                <h3>Nouvelle mission</h3>
              </div>
            </div>

            <div className="modal-body">
              <div className="bodycontainer">
                <div className="homeform">
                  <form
                    method="post"
                    action="https://task.axel.mg/addnewmission"
                    id="myform"
                  >
                    <div className="midtitle">A propos de la mission : </div>

                    <div className="inputtitle">Nom de la mission : </div>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      className="longinput"
                    />
                    <br />

                    <div className="inputtitle">Objectif : </div>
                    <input
                      type="text"
                      name="typeprestations"
                      id="typeprestations"
                      className="longinput"
                    />
                    <br />

                    <div className="inputtitle">Date de la demande : </div>
                    <input
                      type="date"
                      name="datedemande"
                      id="datedemande"
                      className="longinput"
                    />

                    <div className="inputtitle">Deadline : </div>
                    <input
                      type="date"
                      name="deadline"
                      id="deadline"
                      className="longinput"
                    />

                    <div className="inputtitle">Description </div>
                    <textarea
                      name="description"
                      id="description"
                      className="longinput"
                      rows="6"
                    ></textarea>
                    <br />

                    <div className="inputtitle">Statut: </div>
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="statut"
                          value="inprogress"
                          defaultChecked
                        />
                        En cours
                      </label>

                      <label>
                        <input type="radio" name="statut" value="lost" />
                        Annulé
                      </label>

                      <label>
                        <input type="radio" name="statut" value="standby" />
                        Stand By
                      </label>

                      <label>
                        <input type="radio" name="statut" value="done" />
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

                    <br />

                    <button type="submit" id="validateform">
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button id="closeme" onClick={() => closefile()}>
                Fermer
              </button>
            </div>
          </div>
        </div>

        {/* // ---------------------- Section Ajout projet */}
        <Ficheprojet />

        {/* // ---------------------- Section Mission Modal */}
        <div
          className={fichemission && fichemission ? "showproject" : ""}
          id="modalcontainer"
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="entete">
                <div className="bigtitle">
                  <h1>{!isEmpty(mission) && mission.nom}</h1>
                  <h2>{!isEmpty(mission) && mission.typeprestations}</h2>
                  <div className="mymissionpriority">
                    {/* // ---------------------- Set Statut de la mission : CHANGER LA METHODE */}
                    <form ref={stateform} onChange={() => setstatus()}>
                      <p>
                        Statut : &nbsp;
                        <input
                          type="hidden"
                          name="prioid"
                          value={!isEmpty(mission) && mission.id}
                        />
                        <select name="missionstate" id="missionstate">
                          <option>{!isEmpty(mission) && mission.statut}</option>
                          <option value="inprogress">En cours</option>
                          <option value="lost">Abandonné</option>
                          <option value="standby">Stand by</option>
                          <option value="done">Terminé</option>
                        </select>
                      </p>
                    </form>
                    {/* // ---------------------- Set Priority de la mission : CHANGER LA METHODE */}
                    <form ref={prioform} onChange={() => setpriority()}>
                      <p>
                        Priorité : &nbsp;
                        <input
                          type="hidden"
                          name="prioid"
                          value={!isEmpty(mission) && mission.id}
                        />
                        <select name="missionprio" id="missionprio">
                          <option>
                            {!isEmpty(mission) && mission.priorite}
                          </option>
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
                      <h3>A propos de la mission</h3>
                      <div className="part3">
                        <span>
                          <b>Mission </b> :{" "}
                        </span>
                        <span style={{ color: "green" }}>
                          {!isEmpty(mission) && mission.nom}
                        </span>
                      </div>
                      <div className="part4">
                        <span>
                          <b>Date demande</b> :{" "}
                        </span>
                        <span>{!isEmpty(mission) && mission.datedemande}</span>
                      </div>
                      <div className="part5">
                        <span>
                          <b>Deadline</b> :{" "}
                        </span>
                        <span>{!isEmpty(mission) && mission.deadline}</span>
                      </div>
                      <div className="part10">
                        <span>
                          <b>Statut</b> :{" "}
                        </span>
                        <span>{!isEmpty(mission) && mission.statut}</span>
                      </div>
                    </div>
                    <div className="leftpart">
                      <div className="container">
                        <h2>A faire</h2>
                        {/* // ---------------------- Form - TodoList : Modifié */}
                        <form
                          ref={form}
                          onSubmit={(e) => handleform(e)}
                          // onSubmit={(e) => e.preventDefault()}
                        >
                          <input
                            type="hidden"
                            name="project"
                            value="0"
                            id="project"
                          />
                          <input
                            type="hidden"
                            name="mission"
                            value={
                              !isEmpty(missions) &&
                              Number(!isEmpty(mission) && mission.id)
                            }
                            id="mission"
                          />

                          <input
                            type="text"
                            id="todo"
                            name="todo"
                            placeholder="Renseignez les tâches à faire, ici"
                          />
                        </form>
                        <ul id="list">
                          {!isEmpty(todos) &&
                            todos
                              .filter((todo) => {
                                return (
                                  !isEmpty(missions) &&
                                  Number(todo.mission) === Number(mission.id)
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
                                  !isEmpty(missions) &&
                                  Number(link.missionid) === Number(mission.id)
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
                        {/* // ---------------------- Form - Links : Modifié */}
                        <form ref={mylink} onSubmit={(e) => linkform(e)}>
                          <h4>Ajouter un nouveau lien</h4>
                          <input
                            type="text"
                            name="filename"
                            id="filename"
                            placeholder="Entrer le nom du fichier"
                            // defaultValue="Mon fichier"
                          />
                          <input
                            id="filelink"
                            name="filelink"
                            rows="5"
                            placeholder="Coller le lien, ici"
                          />
                          <input
                            type="hidden"
                            name="projectid"
                            id="projectid"
                            value="0"
                          />
                          <input
                            type="hidden"
                            name="missionid"
                            id="missionid"
                            value={!isEmpty(missions) && Number(mission.id)}
                          />
                          <input type="submit" value="Ajouter" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="projectmaincontent">
                    {/* <div className="rightside">
                      <h3>Description</h3>
                      <p>{!isEmpty(mission) && mission.description}</p>
                    </div> */}
                    <div className="container">
                      {/* <h2>Commentaires</h2>
                      <ul id="list">
                        {!isEmpty(comments) &&
                          comments
                            .filter((comment) => {
                              return (
                                !isEmpty(missions) &&
                                Number(comment.midforcomment) === Number(mission.id)
                              );
                            })
                            .map((comment) => (
                              <li key={comment.id}>
                                <div className="leftli">
                                  <span>{comment.datecomment}</span>
                                  <p>{comment.commentaire}</p>
                                </div>
                                <div className="rightli">
                                  <button onClick={() => deletecomment(comment.id)}>
                                    Delete
                                  </button>
                                </div>
                              </li>
                            ))}
                      </ul> */}

                      <h2>Notes</h2>
                      <ul id="list">
                        {!isEmpty(comments) &&
                          comments
                            .filter((comment) => {
                              return (
                                !isEmpty(missions) &&
                                Number(comment.midforcomment) ===
                                  Number(mission.id)
                              );
                            })
                            .map((comment) => (
                              <li key={comment.id}>
                                <div className="leftli">
                                  <span>{comment.datecomment}</span>
                                  {/* <p>{comment.commentaire}</p> */}
                                  {/* Utiliser convertDraftToHtml pour afficher le contenu Draft.js */}
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: convertDraftToHtml(
                                        JSON.parse(comment.commentaire)
                                      )
                                    }}
                                  />
                                </div>
                                <div className="rightli">
                                  <button
                                    onClick={() => deletecomment(comment.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </li>
                            ))}
                      </ul>

                      {/* // ---------------------- Form - Commentaires : Modifié */}
                      <form
                        ref={commentaire}
                        onSubmit={(e) => commentform(e)}
                        style={{ backgroundColor: "#fff", padding: "10px" }}
                      >
                        <input
                          type="hidden"
                          name="datecomment"
                          id="datecomment"
                          value={currentDateTime}
                        />
                        <input
                          type="hidden"
                          name="pidforcomment"
                          id="pidforcomment"
                          value="0"
                        />
                        <input
                          type="hidden"
                          name="midforcomment"
                          id="midforcomment"
                          value={!isEmpty(missions) && Number(mission.id)}
                        />
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
              <button id="closeme" onClick={() => setFichemission(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
