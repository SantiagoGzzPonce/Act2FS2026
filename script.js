import { GestorTareas } from "./clases.js";


const inp = document.getElementById("productoInput");
const btn = document.getElementById("btnAgregar");
const lista = document.getElementById("listaProductos");
const msg = document.getElementById("mensaje");


const gestor = new GestorTareas();


function mosMsg(texto, err = false) {
  msg.textContent = texto;
  if (err) {
    msg.classList.add("mensaje-error");
  } else {
    msg.classList.remove("mensaje-error");
  }
  msg.classList.remove("oculto");
}


function mosTodas() {
  lista.innerHTML = "";
  const todas = gestor.obtener();

  todas.forEach((t) => {
    const elem = document.createElement("li");
    
    // Texto
    const texto = document.createElement("span");
    texto.textContent = t.nom;
    if (t.comp) {
      texto.classList.add("destacado");
    }
    

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    
    btnEdit.addEventListener("click", () => {
      const nuevo = prompt("Cambiar nombre:", t.nom);
      if (nuevo === null) return;
      const res = gestor.modificar(t.id, nuevo);
      if (res) {
        mosTodas();
        mosMsg("Tarea cambiada");
      }
    });
    

    const btnDel = document.createElement("button");
    btnDel.textContent = "Eliminar";
    
    btnDel.addEventListener("click", () => {
      const conf = confirm(`¿Borrar "${t.nom}"?`);
      if (conf) {
        const res = gestor.borrar(t.id);
        if (res) {
          mosTodas();
          mosMsg("Tarea borrada");
        }
      }
    });
    

    const btnComp = document.createElement("button");
    btnComp.textContent = t.comp ? "✓" : "○";
    
    btnComp.addEventListener("click", () => {
      const res = gestor.marcar(t.id);
      if (res) {
        mosTodas();
        mosMsg("Estado cambiado");
      }
    });

    elem.appendChild(texto);
    elem.appendChild(btnEdit);
    elem.appendChild(btnDel);
    elem.appendChild(btnComp);
    
    lista.appendChild(elem);
  });
}


btn.addEventListener("click", () => {
  const texto = inp.value.trim();

  if (texto === "") {
    mosMsg("⚠️ Escribe algo primero", true);
    return;
  }

  mosMsg("");
  gestor.agregar(texto);
  inp.value = "";
  mosTodas();
});


inp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});


mosTodas();