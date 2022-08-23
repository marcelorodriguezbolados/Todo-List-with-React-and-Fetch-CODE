import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const getTask = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/asd")
      .then((data) => data.json())
      .then((response) => setLista(response));
  };
  // get es traer información
  //post es publicar, subir, guardar información.
  // put es actualizar información.
  //delete borrar.

//   const putTask = () => {
//     /* Definición en que formato enviaremos la informacion */
//     let header = new Headers();
//     header.append("content type", "application/json");
//     //definimos la información enviada.
//     let body = JSON.stringify([{ label: "probando el front, done:false" }]);

//     let requestOptions = {
//       method: "PUT",
//       headers: header,
//       body: body,
//       redirect: "follow",
//     };

//     fetch(
//       "https://assets.breatheco.de/apis/fake/todos/user/asd",
//       requestOptions
//     )
//       .then((data) => data.json())
//       .then((response) => console.log(response));
//   };

  useEffect(() => {
    getTask();
  }, []);

  /*TODO LIST */

  const [lista, setLista] = useState([]);
  const norefresh = (evento) => {
    evento.preventDefault();
    console.log(evento.target[0].value);
    setLista([...lista, evento.target[0].value]);
    //setLista([...lista,{label:´${aqui va la tarea}´,done:´${false}´])
  };
  const agregarDato = (e) => {
    e.preventDefault();
    setLista([...lista, { label: `${e.target[0].value}`, done: false }]);
    // console.log(lista)
    fetch("https://assets.breatheco.de/apis/fake/todos/user/asd", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        ...lista,
        { label: `${e.target[0].value}`, done: false },
      ]),
    })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
	  .catch((error)=>console.log(error))
  };

  const DeleteItems = (indexItem) => {
    setLista((prevState) =>
      prevState.filter((elemento, indice) => indice !== indexItem)
    );
  };
  return (
    <div className="container">
      <form type="submit" onSubmit={agregarDato}>
        <h1 className="Titulo">Todos</h1>
        <input type="text"></input>
      </form>
      <ul>
				{lista.map((elemento, indice)=>{
					return <li key={indice}>{elemento.label} <button className="btn" onClick={() => DeleteItems(indice)}>
					<i className="fas fa-trash-alt" />
				  </button></li>
				})}
			</ul>
    </div>
  );
};

export default Home;
