class Tarea {
  constructor(nom) {
    this.id = Date.now();
    this.nom = nom;
    this.comp = false;
  }

  cambiarEst() {
    this.comp = !this.comp;
  }
}

export class GestorTareas {
  constructor() {
    this.todas = [];
  }

  agregar(nom) {
    const nueva = new Tarea(nom);
    this.todas.push(nueva);
    return nueva;
  }

  borrar(id) {
    const ind = this.todas.findIndex(t => t.id === id);
    if (ind !== -1) {
      this.todas.splice(ind, 1);
      return true;
    }
    return false;
  }

  marcar(id) {
    const tar = this.todas.find(t => t.id === id);
    if (tar) {
      tar.cambiarEst();
      return true;
    }
    return false;
  }

  modificar(id, nuevoNom) {
    const tar = this.todas.find(t => t.id === id);
    if (tar && nuevoNom.trim() !== "") {
      tar.nom = nuevoNom.trim();
      return true;
    }
    return false;
  }

  obtener() {
    return this.todas;
  }
}