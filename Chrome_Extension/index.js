let myLeads = [];
// myLeads = JSON.parse(myLeads);
// myLeads.push("www.epiclead.com");
// myLeads = JSON.stringify(myLeads);

// console.log(typeof myLeads);

const inputEl = document.getElementById("input-el");
const btn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("save-btn");
deleteBtn.addEventListener("dblclick", fnClear);

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function fnClear() {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
}
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

btn.addEventListener("click", saveLead);
function saveLead() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
      <a target=_blank href=${leads[i]} > ${leads[i]}}  </a>
      </li>`;
    //create elemnt
    // const li = document.createElement("li");
    //add text content
    // li.textContent = myLeads[i];
    //apend that
    // ulEl.append(li);
  }
  ulEl.innerHTML = listItems;
}
