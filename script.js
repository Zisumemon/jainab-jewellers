// Utility to get/set data in localStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Update dashboard
document.addEventListener("DOMContentLoaded", () => {
  const purchases = getData("purchase");
  if (purchases.length) {
    const last = purchases[purchases.length - 1];
    document.getElementById("lastBill").textContent = last.bill || "--";
    document.getElementById("lastDate").textContent = last.date || "--";
    document.getElementById("entryType").textContent = "Purchase";
  }
});

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function addEntry(key, entry) {
  const data = getData(key);
  data.push(entry);
  saveData(key, data);
}
function loadTable(key, tableId) {
  const data = getData(key);
  const tbody = document.getElementById(tableId).querySelector("tbody");
  tbody.innerHTML = "";
  data.forEach(e => {
    const row = `<tr><td>${e.bill}</td><td>${e.date}</td><td>${e.item}</td><td>${e.qty}</td><td>${e.weight}</td></tr>`;
    tbody.innerHTML += row;
  });
}
function calculateStock() {
  const purchases = getData("purchase");
  const sales = getData("sale");
  const stock = {};

  purchases.forEach(p => {
    if (!stock[p.item]) stock[p.item] = { pQty: 0, sQty: 0, pW: 0, sW: 0 };
    stock[p.item].pQty += p.qty;
    stock[p.item].pW += p.weight;
  });
  sales.forEach(s => {
    if (!stock[s.item]) stock[s.item] = { pQty: 0, sQty: 0, pW: 0, sW: 0 };
    stock[s.item].sQty += s.qty;
    stock[s.item].sW += s.weight;
  });

  const tbody = document.getElementById("stockTable").querySelector("tbody");
  tbody.innerHTML = "";
  for (const item in stock) {
    const s = stock[item];
    const row = `<tr><td>${item}</td><td>${s.pQty}</td><td>${s.sQty}</td><td>${s.pW}</td><td>${s.sW}</td><td>${s.pQty - s.sQty}</td><td>${(s.pW - s.sW).toFixed(2)}</td></tr>`;
    tbody.innerHTML += row;
  }
}
