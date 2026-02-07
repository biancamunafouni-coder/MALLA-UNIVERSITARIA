const form = document.getElementById("empresaForm");
const lista = document.getElementById("listaEmpresas");

let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

form.addEventListener("submit", e => {
  e.preventDefault();

  const empresa = {
    id: Date.now(),
    nombre: nombre.value,
    cuit: cuit.value,
    contacto: contacto.value,
    documentos: {
      seguro: seguro.checked,
      art: art.checked,
      contrato: contrato.checked,
      habilitacion: habilitacion.checked,
      afip: afip.checked
    }
  };

  empresas.push(empresa);
  guardar();
  form.reset();
  render();
});

function guardar() {
  localStorage.setItem("empresas", JSON.stringify(empresas));
}

function calcularProgreso(docs) {
  const total = Object.keys(docs).length;
  const cumplidos = Object.values(docs).filter(v => v).length;
  return Math.round((cumplidos / total) * 100);
}

function render() {
  lista.innerHTML = "";

  empresas.forEach(emp => {
    const progreso = calcularProgreso(emp.documentos);

    lista.innerHTML += `
      <div class="empresa">
        <strong>${emp.nombre}</strong><br>
        CUIT: ${emp.cuit}<br>
        Contacto: ${emp.contacto}<br><br>

        <div class="barra">
          <div class="progreso" style="width:${progreso}%">
            ${progreso}%
          </div>
        </div>
      </div>
    `;
  });
}

render();
