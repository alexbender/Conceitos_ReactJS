import React, { useState, useEffect } from "react";
import api from './services/api.js';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setProjects(response.data);
    });
  }, []);
  //handleRemoveRepository
  async function handleAddRepository() {

    const response = await api.post("repositories", {
      url: `https://github.com/alex.bender${Date.now()}`,
      title: `Desafio ReactJS_${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  async function handleRemoveRepository(id) {
    // Todo
    api.delete(`repositories/${id}`).then(response => {
      setProjects([]);
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>{project.title}

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
        </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
