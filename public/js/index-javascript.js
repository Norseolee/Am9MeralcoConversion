// document.addEventListener("DOMContentLoaded", function () {
//   const baseURL = "/tenant";
//   const baseURL_meralco = "/meralco";

//   getinfo();

//   async function getinfo(e) {
//     if (e) {
//       e.preventDefault();
//     }

//     const res = await fetch(baseURL, {
//       method: "GET",
//     });

//     const data = await res.json();
//     const database = data;

//     let selectionDropdown = document.getElementById("selection");
//     database.forEach(function (obj) {
//       let option = document.createElement("option");
//       option.text = obj.name;
//       option.value = obj.tenant_id;
//       selectionDropdown.add(option);
//     });

//     selectionDropdown.addEventListener("change", function () {
//       let selectedTenantId =
//         selectionDropdown.options[selectionDropdown.selectedIndex].value;
//       let selectedtenant =
//         selectionDropdown.options[selectionDropdown.selectedIndex].text;

//       let selectedObject = database.find((obj) => obj.name === selectedtenant);

//       document.querySelector(".Name").innerHTML = selectedObject.name;
//       document.querySelector(".Building").innerHTML = selectedObject.building;
//       document.querySelector(".History-Name").innerHTML = selectedObject.name;
//       document.querySelector(".History-Builing").innerHTML =
//         selectedObject.building;

//       // show in meralco Form
//       document.getElementById("meralcoNameTenant").innerHTML =
//         selectedObject.name;
//       document.getElementById("meralcoBuildingTenant").innerHTML =
//         selectedObject.building;
//       document.getElementById("updateTenantId").value =
//         selectedObject.tenant_id;
//       // show in Update Tenant Form
//       document.getElementById("updateNameTenant").value = selectedObject.name;
//       document.getElementById("updateBuildingTenant").value =
//         selectedObject.building;
//       document.getElementById("updateTenantId").value =
//         selectedObject.tenant_id;

//       getMeralcoData(selectedTenantId);
//       historymeralco(selectedTenantId);
//     });
//   }

//   let meralco_id;
//   async function getMeralcoData(tenantId) {
//     const res = await fetch(`${baseURL_meralco}?tenant_id=${tenantId}`, {
//       method: "GET",
//     });

//     const data = await res.json();
//     const meralcoData = data;

//     const selectedTenantData = meralcoData.filter(
//       (obj) => obj.tenant_id == tenantId
//     );

//     const currentDate = new Date().toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });

//     // to show in UpdateForm
//     document.getElementById("updatePreviousReading").value = "";
//     document.getElementById("updateCurrentReading").value = "";
//     document.getElementById("updateDueDate").value = "";
//     document.getElementById("updateDateOfReading").value = currentDate;
//     document.getElementById("updatePerKwh").value = "";

//     let selectionDropdown_date = document.getElementById("selection_date");
//     selectionDropdown_date.innerHTML = "";

//     let defaultOption = document.createElement("option");
//     defaultOption.value = "";
//     defaultOption.text = "";
//     selectionDropdown_date.add(defaultOption);

//     selectedTenantData.forEach(function (obj) {
//       let option = document.createElement("option");
//       option.text = obj.date_of_reading;
//       selectionDropdown_date.add(option);
//     });

//     selectionDropdown_date.addEventListener("change", function () {
//       let selected_date =
//         selectionDropdown_date.options[selectionDropdown_date.selectedIndex]
//           .text;

//       let selectedDate = selectedTenantData.find(
//         (obj) => obj.date_of_reading === selected_date
//       );

//       if (
//         !selectedDate ||
//         selectedDate.per_kwh === null ||
//         selectedDate.previous_reading === null
//       ) {
//         selectedDate.per_kwh = 0;
//         selectedDate.previous_reading = 0;
//         selectedDate.consume = selectedDate.current_reading;
//       }

//       let PerKWHNumber = selectedDate.per_kwh * 10;
//       let PreviousReadingNumber = selectedDate.previous_reading * 10;
//       let CurrentReadingNumber = selectedDate.current_reading * 10;

//       let PreviousminusCurrent = CurrentReadingNumber - PreviousReadingNumber;
//       let Calculation = (PreviousminusCurrent * PerKWHNumber) / 100;

