document.addEventListener("DOMContentLoaded", () => {

    // Datos iniciales de ejemplo
    const proyectosIniciales = [
        { id: 101, titulo: "IA de Análisis Predictivo", progreso: 85, categoria: "Algoritmos" },
        { id: 102, titulo: "Motor de Renderizado 3D", progreso: 60, categoria: "Gráficos" },
        { id: 103, titulo: "Sistema de Encriptación Quantum", progreso: 95, categoria: "Ciberseguridad" }
    ];

    // Guardar en el almacenamiento del navegador si está vacío
    if (!localStorage.getItem("proyectos_db")) {
        localStorage.setItem("proyectos_db", JSON.stringify(proyectosIniciales));
    }

    // --- BOTÓN 1: Probar conexión inicial (index.html) ---
    const btnSaludo = document.getElementById("btnSaludo");
    if (btnSaludo) {
        btnSaludo.addEventListener("click", () => {
            const mensaje = document.getElementById("mensajeSaludo");
            mensaje.textContent = "⚡ Estado del sistema: Sistema activo y respondiendo correctamente.";
            mensaje.style.color = "#10b981";
            mensaje.style.fontWeight = "600";
        });
    }

    // --- BOTÓN 2: Nivel de Impacto (catalogo.html) ---
    const btnContador = document.getElementById("btnContador");
    let impacto = 0;
    if (btnContador) {
        btnContador.addEventListener("click", () => {
            impacto++;
            document.getElementById("numLikes").textContent = impacto;
        });
    }

    // --- BOTÓN 3: Consultar Registros (catalogo.html) ---
    const btnCargarBD = document.getElementById("btnCargarBD");
    if (btnCargarBD) {
        btnCargarBD.addEventListener("click", renderizarProyectos);
    }

    // --- FORMULARIO: Crear Proyecto y Guardar ---
    const formProyecto = document.getElementById("formNuevoProyecto");
    if (formProyecto) {
        formProyecto.addEventListener("submit", (e) => {
            e.preventDefault();

            const titulo = document.getElementById("inputTitulo").value;
            const progreso = document.getElementById("inputProgreso").value;
            const select = document.getElementById("selectCategoria");
            const categoriaNombre = select.options[select.selectedIndex].text;

            const proyectosBD = JSON.parse(localStorage.getItem("proyectos_db"));
            const nuevoProyecto = {
                id: Math.floor(Math.random() * 900) + 100,
                titulo: titulo,
                progreso: parseInt(progreso),
                categoria: categoriaNombre
            };

            proyectosBD.push(nuevoProyecto);
            localStorage.setItem("proyectos_db", JSON.stringify(proyectosBD));

            alert("✅ ¡Proyecto registrado exitosamente!");
            formProyecto.reset();
            renderizarProyectos();
        });
    }
});

// Función para renderizar y seleccionar proyectos
function renderizarProyectos() {
    const contenedor = document.getElementById("listaTabla2");
    const panel = document.getElementById("panelSeleccion");
    
    if (!contenedor) return;

    const proyectosBD = JSON.parse(localStorage.getItem("proyectos_db")) || [];
    contenedor.innerHTML = "";
    if (panel) panel.style.display = "none";

    proyectosBD.forEach(proj => {
        const card = document.createElement("div");
        card.className = "proyecto-card";
        card.innerHTML = `
            <h4>${proj.titulo}</h4>
            <p class="metrica">Avance: ${proj.progreso}%</p>
            <small style="color: var(--text-secondary);">Categoría: ${proj.categoria} | ID: #${proj.id}</small>
        `;

        // Selección al hacer clic
        card.addEventListener("click", () => {
            document.querySelectorAll(".proyecto-card").forEach(item => {
                item.classList.remove("activo");
            });

            card.classList.add("activo");

            const detalleText = document.getElementById("detalleSeleccionado");
            if (detalleText && panel) {
                detalleText.textContent = `${proj.titulo} — (Avance: ${proj.progreso}%) [ID #${proj.id}]`;
                panel.style.display = "block";
            }
        });

        contenedor.appendChild(card);
    });
}