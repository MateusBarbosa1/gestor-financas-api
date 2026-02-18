import { showNotification, fetchApi } from "./functions-generics.js";

let currentGoalData = null;

function formatBRL(valor) {
  return (Number(valor) || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

window.openGoalDetails = function (goal) {
  currentGoalData = goal;
  const modal = document.getElementById("modal-detalhes-objetivo");
  if (!modal) return;

  const progress = (
    (currentGoalData[0].value / currentGoalData[0].valueObjective) *
    100
  ).toFixed(1);
  document.getElementById("goal-detail-id").innerText = currentGoalData[0].id;
  document.getElementById("goal-detail-name").innerText =
    currentGoalData[0].name;
  document.getElementById("goal-detail-target").innerText = formatBRL(
    currentGoalData[0].valueObjective,
  );
  document.getElementById("goal-detail-current").innerText = formatBRL(
    currentGoalData[0].value,
  );
  document.getElementById("goal-detail-progress").innerText = `${progress}%`;
  modal.classList.add("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-detalhes-objetivo");
  document
    .getElementById("close-goal-details-modal")
    .addEventListener("click", () => modal.classList.remove("active"));

  document
    .getElementById("btn-delete-goal")
    .addEventListener("click", async () => {
      if (confirm(`Deseja deletar o objetivo "${currentGoalData[0].name}"?`)) {
        //await deletarObjetivo(currentGoalData[0].id);
        modal.classList.remove("active");
      }
    });

  document.getElementById("btn-edit-goal").addEventListener("click", () => {
    modal.classList.remove("active");
    const modalObj = document.getElementById("modal-objetivo");
    const form = document.getElementById("goal-form");

    let idInput =
      document.getElementById("goal-id") ||
      Object.assign(document.createElement("input"), {
        type: "hidden",
        id: "goal-id",
        name: "id",
      });
    if (!idInput.parentElement) form.prepend(idInput);

    idInput.value = currentGoalData.id;
    document.getElementById("goal-name").value = currentGoalData[0].name;
    document.getElementById("goal-value").value =
      currentGoalData[0].valueObjective;
    modalObj.querySelector("h2").innerText = "Atualizar Objetivo";
    modalObj.classList.add("active");
  });
});
