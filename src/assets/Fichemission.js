import React, { useState, useEffect, useRef } from "react";
import { isEmpty } from "./Utils";
import { useDispatch, useSelector, useStore } from "react-redux";
import { deleteTodo, editTodo, postTodo } from "../actions/todo.action";
import { deleteComment, postComment } from "../actions/comment.action";
import { getFiche } from "../actions/fiche.action";
import { editPrio } from "../actions/prio.action";
import { deleteLink, postLink } from "../actions/link.action";
import { setStatus } from "../actions/status.action";

const Fichemission = () => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.idReducer.id);
  const missions = useSelector((state) => state.missionReducer);
  const todos = useSelector((state) => state.todoReducer.todos);

  const comments = useSelector((state) => state.commentReducer.comments);
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

  const closefile = () => {
    dispatch(getFiche(false));
    prioform.current.reset();
  };

  const mission =
    !isEmpty(missions) &&
    missions.find((mission) => Number(mission.id) === Number(id));

  const missionprio = useSelector((state) => state.prioReducer.prio);
  const missionstatus = useSelector((state) => state.statusReducer.statut);

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

  const form = useRef();
  const handleform = async (e) => {
    e.preventDefault();

    const postdata = {
      mission: form.current[0].value,
      todo: form.current[1].value,
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

  // Section links
  const links = useSelector((state) => state.linkReducer.links);
  const mylink = useRef();

  const linkform = (e) => {
    e.preventDefault();
    const data = {
      filename: mylink.current[0].value,
      filelink: mylink.current[1].value,
      missionid: mylink.current[2].value,
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

  // Section commentaires
  const commentaire = useRef();

  const commentform = (e) => {
    e.preventDefault();
    const data = {
      datecomment: commentaire.current[0].value,
      pidforcomment: commentaire.current[1].value,
      commentaire: commentaire.current[2].value,
    };
    // alert(commentaire.current[1].value);
    dispatch(postComment(data));
    commentaire.current.reset();
  };
  const deletecomment = (id) => {
    if (id) {
      dispatch(deleteComment(id));
    } else {
      console.error("ID non défini, impossible de mettre à jour.");
    }
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
                <form ref={prioform} onChange={() => setpriority()}>
                  <p>
                    Priorité : &nbsp;
                    <input
                      type="hidden"
                      name="prioid"
                      value={!isEmpty(mission) && mission.id}
                    />
                    <select name="missionprio" id="missionprio">
                      <option>{!isEmpty(mission) && mission.priorite}</option>
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
                      {!isEmpty(mission) && mission.typeprestations}
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
                    <form
                      // action="http://localhost:8080/addtodo"
                      // method="post"
                      ref={form}
                      onSubmit={(e) => handleform(e)}
                      // onSubmit={(e) => e.preventDefault()}
                    >
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
                <div className="rightside">
                  <h3>Description</h3>
                  <p>{!isEmpty(mission) && mission.description}</p>
                </div>
                <div className="container">
                  <h2>Commentaires</h2>
                  <ul id="list">
                    {!isEmpty(comments) &&
                      comments
                        .filter((comment) => {
                          return (
                            !isEmpty(missions) &&
                            Number(comment.pidforcomment) === Number(mission.id)
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
                  </ul>
                  <form ref={commentaire} onSubmit={(e) => commentform(e)}>
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
                      value={!isEmpty(missions) && Number(mission.id)}
                    />
                    <textarea
                      id="commentaire"
                      name="commentaire"
                      rows="5"
                      placeholder="Ajoutez un nouveau commentaire sur la mission"
                    ></textarea>
                    <input type="submit" value="Commenter" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Fichemission;
