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
  const modalDetalhes = document.getElementById("modal-detalhes-objetivo");
  const modalEdicao = document.getElementById("modal-editar-objetivo");

  // Fechar modal de detalhes
  document
    .getElementById("close-goal-details-modal")
    .addEventListener("click", () => modalDetalhes.classList.remove("active"));

  // Fechar modal de edição
  document
    .getElementById("close-edit-goal-modal")
    .addEventListener("click", () => modalEdicao.classList.remove("active"));

  // Deletar objetivo
  document
    .getElementById("btn-delete-goal")
    .addEventListener("click", async () => {
      if (confirm(`Deseja deletar o objetivo "${currentGoalData[0].name}"?`)) {
        await fetchApi(
          `/api/objetivos/delete/${currentGoalData[0].id}`,
          "DELETE",
          undefined,
          "include",
        );

        modalDetalhes.classList.remove("active");
        showNotification("Objetivo deletado com Sucesso!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    });

  // Abrir modal de edição
  document.getElementById("btn-edit-goal").addEventListener("click", () => {
    modalDetalhes.classList.remove("active");

    // Preencher os campos do modal de edição
    document.getElementById("edit-goal-id").value = currentGoalData[0].id;
    document.getElementById("edit-goal-name").value = currentGoalData[0].name;
    document.getElementById("edit-goal-current-value").value =
      currentGoalData[0].value;
    document.getElementById("edit-goal-target-value").value =
      currentGoalData[0].valueObjective;

    // Abrir modal de edição
    modalEdicao.classList.add("active");
  });

  // Salvar alterações
  document
    .getElementById("btn-save-goal-edit")
    .addEventListener("click", async () => {
      const id = document.getElementById("edit-goal-id").value;
      const name = document.getElementById("edit-goal-name").value;
      const currentValue = parseFloat(
        document.getElementById("edit-goal-current-value").value,
      );
      const targetValue = parseFloat(
        document.getElementById("edit-goal-target-value").value,
      );

      // Validações
      if (!name.trim()) {
        showNotification("Por favor, preencha o nome do objetivo", "error");
        return;
      }

      if (isNaN(currentValue) || currentValue < 0) {
        showNotification("Valor atual inválido", "error");
        return;
      }

      if (isNaN(targetValue) || targetValue <= 0) {
        showNotification("Valor objetivo inválido", "error");
        return;
      }

      if (currentValue > targetValue) {
        showNotification(
          "O valor atual não pode ser maior que o valor objetivo",
          "error",
        );
        return;
      }

      try {
        const response = await fetchApi(
          `/api/objetivos/update/${id}`,
          "PUT",
          {
            name: name,
            value: currentValue,
            valueObjective: targetValue,
          },
          "include",
        );

        if (response.success || response.status === 200) {
          showNotification("Objetivo atualizado com sucesso!", "success");
          modalEdicao.classList.remove("active");
          setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      } catch (error) {
        showNotification("Erro ao atualizar objetivo", "error");
        console.error(error);
      }
    });

  // Cancelar edição
  document
    .getElementById("btn-cancel-goal-edit")
    .addEventListener("click", () => {
      modalEdicao.classList.remove("active");
    });
});
