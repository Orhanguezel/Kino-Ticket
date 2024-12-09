// campaigns laden oder initialisieren
import {
  initializeCampaigns,
  saveCampaignsToLocalStorage,
  loadCampaignsFromLocalStorage,
} from "./stateManager.js";
import { defaultCampaigns } from "../data/Campaigns.js"; // Standardcampaigns

let campaigns = loadCampaignsFromLocalStorage();
if (campaigns.length === 0) {
  campaigns = [...defaultCampaigns];
  initializeCampaigns(campaigns);
}

// campaignsansicht rendern
export function renderCampaignView() {
  const container = document.getElementById("main-content");

  container.innerHTML = `
    <h2>Rabatte und kampagnen</h2>
    <div class="campaign-section">
      <div class="campaign-list">
        <h3>Aktuelle kampagnen</h3>
        <div id="campaign-table">
          ${renderCampaignTable()}
        </div>
      </div>
      <div class="campaign-form">
        <h3>Neue Kampagne hinzufügen</h3>
        <form id="campaign-form">
          <label for="campaign-name">Kampagnenname:</label>
          <input type="text" id="campaign-name" required>
          
          <label for="campaign-audience">Zielgruppe:</label>
          <select id="campaign-audience" multiple>
            <option value="Student">Student</option>
            <option value="Kinder">Kinder</option>
            <option value="Kinotag">Kinotag</option>
          </select>
          
          <label for="discount-type">Rabattart:</label>
          <select id="discount-type">
            <option value="percentage">% Rabatt</option>
            <option value="fixed">Fester Rabatt</option>
          </select>
          
          <label for="discount-value">Rabattwert:</label>
          <input type="number" id="discount-value" required>
          
          <label for="start-date">Startdatum:</label>
          <input type="date" id="start-date" required>
          
          <label for="end-date">Enddatum:</label>
          <input type="date" id="end-date" required>
          
          <button type="button" onclick="addCampaign()">Speichern</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("campaign-table").innerHTML = renderCampaignTable();
}

// campaignstabelle rendern
function renderCampaignTable() {
  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Zielgruppe</th>
          <th>Rabatt</th>
          <th>Gültigkeit</th>
          <th>Status</th>
          <th>Aktion</th>
        </tr>
      </thead>
      <tbody>
        ${campaigns
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.name || "Unbekannt"}</td>
            <td>${(campaign.targetAudience || []).join(", ")}</td>
            <td>${campaign.discountValue || 0} ${
              campaign.discountType === "percentage" ? "%" : "€"
            }</td>
            <td>${campaign.startDate || "Nicht angegeben"} - ${
              campaign.endDate || "Nicht angegeben"
            }</td>
            <td>${campaign.status || "Aktiv"}</td>
            <td>
              <button onclick="editCampaign(${campaign.id})">Bearbeiten</button>
              <button class="delete" onclick="deleteCampaign(${campaign.id})">Löschen</button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}


export function editCampaign(id) {
  const campaignToEdit = campaigns.find((campaign) => campaign.id === id);

  if (campaignToEdit) {
    document.getElementById("campaign-name").value = campaignToEdit.name;
    const audienceOptions = Array.from(document.getElementById("campaign-audience").options);
    audienceOptions.forEach((option) => {
      option.selected = campaignToEdit.targetAudience.includes(option.value);
    });
    document.getElementById("discount-type").value = campaignToEdit.discountType;
    document.getElementById("discount-value").value = campaignToEdit.discountValue;
    document.getElementById("start-date").value = campaignToEdit.startDate;
    document.getElementById("end-date").value = campaignToEdit.endDate;

    // Status için aktif/pasif kontrolü
    const statusSelect = document.createElement("select");
    statusSelect.id = "campaign-status";
    statusSelect.innerHTML = `
      <option value="active" ${campaignToEdit.status === "active" ? "selected" : ""}>Aktiv</option>
      <option value="inactive" ${campaignToEdit.status === "inactive" ? "selected" : ""}>Inaktiv</option>
    `;
    const statusLabel = document.createElement("label");
    statusLabel.setAttribute("for", "campaign-status");
    statusLabel.textContent = "Status:";
    const form = document.getElementById("campaign-form");
    form.appendChild(statusLabel);
    form.appendChild(statusSelect);

    // Kaydet butonunu güncelle
    const saveButton = document.createElement("button");
    saveButton.textContent = "Aktualisieren";
    saveButton.classList.add("update-campaign-btn");
    saveButton.onclick = () => updateCampaign(id);

    const oldSaveButton = form.querySelector("button[type='button']");
    if (oldSaveButton) {
      form.replaceChild(saveButton, oldSaveButton);
    }
  }
}





// Kampagne aktualisieren

export function updateCampaign(id) {
  const updatedName = document.getElementById("campaign-name").value;
  const updatedAudience = Array.from(document.getElementById("campaign-audience").selectedOptions).map(
    (option) => option.value
  );
  const updatedDiscountType = document.getElementById("discount-type").value;
  const updatedDiscountValue = parseFloat(document.getElementById("discount-value").value);
  const updatedStartDate = document.getElementById("start-date").value;
  const updatedEndDate = document.getElementById("end-date").value;
  const updatedStatus = document.getElementById("campaign-status").value; // Status bilgisi

  const campaignIndex = campaigns.findIndex((campaign) => campaign.id === id);
  if (campaignIndex !== -1) {
    campaigns[campaignIndex] = {
      ...campaigns[campaignIndex],
      name: updatedName,
      targetAudience: updatedAudience,
      discountType: updatedDiscountType,
      discountValue: updatedDiscountValue,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      status: updatedStatus, // Status güncelleniyor
    };

    saveCampaignsToLocalStorage(campaigns);
    alert("Kampagne erfolgreich aktualisiert!");
    renderCampaignView();
  }
}


// Kampagne hinzufügen
export function addCampaign() {
  const name = document.getElementById("campaign-name").value;
  const audience = Array.from(document.getElementById("campaign-audience").selectedOptions).map(
    (option) => option.value
  );
  const discountType = document.getElementById("discount-type").value;
  const discountValue = parseFloat(document.getElementById("discount-value").value);
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const newCampaign = {
    id: campaigns.length + 1,
    name,
    targetAudience: audience,
    discountType,
    discountValue,
    startDate,
    endDate,
    status: "active",
  };

  campaigns.push(newCampaign);
  saveCampaignsToLocalStorage(campaigns);

  alert("Kampagne erfolgreich hinzugefügt!");
  renderCampaignView();
}

// Kampagne löschen
export function deleteCampaign(id) {
  campaigns = campaigns.filter((campaign) => campaign.id !== id);
  saveCampaignsToLocalStorage(campaigns);

  alert("Kampagne erfolgreich hinzugefügt!");
  renderCampaignView();
}


// Funktionen zum globalen Fenster hinzufügen
window.deleteCampaign = deleteCampaign;
window.addCampaign = addCampaign;
window.editCampaign = editCampaign;
window.renderCampaignView = renderCampaignView;
window.updateCampaign = updateCampaign;
