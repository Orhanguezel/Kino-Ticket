// Kampanyaları yükleme veya başlatma
import {
  initializeCampaigns,
  saveCampaignsToLocalStorage,
  loadCampaignsFromLocalStorage,
} from "./stateManager.js";
import { defaultCampaigns } from "../data/Campaigns.js"; // Varsayılan kampanyalar dosyası

let campaigns = loadCampaignsFromLocalStorage();
if (campaigns.length === 0) {
  campaigns = [...defaultCampaigns];
  initializeCampaigns(campaigns);
}

// Kampanya Görünümü Render Fonksiyonu
export function renderCampaignView() {
  const container = document.getElementById("main-content");

  container.innerHTML = `
    <h2>İndirimler ve Kampanyalar</h2>
    <div class="campaign-section">
      <div class="campaign-list">
        <h3>Mevcut Kampanyalar</h3>
        <div id="campaign-table">
          ${renderCampaignTable()}
        </div>
      </div>
      <div class="campaign-form">
        <h3>Yeni Kampanya Ekle</h3>
        <form id="campaign-form">
          <label for="campaign-name">Kampanya Adı:</label>
          <input type="text" id="campaign-name" required>
          
          <label for="campaign-audience">Hedef Kitle:</label>
          <select id="campaign-audience" multiple>
            <option value="Öğrenci">Öğrenci</option>
            <option value="Çocuk">Çocuk</option>
            <option value="Halk Günü">Halk Günü</option>
          </select>
          
          <label for="discount-type">İndirim Türü:</label>
          <select id="discount-type">
            <option value="percentage">% İndirim</option>
            <option value="fixed">Sabit İndirim</option>
          </select>
          
          <label for="discount-value">İndirim Değeri:</label>
          <input type="number" id="discount-value" required>
          
          <label for="start-date">Başlangıç Tarihi:</label>
          <input type="date" id="start-date" required>
          
          <label for="end-date">Bitiş Tarihi:</label>
          <input type="date" id="end-date" required>
          
          <button type="button" onclick="addCampaign()">Kaydet</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("campaign-table").innerHTML = renderCampaignTable();
}

// Kampanya Tablosu
function renderCampaignTable() {
  return `
    <table>
      <thead>
        <tr>
          <th>Adı</th>
          <th>Hedef Kitle</th>
          <th>İndirim</th>
          <th>Geçerlilik</th>
          <th>Durum</th>
          <th>Aksiyon</th>
        </tr>
      </thead>
      <tbody>
        ${campaigns
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.name || "Bilinmiyor"}</td>
            <td>${(campaign.targetAudience || []).join(", ")}</td>
            <td>${campaign.discountValue || 0} ${
              campaign.discountType === "percentage" ? "%" : "€"
            }</td>
            <td>${campaign.startDate || "Belirtilmemiş"} - ${
              campaign.endDate || "Belirtilmemiş"
            }</td>
            <td>${campaign.status || "Aktif"}</td>
            <td>
              <button onclick="editCampaign(${campaign.id})">Düzenle</button>
  <button class="delete" onclick="deleteCampaign(${campaign.id})">Sil</button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Kampanya Düzenleme Fonksiyonu
export function editCampaign(id) {
  // Kampanyayı id'ye göre bul
  const campaignToEdit = campaigns.find((campaign) => campaign.id === id);

  if (campaignToEdit) {
    // Form alanlarına kampanya verilerini yerleştir
    document.getElementById("campaign-name").value = campaignToEdit.name;
    const audienceOptions = Array.from(
      document.getElementById("campaign-audience").options
    );
    audienceOptions.forEach((option) => {
      option.selected = campaignToEdit.targetAudience.includes(option.value);
    });
    document.getElementById("discount-type").value =
      campaignToEdit.discountType;
    document.getElementById("discount-value").value =
      campaignToEdit.discountValue;
    document.getElementById("start-date").value = campaignToEdit.startDate;
    document.getElementById("end-date").value = campaignToEdit.endDate;

    // Düzenleme işlemi için bir kaydetme düğmesi
    const saveButton = document.createElement("button");
    saveButton.textContent = "Güncelle";
    saveButton.classList.add("update-campaign-btn");
    saveButton.onclick = () => updateCampaign(id);

    // Mevcut Kaydet düğmesini yeni Güncelle düğmesi ile değiştir
    const form = document.getElementById("campaign-form");
    const oldSaveButton = form.querySelector("button[type='button']");
    if (oldSaveButton) {
      form.replaceChild(saveButton, oldSaveButton);
    }
  }
}

// Kampanya Güncelleme Fonksiyonu
export function updateCampaign(id) {
  // Formdan yeni değerleri al
  const updatedName = document.getElementById("campaign-name").value;
  const updatedAudience = Array.from(
    document.getElementById("campaign-audience").selectedOptions
  ).map((option) => option.value);
  const updatedDiscountType = document.getElementById("discount-type").value;
  const updatedDiscountValue = parseFloat(
    document.getElementById("discount-value").value
  );
  const updatedStartDate = document.getElementById("start-date").value;
  const updatedEndDate = document.getElementById("end-date").value;

  // Kampanyayı güncelle
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
    };

    // LocalStorage'a kaydet ve görünümü yenile
    saveCampaignsToLocalStorage(campaigns);
    alert("Kampanya başarıyla güncellendi!");
    renderCampaignView();
  }
}

// Kampanya Ekleme ve Silme Fonksiyonları
export function addCampaign() {
  const name = document.getElementById("campaign-name").value;
  const audience = Array.from(
    document.getElementById("campaign-audience").selectedOptions
  ).map((option) => option.value);
  const discountType = document.getElementById("discount-type").value;
  const discountValue = parseFloat(
    document.getElementById("discount-value").value
  );
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

  alert("Kampanya başarıyla eklendi!");
  renderCampaignView();
}

export function deleteCampaign(id) {
  campaigns = campaigns.filter((campaign) => campaign.id !== id);
  saveCampaignsToLocalStorage(campaigns);

  alert("Kampanya başarıyla silindi!");
  renderCampaignView();
}

// Fonksiyonları window nesnesine ekleme
window.deleteCampaign = deleteCampaign;
window.addCampaign = addCampaign;
window.editCampaign = editCampaign;
window.renderCampaignView = renderCampaignView;
window.updateCampaign = updateCampaign;
