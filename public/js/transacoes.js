/**
 * Lógica da Página de Transações
 * Gerencia a listagem, busca e filtragem de despesas pagas.
 */

// ===========================
// Estado da Aplicação
// ===========================
let allTransactions = [];
let filteredTransactions = [];

// ===========================
// Formata valor em Real (BRL)
// ===========================
function formatBRL(valor) {
  const numero = Number(valor) || 0;
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ===========================
// Renderiza a lista de transações
// ===========================
function renderTransactions(transactions) {
  const container = document.getElementById("transactions-list");
  const countBadge = document.getElementById("total-paid-count");

  if (!container) return;

  container.innerHTML = "";

  // Atualiza o contador de transações encontradas
  if (countBadge) {
    countBadge.textContent = `${transactions.length} ${transactions.length === 1 ? "transação" : "transações"}`;
  }

  if (transactions.length === 0) {
    container.innerHTML = `
        <div class="no-results">
            <p>Nenhuma transação encontrada para os filtros aplicados.</p>
        </div>`;
    return;
  }

  transactions.forEach((t) => {
    const item = document.createElement("div");
    item.classList.add("transaction-item");

    // Formatação da data
    const dateObj = new Date(t.maturity);
    const dia = String(dateObj.getDate()).padStart(2, "0");
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const ano = dateObj.getFullYear();

    item.innerHTML = `
      <div class="trans-info">
        <h4>${t.name}</h4>
        <span>Pago em ${dia}/${mes}/${ano}</span>
      </div>
      <div class="trans-meta">
        <p class="trans-value">${formatBRL(t.value)}</p>
        <span class="trans-category">${t.categoria || "Outros"}</span>
      </div>
    `;

    // Integração com o modal de detalhes (reutilizando a função global)
    item.addEventListener("click", () => {
      if (window.openExpenseDetails) {
        window.openExpenseDetails(t);
      } else {
        console.warn(
          "Função openExpenseDetails não encontrada. Certifique-se de que detalhes-despesa.js está carregado.",
        );
      }
    });

    container.appendChild(item);
  });
}

// ===========================
// Lógica de Filtro e Busca
// ===========================
function filterTransactions() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const categoryFilter = document.getElementById("category-filter").value;

  filteredTransactions = allTransactions.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      categoryFilter === "all" || t.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  renderTransactions(filteredTransactions);
}

// ===========================
// Carrega dados do Backend
// ===========================
async function loadTransactions() {
  const container = document.getElementById("transactions-list");

  try {
    // Busca todas as despesas do usuário
    const response = await fetch("/api/despesas/read", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Erro ao buscar dados do servidor");

    const data = await response.json();

    // Filtra apenas as despesas que já foram PAGAS
    allTransactions = data.filter((d) => d.state === "pago");

    // Ordena por data (mais recentes primeiro)
    allTransactions.sort((a, b) => new Date(b.maturity) - new Date(a.maturity));

    // Inicializa a lista filtrada com todos os dados
    filteredTransactions = [...allTransactions];
    renderTransactions(filteredTransactions);
  } catch (error) {
    console.error("Erro ao carregar transações:", error);
    if (container) {
      container.innerHTML = `
            <div class="no-results">
                <p>Erro ao carregar o histórico. Verifique se o servidor está online.</p>
            </div>`;
    }
  }
}

// ===========================
// Inicialização
// ===========================
document.addEventListener("DOMContentLoaded", async () => {
  // Carrega os dados iniciais
  loadTransactions();

  const res = await fetch("/api/usuarios/read/unique", {
    credentials: "include",
  });
  const data = await res.json();

  const usuarioNameDOM = document.querySelector(".user-info span");
  const usuarioName = data.nome.split(" ")[0];

  usuarioNameDOM.innerText = `Olá, ${usuarioName}`;

  // Configura os ouvintes de eventos para busca e filtro
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  if (searchInput) {
    searchInput.addEventListener("input", filterTransactions);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", filterTransactions);
  }
});