//       document.querySelector(".TotalAmount").innerHTML = Calculation;

//       document.querySelector(".DueDate").innerHTML = selectedDate.due_date;
//       document.querySelector(".PerKwh").innerHTML = selectedDate.per_kwh;
//       document.querySelector(".DateOfReading").innerHTML =
//         selectedDate.date_of_reading;
//       document.querySelector(".PreviousReading").innerHTML =
//         selectedDate.previous_reading;
//       document.querySelector(".CurrentReading").innerHTML =
//         selectedDate.current_reading;
//       document.querySelector(".Consume").innerHTML = selectedDate.consume;

//       meralco_id = selectedDate.meralco_id;
//     });
//   }

//   async function historymeralco(tenantId) {
//     const res = await fetch(`${baseURL_meralco}?tenant_id=${tenantId}`, {
//       method: "GET",
//     });

//     const meralcoHistoryData = await res.json();

//     const selectedTenantData = meralcoHistoryData.filter(
//       (obj) => obj.tenant_id == tenantId
//     );

//     const historyContainer = document.querySelector(".history");
//     historyContainer.innerHTML = "";

//     selectedTenantData.forEach(function (obj) {
//       let historyEntry = document.createElement("div");
//       historyEntry.classList.add("history-entry");

//       historyEntry.innerHTML = `
//         <div class="history_of_tenant">
//           <p>Due Date: <span class="History-Date">${obj.due_date}</span></p>
//           <p>Per Kwh: <span class="History-PerKwh">${obj.per_kwh}</span></p>
//         </div>
//         <div class="history_of_reading">
//           <p>Date of Reading: <span class="History-Date">${obj.date_of_reading}</span></p>
//           <p>Previous Reading: <span class="History-PreviousReading">${obj.previous_reading}</span></p>
//           <p>Current Reading: <span class="History-CurrentReading">${obj.current_reading}</span></p>
//         </div>
//       `;

//       historyContainer.appendChild(historyEntry);
//     });
//   }

//   window.deleteTenant = async function deleteTenant() {
//     const selectionDropdown = document.getElementById("selection");
//     const selectedTenantId =
//       selectionDropdown.options[selectionDropdown.selectedIndex].value;

//     if (!selectedTenantId) {
//       alert("Please select a tenant to delete.");
//       return;
//     }

//     const confirmation = confirm(
//       "Are you sure you want to delete this tenant?"
//     );

//     if (confirmation) {
//       try {
//         const response = await fetch(`/tenant/delete/${selectedTenantId}`, {
//           method: "DELETE",
//         });

//         if (response.ok) {
//           alert(`Tenant with ID ${selectedTenantId} has been deleted.`);
//           window.location.reload();
//         } else {
//           alert("Error deleting tenant. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error deleting tenant:", error);
//         alert("An error occurred while deleting the tenant.");
//       }
//     }
//   };

//   window.deleteMeralco = async function deleteMeralco() {
//     meralco_id;

//     console.log(meralco_id);

//     if (!meralco_id) {
//       alert("Please select a date to delete.");
//       return;
//     }

//     const confirmation = confirm(
//       "Are you sure you want to delete this meralco date?"
//     );

//     if (confirmation) {
//       try {
//         const response = await fetch(`/meralco/delete/${meralco_id}`, {
//           method: "DELETE",
//         });

//         if (response.ok) {
//           alert(`Tenant with ID ${meralco_id} has been deleted.`);
//           window.location.reload();
//         } else {
//           alert("Error deleting tenant. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error deleting tenant:", error);
//         alert("An error occurred while deleting the tenant.");
//       }
//     }
//   };

//   //
//   const updateTenantForm = document.getElementById("updateTenantForm");
//   updateTenantForm.addEventListener("submit", async (event) => {
//     let tenant_Id = document.getElementById("updateTenantId").value;
//     event.preventDefault();

//     const tenantId = tenant_Id;
//     const name = document.getElementById("updateNameTenant").value;
//     const building = document.getElementById("updateBuildingTenant").value;

//     try {
//       const response = await fetch(`/tenant/update-tenant/${tenantId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, building }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error updating tenant: ${response.statusText}`);
//       }

//       const result = await response.text();
//       alert(result);
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error (e.g., show an error message to the user)
//     }
//   });
// });
